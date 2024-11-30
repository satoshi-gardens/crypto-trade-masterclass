import ReferralHeader from "./ReferralHeader";
import ReferralStats from "./ReferralStats";

interface ReferralContentProps {
  referralLink: string;
  onShare: (platform: string) => void;
  stats: {
    clicks: number;
    registrations: number;
    purchases: number;
    pendingRewards: number;
    tokenBalance: number;
  };
}

const ReferralContent = ({ referralLink, onShare, stats }: ReferralContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Referral Dashboard</h2>
      <ReferralHeader referralLink={referralLink} onShare={onShare} />
      <div className="mt-6">
        <ReferralStats stats={stats} />
      </div>
    </div>
  );
};

export default ReferralContent;