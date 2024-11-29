import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReferralHeader from "./ReferralHeader";
import ReferralStats from "./ReferralStats";
import ReferralTabs from "./ReferralTabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

const ReferralDashboard = ({ email }: { email: string }) => {
  const [referralData, setReferralData] = useState<any>(null);
  const [stats, setStats] = useState({
    clicks: 0,
    registrations: 0,
    purchases: 0,
    pendingRewards: 0,
    tokenBalance: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralData();
    fetchReferralStats();
  }, [email]);

  const fetchReferralData = async () => {
    try {
      const { data, error } = await supabase
        .from("referrers")
        .select("*, referral_conversions(*)")
        .eq("user_email", email)
        .single();

      if (error) throw error;
      setReferralData(data);

      // Check for suspicious activity
      if (data.suspicious_activity) {
        toast({
          title: "Account Review",
          description: "Your account is under review. Some features may be temporarily restricted.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Unable to load your referral information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchReferralStats = async () => {
    try {
      const { data: clicks } = await supabase
        .from("referral_clicks")
        .select("*", { count: "exact" })
        .eq("referral_code", referralData?.referral_code);

      const { data: conversions } = await supabase
        .from("referral_conversions")
        .select("*")
        .eq("referral_code", referralData?.referral_code);

      const validConversions = conversions?.filter(c => !c.suspicious_activity) || [];
      const tokenBalance = validConversions.length * (referralData?.tokens_per_referral || 0);

      setStats({
        clicks: clicks?.length || 0,
        registrations: validConversions.filter(c => c.course_application_id).length || 0,
        purchases: validConversions.filter(c => !c.paid).length || 0,
        pendingRewards: validConversions.reduce((acc, curr) => acc + Number(curr.commission_amount), 0) || 0,
        tokenBalance
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      {referralData.suspicious_activity && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your account is under review due to suspicious activity. Please contact support for more information.
          </AlertDescription>
        </Alert>
      )}
      
      {!referralData.reward_eligible && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Complete at least one course purchase to unlock full referral benefits.
          </AlertDescription>
        </Alert>
      )}

      <ReferralHeader 
        referralLink={`${window.location.origin}/referral?ref=${referralData.referral_code}`}
        isEligible={referralData.reward_eligible}
      />
      <ReferralStats stats={stats} />
      <ReferralTabs stats={stats} />
    </div>
  );
};

export default ReferralDashboard;