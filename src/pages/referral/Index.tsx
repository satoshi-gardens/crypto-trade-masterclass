import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralDashboard from "@/components/referral/ReferralDashboard";

const ReferralIndex = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("referralEmail") || "";
  });

  useEffect(() => {
    if (referralCode) {
      navigate(`/courses?ref=${referralCode}`);
      return;
    }

    if (email) {
      localStorage.setItem("referralEmail", email);
    } else {
      localStorage.removeItem("referralEmail");
    }
  }, [email, referralCode, navigate]);

  if (referralCode) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Double the Success</h1>
            <p className="text-xl text-gray-600">
              Refer a friend and both get exclusive benefits in your crypto trading journey
            </p>
          </div>

          {!email ? (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Share Your Referral Link</h3>
                <ReferralRegistration onEmailSet={setEmail} />
              </div>
            </>
          ) : (
            <ReferralDashboard email={email} />
          )}

          <p className="text-sm text-gray-500 text-center">
            Terms and conditions apply. Commissions are paid out monthly. VIP access is granted after verification of successful referrals.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;