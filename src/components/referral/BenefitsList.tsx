import { Coins, Gift, Users2, GiftIcon } from "lucide-react";

interface BenefitsListProps {
  commissionPercentage: number;
}

const BenefitsList = ({ commissionPercentage }: BenefitsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Gift className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold">10% Welcome Discount</h3>
          <p className="text-gray-600 text-sm">
            Special discount on their first course enrollment
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <GiftIcon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold">Bonus Module Access</h3>
          <p className="text-gray-600 text-sm">
            Choose one additional specialized module: AI in Trading, Advanced DeFi Protocols, or Risk Management
          </p>
          <p className="text-sm text-purple-600 mt-1">Value: CHF 500</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsList;