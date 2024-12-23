import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const courseFeatures = [
  "One-on-one sessions with Dr. Michael Kiberu",
  "Customized learning path based on your goals and experience",
  "Real-time market analysis and trading practice",
  "Access to proprietary trading tools and resources",
  "Ongoing support and mentorship",
];

const courseRequirements = [
  "A laptop or desktop computer",
  "A trading account (we'll set this up together on the first day)",
  "Starting capital of at least 1000 CHF",
  "Dedication and willingness to learn",
];

const CourseFeatures = () => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate("/courses#packages");
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {courseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {courseRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button size="lg" onClick={handleBookSession}>
          Book Your First Session
        </Button>
      </div>
    </>
  );
};

export default CourseFeatures;