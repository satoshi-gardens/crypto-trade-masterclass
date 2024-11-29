import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralHeader from "@/components/referral/ReferralHeader";

const Referral = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <ReferralHeader />
        <ReferralRegistration />
      </div>
    </PageLayout>
  );
};

export default Referral;