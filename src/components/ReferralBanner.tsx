import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ReferralBannerProps {
  referralCode: string;
}

const ReferralBanner = ({ referralCode }: ReferralBannerProps) => {
  const [referrerName, setReferrerName] = useState<string>("");

  useEffect(() => {
    const fetchReferrerDetails = async () => {
      const { data, error } = await supabase
        .from("referrers")
        .select("user_email")
        .eq("referral_code", referralCode)
        .single();

      if (data) {
        // Extract name from email or use the code
        const displayName = data.user_email.split('@')[0] || referralCode;
        setReferrerName(displayName);
      }
    };

    if (referralCode) {
      fetchReferrerDetails();
    }
  }, [referralCode]);

  if (!referralCode) return null;

  return (
    <Alert className="bg-primary/10 border-primary mb-6">
      <InfoIcon className="h-5 w-5 text-primary" />
      <AlertDescription className="text-lg">
        Welcome! You've been referred by <span className="font-semibold">{referrerName}</span>.
        You'll receive a 10% discount at checkout!
      </AlertDescription>
    </Alert>
  );
};

export default ReferralBanner;