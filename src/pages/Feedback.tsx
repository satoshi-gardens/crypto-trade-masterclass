import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import type { FeedbackFormValues } from "@/components/feedback/FeedbackForm";
import { sendFeedbackEmails } from "@/lib/email/emailService";
import { supabase } from "@/integrations/supabase/client";

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FeedbackFormValues) => {
    try {
      setIsSubmitting(true);

      const { success, error } = await sendFeedbackEmails({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        feedback: data.message,
        rating: data.area,
        experience: data.country,
      });

      if (!success) throw new Error(error);

      // Create a notification
      await supabase.from("notifications").insert({
        title: "New Feedback Received",
        message: "Thank you for your valuable feedback! We'll review it shortly.",
        icon: "message-square",
        start_date: new Date().toISOString(),
        expire_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      });

      toast.success("Thank you for your feedback!");
      
      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/courses");
      }, 5000);

    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        "Failed to submit feedback. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Share Your Feedback</h1>
            <p className="text-gray-600">
              We value your input! Help us improve by sharing your thoughts,
              suggestions, or concerns.
            </p>
          </div>

          <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Feedback;