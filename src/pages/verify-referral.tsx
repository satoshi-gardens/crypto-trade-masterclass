import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";

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

        // Update referrer as verified
        await supabase
          .from("referrers")
          .update({
            is_verified: true,
            verification_token: null,
          })
          .eq("id", referrer.id);

        toast.success("Email verified successfully!");
        // Store email in localStorage for dashboard access
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
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </div>
          ) : null}
        </div>
      </div>
    </PageLayout>
  );
};

export default VerifyReferral;