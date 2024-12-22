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
import { SocialMediaFields } from "./SocialMediaFields";
import { PhotoUploadField } from "./PhotoUploadField";

const testimonialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  isStudent: z.boolean(),
  testimonyText: z.string().min(10, "Testimony must be at least 10 characters"),
  photo: z.any().optional(),
  telegramHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      isStudent: false,
      telegramHandle: "",
      twitterHandle: "",
      instagramHandle: "",
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      setIsSubmitting(true);

      // Generate verification token
      const verificationToken = crypto.randomUUID();

      // Process and upload photo if provided
      let photoUrl = null;
      if (data.photo && data.photo[0]) {
        const file = data.photo[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("testimonials")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("testimonials")
          .getPublicUrl(fileName);

        photoUrl = publicUrl;
      }

      // Save testimonial to database
      const { error: dbError } = await supabase.from("testimonials").insert({
        full_name: data.fullName,
        display_name: data.displayName,
        is_student: data.isStudent,
        testimony_text: data.testimonyText,
        photo_url: photoUrl,
        email: data.email,
        verification_token: verificationToken,
        telegram_handle: data.telegramHandle || null,
        twitter_handle: data.twitterHandle || null,
        instagram_handle: data.instagramHandle || null,
      });

      if (dbError) throw dbError;

      // Send confirmation email to submitter
      const { error: submitterEmailError } = await supabase.functions.invoke(
        "send-testimonial-email",
        {
          body: {
            type: "submission",
            to: data.email,
            name: data.fullName,
          },
        }
      );

      if (submitterEmailError) throw submitterEmailError;

      // Send admin notification
      const { error: adminEmailError } = await supabase.functions.invoke(
        "send-testimonial-email",
        {
          body: {
            type: "admin_review",
            name: data.fullName,
            displayName: data.displayName,
            content: data.testimonyText,
            telegram: data.telegramHandle,
            twitter: data.twitterHandle,
            instagram: data.instagramHandle,
            verificationToken,
          },
        }
      );

      if (adminEmailError) throw adminEmailError;

      toast({
        title: "Thank you for your testimonial!",
        description: "Your submission is under review and will be published once approved.",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

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
                We'll send you a confirmation email
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
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PhotoUploadField form={form} />
        <SocialMediaFields form={form} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </form>
    </Form>
  );
};

export default TestimonialForm;