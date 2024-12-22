import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PersonalInfoFields from "./PersonalInfoFields";
import FeedbackFields from "./FeedbackFields";
import { PhotoUploadField } from "@/components/testimonials/PhotoUploadField";
import { SocialMediaFields } from "@/components/testimonials/SocialMediaFields";
import { CountrySelect } from "@/components/location/CountrySelect";

const feedbackSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string({ required_error: "Please select a country" }),
  area: z.enum(["general", "courses", "platform", "technical", "other"], {
    required_error: "Please select a feedback area",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  photo: z.any().optional(),
  telegramHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
  const navigate = useNavigate();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      telegramHandle: "",
      twitterHandle: "",
      instagramHandle: "",
    },
  });

  const handleSubmit = async (data: FeedbackFormValues) => {
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

      // Store feedback in the database
      const { error: dbError } = await supabase
        .from("feedback")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          area: data.area,
          message: data.message,
          photo_url: photoUrl,
          telegram_handle: data.telegramHandle || null,
          twitter_handle: data.twitterHandle || null,
          instagram_handle: data.instagramHandle || null,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save feedback');
      }

      // Send confirmation email to submitter
      const { error: submitterEmailError } = await supabase.functions.invoke(
        "send-feedback-email",
        {
          body: {
            name: data.firstName,
            email: data.email,
            area: data.area,
            message: data.message,
          },
        }
      );

      if (submitterEmailError) {
        console.error('Submitter email error:', submitterEmailError);
        throw new Error('Failed to send confirmation email');
      }

      // Send notification email to admin
      const { error: adminEmailError } = await supabase.functions.invoke(
        "send-feedback-notification",
        {
          body: {
            type: "feedback",
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            content: data.message,
          },
        }
      );

      if (adminEmailError) {
        console.error('Admin email error:', adminEmailError);
        throw new Error('Failed to send admin notification');
      }

      toast.success("Thank you for your feedback!");
      navigate("/thank-you-feedback");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <CountrySelect form={form} />
        <FeedbackFields form={form} />
        <PhotoUploadField form={form} />
        <SocialMediaFields form={form} />
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;