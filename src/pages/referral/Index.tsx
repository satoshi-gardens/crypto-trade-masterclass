import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const ReferralIndex = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkReferralStatus();
  }, []);

  const checkReferralStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: referrer } = await supabase
        .from("referrers")
        .select("*")
        .eq("user_email", session.user.email)
        .single();

      if (referrer) {
        setReferralCode(referrer.referral_code);
        setReferralLink(`${window.location.origin}/referral?ref=${referrer.referral_code}`);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking referral status:", error);
      setIsLoading(false);
    }
  };

  const generateReferralCode = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const newReferralCode = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const { error } = await supabase
        .from("referrers")
        .insert([
          {
            user_email: session.user.email,
            referral_code: newReferralCode,
          },
        ]);

      if (error) throw error;

      setReferralCode(newReferralCode);
      setReferralLink(`${window.location.origin}/referral?ref=${newReferralCode}`);
      
      toast({
        title: "Success!",
        description: "Your referral code has been generated.",
      });
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast({
        title: "Error",
        description: "Failed to generate referral code. Please try again.",
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

  const shareOnSocial = (platform: string) => {
    const text = encodeURIComponent("Join me in learning crypto trading! Use my referral link:");
    const url = encodeURIComponent(referralLink);
    
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        // Generic share for mobile devices
        if (navigator.share) {
          navigator.share({
            title: "Join me in learning crypto trading!",
            text: "Use my referral link:",
            url: referralLink,
          }).catch(console.error);
          return;
        }
        copyToClipboard(referralLink);
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Referral Program</h1>
        
        {!referralCode ? (
          <Card>
            <CardHeader>
              <CardTitle>Join Our Referral Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Start earning rewards by referring friends to our crypto trading courses!</p>
              <Button onClick={generateReferralCode}>Generate Referral Code</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Input value={referralCode} readOnly />
                  <Button variant="outline" onClick={() => copyToClipboard(referralCode)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Input value={referralLink} readOnly />
                  <Button variant="outline" onClick={() => copyToClipboard(referralLink)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Your Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => shareOnSocial("facebook")}>
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" onClick={() => shareOnSocial("twitter")}>
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" onClick={() => shareOnSocial("linkedin")}>
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" onClick={() => shareOnSocial("generic")}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Referral Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/referral/stats")} className="w-full">
                  View Your Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;