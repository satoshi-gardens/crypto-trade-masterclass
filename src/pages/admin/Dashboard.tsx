import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReferrersList from "@/components/admin/ReferrersList";
import ActivityLogs from "@/components/admin/ActivityLogs";
import PayoutManagement from "@/components/admin/PayoutManagement";
import FraudMonitoring from "@/components/admin/FraudMonitoring";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data: adminCheck } = await supabase
        .from("admin_users")
        .select("email")
        .single();

      if (!adminCheck) {
        throw new Error("Unauthorized");
      }

      const [
        { count: referrersCount },
        { count: clicksCount },
        { count: conversionsCount },
        { data: payoutSum },
      ] = await Promise.all([
        supabase.from("referrers").select("*", { count: "exact", head: true }),
        supabase.from("referral_clicks").select("*", { count: "exact", head: true }),
        supabase.from("referral_conversions").select("*", { count: "exact", head: true }),
        supabase.from("payout_records").select("amount").eq("status", "completed"),
      ]);

      const totalPayout = payoutSum?.reduce((sum, record) => sum + Number(record.amount), 0) || 0;

      return {
        totalReferrers: referrersCount || 0,
        totalClicks: clicksCount || 0,
        totalConversions: conversionsCount || 0,
        totalPayout,
      };
    },
    retry: false,
    onError: (error) => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/");
    },
  });

  if (statsLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalReferrers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalClicks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalConversions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.totalPayout.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="referrers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Monitoring</TabsTrigger>
        </TabsList>
        <TabsContent value="referrers">
          <ReferrersList />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityLogs />
        </TabsContent>
        <TabsContent value="payouts">
          <PayoutManagement />
        </TabsContent>
        <TabsContent value="fraud">
          <FraudMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;