import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupPrompt = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Clear any stored email to ensure fresh signup
    localStorage.removeItem("referralEmail");
    navigate("/referral");
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Join Our Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Start earning rewards and help others succeed by joining our referral program!
        </p>
        <Button 
          className="w-full"
          onClick={handleSignup}
        >
          Sign Up Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignupPrompt;