import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CourseModuleProps {
  id: string;
  title: string;
  description: string;
  outcome: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  internalId: string;
  isExtra?: boolean;
}

const ComplexityColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-blue-500",
  Advanced: "bg-purple-500",
};

const CourseModule = ({ title, description, outcome, complexity, internalId, isExtra }: CourseModuleProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex gap-2">
            {isExtra && (
              <Badge className="bg-orange-500 text-white">
                Extra
              </Badge>
            )}
            <Badge className={`${ComplexityColors[complexity]} text-white`}>
              {complexity}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">Description</p>
          <p className="text-gray-700">{description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Outcome</p>
          <p className="text-gray-700">{outcome}</p>
        </div>
        <div className="pt-2">
          <p className="text-xs text-gray-400">Internal ID: {internalId}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseModule;