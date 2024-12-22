import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PersonalInfoFields from "./PersonalInfoFields";
import { PhotoUploadField } from "./PhotoUploadField";
import { SocialMediaFields } from "./SocialMediaFields";

const testimonialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  isStudent: z.boolean().default(false),
  testimonyText: z.string().min(10, "Testimony must be at least 10 characters"),
  photo: z.any().optional(),
  telegramHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const navigate = useNavigate();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      isStudent: false,
    },
  });

  const handleSubmit = async (data: TestimonialFormValues) => {
    try {
      let photoUrl = null;

      // Upload photo if provided
      if (data.photo?.[0]) {
        const file = data.photo[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('testimonials')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('Failed to upload photo');
        }

        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('testimonials')
            .getPublicUrl(filePath);
          photoUrl = publicUrl;
        }
      }

      // Generate verification token
      const verificationToken = Math.random().toString(36).substring(2, 15);

      // Store testimonial in the database
      const { error: dbError } = await supabase
        .from("testimonials")
        .insert({
          full_name: data.fullName,
          display_name: data.displayName,
          email: data.email,
          is_student: data.isStudent,
          testimony_text: data.testimonyText,
          photo_url: photoUrl,
          telegram_handle: data.telegramHandle,
          twitter_handle: data.twitterHandle,
          instagram_handle: data.instagramHandle,
          verification_token: verificationToken,
          is_verified: false,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save testimonial');
      }

      // Send confirmation email to submitter
      const { error: submitterEmailError } = await supabase.functions.invoke(
        "send-testimonial-email",
        {
          body: {
            name: data.fullName,
            email: data.email,
          },
        }
      );

      if (submitterEmailError) {
        console.error('Submitter email error:', submitterEmailError);
        throw new Error('Failed to send confirmation email');
      }

      // Send notification email to admin
      const { error: adminEmailError } = await supabase.functions.invoke(
        "send-testimonial-confirmation",
        {
          body: {
            testimonial: {
              fullName: data.fullName,
              displayName: data.displayName,
              email: data.email,
              isStudent: data.isStudent,
              testimonyText: data.testimonyText,
              verificationToken,
            },
          },
        }
      );

      if (adminEmailError) {
        console.error('Admin email error:', adminEmailError);
        throw new Error('Failed to send admin notification');
      }

      toast.success("Thank you for your testimonial!");
      navigate("/thank-you-feedback");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit testimonial. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <PhotoUploadField form={form} />
        <SocialMediaFields form={form} />
        <Button type="submit">
          Submit Testimonial
        </Button>
      </form>
    </Form>
  );
};

export default TestimonialForm;