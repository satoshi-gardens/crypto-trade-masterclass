import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Gift, Coins, Users, Trophy } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface ReferralRegistrationProps {
  onEmailSet: (email: string) => void;
}

const ReferralRegistration = ({ onEmailSet }: ReferralRegistrationProps) => {
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: existingReferrer } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .single();

      const verificationToken = Math.random().toString(36).substring(2, 15) + 
                              Math.random().toString(36).substring(2, 15);
      
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 48);

      if (existingReferrer) {
        await supabase
          .from("referrers")
          .update({ 
            verification_token: verificationToken,
            token_expiry: tokenExpiry.toISOString()
          })
          .eq("user_email", email);

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
        await supabase
          .from("referrers")
          .insert({
            user_email: email,
            verification_token: verificationToken,
            token_expiry: tokenExpiry.toISOString(),
            is_verified: false,
            verification_status: 'pending',
            referred_by: referralCode,
            referral_code: ''
          });

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                {referralCode ? (
                  <Alert className="bg-primary/10">
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                      You've been referred! After joining, you'll be able to refer others and earn rewards too.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                      Enter your email to join our referral program or access your existing dashboard. 
                      You'll receive a secure link valid for 48 hours.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Processing..." : "Get Started"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Program Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Coins className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Earn Commission</h4>
                  <p className="text-sm text-gray-600">Receive up to {commissionPercentage}% commission for each successful referral</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Gift className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Reward Tokens</h4>
                  <p className="text-sm text-gray-600">Get 100 tokens for every 5 successful referrals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Help Others Succeed</h4>
                  <p className="text-sm text-gray-600">Your referrals get a {commissionPercentage}% discount on their first course</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Trophy className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Exclusive Access</h4>
                  <p className="text-sm text-gray-600">Unlock additional courses and special benefits as you refer more people</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralRegistration;