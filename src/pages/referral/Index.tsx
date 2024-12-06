import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Percent, Trophy, Users2, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import ReferralRegistration from "@/components/referral/ReferralRegistration";
import ReferralDashboard from "@/components/referral/ReferralDashboard";

const ReferralIndex = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("referralEmail") || "";
  });

  useEffect(() => {
    if (referralCode) {
      navigate(`/courses?ref=${referralCode}`);
      return;
    }

    if (email) {
      localStorage.setItem("referralEmail", email);
    } else {
      localStorage.removeItem("referralEmail");
    }
  }, [email, referralCode, navigate]);

  if (referralCode) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Double the Success</h1>
            <p className="text-xl text-gray-600">
              Refer a friend and both get exclusive benefits in your crypto trading journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-bold">For You as Referrer</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Percent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Flexible Rewards</h3>
                      <p className="text-gray-600 text-sm">Choose between course credits or cash rewards:</p>
                      <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                        <li>CHF 300 course credit (Premium value)</li>
                        <li>CHF 200 direct payment</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-2">
                        Cash payments processed monthly via bank transfer or crypto
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">VIP Course Access</h3>
                      <p className="text-gray-600 text-sm">
                        Get exclusive access to advanced modules after 3 successful referrals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Users2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Community Recognition</h3>
                      <p className="text-gray-600 text-sm">
                        Get featured as a valuable community member
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-bold">For Your Friend</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">10% Welcome Discount</h3>
                      <p className="text-gray-600 text-sm">
                        Special discount on their first course enrollment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Bonus Module Access</h3>
                      <p className="text-gray-600 text-sm">
                        Choose one additional specialized module: AI in Trading, Advanced DeFi Protocols, or Risk Management
                      </p>
                      <p className="text-sm text-purple-600 mt-1">Value: CHF 500</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {!email ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Share Your Referral Link</h3>
              <ReferralRegistration onEmailSet={setEmail} />
            </div>
          ) : (
            <ReferralDashboard email={email} />
          )}

          <p className="text-sm text-gray-500 text-center">
            Terms and conditions apply. Commissions are paid out monthly. VIP access is granted after verification of successful referrals.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralIndex;