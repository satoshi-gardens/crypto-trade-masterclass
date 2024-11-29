import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import ReferralForm from "./ReferralForm";
import BenefitsList from "./BenefitsList";

interface ReferralRegistrationProps {
  onEmailSet: (email: string) => void;
}

const ReferralRegistration = ({ onEmailSet }: ReferralRegistrationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commissionPercentage, setCommissionPercentage] = useState(10);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    const fetchCommissionRules = async () => {
      const { data: commissionRules } = await supabase
        .from("referral_commission_rules")
        .select("commission_percentage")
        .eq("payment_type", "standard")
        .single();

      if (commissionRules) {
        setCommissionPercentage(commissionRules.commission_percentage);
      }
    };

    fetchCommissionRules();
  }, []);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);

    try {
      // First check if the user already exists
      const { data: existingReferrer, error: checkError } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      const verificationToken = Math.random().toString(36).substring(2, 15) + 
                              Math.random().toString(36).substring(2, 15);
      
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 48);

      if (existingReferrer) {
        const { error: updateError } = await supabase
          .from("referrers")
          .update({ 
            verification_token: verificationToken,
            token_expiry: tokenExpiry.toISOString()
          })
          .eq("user_email", email);

        if (updateError) throw updateError;

        await supabase.functions.invoke("send-referral-verification", {
          body: { 
            email,
            verificationToken,
            isExisting: true,
            from: "ct4p@bit2big.com",
            commissionPercentage
          },
        });

        toast({
          title: "Access Link Sent!",
          description: "Check your email for a secure link to access your referral dashboard. The link is valid for 48 hours.",
        });
      } else {
        // Include an empty referral_code that will be replaced by the trigger
        const { error: insertError } = await supabase
          .from("referrers")
          .insert({
            user_email: email,
            verification_token: verificationToken,
            token_expiry: tokenExpiry.toISOString(),
            is_verified: false,
            verification_status: 'pending',
            referred_by: referralCode,
            referral_code: '',
            referral_benefits: {
              tokens: 0,
              extra_courses: false,
              course_discount: 10
            }
          });

        if (insertError) throw insertError;

        await supabase.functions.invoke("send-referral-verification", {
          body: { 
            email,
            verificationToken,
            isExisting: false,
            from: "ct4p@bit2big.com",
            commissionPercentage
          },
        });

        toast({
          title: "Welcome to Our Referral Program!",
          description: "Please check your email to verify your account. The verification link is valid for 48 hours.",
        });
      }
      
      onEmailSet(email);
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error",
        description: "We couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Join Our Referral Program</CardTitle>
          </CardHeader>
          <CardContent>
            <ReferralForm 
              onSubmit={handleSubmit}
              isLoading={isLoading}
              referralCode={referralCode}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Program Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <BenefitsList commissionPercentage={commissionPercentage} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralRegistration;