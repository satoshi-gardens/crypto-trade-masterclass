import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2 } from "lucide-react";

const ThankYouFeedback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-3xl font-bold">Thank You for Your Feedback!</h1>
          <p className="text-gray-600">
            We appreciate you taking the time to share your thoughts with us.
            Your feedback helps us improve our services.
          </p>
          <p className="text-sm text-muted-foreground">
            You will be redirected to the home page in a few seconds...
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThankYouFeedback;