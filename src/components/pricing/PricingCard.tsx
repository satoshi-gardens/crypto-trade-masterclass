import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingCardProps {
  title: string;
  price: number;
  discountedPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  maxStudents?: number;
  additionalHourlyRate?: number;
}

export const PricingCard = ({
  title,
  price,
  discountedPrice,
  description,
  features,
  isPopular,
  maxStudents,
  additionalHourlyRate
}: PricingCardProps) => {
  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-3xl font-bold">CHF {discountedPrice.toLocaleString()}</span>
          <span className="text-gray-500 line-through ml-2">CHF {price.toLocaleString()}</span>
          <p className="text-sm text-gray-600 mt-2">6-month program</p>
          {additionalHourlyRate && (
            <p className="text-sm text-primary mt-1">
              Additional hours: CHF {additionalHourlyRate}/hour
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{description}</p>
        {maxStudents && (
          <p className="text-sm text-primary mb-4">Limited to {maxStudents} students per group</p>
        )}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full">
          <Link to="/contact">Apply Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
};