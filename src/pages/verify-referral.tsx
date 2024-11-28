import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VerifyReferral = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        console.error("No token provided in URL");
        toast({
          title: "Error",
          description: "Invalid verification link",
          variant: "destructive",
        });
        navigate("/referral");
        return;
      }

      try {
        // Check if the token exists and is valid
        const { data: referrer, error: fetchError } = await supabase
          .from("referrers")
          .select("*")
          .eq("verification_token", token)
          .single();

        if (fetchError || !referrer) {
          console.error("Error fetching referrer:", fetchError);
          throw new Error("Invalid verification token");
        }

        // Check if token has expired
        if (referrer.token_expiry && new Date(referrer.token_expiry) < new Date()) {
          throw new Error("Verification link has expired. Please request a new one.");
        }

        // Update the referrer record
        const { error: updateError } = await supabase
          .from("referrers")
          .update({ 
            is_verified: true,
            verification_token: null,
            token_expiry: null
          })
          .eq("verification_token", token);

        if (updateError) {
          console.error("Error updating referrer:", updateError);
          throw updateError;
        }

        console.log("Successfully verified referrer:", referrer.user_email);
        
        toast({
          title: "Success!",
          description: "Your email has been verified. You can now start referring people!",
        });

        // Store the email in localStorage for automatic login
        localStorage.setItem("referralEmail", referrer.user_email);
      } catch (error: any) {
        console.error("Verification error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to verify email. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
        navigate("/referral");
      }
    };

    verifyToken();
  }, [searchParams, toast, navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Verifying Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <p>Please wait while we verify your email...</p>
            ) : (
              <p>Redirecting you to the referral program page...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VerifyReferral;