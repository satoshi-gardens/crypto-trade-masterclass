import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ToolsDisclaimer = () => {
  return (
    <Alert variant="destructive" className="mb-8">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        The tools and resources listed here are external and are not under our responsibility.
      </AlertDescription>
    </Alert>
  );
};

export default ToolsDisclaimer;