import { useLocation, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const { courseTitle, email } = location.state || {};

  if (!courseTitle || !email) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Session Expired</h1>
          <p className="mb-4">Please start your application again.</p>
          <Button asChild>
            <Link to="/courses">View Courses</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-2xl mx-auto px-6 py-12 text-center">
        <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-6">
          Thank you for applying to {courseTitle}!
        </h1>
        <div className="bg-accent/10 p-6 rounded-lg mb-8 text-left">
          <p className="mb-4">
            An email with payment instructions has been sent to {email}. Please complete your payment 
            within 7 days to finalize your registration.
          </p>
          <p className="text-primary font-medium">
            If you have any questions, please contact payments@bit2big.com
          </p>
        </div>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default ThankYou;