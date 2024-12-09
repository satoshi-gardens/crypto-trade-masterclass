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
import { useState } from "react";

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

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      area: "general",
      message: "",
    },
  });

  const handleSubmit = async (data: FeedbackFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const { error: dbError } = await supabase
        .from("feedback")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          country: data.country,
          area: data.area,
          message: data.message,
        });

      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke("send-feedback-email", {
          body: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            area: data.area,
            message: data.message,
          },
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      try {
        await supabase
          .from("notifications")
          .insert({
            title: "Feedback Submitted",
            message: "Thank you for your feedback! We'll review it shortly.",
            icon: "message-square",
            start_date: new Date().toISOString(),
            expire_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          });
      } catch (notificationError) {
        console.error("Notification creation failed:", notificationError);
      }

      toast.success("Thank you for your feedback!");
      navigate("/thank-you-feedback");
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(error.message || "Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
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