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
    <Card className="flex flex-col h-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          <p className="text-sm"><span className="font-semibold">Duration:</span> {duration} weeks</p>
          <p className="text-sm"><span className="font-semibold">Price:</span> CHF {price.toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleApply} className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;