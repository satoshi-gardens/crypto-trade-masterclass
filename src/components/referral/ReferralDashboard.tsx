import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReferralStats from "./ReferralStats";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      if (!email) {
        setError("No email provided. Please complete the registration process.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data: referrerData, error: referrerError } = await supabase
          .from("referrers")
          .select("*")
          .eq("user_email", email)
          .single();

        if (referrerError) {
          if (referrerError.code === 'PGRST116') {
            setError("No referral account found for this email. Please complete the registration process.");
          } else {
            throw referrerError;
          }
          return;
        }

        if (referrerData) {
          setReferrer(referrerData);

          // Get click count
          const { count: clickCount, error: clicksError } = await supabase
            .from("referral_clicks")
            .select("*", { count: "exact" })
            .eq("referral_code", referrerData.referral_code);

          if (clicksError) throw clicksError;

          // Parse and validate the benefits data
          let benefits: ReferralBenefits = {
            tokens: 0,
            extra_courses: false,
            course_discount: 0
          };

          if (referrerData.referral_benefits) {
            const parsedBenefits = typeof referrerData.referral_benefits === 'string' 
              ? JSON.parse(referrerData.referral_benefits)
              : referrerData.referral_benefits;

            if (typeof parsedBenefits === 'object' && parsedBenefits !== null) {
              benefits = {
                tokens: Number(parsedBenefits.tokens) || 0,
                extra_courses: Boolean(parsedBenefits.extra_courses) || false,
                course_discount: Number(parsedBenefits.course_discount) || 0
              };
            }
          }

          setStats({
            clicks: clickCount || 0,
            registrations: 0, // You can add these queries later
            purchases: 0,
            pendingRewards: 0,
            tokenBalance: benefits.tokens
          });
        }
      } catch (error: any) {
        console.error("Error fetching referrer data:", error);
        setError("Failed to load referrer data. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load referrer data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrerData();
  }, [email, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Loading referrer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!referrer) {
    return (
      <Alert className="max-w-2xl mx-auto my-8">
        <AlertDescription>
          No referral account found. Please complete the registration process to access your dashboard.
        </AlertDescription>
      </Alert>
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