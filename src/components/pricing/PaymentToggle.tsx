import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PaymentToggleProps {
  paymentType: "monthly" | "annual";
  onToggle: (value: "monthly" | "annual") => void;
}

export const PaymentToggle = ({ paymentType, onToggle }: PaymentToggleProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <ToggleGroup
        type="single"
        value={paymentType}
        onValueChange={(value) => value && onToggle(value as "monthly" | "annual")}
        className="bg-accent rounded-lg p-1"
      >
        <ToggleGroupItem
          value="monthly"
          aria-label="Monthly Payment"
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            paymentType === "monthly"
              ? "bg-primary text-white"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          Monthly Payment
        </ToggleGroupItem>
        <ToggleGroupItem
          value="annual"
          aria-label="Annual Payment"
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            paymentType === "annual"
              ? "bg-primary text-white"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          Annual Payment
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-gray-600">
        {paymentType === "monthly"
          ? "Full amount spread across 6 months"
          : "Save 10% with upfront annual payment"}
      </p>
    </div>
  );
};