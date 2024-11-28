import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const ReferralRegistration = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user already exists
      const { data: existingReferrer } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .single();

      if (existingReferrer) {
        // Send verification email with existing referral code
        const { error: emailError } = await supabase.functions.invoke("send-referral-verification", {
          body: { 
            email, 
            verificationToken: existingReferrer.verification_token 
          },
        });

        if (emailError) throw new Error(emailError.message);

        toast({
          title: "Email Sent!",
          description: "We've resent your verification email. Please check your inbox.",
        });
      } else {
        // Generate new referral code for new user
        const referralCode = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const verificationToken = Math.random().toString(36).substring(2, 15) + 
                                Math.random().toString(36).substring(2, 15);

        const { error: dbError } = await supabase
          .from("referrers")
          .insert([
            {
              user_email: email,
              referral_code: referralCode,
              verification_token: verificationToken,
            },
          ]);

        if (dbError) throw dbError;

        // Send verification email
        const { error: emailError } = await supabase.functions.invoke("send-referral-verification", {
          body: { email, verificationToken },
        });

        if (emailError) throw new Error(emailError.message);

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });
      }
      
      setEmail("");
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <Card className="bg-primary/5 border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Referral Program Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Get 10% off your course fee when you refer a friend who enrolls!
                </AlertDescription>
              </Alert>
              <div className="grid gap-2">
                <h3 className="font-semibold">🎓 Course Benefits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>10% discount on course fees for both you and your referral</li>
                  <li>Unlock exclusive extra courses after 3 successful referrals</li>
                  <li>Earn tokens for each successful referral (after reaching 5 referrals)</li>
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold">💰 Commission Structure</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>One-time payment: 15% commission paid immediately</li>
                  <li>Installment plans: 10% commission paid monthly</li>
                  <li>Minimum payout threshold: 100 CHF</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join Our Referral Program</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Processing..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralRegistration;
