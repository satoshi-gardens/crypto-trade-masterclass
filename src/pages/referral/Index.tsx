import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralDashboard from "@/components/referral/ReferralDashboard";

const ReferralIndex = () => {
  const [email, setEmail] = useState("");

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Referral Program</h1>
            <p className="text-xl text-gray-600">
              Join our referral program and earn rewards while helping others succeed in their trading journey
            </p>
          </div>
          
          {email ? (
            <ReferralDashboard email={email} />
          ) : (
            <ReferralRegistration />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;