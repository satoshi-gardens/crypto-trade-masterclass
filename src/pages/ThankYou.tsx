import { useLocation, Link } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Mail, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ThankYou = () => {
  const location = useLocation();
  const { courseTitle, email, firstName } = location.state || {};
  const deadlineDate = addDays(new Date(), 7);

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

  const quotes = [
    {
      author: "Albert Einstein",
      quote: "In the middle of difficulty lies opportunity."
    },
    {
      author: "Warren Buffett",
      quote: "The more you learn, the more you earn."
    },
    {
      author: "Swiss Trading Principle",
      quote: "Like the precision of Swiss craftsmanship, success in trading requires discipline, skill, and a commitment to excellence."
    }
  ];

  const steps = [
    { title: "Payment Received", status: "pending" },
    { title: "Initial Meeting Scheduled", description: "We'll discuss modalities and program instructions", status: "upcoming" },
    { title: "First Training Session", description: "Module 1 begins after initial meeting", status: "upcoming" }
  ];

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8">
            <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">
              Congratulations{firstName ? `, ${firstName}` : ""}! Your Journey to Financial Freedom Begins Now.
            </h1>
            <p className="text-xl text-muted-foreground">
              You've just made an incredible decision to take control of your financial future. By joining {courseTitle}, you're stepping into a world of knowledge, growth, and opportunities.
            </p>
          </div>
        </div>

        {/* Progress Timeline */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-6">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === "pending" ? "bg-primary text-white" : "bg-muted"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{step.title}</h3>
                    {step.description && (
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-4 w-0.5 h-full bg-muted" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Payment Deadline</h3>
                <p className="text-muted-foreground">
                  Complete your payment by {format(deadlineDate, "MMMM do, yyyy")} to secure your spot.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <p>We've emailed you detailed payment instructions. Please check your inbox and follow the steps to complete your payment.</p>
              <p className="text-sm text-muted-foreground">
                If you do not receive the email within 24 hours, please check your spam or junk folder. If it's not there, contact us at payments@bit2big.com for assistance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Inspirational Quotes */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {quotes.map((quote) => (
            <Card key={quote.author} className="bg-accent/10">
              <CardContent className="pt-6">
                <blockquote className="italic mb-2">{quote.quote}</blockquote>
                <p className="text-sm font-semibold">— {quote.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Information */}
        <div className="text-center space-y-6">
          <p className="text-muted-foreground">
            If you have any questions or need help, our team is here to support you.<br />
            Email us at <span className="text-primary">support@bit2big.com</span>
          </p>
          <p className="font-medium">
            Stay committed to this journey. Financial independence is not just a goal—it's a lifestyle.
          </p>
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThankYou;