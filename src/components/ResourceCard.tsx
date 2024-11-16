import { Resource } from "@/types/resources";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { FileText, Video, Tool } from "lucide-react";
import { toast } from "sonner";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const handleViewResource = () => {
    toast.success("Resource access initiated. You will be contacted shortly.");
  };

  const getIcon = () => {
    switch (resource.type) {
      case "guide":
        return <FileText className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      case "tool":
        return <Tool className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {getIcon()}
          <CardTitle className="text-xl">{resource.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{resource.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleViewResource} className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;