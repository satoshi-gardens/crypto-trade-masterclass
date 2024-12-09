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
    console.log("Starting feedback submission with data:", data);
    setIsSubmitting(true);
    
    try {
      // Store feedback in the database
      console.log("Attempting to store feedback in database...");
      const { error: dbError, data: insertedData } = await supabase
        .from("feedback")
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
            area: data.area,
            message: data.message,
          },
        ])
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Failed to store feedback: ${dbError.message}`);
      }

      console.log("Feedback stored successfully:", insertedData);

      // Send confirmation email
      console.log("Attempting to send confirmation email...");
      const { error: emailError } = await supabase.functions.invoke(
        "send-feedback-email",
        {
          body: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            area: data.area,
            message: data.message,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        throw new Error(`Failed to send confirmation email: ${emailError.message}`);
      }

      console.log("Confirmation email sent successfully");

      // Create a notification
      console.log("Creating notification...");
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          title: "Feedback Submitted",
          message: "Thank you for your feedback! We'll review it shortly.",
          icon: "message-square",
          start_date: new Date().toISOString(),
          expire_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        });

      if (notificationError) {
        console.error("Notification error:", notificationError);
        // Don't throw here as it's not critical
      } else {
        console.log("Notification created successfully");
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