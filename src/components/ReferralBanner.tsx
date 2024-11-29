import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Gift } from "lucide-react";

interface ReferralBannerProps {
  referralCode: string;
}

const ReferralBanner = ({ referralCode }: ReferralBannerProps) => {
  const [referrerName, setReferrerName] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [referralType, setReferralType] = useState<"new" | "existing">("new");
  const [rewards, setRewards] = useState({
    referrerReward: 0,
    referredDiscount: 0
  });

  useEffect(() => {
    const fetchReferrerDetails = async () => {
      const { data, error } = await supabase
        .from("referrers")
        .select(`
          user_email,
          is_verified,
          referral_conversions (
            referrer_reward_amount,
            referred_discount_amount
          )
        `)
        .eq("referral_code", referralCode)
        .single();

      if (data) {
        const displayName = data.user_email.split('@')[0] || referralCode;
        setReferrerName(displayName);
        setIsVerified(data.is_verified);
        
        if (data.referral_conversions?.length > 0) {
          setRewards({
            referrerReward: data.referral_conversions[0].referrer_reward_amount,
            referredDiscount: data.referral_conversions[0].referred_discount_amount
          });
        }
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
      <AlertTitle className="flex items-center gap-2">
        Welcome to Our Community!
        <Gift className="h-4 w-4 text-primary" />
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <p className="text-lg">
          You've been referred by <span className="font-semibold">{referrerName}</span>.
        </p>
        <div className="mt-2">
          <p>Here's what you get:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Immediate {rewards.referredDiscount}% discount on your first purchase</li>
            <li>Access to our referral program after your first purchase</li>
            <li>Exclusive community benefits and early access to new modules</li>
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ReferralBanner;