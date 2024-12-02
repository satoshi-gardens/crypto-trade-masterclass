import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, BookOpen, MessageSquare, Home } from "lucide-react";

const ThankYouFeedback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/courses");
    }, 10000); // 10 seconds delay before auto-redirect

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Thank You for Your Feedback!</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              We truly appreciate you taking the time to share your thoughts with us.
              Your feedback helps us improve our services and create better learning experiences.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Where would you like to go next?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link to="/courses">
                <Button variant="outline" className="w-full group">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full group">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full group">
                  <Home className="mr-2 h-4 w-4" />
                  Home Page
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            You will be automatically redirected to our courses page in a few seconds...
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThankYouFeedback;