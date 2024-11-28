import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const VerifyReferral = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        setError("Invalid verification link. No token provided.");
        setIsVerifying(false);
        return;
      }

      try {
        console.log("Verifying token:", token);
        const { data, error: verificationError } = await supabase
          .from("referrers")
          .update({ is_verified: true, verification_token: null })
          .eq("verification_token", token)
          .select()
          .single();

        if (verificationError) {
          console.error("Verification error:", verificationError);
          throw verificationError;
        }

        if (data) {
          toast({
            title: "Success!",
            description: "Your email has been verified. You can now start referring people!",
          });
          setTimeout(() => navigate("/referral"), 2000);
        } else {
          throw new Error("No referrer found with this verification token.");
        }
      } catch (error: any) {
        console.error("Error during verification:", error);
        setError(error.message || "Failed to verify email. Please try again.");
        toast({
          title: "Error",
          description: error.message || "Failed to verify email. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [searchParams, toast, navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Verifying your email...</p>
              </div>
            ) : error ? (
              <div className="text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              <div className="text-green-500">
                <p>Verification successful! Redirecting to referral program...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VerifyReferral;