import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

const AITrading = () => {
  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    { label: "Knowledge Base", href: "/tools#knowledge" },
    { label: "AI Trading", href: "/guides/ai-trading" },
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">AI in Crypto Trading</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            Discover how artificial intelligence is revolutionizing cryptocurrency trading through
            advanced pattern recognition and automated decision-making systems.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Applications of AI in Trading</h2>
          <ul className="space-y-2 mb-8">
            <li>• Pattern recognition in market data</li>
            <li>• Automated trading systems</li>
            <li>• Risk management algorithms</li>
            <li>• Sentiment analysis</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Learn how to leverage AI in your trading strategy through our advanced trading course.
            </p>
            <Button asChild>
              <Link to="/courses">Join Our Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AITrading;