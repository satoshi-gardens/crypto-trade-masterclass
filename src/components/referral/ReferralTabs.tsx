import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, InfoIcon } from "lucide-react";

interface ReferralTabsProps {
  stats: {
    clicks: number;
  };
}

const ReferralTabs = ({ stats }: ReferralTabsProps) => {
  return (
    <Tabs defaultValue="guidelines">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="guidelines">Program Guidelines</TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="w-4 h-4 mr-2" />
          Activity Updates
        </TabsTrigger>
      </TabsList>
      <TabsContent value="guidelines">
        <Card>
          <CardHeader>
            <CardTitle>How to Make the Most of Your Referrals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Share your unique link with friends interested in crypto trading
              </AlertDescription>
            </Alert>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Earn rewards for each successful referral who completes a course purchase
              </AlertDescription>
            </Alert>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Track your performance and rewards in real-time through this dashboard
              </AlertDescription>
            </Alert>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Verification links are valid for 48 hours. Request a new one if expired
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
                    Your referral link has been clicked {stats.clicks} times recently
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertDescription>
                    Start sharing your referral link to begin earning rewards! Your link is ready to use.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ReferralTabs;