import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Users, DollarSign, Coins } from "lucide-react";

interface StatsProps {
  stats: {
    clicks: number;
    registrations: number;
    purchases: number;
    pendingRewards: number;
    tokenBalance: number;
  };
}

const ReferralStats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Link className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-2xl font-bold">{stats.clicks}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-2xl font-bold">{stats.registrations}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Successful Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-2xl font-bold">{stats.purchases}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-2xl font-bold">
              ${stats.pendingRewards.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Coins className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {stats.tokenBalance}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralStats;