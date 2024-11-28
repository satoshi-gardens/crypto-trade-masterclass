import PageLayout from "@/components/PageLayout";
import { ReferralRegistration } from "@/components/referral/ReferralRegistration";
import { ReferralStats } from "@/components/referral/ReferralStats";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ReferralProgram = () => {
  const [userEmail, setUserEmail] = useState("");
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || window.location.origin;

  const { data: referrer } = useQuery({
    queryKey: ["referrer", userEmail],
    queryFn: async () => {
      if (!userEmail) return null;
      const { data } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", userEmail)
        .single();
      return data;
    },
    enabled: !!userEmail,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Referral Program</h1>
        
        <div className="max-w-2xl mx-auto space-y-12">
          {!referrer ? (
            <>
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">Join Our Referral Program</h2>
                <p className="text-gray-600 mb-6">
                  Earn commissions by referring students to our courses. Register below to get your unique referral code.
                </p>
              </div>
              <ReferralRegistration onSuccess={(email) => setUserEmail(email)} />
            </>
          ) : (
            <div className="space-y-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Your Referral Code</h2>
                <p className="text-2xl font-mono bg-white p-4 rounded border">
                  {referrer.referral_code}
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Share this code with potential students or use it in your referral link:
                </p>
                <p className="font-mono text-sm mt-2">
                  {`${websiteUrl}/?ref=${referrer.referral_code}`}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Referral Statistics</h2>
                <ReferralStats referralCode={referrer.referral_code} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralProgram;