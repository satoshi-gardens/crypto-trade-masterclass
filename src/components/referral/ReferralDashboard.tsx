import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Copy, Facebook, Twitter, Link, Users, DollarSign, Bell } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReferralDashboard = ({ email }: { email: string }) => {
  const [referralData, setReferralData] = useState<any>(null);
  const [stats, setStats] = useState({
    clicks: 0,
    registrations: 0,
    purchases: 0,
    pendingRewards: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralData();
    fetchReferralStats();
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

  const fetchReferralStats = async () => {
    try {
      const { data: clicks } = await supabase
        .from("referral_clicks")
        .select("*", { count: "exact" })
        .eq("referral_code", referralData?.referral_code);

      const { data: conversions } = await supabase
        .from("referral_conversions")
        .select("*")
        .eq("referral_code", referralData?.referral_code);

      setStats({
        clicks: clicks?.length || 0,
        registrations: conversions?.filter(c => c.course_application_id).length || 0,
        purchases: conversions?.filter(c => !c.paid).length || 0,
        pendingRewards: conversions?.reduce((acc, curr) => acc + Number(curr.commission_amount), 0) || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  const shareOnSocial = (platform: string) => {
    const referralLink = `${window.location.origin}/referral?ref=${referralData.referral_code}`;
    const text = encodeURIComponent("Join me in learning crypto trading!");
    const url = encodeURIComponent(referralLink);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  if (!referralData) return null;

  const referralLink = `${window.location.origin}/referral?ref=${referralData.referral_code}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={referralLink} readOnly />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(referralLink)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial("facebook")}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial("twitter")}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial("whatsapp")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Link className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.clicks}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.registrations}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.purchases}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${stats.pendingRewards.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guidelines">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>How to Share Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  1. Share your link with friends and family interested in crypto trading
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertDescription>
                  2. Use social media to reach a wider audience
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertDescription>
                  3. Earn rewards when people sign up and make purchases using your link
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertDescription>
                  4. Track your performance in real-time through this dashboard
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.clicks > 0 ? (
                  <Alert>
                    <AlertDescription>
                      Your link was clicked {stats.clicks} times recently
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <AlertDescription>
                      No recent activity. Start sharing your referral link to earn rewards!
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralDashboard;