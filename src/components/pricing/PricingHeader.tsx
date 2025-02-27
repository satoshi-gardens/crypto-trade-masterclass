
import { Badge } from "@/components/ui/badge";

export const PricingHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <Badge variant="secondary" className="mb-4">Special Offer: Save up to 15% until February 28th, 2025</Badge>
      <h2 className="text-4xl font-bold mb-6">Choose Your Path to Financial Independence</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Join an exclusive program designed for ambitious individuals seeking mastery in cryptocurrency trading. Our proven framework delivers measurable results through personalized mentorship.
      </p>
    </div>
  );
};
