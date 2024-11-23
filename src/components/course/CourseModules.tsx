import { useState, useMemo } from "react";
import CourseModule from "./CourseModule";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CourseFilters } from "./CourseFilters";
import { CoursePagination } from "./CoursePagination";

const ITEMS_PER_PAGE = 6;

const modules = [
  {
    id: "1",
    title: "Blockchain Basics",
    description: "Dive into the bedrock of all cryptocurrencies: blockchain technology. This module sets the stage for understanding decentralized digital ledgers, immutability, and blockchain types.",
    outcome: "By the end of this module, you'll have a foundational understanding of blockchain, essential for any crypto trader.",
    complexity: "Beginner",
    internalId: "CT4P-001"
  },
  {
    id: "2",
    title: "Cybersecurity and Best Practices",
    description: "Cybersecurity is crucial in the crypto world. Learn to protect your digital assets from various threats while establishing a secure trading environment.",
    outcome: "You will be able to secure your cryptocurrency and avoid common security risks.",
    complexity: "Intermediate",
    internalId: "CT4P-002"
  },
  {
    id: "3",
    title: "Cryptocurrency Fundamentals",
    description: "Unravel the complexities of cryptocurrencies, their workings, and market dynamics. This module provides insight into how different cryptocurrencies work and their use cases.",
    outcome: "You'll gain a solid understanding of different cryptocurrencies and their potential in the market.",
    complexity: "Beginner",
    internalId: "CT4P-003"
  },
  {
    id: "4",
    title: "Exchange Setup and Trading Platforms (CEX)",
    description: "Explore the intricacies of setting up and using centralized exchanges (CEX) for crypto trading. This module provides a detailed understanding of account setups, trading pairs, and order types.",
    outcome: "You'll be able to navigate and trade on centralized exchanges with proficiency.",
    complexity: "Intermediate",
    internalId: "CT4P-004"
  },
  {
    id: "5",
    title: "Decentralized Finance (DeFi)",
    description: "Learn how DeFi is revolutionizing the financial system by removing intermediaries. This module explores lending, borrowing, yield farming, and liquidity pools.",
    outcome: "You'll understand how to use DeFi platforms to earn passive income.",
    complexity: "Intermediate",
    internalId: "CT4P-005"
  },
  {
    id: "6",
    title: "Introduction to Trading Strategies",
    description: "Equip yourself with the basic trading strategies used in the crypto markets. This module covers technical and fundamental analysis.",
    outcome: "You will be able to develop basic trading strategies and apply them to crypto trading.",
    complexity: "Beginner",
    internalId: "CT4P-006"
  },
  {
    id: "7",
    title: "Advanced Trading Techniques",
    description: "Take your trading skills to the next level with advanced techniques, including margin trading, futures contracts, and options.",
    outcome: "You'll have a grasp of advanced trading techniques and how to apply them in crypto markets.",
    complexity: "Advanced",
    internalId: "CT4P-007"
  },
  {
    id: "8",
    title: "Risk Management",
    description: "Learn how to manage risk effectively when trading crypto assets. This module covers stop-loss orders, risk/reward ratios, and position sizing.",
    outcome: "You'll know how to manage your risk effectively while trading cryptocurrencies.",
    complexity: "Intermediate",
    internalId: "CT4P-008"
  },
  {
    id: "9",
    title: "Technical Indicators and Charting",
    description: "Master the use of technical indicators and chart patterns to predict market movements. This module covers moving averages, RSI, MACD, and more.",
    outcome: "You'll be proficient in using technical indicators and charting tools for crypto trading.",
    complexity: "Intermediate",
    internalId: "CT4P-009"
  },
  {
    id: "10",
    title: "Regulation and Taxation",
    description: "Understand the evolving landscape of cryptocurrency regulation and taxation in different jurisdictions.",
    outcome: "You'll have a clear understanding of the legal requirements and tax obligations for crypto traders.",
    complexity: "Intermediate",
    internalId: "CT4P-010"
  },
  {
    id: "11",
    title: "Introduction to NFTs",
    description: "Explore the world of non-fungible tokens (NFTs), their uses, and how they are disrupting the art, gaming, and entertainment industries.",
    outcome: "You'll understand how NFTs work and how to participate in the NFT marketplace.",
    complexity: "Beginner",
    internalId: "CT4P-011"
  },
  {
    id: "12",
    title: "Smart Contracts",
    description: "Delve into the workings of smart contracts, automated agreements that execute when conditions are met, forming the backbone of decentralized applications (dApps).",
    outcome: "You will know how smart contracts function and how they can be utilized in real-world applications.",
    complexity: "Intermediate",
    internalId: "CT4P-012"
  },
  {
    id: "13",
    title: "Initial Coin Offerings (ICOs) and Tokenomics",
    description: "Understand how Initial Coin Offerings (ICOs) work and the role of tokenomics in determining a project's potential.",
    outcome: "You’ll have a thorough understanding of how ICOs operate and how to evaluate a token's economic model.",
    complexity: "Intermediate",
    internalId: "CT4P-013"
  },
  {
    id: "14",
    title: "Decentralized Autonomous Organizations (DAOs)",
    description: "Learn how DAOs are reshaping governance by enabling decentralized, transparent decision-making in organizations.",
    outcome: "You’ll understand how DAOs work and how they are used to make decentralized governance decisions.",
    complexity: "Intermediate",
    internalId: "CT4P-014"
  },
  {
    id: "15",
    title: "Regulation of DeFi",
    description: "Dive into the evolving regulations around decentralized finance (DeFi) and how they impact market participants.",
    outcome: "You'll have an understanding of the regulatory landscape surrounding DeFi and how it affects users.",
    complexity: "Advanced",
    internalId: "CT4P-015"
  },
  {
    id: "16",
    title: "The Role of AI in Trading",
    description: "Discover how artificial intelligence (AI) is transforming cryptocurrency trading through predictive analytics, automated strategies, and market analysis.",
    outcome: "You will understand how AI is used in the crypto trading space and how it enhances trading strategies.",
    complexity: "Advanced",
    internalId: "CT4P-016"
  },
  {
    id: "17",
    title: "Metaverse and Virtual Worlds",
    description: "Explore the concept of the metaverse and how blockchain is enabling virtual economies, digital assets, and social interaction in virtual worlds.",
    outcome: "You’ll have a clear understanding of the metaverse, its potential, and how to participate in virtual economies.",
    complexity: "Intermediate",
    internalId: "CT4P-017"
  },
  {
    id: "18",
    title: "Portfolio Management in Crypto",
    description: "Learn how to manage a diverse cryptocurrency portfolio, balancing risk and reward for long-term growth.",
    outcome: "You will know how to effectively manage a cryptocurrency portfolio and achieve long-term growth.",
    complexity: "Intermediate",
    internalId: "CT4P-018"
  },
  {
    id: "19",
    title: "Stablecoins and Their Use Cases",
    description: "Understand the role of stablecoins in providing stability in the volatile crypto market and their growing use cases in payments and DeFi.",
    outcome: "You’ll know how stablecoins are used to create stability and liquidity in crypto markets.",
    complexity: "Beginner",
    internalId: "CT4P-019"
  },
  {
    id: "20",
    title: "Exit Strategies and Long-Term Investment Planning",
    description: "Learn how to develop exit strategies and plan for long-term investment in the crypto space to secure profits and minimize risks.",
    outcome: "You will be able to develop effective exit strategies and manage your long-term crypto investments.",
    complexity: "Intermediate",
    internalId: "CT4P-020"
  },
  {
    id: "21",
    title: "Regulatory Compliance and Future Trends",
    description: "Stay up to date on the latest trends in cryptocurrency regulation and understand what the future holds for blockchain and crypto technology.",
    outcome: "You'll have a broad understanding of where cryptocurrency regulation is heading and how to stay compliant in an ever-changing industry.",
    complexity: "Advanced",
    internalId: "CT4P-021"
  },
];

const CourseModules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplexity, setSelectedComplexity] = useState<"Beginner" | "Intermediate" | "Advanced" | "all">("all");

  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesComplexity = 
        selectedComplexity === "all" || 
        module.complexity === selectedComplexity;

      return matchesSearch && matchesComplexity;
    });
  }, [searchQuery, selectedComplexity]);

  const totalPages = Math.ceil(filteredModules.length / ITEMS_PER_PAGE);
  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Course Modules</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning modules designed to take you from basics to advanced trading
          </p>
        </div>

        <div className="space-y-6">
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          <CourseFilters
            selectedComplexity={selectedComplexity}
            onComplexityChange={(complexity) => {
              setSelectedComplexity(complexity);
              setCurrentPage(1);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedModules.map((module) => (
              <CourseModule key={module.id} {...module} />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-xl text-gray-600">No modules found matching your criteria</p>
            </div>
          )}

          {filteredModules.length > ITEMS_PER_PAGE && (
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseModules;
