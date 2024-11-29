import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReferralHeader from "./ReferralHeader";
import ReferralStats from "./ReferralStats";
import ReferralTabs from "./ReferralTabs";
import { useToast } from "@/components/ui/use-toast";

interface ReferralDashboardProps {
  email: string;
}

interface ReferralBenefits {
  tokens: number;
  extra_courses: boolean;
  course_discount: number;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const [referralCode, setReferralCode] = useState("");
  const [stats, setStats] = useState({
    clicks: 0,
    registrations: 0,
    purchases: 0,
    pendingRewards: 0,
    tokenBalance: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const { data: referrer } = await supabase
          .from("referrers")
          .select("*")
          .eq("user_email", email)
          .single();

        if (referrer) {
          setReferralCode(referrer.referral_code);

          // Fetch click stats
          const { count } = await supabase
            .from("referral_clicks")
            .select("*", { count: "exact" })
            .eq("referral_code", referrer.referral_code);

          const benefits = referrer.referral_benefits as ReferralBenefits;

          setStats({
            clicks: count || 0,
            registrations: 0, // You can add these queries later
            purchases: 0,
            pendingRewards: 0,
            tokenBalance: benefits?.tokens || 0
          });
        }
      } catch (error) {
        console.error("Error fetching referral data:", error);
        toast({
          title: "Error",
          description: "Could not load your referral data. Please try again later.",
          variant: "destructive",
        });
      }
    };

    if (email) {
      fetchReferralData();
    }
  }, [email, toast]);

  const handleShare = async (platform: string) => {
    const referralLink = `${window.location.origin}/referral?ref=${referralCode}`;
    
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join me on KY Connect!")}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Join me on KY Connect! ${referralLink}`)}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  if (!referralCode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ReferralHeader
        referralLink={`${window.location.origin}/referral?ref=${referralCode}`}
        onShare={handleShare}
      />
      <ReferralStats stats={stats} />
      <ReferralTabs stats={stats} />
    </div>
  );
};

export default ReferralDashboard;