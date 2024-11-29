import { Coins, Gift, Users, Trophy } from "lucide-react";

interface BenefitsListProps {
  commissionPercentage: number;
}

const BenefitsList = ({ commissionPercentage }: BenefitsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3">
        <Coins className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Earn Commission</h4>
          <p className="text-sm text-gray-600">
            Receive up to {commissionPercentage}% commission for each successful referral
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Gift className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Reward Tokens</h4>
          <p className="text-sm text-gray-600">Get 100 tokens for every 5 successful referrals</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Users className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Help Others Succeed</h4>
          <p className="text-sm text-gray-600">
            Your referrals get a {commissionPercentage}% discount on their first course
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Trophy className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Exclusive Access</h4>
          <p className="text-sm text-gray-600">
            Unlock additional courses and special benefits as you refer more people
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsList;