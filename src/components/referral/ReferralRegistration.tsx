import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ReferralRegistrationProps {
  onEmailSet: (email: string) => void;
}

const ReferralRegistration = ({ onEmailSet }: ReferralRegistrationProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user already exists
      const { data: existingReferrer, error: fetchError } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .single();

      const verificationToken = Math.random().toString(36).substring(2, 15) + 
                              Math.random().toString(36).substring(2, 15);
      
      // Set token expiry to 48 hours from now
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 48);

      if (existingReferrer) {
        // Update verification token for existing referrer
        const { error: updateError } = await supabase
          .from("referrers")
          .update({ 
            verification_token: verificationToken,
            token_expiry: tokenExpiry.toISOString()
          })
          .eq("user_email", email);

        if (updateError) throw new Error("Failed to update verification token");

        // Send existing user email
        const { error: emailError } = await supabase.functions.invoke("send-referral-verification", {
          body: { 
            email,
            verificationToken,
            isExisting: true,
            from: "ct4p@bit2big.com"
          },
        });

        if (emailError) throw new Error("Failed to send access email");

        toast({
          title: "Email Sent!",
          description: "We've sent you a link to access your referral dashboard.",
        });
      } else {
        // Generate new referral code for new user
        const referralCode = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        const { error: dbError } = await supabase
          .from("referrers")
          .insert([
            {
              user_email: email,
              referral_code: referralCode,
              verification_token: verificationToken,
              token_expiry: tokenExpiry.toISOString(),
            },
          ]);

        if (dbError) throw new Error("Failed to create referrer record");

        // Send new user verification email
        const { error: emailError } = await supabase.functions.invoke("send-referral-verification", {
          body: { 
            email,
            verificationToken,
            isExisting: false,
            from: "ct4p@bit2big.com"
          },
        });

        if (emailError) throw new Error("Failed to send verification email");

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });
      }
      
      onEmailSet(email);
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
    <div className="max-w-md mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Join Our Referral Program</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Enter your email to join our referral program or access your dashboard.
                </AlertDescription>
              </Alert>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Processing..." : "Register / Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralRegistration;