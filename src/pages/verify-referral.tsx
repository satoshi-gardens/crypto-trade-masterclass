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
        toast({
          title: "Error",
          description: "Invalid verification link",
          variant: "destructive",
        });
        navigate("/referral");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("referrers")
          .update({ is_verified: true, verification_token: null })
          .eq("verification_token", token)
          .select()
          .single();

        if (error) throw error;

        if (data) {
          toast({
            title: "Success!",
            description: "Your email has been verified. You can now start referring people!",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify email. Please try again.",
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