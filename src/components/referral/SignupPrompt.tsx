import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";

const SignupPrompt = () => {
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
          No referral account found. Join our program to start earning rewards and helping others succeed!
        </p>
        <Button 
          className="w-full"
          onClick={() => window.location.href = "/referral"}
        >
          Sign Up Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignupPrompt;