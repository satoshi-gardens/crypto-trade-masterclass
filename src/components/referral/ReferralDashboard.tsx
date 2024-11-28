import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

const ReferralDashboard = ({ email }: { email: string }) => {
  const [referralData, setReferralData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralData();
  }, [email]);

  const fetchReferralData = async () => {
    try {
      const { data, error } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", email)
        .single();

      if (error) throw error;
      setReferralData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch referral data",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  if (!referralData) return null;

  const referralLink = `${window.location.origin}/referral?ref=${referralData.referral_code}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={referralData.referral_code} readOnly />
            <Button
              variant="outline"
              onClick={() => copyToClipboard(referralData.referral_code)}
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={referralLink} readOnly />
            <Button variant="outline" onClick={() => copyToClipboard(referralLink)}>
              Copy
            </Button>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Join me in learning crypto trading!",
                    text: "Use my referral link:",
                    url: referralLink,
                  }).catch(console.error);
                } else {
                  copyToClipboard(referralLink);
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">${referralData.total_earnings || "0.00"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-2xl font-bold">
                {referralData.is_verified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralDashboard;