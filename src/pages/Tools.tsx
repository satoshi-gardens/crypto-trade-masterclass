import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ResourceList from "@/components/ResourceList";
import ToolsSearch from "@/components/tools/ToolsSearch";
import ToolsDisclaimer from "@/components/tools/ToolsDisclaimer";
import ToolsHeader from "@/components/tools/ToolsHeader";
import { ResourceCategory } from "@/types/resources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        link: "https://bit.ly/40qDhAQ"
      },
      {
        id: "bybit",
        title: "Bybit",
        description: "Professional crypto derivatives exchange platform.",
        type: "exchange",
        link: "https://bit.ly/2NAQ2UZ"
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
    id: "tools",
    title: "Trading Tools",
    description: "Essential tools for successful trading",
    items: [
      {
        id: "tradingview",
        title: "TradingView",
        description: "Professional-grade charts and analysis tools.",
        type: "tool",
        link: "https://bit.ly/3C8mECf"
      },
      {
        id: "profit-calc",
        title: "Profit Calculator",
        description: "Estimate your potential gains.",
        type: "tool",
      },
      {
        id: "portfolio-tracker",
        title: "Portfolio Tracker",
        description: "Keep track of your investments.",
        type: "tool",
      },
    ],
  },
  {
    id: "wallets",
    title: "Wallets",
    description: "Secure cryptocurrency wallets for storing your assets",
    items: [
      {
        id: "rabby",
        title: "Rabby Wallet",
        description: "Modern Web3 wallet with enhanced security features.",
        type: "wallet",
        link: "https://rabby.io/"
      },
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
      <ToolsHeader />
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <ToolsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ToolsDisclaimer />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start mb-8 bg-background">
            <TabsTrigger value="all" className="flex-grow sm:flex-grow-0">All</TabsTrigger>
            {RESOURCES_DATA.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-grow sm:flex-grow-0"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {filteredResources.length > 0 ? (
              <div className="space-y-16 animate-fade-in">
                {filteredResources.map((category) => (
                  <ResourceList key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-accent/5 rounded-lg">
                <p className="text-xl text-gray-600">No resources found</p>
              </div>
            )}
          </TabsContent>

          {RESOURCES_DATA.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="animate-fade-in">
                <ResourceList 
                  category={{
                    ...category,
                    items: category.items.filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ),
                  }} 
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Tools;