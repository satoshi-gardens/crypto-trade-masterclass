import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  title: string;
  description: string;
  duration: number;
  price: number;
  packageType?: string;
  onBook?: () => void;
}

const CourseCard = ({ title, description, duration, price, packageType, onBook }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/checkout", {
      state: {
        courseTitle: title,
        packageType,
        price,
      },
    });
  };

  return (
    <Card className="flex flex-col h-full animate-fade-up glass-card hover:shadow-xl transition-all duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p><span className="font-medium text-gray-900">Duration:</span> {duration} weeks</p>
          <p><span className="font-medium text-gray-900">Price:</span> CHF {price.toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApply} 
          className="w-full bg-primary/90 hover:bg-primary transition-colors duration-300"
        >
          Start Your Journey
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;