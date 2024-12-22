import { Helmet } from "react-helmet";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import PageLayout from "@/components/PageLayout";

const Feedback = () => {
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
          <FeedbackForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Feedback;