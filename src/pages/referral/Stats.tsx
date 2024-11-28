import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReferralStats {
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  recentClicks: any[];
  recentConversions: any[];
}

const ReferralStats = () => {
  const [stats, setStats] = useState<ReferralStats>({
    totalClicks: 0,
    totalConversions: 0,
    totalEarnings: 0,
    recentClicks: [],
    recentConversions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: referrer } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", session.user.email)
        .single();

      if (!referrer) {
        navigate("/referral");
        return;
      }

      const [
        { count: clickCount },
        { data: conversions },
        { data: recentClicks },
      ] = await Promise.all([
        supabase
          .from("referral_clicks")
          .select("*", { count: "exact" })
          .eq("referral_code", referrer.referral_code),
        supabase
          .from("referral_conversions")
          .select("*")
          .eq("referral_code", referrer.referral_code),
        supabase
          .from("referral_clicks")
          .select("*")
          .eq("referral_code", referrer.referral_code)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        totalClicks: clickCount || 0,
        totalConversions: conversions?.length || 0,
        totalEarnings: referrer.total_earnings || 0,
        recentClicks: recentClicks || [],
        recentConversions: conversions?.slice(0, 5) || [],
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching referral stats:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Referral Statistics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalClicks}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalConversions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">CHF {stats.totalEarnings.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Page</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentClicks.map((click, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(click.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{click.page_url}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentConversions.map((conversion, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(conversion.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        CHF {conversion.commission_amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {conversion.paid ? "Paid" : "Pending"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralStats;