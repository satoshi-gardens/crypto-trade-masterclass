import ReferralStats from "./ReferralStats";
import ReferralLoading from "./ReferralLoading";
import ReferralError from "./ReferralError";
import ReferralHeader from "./ReferralHeader";
import SignupPrompt from "./SignupPrompt";
import { useReferralData } from "@/hooks/useReferralData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface ReferralDashboardProps {
  email: string;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("token");
  const { referrer, isLoading, error, stats, refetch } = useReferralData(email);
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || window.location.origin;

  useEffect(() => {
    const verifyToken = async () => {
      if (!verificationToken || !email) return;

      try {
        // First, check if the token matches and is not expired
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

        // Update referrer status
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
        refetch(); // Refresh the referrer data
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Failed to verify email. Please try again.");
      }
    };

    verifyToken();
  }, [verificationToken, email, refetch]);

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

  if (isLoading) {
    return <ReferralLoading />;
  }

  if (!referrer || error?.includes("No referral account found")) {
    return <SignupPrompt />;
  }

  if (error) {
    if (error.includes("verification token expired")) {
      return (
        <Alert className="bg-primary/10">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription className="space-y-3">
            <p className="text-lg font-medium">Verification Link Expired</p>
            <p>Your verification link has expired. Please request a new verification email.</p>
            <p className="text-sm text-muted-foreground">
              You can{" "}
              <Link to="/referral" className="text-primary hover:underline">
                request a new verification email
              </Link>
              .
            </p>
          </AlertDescription>
        </Alert>
      );
    }

    if (error.includes("invalid verification token")) {
      return (
        <Alert className="bg-primary/10">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription className="space-y-3">
            <p className="text-lg font-medium">Invalid Verification Link</p>
            <p>The verification link you used is invalid. Please request a new verification email.</p>
            <p className="text-sm text-muted-foreground">
              You can{" "}
              <Link to="/referral" className="text-primary hover:underline">
                request a new verification email
              </Link>
              .
            </p>
          </AlertDescription>
        </Alert>
      );
    }

    return <ReferralError message={error} />;
  }

  // Check if the referrer is verified
  if (!referrer.is_verified) {
    if (referrer.verification_status === 'pending') {
      return (
        <Alert className="bg-primary/10">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription className="space-y-3">
            <p className="text-lg font-medium">Email Verification Required</p>
            <p>Please check your email and click the verification link to access your referral dashboard.</p>
            <p className="text-sm text-muted-foreground">
              If you haven't received the verification email, you can{" "}
              <Link to="/referral" className="text-primary hover:underline">
                sign up again
              </Link>
              .
            </p>
          </AlertDescription>
        </Alert>
      );
    }

    if (referrer.verification_status === 'failed') {
      return (
        <Alert className="bg-primary/10">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription className="space-y-3">
            <p className="text-lg font-medium">Verification Failed</p>
            <p>There was a problem verifying your email. Please try again.</p>
            <p className="text-sm text-muted-foreground">
              You can{" "}
              <Link to="/referral" className="text-primary hover:underline">
                request a new verification email
              </Link>
              .
            </p>
          </AlertDescription>
        </Alert>
      );
    }
  }

  const referralLink = `${websiteUrl}/referral?ref=${referrer.referral_code}`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Referral Dashboard</h2>
        <ReferralHeader referralLink={referralLink} onShare={handleShare} />
        <div className="mt-6">
          <ReferralStats stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;