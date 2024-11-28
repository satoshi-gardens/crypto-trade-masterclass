import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const ALLOWED_ATTACHMENT_TYPES = ["application/pdf"];

const testimonialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  isStudent: z.boolean(),
  testimonyText: z.string().min(10, "Testimony must be at least 10 characters"),
  photo: z.any().optional(),
  attachment: z.any().optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      isStudent: false,
    },
  });

  const processImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to convert canvas to blob"));
            }
          },
          "image/jpeg",
          0.8
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      setIsSubmitting(true);

      // Validate photo
      if (data.photo && data.photo[0]) {
        const photo = data.photo[0];
        if (!ALLOWED_IMAGE_TYPES.includes(photo.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload a JPEG or PNG image",
            variant: "destructive",
          });
          return;
        }
        if (photo.size > MAX_FILE_SIZE) {
          toast({
            title: "File too large",
            description: "Photo must be less than 2MB",
            variant: "destructive",
          });
          return;
        }
      }

      // Validate attachment
      if (data.attachment && data.attachment[0]) {
        const attachment = data.attachment[0];
        if (!ALLOWED_ATTACHMENT_TYPES.includes(attachment.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload a PDF file",
            variant: "destructive",
          });
          return;
        }
      }

      // Generate verification token
      const verificationToken = crypto.randomUUID();

      // Process and upload photo if provided
      let photoUrl = null;
      if (data.photo && data.photo[0]) {
        const processedImage = await processImage(data.photo[0]);
        const photoPath = `${crypto.randomUUID()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(photoPath, processedImage);

        if (uploadError) throw uploadError;

        const { data: photoData } = supabase.storage
          .from("testimonials")
          .getPublicUrl(photoPath);
        photoUrl = photoData.publicUrl;
      }

      // Upload attachment if provided
      let attachmentUrl = null;
      if (data.attachment && data.attachment[0]) {
        const attachmentPath = `${crypto.randomUUID()}.pdf`;
        const { error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(attachmentPath, data.attachment[0]);

        if (uploadError) throw uploadError;

        const { data: attachmentData } = supabase.storage
          .from("testimonials")
          .getPublicUrl(attachmentPath);
        attachmentUrl = attachmentData.publicUrl;
      }

      // Save testimonial to database
      const { error: dbError } = await supabase.from("testimonials").insert({
        full_name: data.fullName,
        display_name: data.displayName,
        is_student: data.isStudent,
        testimony_text: data.testimonyText,
        photo_url: photoUrl,
        attachment_url: attachmentUrl,
        email: data.email,
        verification_token: verificationToken,
      });

      if (dbError) throw dbError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-testimonial-confirmation",
        {
          body: {
            to: data.email,
            name: data.displayName,
            verificationToken,
          },
        }
      );

      if (emailError) throw emailError;

      toast({
        title: "Testimonial submitted!",
        description:
          "Please check your email to verify and publish your testimonial.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This will not be displayed publicly
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be shown publicly
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                We'll send you a verification link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isStudent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Student</FormLabel>
                <FormDescription>
                  Are you a current or former student?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testimonyText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Testimony</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Photo (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload a JPEG or PNG image (max 2MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachment"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Attachment (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Upload a PDF file</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </form>
    </Form>
  );
};

export default TestimonialForm;