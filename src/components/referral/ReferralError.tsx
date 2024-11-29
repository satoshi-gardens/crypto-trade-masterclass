import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReferralErrorProps {
  message: string;
  variant?: "default" | "destructive";
}

const ReferralError = ({ message, variant = "destructive" }: ReferralErrorProps) => {
  return (
    <Alert variant={variant} className="max-w-2xl mx-auto my-8">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ReferralError;