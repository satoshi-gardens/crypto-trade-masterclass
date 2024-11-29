import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ReferralBannerProps {
  referralCode: string;
}

const ReferralBanner = ({ referralCode }: ReferralBannerProps) => {
  const [referrerName, setReferrerName] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchReferrerDetails = async () => {
      const { data, error } = await supabase
        .from("referrers")
        .select("user_email, is_verified")
        .eq("referral_code", referralCode)
        .single();

      if (data) {
        const displayName = data.user_email.split('@')[0] || referralCode;
        setReferrerName(displayName);
        setIsVerified(data.is_verified);
      }
    };

    if (referralCode) {
      fetchReferrerDetails();
    }
  }, [referralCode]);

  if (!referralCode || !isVerified) return null;

  return (
    <Alert className="bg-primary/10 border-primary mb-6">
      <InfoIcon className="h-5 w-5 text-primary" />
      <AlertTitle>Welcome to Our Community!</AlertTitle>
      <AlertDescription className="text-lg">
        You've been referred by <span className="font-semibold">{referrerName}</span>.
        You'll receive a 10% discount at checkout, and you can join our referral program to start earning rewards too!
      </AlertDescription>
    </Alert>
  );
};

export default ReferralBanner;