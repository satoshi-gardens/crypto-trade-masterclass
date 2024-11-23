import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Complexity = "Beginner" | "Intermediate" | "Advanced";

interface CourseFiltersProps {
  selectedComplexity: Complexity | "all";
  onComplexityChange: (complexity: Complexity | "all") => void;
}

const ComplexityColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-blue-500",
  Advanced: "bg-purple-500",
};

export const CourseFilters = ({
  selectedComplexity,
  onComplexityChange,
}: CourseFiltersProps) => {
  return (
    <Card className="p-4 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedComplexity === "all" ? "default" : "outline"}
          onClick={() => onComplexityChange("all")}
          className="flex-grow sm:flex-grow-0"
        >
          All Levels
        </Button>
        {(Object.keys(ComplexityColors) as Complexity[]).map((complexity) => (
          <Button
            key={complexity}
            variant={selectedComplexity === complexity ? "default" : "outline"}
            onClick={() => onComplexityChange(complexity)}
            className={`flex-grow sm:flex-grow-0 ${
              selectedComplexity === complexity ? ComplexityColors[complexity] : ""
            }`}
          >
            {complexity}
          </Button>
        ))}
      </div>
    </Card>
  );
};