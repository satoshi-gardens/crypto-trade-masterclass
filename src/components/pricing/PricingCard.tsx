import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface PricingCardProps {
  title: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  maxStudents?: number;
  additionalHourlyRate?: number;
  paymentType: "monthly" | "annual";
}

export const PricingCard = ({
  title,
  monthlyPrice,
  annualPrice,
  description,
  features,
  isPopular,
  maxStudents,
  additionalHourlyRate,
  paymentType
}: PricingCardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  
  const isAnnual = paymentType === "annual";
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  const fullPrice = monthlyPrice * 6;
  const monthlyPayment = monthlyPrice;
  const annualSavings = fullPrice - annualPrice;
  
  // Apply referral discount if code exists
  const discountedPrice = referralCode ? currentPrice * 0.9 : currentPrice;
  const referralSavings = currentPrice - discountedPrice;

  const handleApply = () => {
    console.log("Navigating to checkout with state:", {
      courseTitle: title,
      packageType: title,
      price: discountedPrice,
      paymentType,
      referralCode,
      originalPrice: currentPrice,
    });

    navigate("/checkout", {
      state: {
        courseTitle: title,
        packageType: title,
        price: discountedPrice,
        paymentType,
        referralCode,
        originalPrice: currentPrice,
      },
    });
  };

  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            {referralCode ? (
              <div className="text-center">
                <span className="text-3xl font-bold line-through text-gray-400">
                  CHF {currentPrice.toLocaleString()}
                </span>
                <span className="text-3xl font-bold ml-2">
                  CHF {discountedPrice.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-primary ml-2">
                  10% Referral Discount
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold">
                CHF {currentPrice.toLocaleString()}
              </span>
            )}
            {isAnnual && !referralCode && (
              <Badge variant="secondary" className="text-primary">
                Save {Math.round((annualSavings / fullPrice) * 100)}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {isAnnual ? (
              <span>One-time payment (save CHF {annualSavings.toLocaleString()})</span>
            ) : (
              <span>6 monthly payments of CHF {monthlyPayment.toLocaleString()}</span>
            )}
          </p>
          {referralCode && (
            <p className="text-sm text-primary">
              You save CHF {referralSavings.toLocaleString()} with your referral discount!
            </p>
          )}
          {additionalHourlyRate && (
            <p className="text-sm text-primary">
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
        <Button onClick={handleApply} className="w-full">
          Start Your Journey
        </Button>
        <p className="text-sm text-gray-500 text-center mt-2">
          {isAnnual ? "One-time payment" : "Monthly installments"}
        </p>
      </CardContent>
    </Card>
  );
};