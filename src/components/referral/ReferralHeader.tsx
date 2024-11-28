import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Facebook, Twitter, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ReferralHeaderProps {
  referralLink: string;
  onShare: (platform: string) => void;
}

const ReferralHeader = ({ referralLink, onShare }: ReferralHeaderProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied!",
      description: "Your referral link has been copied to your clipboard.",
    });
  };

  return (
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
              Copy Link
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare("facebook")}
            >
              <Facebook className="w-4 h-4 mr-2" />
              Share on Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare("twitter")}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare("whatsapp")}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralHeader;