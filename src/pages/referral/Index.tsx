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
    // If there's a referral code in the URL, redirect to courses page
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

  // If there's a referral code, don't render anything as we're redirecting
  if (referralCode) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!email ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Referral Program</h1>
                <p className="text-xl text-gray-600">
                  Join our referral program and earn rewards while helping others succeed in their trading journey
                </p>
              </div>
              <ReferralRegistration onEmailSet={setEmail} />
            </>
          ) : (
            <ReferralDashboard email={email} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;