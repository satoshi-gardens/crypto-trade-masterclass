import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import type { FeedbackFormValues } from "@/components/feedback/FeedbackForm";
import { sendFeedbackEmail } from "@/lib/email/emailService";
import PageLayout from "@/components/PageLayout";

const Feedback = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    try {
      // Send feedback emails
      const emailResult = await sendFeedbackEmail({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        area: data.area,
        message: data.message,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Failed to send feedback");
      }

      // Show success notification
      toast.success("Thank you for your feedback! We appreciate your input.", {
        duration: 3000,
      });

      // Redirect to courses page after 3 seconds
      setTimeout(() => {
        navigate("/courses");
      }, 3000);

    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(error.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Share Your Feedback - Bit2Big Crypto Course</title>
        <meta name="description" content="We value your feedback to improve our crypto trading courses and services." />
      </Helmet>

      <div className="container max-w-3xl py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Share Your Feedback</h1>
          <p className="mt-2 text-muted-foreground">
            We value your input and are committed to continuously improving our services.
          </p>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Feedback;