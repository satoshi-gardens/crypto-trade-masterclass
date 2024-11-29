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
        const { data: referrer, error } = await supabase
          .from("referrers")
          .select("*")
          .eq("verification_token", token)
          .single();

        if (error || !referrer) {
          throw new Error("Invalid or expired verification token");
        }

        const now = new Date();
        const tokenExpiry = new Date(referrer.token_expiry);
        
        if (now > tokenExpiry) {
          toast.error("This verification link has expired. Please request a new one.");
          navigate("/referral");
          return;
        }

        // Update referrer status
        await supabase
          .from("referrers")
          .update({
            is_verified: true,
            verification_token: null,
            verification_status: 'verified',
            last_login_at: new Date().toISOString()
          })
          .eq("id", referrer.id);

        toast.success("Email verified successfully! Welcome to our referral program.");
        localStorage.setItem("referralEmail", referrer.user_email);
        navigate("/referral");
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Failed to verify email. Please try again.");
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