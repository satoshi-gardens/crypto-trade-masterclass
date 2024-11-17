import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

const CryptoBasicsGuide = () => {
  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    { label: "Guides", href: "/tools#guides" },
    { label: "Crypto Basics Guide", href: "/guides/crypto-basics-guide" },
  ];

  return (
    <PageLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Comprehensive Crypto Basics Guide</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            A complete guide to understanding cryptocurrency fundamentals, from blockchain technology
            to making your first trade.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Guide Contents</h2>
          <ul className="space-y-2 mb-8">
            <li>• Introduction to blockchain</li>
            <li>• Setting up your first wallet</li>
            <li>• Understanding market dynamics</li>
            <li>• Making your first trade</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Get personalized guidance and hands-on experience through our structured course program.
            </p>
            <Button asChild>
              <Link to="/courses">Begin Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CryptoBasicsGuide;