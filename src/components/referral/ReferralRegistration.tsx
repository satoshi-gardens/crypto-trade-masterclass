import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ReferralRegistration = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateReferralCode = (email: string) => {
    const prefix = email.split("@")[0].slice(0, 5).toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${randomString}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const referralCode = generateReferralCode(email);
      
      const { error } = await supabase
        .from("referrers")
        .insert([{ user_email: email, referral_code: referralCode }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been registered as a referrer. Check your email for your referral link.",
      });

      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Join Referral Program"}
      </Button>
    </form>
  );
};