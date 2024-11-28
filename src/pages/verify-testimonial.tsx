import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const VerifyTestimonial = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const verifyTestimonial = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          throw new Error("Invalid verification token");
        }

        const { error } = await supabase
          .from("testimonials")
          .update({ is_verified: true })
          .eq("verification_token", token);

        if (error) throw error;

        setIsSuccess(true);
        toast({
          title: "Testimonial verified!",
          description: "Your testimonial has been published successfully.",
        });
      } catch (error) {
        console.error("Error verifying testimonial:", error);
        toast({
          title: "Verification failed",
          description:
            "Failed to verify your testimonial. Please try again or contact support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyTestimonial();
  }, [searchParams, toast]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          {isVerifying ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Verifying your testimonial...</h1>
              <p>Please wait while we verify your testimonial.</p>
            </div>
          ) : isSuccess ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Testimonial Verified!</h1>
              <p>
                Thank you for verifying your testimonial. It has been published
                successfully.
              </p>
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Verification Failed</h1>
              <p>
                We couldn't verify your testimonial. Please try again or contact
                support.
              </p>
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default VerifyTestimonial;