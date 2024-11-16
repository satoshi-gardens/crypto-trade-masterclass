import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const CryptoBasics = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Crypto Basics</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">
            Understanding cryptocurrency starts with mastering the fundamentals of blockchain technology
            and digital assets. This introductory guide covers the essential concepts you need to know.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Topics</h2>
          <ul className="space-y-2 mb-8">
            <li>• What is blockchain technology?</li>
            <li>• Understanding cryptocurrency wallets</li>
            <li>• Different types of cryptocurrencies</li>
            <li>• Basic security practices</li>
          </ul>

          <div className="bg-accent/10 p-6 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Want to dive deeper? Our comprehensive course covers these topics and more in detail,
              with hands-on exercises and expert guidance.
            </p>
            <Button asChild>
              <Link to="/courses">Explore Our Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CryptoBasics;