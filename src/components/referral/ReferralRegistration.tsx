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
      console.log("Starting registration process for email:", email);
      
      // Check if user already exists
      const { data: existingReferrer, error: fetchError } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error fetching existing referrer:", fetchError);
        throw new Error(fetchError.message);
      }

      let verificationToken;
      
      if (existingReferrer) {
        console.log("Existing referrer found, using existing verification token");
        verificationToken = existingReferrer.verification_token;
        
        if (!verificationToken) {
          // Generate new token if none exists
          verificationToken = crypto.randomUUID();
          const { error: updateError } = await supabase
            .from("referrers")
            .update({ verification_token: verificationToken })
            .eq("user_email", email);

          if (updateError) {
            console.error("Error updating verification token:", updateError);
            throw updateError;
          }
        }
      } else {
        console.log("Creating new referrer");
        // Generate new referral code and verification token
        const referralCode = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        verificationToken = crypto.randomUUID();

        console.log("Generated verification token:", verificationToken);

        const { error: dbError } = await supabase
          .from("referrers")
          .insert([
            {
              user_email: email,
              referral_code: referralCode,
              verification_token: verificationToken,
              is_verified: false
            },
          ]);

        if (dbError) {
          console.error("Error inserting new referrer:", dbError);
          throw dbError;
        }
      }

      console.log("Sending verification email with token:", verificationToken);
      // Send verification email
      const { error: emailError } = await supabase.functions.invoke("send-referral-verification", {
        body: { 
          email, 
          verificationToken 
        },
      });

      if (emailError) {
        console.error("Error sending verification email:", emailError);
        throw emailError;
      }

      toast({
        title: existingReferrer ? "Email Sent!" : "Registration successful!",
        description: "Please check your email to verify your account.",
      });
      
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
                  disabled={isLoading}
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