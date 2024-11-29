import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ReferralFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  referralCode?: string | null;
}

const ReferralForm = ({ onSubmit, isLoading, referralCode }: ReferralFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        {referralCode ? (
          <Alert className="bg-primary/10">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              You've been referred! After joining, you'll be able to refer others and earn rewards too.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Enter your email to join our referral program or access your existing dashboard.
              You'll receive a secure link valid for 48 hours.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Get Started"}
      </Button>
    </form>
  );
};

export default ReferralForm;