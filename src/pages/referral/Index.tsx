import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralDashboard from "@/components/referral/ReferralDashboard";

const ReferralIndex = () => {
  const [email, setEmail] = useState("");

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Referral Program</h1>
        {email ? (
          <ReferralDashboard email={email} />
        ) : (
          <ReferralRegistration />
        )}
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;