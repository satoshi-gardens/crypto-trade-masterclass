import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseModule {
  title: string;
  description: string;
  outcome: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  internalId: string;
}

const curriculumModules: CourseModule[] = [
  {
    title: "Blockchain Basics",
    description: "Dive into the bedrock of all cryptocurrencies: blockchain technology. This module sets the stage for understanding decentralized digital ledgers, immutability, and blockchain types.",
    outcome: "By the end of this module, you'll have a foundational understanding of blockchain, essential for any crypto trader.",
    complexity: "Beginner",
    internalId: "CT4P-001"
  },
  {
    title: "Cryptocurrency Fundamentals",
    description: "Unravel the complexities of cryptocurrencies, their workings, and market dynamics. This module provides insight into how different cryptocurrencies work and their use cases.",
    outcome: "You'll gain a solid understanding of different cryptocurrencies and their potential in the market.",
    complexity: "Beginner",
    internalId: "CT4P-003"
  },
  {
    title: "Introduction to Trading Strategies",
    description: "Equip yourself with the basic trading strategies used in the crypto markets. This module covers technical and fundamental analysis.",
    outcome: "You will be able to develop basic trading strategies and apply them to crypto trading.",
    complexity: "Intermediate",
    internalId: "CT4P-006"
  },
  {
    title: "Risk Management",
    description: "Learn how to manage risk effectively when trading crypto assets. This module covers stop-loss orders, risk/reward ratios, and position sizing.",
    outcome: "You'll know how to manage your risk effectively while trading cryptocurrencies.",
    complexity: "Intermediate",
    internalId: "CT4P-008"
  },
  {
    title: "Technical Indicators and Charting",
    description: "Master the use of technical indicators and chart patterns to predict market movements. This module covers moving averages, RSI, MACD, and more.",
    outcome: "You'll be proficient in using technical indicators and charting tools for crypto trading.",
    complexity: "Intermediate",
    internalId: "CT4P-009"
  }
];

const ComplexityColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-blue-500",
  Advanced: "bg-purple-500",
};

const ModuleCard = ({ module }: { module: CourseModule }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl">{module.title}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{module.description}</p>
            </div>
            <Badge className={`${ComplexityColors[module.complexity]} text-white ml-2`}>
              {module.complexity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2">
              {isOpen ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Learn More <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-500 mb-1">Description</h4>
              <p className="text-gray-700">{module.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500 mb-1">Learning Outcome</h4>
              <p className="text-gray-700">{module.outcome}</p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-400">Internal ID: {module.internalId}</p>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};

const CourseCurriculumOverview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Course Curriculum Overview</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive curriculum designed to take you from basics to advanced trading
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {curriculumModules.map((module) => (
            <ModuleCard key={module.internalId} module={module} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculumOverview;