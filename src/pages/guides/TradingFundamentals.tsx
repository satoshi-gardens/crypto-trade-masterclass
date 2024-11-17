import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

const TradingFundamentals = () => {
  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    { label: "Knowledge Base", href: "/tools#knowledge" },
    { label: "Trading Fundamentals", href: "/guides/trading-fundamentals" },
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Trading Fundamentals</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            Master the essential concepts and strategies needed to start trading cryptocurrencies
            effectively and responsibly.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Core Concepts</h2>
          <ul className="space-y-2 mb-8">
            <li>• Market analysis basics</li>
            <li>• Order types and execution</li>
            <li>• Risk management principles</li>
            <li>• Technical analysis foundations</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Ready to take your trading to the next level? Our comprehensive course will teach you
              everything you need to know.
            </p>
            <Button asChild>
              <Link to="/courses">Start Learning</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TradingFundamentals;