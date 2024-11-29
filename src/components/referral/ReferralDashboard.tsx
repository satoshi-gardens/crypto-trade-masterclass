import ReferralStats from "./ReferralStats";
import ReferralLoading from "./ReferralLoading";
import ReferralError from "./ReferralError";
import SignupPrompt from "./SignupPrompt";
import { useReferralData } from "@/hooks/useReferralData";

interface ReferralDashboardProps {
  email: string;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const { referrer, isLoading, error, stats } = useReferralData(email);

  if (isLoading) {
    return <ReferralLoading />;
  }

  if (error?.includes("No referral account found")) {
    return <SignupPrompt />;
  }

  if (error) {
    return <ReferralError message={error} />;
  }

  if (!referrer) {
    return <SignupPrompt />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Referral Dashboard</h2>
        <div className="mb-4">
          <p className="text-gray-600">Your Referral Code:</p>
          <p className="text-xl font-semibold">{referrer.referral_code}</p>
        </div>
        <ReferralStats stats={stats} />
      </div>
    </div>
  );
};

export default ReferralDashboard;