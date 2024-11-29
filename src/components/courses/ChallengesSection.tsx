import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Users, ChartBar } from "lucide-react";

const challenges = [
  {
    title: "Market Volatility",
    description: "Crypto markets are highly volatile, making it challenging to maintain consistent profits.",
    icon: ChartBar,
  },
  {
    title: "Information Overload",
    description: "The abundance of information makes it difficult to identify reliable sources and strategies.",
    icon: Book,
  },
  {
    title: "Technical Complexity",
    description: "Understanding blockchain technology and trading mechanics can be overwhelming.",
    icon: Users,
  },
];

const ChallengesSection = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Common Trading Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {challenges.map((challenge, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <challenge.icon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">{challenge.title}</h3>
            </div>
            <p className="text-gray-600">{challenge.description}</p>
            <Button variant="link" className="mt-4 text-primary">
              How We Address It →
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ChallengesSection;