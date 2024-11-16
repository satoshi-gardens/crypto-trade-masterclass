import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import SearchBar from "@/components/SearchBar";
import ResourceList from "@/components/ResourceList";
import { ResourceCategory } from "@/types/resources";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const RESOURCES_DATA: ResourceCategory[] = [
  {
    id: "exchanges",
    title: "Exchanges",
    description: "Trusted cryptocurrency exchanges with exclusive benefits",
    items: [
      {
        id: "binance",
        title: "Binance",
        description: "World's largest crypto exchange. Get 10% fee discount with our referral.",
        type: "exchange",
        link: "https://accounts.binance.com/register?ref=YOUR_REFERRAL_CODE"
      },
      {
        id: "kucoin",
        title: "KuCoin",
        description: "Popular exchange with wide variety of cryptocurrencies.",
        type: "exchange",
        link: "https://www.kucoin.com/ucenter/signup?rcode=YOUR_REFERRAL_CODE"
      },
    ],
  },
  {
    id: "wallets",
    title: "Wallets",
    description: "Secure cryptocurrency wallets for storing your assets",
    items: [
      {
        id: "metamask",
        title: "MetaMask",
        description: "Popular Web3 wallet for Ethereum and ERC-20 tokens.",
        type: "wallet",
        link: "https://metamask.io/"
      },
      {
        id: "trustwallet",
        title: "Trust Wallet",
        description: "Multi-chain crypto wallet supporting various networks.",
        type: "wallet",
        link: "https://trustwallet.com/"
      },
    ],
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    description: "Essential resources to master cryptocurrency trading",
    items: [
      {
        id: "basics",
        title: "Crypto Basics",
        description: "Learn the fundamentals of blockchain and cryptocurrency.",
        type: "guide"
      },
      {
        id: "trading",
        title: "Trading Fundamentals",
        description: "Master the basics of cryptocurrency trading.",
        type: "guide"
      },
      {
        id: "security",
        title: "Security Best Practices",
        description: "Learn how to secure your crypto assets.",
        type: "guide"
      },
      {
        id: "ai-trading",
        title: "AI in Crypto Trading",
        description: "Understanding AI applications in cryptocurrency trading.",
        type: "guide"
      },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    description: "Step-by-step written guides to master crypto trading",
    items: [
      {
        id: "1",
        title: "Crypto Basics Guide",
        description: "Understand the fundamentals of cryptocurrency.",
        type: "guide",
      },
      {
        id: "2",
        title: "Advanced Strategies",
        description: "Techniques for maximizing your profits.",
        type: "guide",
      },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    description: "Recorded tutorials and expert sessions",
    items: [
      {
        id: "3",
        title: "Intro to Trading",
        description: "Start your trading journey with confidence.",
        type: "video",
      },
      {
        id: "4",
        title: "Risk Management",
        description: "Learn to minimize risks and protect your portfolio.",
        type: "video",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Software and calculators for trading support",
    items: [
      {
        id: "5",
        title: "Profit Calculator",
        description: "Estimate your potential gains.",
        type: "tool",
      },
      {
        id: "6",
        title: "Portfolio Tracker",
        description: "Keep track of your investments.",
        type: "tool",
      },
    ],
  },
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES_DATA.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Tools and Resources for Profitable Trading
          </h1>
          <p className="text-xl text-gray-600">
            Explore our curated collection of guides, videos, and tools designed to
            help you trade smarter and achieve your financial goals.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search resources..."
          />
        </div>

        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            The tools and resources listed here are external and are not under our responsibility.
          </AlertDescription>
        </Alert>

        {filteredResources.length > 0 ? (
          <div className="space-y-16">
            {filteredResources.map((category) => (
              <ResourceList key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No resources found</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Tools;
