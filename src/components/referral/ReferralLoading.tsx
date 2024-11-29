import { Loader2 } from "lucide-react";

const ReferralLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-gray-600">Loading referrer data...</p>
    </div>
  );
};

export default ReferralLoading;