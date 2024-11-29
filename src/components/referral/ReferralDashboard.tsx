import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReferralStats from "./ReferralStats";
import { useToast } from "@/hooks/use-toast";

interface ReferralDashboardProps {
  email: string;
}

interface ReferralBenefits {
  tokens: number;
  extra_courses: boolean;
  course_discount: number;
}

interface Stats {
  clicks: number;
  registrations: number;
  purchases: number;
  pendingRewards: number;
  tokenBalance: number;
}

const ReferralDashboard = ({ email }: ReferralDashboardProps) => {
  const [referrer, setReferrer] = useState<any>(null);
  const [stats, setStats] = useState<Stats>({
    clicks: 0,
    registrations: 0,
    purchases: 0,
    pendingRewards: 0,
    tokenBalance: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchReferrerData = async () => {
      try {
        const { data: referrerData, error: referrerError } = await supabase
          .from("referrers")
          .select("*")
          .eq("user_email", email)
          .single();

        if (referrerError) throw referrerError;

        if (referrerData) {
          setReferrer(referrerData);

          // Get click count
          const { count, error: clicksError } = await supabase
            .from("referral_clicks")
            .select("*", { count: "exact" })
            .eq("referral_code", referrerData.referral_code);

          if (clicksError) throw clicksError;

          // Parse the JSON benefits data
          const benefits: ReferralBenefits = typeof referrerData.referral_benefits === 'string' 
            ? JSON.parse(referrerData.referral_benefits)
            : referrerData.referral_benefits as ReferralBenefits;

          setStats({
            clicks: count || 0,
            registrations: 0, // You can add these queries later
            purchases: 0,
            pendingRewards: 0,
            tokenBalance: benefits?.tokens || 0
          });
        }
      } catch (error) {
        console.error("Error fetching referrer data:", error);
        toast({
          title: "Error",
          description: "Failed to load referrer data. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (email) {
      fetchReferrerData();
    }
  }, [email, toast]);

  if (!referrer) {
    return (
      <div className="text-center py-8">
        <p>Loading referrer data...</p>
      </div>
    );
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