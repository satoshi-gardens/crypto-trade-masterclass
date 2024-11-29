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
      try {
        const [{ data: referrerData }, { data: commissionRules }] = await Promise.all([
          supabase
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
            .single(),
          supabase
            .from("referral_commission_rules")
            .select("commission_percentage")
            .eq("payment_type", 'standard')
        ]);

        if (referrerData) {
          const displayName = referrerData.user_email.split('@')[0] || referralCode;
          setReferrerName(displayName);
          setIsVerified(referrerData.is_verified);
          
          // Get the commission percentage from rules or use default
          const defaultCommission = 10;
          const commission = commissionRules?.[0]?.commission_percentage || defaultCommission;
          
          if (referrerData.referral_conversions?.length > 0) {
            const conversion = referrerData.referral_conversions[0];
            setRewards({
              referrerReward: commission || conversion.referrer_reward_amount || defaultCommission,
              referredDiscount: conversion.referred_discount_amount || defaultCommission
            });
          } else {
            setRewards({
              referrerReward: commission || defaultCommission,
              referredDiscount: defaultCommission
            });
          }
        }
      } catch (error) {
        console.error("Error fetching referrer details:", error);
        // Set default values in case of error
        setRewards({
          referrerReward: 10,
          referredDiscount: 10
        });
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