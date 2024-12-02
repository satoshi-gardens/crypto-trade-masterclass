import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const VerifyReferral = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Invalid verification link");
        navigate("/referral");
        return;
      }

      try {
        console.log("Starting verification process for token:", token);
        
        // First, check if the token exists and is valid
        const { data: referrer, error: fetchError } = await supabase
          .from("referrers")
          .select("*")
          .eq("verification_token", token)
          .single();

        if (fetchError || !referrer) {
          console.error("Error fetching referrer:", fetchError);
          throw new Error("Invalid or expired verification token");
        }

        console.log("Found referrer:", referrer);

        // Check token expiry
        const now = new Date();
        const tokenExpiry = new Date(referrer.token_expiry);
        
        if (now > tokenExpiry) {
          console.error("Token expired:", { now, tokenExpiry });
          throw new Error("This verification link has expired. Please request a new one.");
        }

        // Update referrer status with all required fields
        const { data: updatedReferrer, error: updateError } = await supabase
          .from("referrers")
          .update({
            is_verified: true,
            verification_token: null,
            verification_status: 'verified',
            last_login_at: new Date().toISOString(),
            is_active: true
          })
          .eq("id", referrer.id)
          .select()
          .single();

        if (updateError) {
          console.error("Error updating referrer:", updateError);
          throw new Error("Failed to verify your account");
        }

        if (!updatedReferrer) {
          console.error("No referrer was updated");
          throw new Error("Failed to verify your account");
        }

        console.log("Successfully verified referrer:", updatedReferrer);
        
        // Store email in localStorage and show success message
        localStorage.setItem("referralEmail", referrer.user_email);
        toast.success("Email verified successfully! Welcome to our referral program.");
        
        // Small delay to ensure the toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/referral");
      } catch (error: any) {
        console.error("Verification error:", error);
        toast.error(error.message || "Failed to verify email. Please try again.");
        
        // Small delay to ensure the error toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/referral");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          {isVerifying ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Verifying your email...</h1>
              <p className="text-muted-foreground">Please wait while we verify your email address.</p>
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageLayout>
  );
};

export default VerifyReferral;