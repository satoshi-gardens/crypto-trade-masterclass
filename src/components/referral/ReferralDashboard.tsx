import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReferralHeader from "./ReferralHeader";
import ReferralStats from "./ReferralStats";
import ReferralTabs from "./ReferralTabs";

const ReferralDashboard = ({ email }: { email: string }) => {
  const [referralData, setReferralData] = useState<any>(null);
  const [stats, setStats] = useState({
    clicks: 0,
    registrations: 0,
    purchases: 0,
    pendingRewards: 0,
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
        .select("*")
        .eq("user_email", email)
        .single();

      if (error) throw error;
      setReferralData(data);
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

      setStats({
        clicks: clicks?.length || 0,
        registrations: conversions?.filter(c => c.course_application_id).length || 0,
        purchases: conversions?.filter(c => !c.paid).length || 0,
        pendingRewards: conversions?.reduce((acc, curr) => acc + Number(curr.commission_amount), 0) || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const shareOnSocial = (platform: string) => {
    const referralLink = `${window.location.origin}/referral?ref=${referralData.referral_code}`;
    const text = encodeURIComponent("Join me in learning crypto trading and earn rewards!");
    const url = encodeURIComponent(referralLink);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  if (!referralData) return null;

  const referralLink = `${window.location.origin}/referral?ref=${referralData.referral_code}`;

  return (
    <div className="space-y-6">
      <ReferralHeader referralLink={referralLink} onShare={shareOnSocial} />
      <ReferralStats stats={stats} />
      <ReferralTabs stats={stats} />
    </div>
  );
};

export default ReferralDashboard;