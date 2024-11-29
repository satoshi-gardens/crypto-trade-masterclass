import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ReferralStats {
  clicks: number;
  registrations: number;
  purchases: number;
  pendingRewards: number;
  tokenBalance: number;
}

export const useReferralData = (email: string) => {
  const [referrer, setReferrer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats>({
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
        setError("No referral account found. Please complete the registration process.");
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
            setError("No referral account found. Please complete the registration process.");
          } else {
            throw referrerError;
          }
          return;
        }

        if (referrerData) {
          setReferrer(referrerData);

          const { count: clickCount } = await supabase
            .from("referral_clicks")
            .select("*", { count: "exact" })
            .eq("referral_code", referrerData.referral_code);

          let benefits = {
            tokens: 0,
            extra_courses: false,
            course_discount: 0
          };

          if (referrerData.referral_benefits) {
            const parsedBenefits = typeof referrerData.referral_benefits === 'string' 
              ? JSON.parse(referrerData.referral_benefits)
              : referrerData.referral_benefits;

            benefits = {
              tokens: Number(parsedBenefits.tokens) || 0,
              extra_courses: Boolean(parsedBenefits.extra_courses) || false,
              course_discount: Number(parsedBenefits.course_discount) || 0
            };
          }

          setStats({
            clicks: clickCount || 0,
            registrations: 0,
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

  return { referrer, isLoading, error, stats };
};