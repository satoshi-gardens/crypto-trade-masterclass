import { useState, useEffect } from "react";
import ReferralLoading from "./ReferralLoading";
import ReferralError from "./ReferralError";
import SignupPrompt from "./SignupPrompt";
import ReferralContent from "./ReferralContent";
import { useReferralData } from "@/hooks/useReferralData";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReferralDashboardProps {
  email: string;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("token");
  const [isVerifying, setIsVerifying] = useState(false);
  const { referrer, isLoading, error, stats, refetch } = useReferralData(email);
  
  // Ensure proper URL construction
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL 
    ? import.meta.env.VITE_WEBSITE_URL.replace(/\/$/, '') // Remove trailing slash if present
    : window.location.origin;

  const handleShare = (platform: string) => {
    const referralLink = `${websiteUrl}/referral?ref=${referrer?.referral_code}`;
    
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me in learning crypto trading!')}`, '_blank');
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this crypto trading course: ${referralLink}`)}`, '_blank');
        break;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!verificationToken || !email || isVerifying) return;

      setIsVerifying(true);
      try {
        const { data: referrerData, error: fetchError } = await supabase
          .from("referrers")
          .select("*")
          .eq("user_email", email)
          .eq("verification_token", verificationToken)
          .single();

        if (fetchError || !referrerData) {
          toast.error("Invalid verification link");
          return;
        }

        const now = new Date();
        const tokenExpiry = new Date(referrerData.token_expiry);
        
        if (now > tokenExpiry) {
          toast.error("This verification link has expired. Please request a new one.");
          return;
        }

        const { error: updateError } = await supabase
          .from("referrers")
          .update({
            is_verified: true,
            verification_token: null,
            verification_status: 'verified',
            last_login_at: new Date().toISOString()
          })
          .eq("user_email", email);

        if (updateError) {
          toast.error("Failed to verify your account. Please try again.");
          return;
        }

        toast.success("Email verified successfully! Welcome to our referral program.");
        await refetch();
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Failed to verify email. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [verificationToken, email, refetch, isVerifying]);

  if (isLoading || isVerifying) {
    return <ReferralLoading />;
  }

  if (!referrer || error?.includes("No referral account found")) {
    return <SignupPrompt />;
  }

  if (error) {
    return <ReferralError message={error} />;
  }

  const referralLink = `${websiteUrl}/referral?ref=${referrer.referral_code}`;

  return (
    <div className="space-y-6">
      <ReferralContent 
        referralLink={referralLink}
        onShare={handleShare}
        stats={stats}
      />
    </div>
  );
};

export default ReferralDashboard;