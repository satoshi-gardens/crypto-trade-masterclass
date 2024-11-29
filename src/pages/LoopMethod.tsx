import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import { 
  BookOpen, 
  Settings, 
  Eye, 
  DollarSign,
  Infinity,
  ArrowLeftRight,
  TrendingUp,
  Lock,
  Sprout,
  Droplets,
  Gift,
  Building2,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoopMethod = () => {
  const incomeStreams = {
    traditional: [
      {
        icon: <ArrowLeftRight className="w-6 h-6" />,
        title: "Spot Trading",
        description: "Buy and sell cryptocurrencies directly on centralized or decentralized exchanges (CEX/DEX)."
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Futures Trading",
        description: "Amplify your earnings with advanced leverage strategies."
      },
      {
        icon: <Lock className="w-6 h-6" />,
        title: "Staking",
        description: "Earn rewards by holding and locking cryptocurrencies in staking pools."
      }
    ],
    innovative: [
      {
        icon: <Sprout className="w-6 h-6" />,
        title: "Yield Farming",
        description: "Generate returns by providing liquidity to decentralized finance (DeFi) protocols."
      },
      {
        icon: <Droplets className="w-6 h-6" />,
        title: "Liquidity Pools",
        description: "Earn fees and incentives by supplying assets to decentralized exchanges."
      },
      {
        icon: <Gift className="w-6 h-6" />,
        title: "Airdrops",
        description: "Claim free tokens distributed by blockchain projects."
      },
      {
        icon: <Building2 className="w-6 h-6" />,
        title: "Lending & Borrowing",
        description: "Earn interest on your crypto assets or use them as collateral for loans."
      },
      {
        icon: <Server className="w-6 h-6" />,
        title: "Masternodes",
        description: "Operate a node on a blockchain network to earn passive income."
      }
    ]
  };

  return (
    <PageLayout>
      <Hero
        title="The LOOP Method: Live on Your Profits"
        subtitle="Discover the proven path to financial independence with Dr. Michael Kiberu's transformative approach to cryptocurrency trading"
        backgroundClass="bg-gradient-to-b from-primary/10 to-background"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <Infinity className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">What is the LOOP Method?</h2>
          <p className="text-lg text-gray-600 mb-8">
            The <strong>LOOP Method</strong> (Live On yOur Profits) is a holistic trading methodology designed for individuals who want to move beyond hobby trading and turn crypto investments into a sustainable source of income.
          </p>
          <blockquote className="bg-accent p-6 rounded-lg italic text-lg">
            "Let your money work for you, so you can enjoy the things you love from your profits – not your earnings."
          </blockquote>
        </section>

        {/* Key Principles */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Principles of the LOOP Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12" />,
                title: "Learn",
                description: "Gain foundational knowledge of crypto trading, from market dynamics to income streams."
              },
              {
                icon: <Settings className="w-12 h-12" />,
                title: "Optimize",
                description: "Leverage advanced tools and strategies to maximize your profitability."
              },
              {
                icon: <Eye className="w-12 h-12" />,
                title: "Observe",
                description: "Monitor market trends and data effectively to identify opportunities."
              },
              {
                icon: <DollarSign className="w-12 h-12" />,
                title: "Profit",
                description: "Achieve financial independence through sustainable income streams."
              }
            ].map((principle, index) => (
              <div 
                key={principle.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-primary mb-4">{principle.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Income Streams */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Income Streams</h2>
          
          {/* Traditional Streams */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Traditional Crypto Income Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {incomeStreams.traditional.map((stream, index) => (
                <div 
                  key={stream.title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-primary mb-4">{stream.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{stream.title}</h4>
                  <p className="text-gray-600 text-sm">{stream.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Innovative Streams */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Innovative Crypto Income Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {incomeStreams.innovative.map((stream, index) => (
                <div 
                  key={stream.title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-primary mb-4">{stream.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{stream.title}</h4>
                  <p className="text-gray-600 text-sm">{stream.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-primary text-white py-16 px-4 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Take Action Today!</h2>
          <p className="text-xl mb-8">Ready to start living on your profits?</p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link to="/courses#packages">Start Learning Now</Link>
          </Button>
        </section>
      </div>
    </PageLayout>
  );
};

export default LoopMethod;