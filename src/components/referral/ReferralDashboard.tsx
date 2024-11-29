import ReferralStats from "./ReferralStats";
import ReferralLoading from "./ReferralLoading";
import ReferralError from "./ReferralError";
import ReferralHeader from "./ReferralHeader";
import SignupPrompt from "./SignupPrompt";
import { useReferralData } from "@/hooks/useReferralData";

interface ReferralDashboardProps {
  email: string;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const { referrer, isLoading, error, stats } = useReferralData(email);

  const handleShare = (platform: string) => {
    const referralLink = `${window.location.origin}/referral?ref=${referrer?.referral_code}`;
    
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
    return <ReferralError message={error} />;
  }

  const referralLink = `${window.location.origin}/referral?ref=${referrer.referral_code}`;

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