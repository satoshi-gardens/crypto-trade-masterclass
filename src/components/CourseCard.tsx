import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  description: string;
  duration: number;
  price: number;
  packageType?: string;
  features?: string[];
  maxStudents?: number;
  additionalHourlyRate?: number;
  monthlyPayment?: number;
  isPopular?: boolean;
  onBook?: () => void;
}

const CourseCard = ({
  title,
  description,
  duration,
  price,
  packageType,
  features = [],
  maxStudents,
  additionalHourlyRate,
  monthlyPayment,
  isPopular,
  onBook
}: CourseCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    console.log("Navigating to checkout with state:", {
      courseTitle: title,
      packageType,
      price,
      paymentType: "monthly",
    });

    navigate("/checkout", {
      state: {
        courseTitle: title,
        packageType,
        price,
        paymentType: "monthly", // Default to monthly for course cards
      },
    });
  };

  return (
    <Card className={`flex flex-col h-full animate-fade-up glass-card hover:shadow-xl transition-all duration-300 relative ${isPopular ? 'border-primary shadow-lg' : ''}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
        <div className="mt-4">
          <div className="text-3xl font-bold">CHF {price.toLocaleString()}</div>
          <p className="text-sm text-gray-600">
            {monthlyPayment && `6 monthly payments of CHF ${monthlyPayment.toLocaleString()}`}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-gray-600 leading-relaxed">{description}</p>
        {maxStudents && (
          <p className="text-sm text-primary">Limited to {maxStudents} students per group</p>
        )}
        {additionalHourlyRate && (
          <p className="text-sm text-primary">Additional hours: CHF {additionalHourlyRate}/hour</p>
        )}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={handleApply} 
          className="w-full bg-primary/90 hover:bg-primary transition-colors duration-300"
        >
          Start Your Journey
        </Button>
        <p className="text-sm text-gray-500 text-center mt-2 w-full">
          Monthly installments
        </p>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;