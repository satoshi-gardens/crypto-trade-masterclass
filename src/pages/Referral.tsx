import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralHeader from "@/components/referral/ReferralHeader";
import { useToast } from "@/components/ui/use-toast";

const Referral = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    // Share functionality can be implemented here
    toast({
      title: "Coming Soon",
      description: `Sharing to ${platform} will be available soon.`,
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <ReferralHeader 
          referralLink={window.location.origin + "/referral"}
          onShare={handleShare}
        />
        <ReferralRegistration onEmailSet={setEmail} />
      </div>
    </PageLayout>
  );
};

export default Referral;