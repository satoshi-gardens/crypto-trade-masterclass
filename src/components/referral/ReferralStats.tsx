import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReferralStats {
  clicks: number;
  conversions: number;
  earnings: number;
}

export const ReferralStats = ({ referralCode }: { referralCode: string }) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["referralStats", referralCode],
    queryFn: async (): Promise<ReferralStats> => {
      const [clicksResponse, conversionsResponse, earningsResponse] = await Promise.all([
        supabase
          .from("referral_clicks")
          .select("*", { count: "exact" })
          .eq("referral_code", referralCode),
        supabase
          .from("referral_conversions")
          .select("*", { count: "exact" })
          .eq("referral_code", referralCode),
        supabase
          .from("referrers")
          .select("total_earnings")
          .eq("referral_code", referralCode)
          .single(),
      ]);

      return {
        clicks: clicksResponse.count || 0,
        conversions: conversionsResponse.count || 0,
        earnings: earningsResponse.data?.total_earnings || 0,
      };
    },
  });

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.clicks || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.conversions || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">CHF {stats?.earnings.toFixed(2) || "0.00"}</p>
        </CardContent>
      </Card>
    </div>
  );
};