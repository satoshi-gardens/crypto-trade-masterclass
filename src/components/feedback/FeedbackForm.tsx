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

const feedbackSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select your country"),
  area: z.enum(["general", "courses", "platform", "technical", "other"], {
    required_error: "Please select a feedback area",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const FeedbackForm = ({ onSubmit, isSubmitting }: FeedbackFormProps) => {
  const navigate = useNavigate();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
  });

  const handleSubmit = async (data: FeedbackFormValues) => {
    try {
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
        });

      if (dbError) throw dbError;

      // Send confirmation email with marketing content
      const { error: emailError } = await supabase.functions.invoke(
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

      if (emailError) throw emailError;

      // Call the onSubmit prop after successful submission
      await onSubmit(data);

      toast.success("Thank you for your feedback!");
      navigate("/thank-you-feedback");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <FeedbackFields form={form} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;