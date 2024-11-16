import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const AdvancedStrategies = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Advanced Trading Strategies</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            Take your trading to the next level with advanced strategies and techniques used by
            professional traders.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Advanced Topics</h2>
          <ul className="space-y-2 mb-8">
            <li>• Advanced technical analysis</li>
            <li>• Complex trading patterns</li>
            <li>• Risk management strategies</li>
            <li>• Portfolio optimization</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Master these advanced strategies with expert guidance in our comprehensive trading course.
            </p>
            <Button asChild>
              <Link to="/courses">Upgrade Your Skills</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdvancedStrategies;