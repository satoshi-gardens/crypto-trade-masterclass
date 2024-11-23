export interface CourseModuleData {
  id: string;
  title: string;
  description: string;
  outcome: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  internalId: string;
  isExtra?: boolean;
}

const modules: CourseModuleData[] = [
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

const extraModules: CourseModuleData[] = [
  {
    id: "22",
    title: "Meme Tokens and Viral Cryptocurrencies",
    description: "Explore the phenomenon of meme tokens, their origins, market dynamics, and the factors contributing to their viral success.",
    outcome: "Gain insights into the speculative nature of meme tokens and learn strategies to navigate their volatile markets.",
    complexity: "Intermediate",
    internalId: "CT4P-022",
    isExtra: true
  },
  {
    id: "23",
    title: "Real-World Asset (RWA) Tokenization",
    description: "Understand how physical assets like real estate, art, and commodities are being tokenized on blockchain platforms, enabling fractional ownership and increased liquidity.",
    outcome: "Learn the processes and benefits of RWA tokenization and its impact on traditional investment landscapes.",
    complexity: "Advanced",
    internalId: "CT4P-023",
    isExtra: true
  },
  {
    id: "24",
    title: "Decentralized Physical Infrastructure Networks (DePIN)",
    description: "Delve into DePINs, which leverage blockchain to decentralize physical infrastructure, promoting community ownership and operation of resources like wireless networks and energy grids.",
    outcome: "Understand the applications and potential of DePINs in transforming traditional infrastructure models.",
    complexity: "Advanced",
    internalId: "CT4P-024",
    isExtra: true
  },
  {
    id: "25",
    title: "Artificial Intelligence in Blockchain",
    description: "Explore the integration of AI with blockchain technology, including AI-driven smart contracts, predictive analytics, and enhanced security measures.",
    outcome: "Gain knowledge of how AI is augmenting blockchain applications and the future prospects of this synergy.",
    complexity: "Advanced",
    internalId: "CT4P-025",
    isExtra: true
  },
  {
    id: "26",
    title: "Cryptocurrency Regulations in Switzerland and Neighboring Countries",
    description: "Examine the regulatory frameworks governing cryptocurrencies in Switzerland and its neighboring countries, focusing on compliance requirements and legal considerations.",
    outcome: "Develop a comprehensive understanding of the regional regulatory landscape to ensure informed and compliant crypto trading and investment decisions.",
    complexity: "Advanced",
    internalId: "CT4P-026",
    isExtra: true
  },
  {
    id: "27",
    title: "Advanced DeFi Protocols and Mechanisms",
    description: "Delve into complex DeFi protocols such as Uniswap, Curve, and Aave. Understand their underlying mechanisms, including automated market makers (AMMs), liquidity pools, and lending/borrowing platforms.",
    outcome: "Gain the ability to analyze and utilize advanced DeFi protocols for optimized trading and investment strategies.",
    complexity: "Advanced",
    internalId: "CT4P-027",
    isExtra: true
  },
  {
    id: "28",
    title: "Yield Farming and Liquidity Mining Strategies",
    description: "Explore the concepts of yield farming and liquidity mining, focusing on how to earn rewards by providing liquidity to DeFi platforms.",
    outcome: "Develop strategies to maximize returns through yield farming while understanding associated risks.",
    complexity: "Advanced",
    internalId: "CT4P-028",
    isExtra: true
  },
  {
    id: "29",
    title: "Cross-Chain Interoperability and Bridges",
    description: "Examine the importance of cross-chain interoperability in DeFi, including the use of blockchain bridges to transfer assets between different blockchain networks.",
    outcome: "Learn how to navigate and utilize cross-chain platforms to enhance trading and investment opportunities.",
    complexity: "Advanced",
    internalId: "CT4P-029",
    isExtra: true
  },
  {
    id: "30",
    title: "Decentralized Autonomous Organizations (DAOs) in DeFi",
    description: "Understand the role of DAOs in the governance of DeFi projects, including their structure, decision-making processes, and impact on protocol development.",
    outcome: "Acquire the knowledge to participate in or establish DAOs, contributing to decentralized governance in the DeFi ecosystem.",
    complexity: "Advanced",
    internalId: "CT4P-030",
    isExtra: true
  },
  {
    id: "31",
    title: "Smart Contract Development and Auditing",
    description: "Learn the fundamentals of smart contract development using Solidity, along with best practices for auditing and ensuring security in DeFi applications.",
    outcome: "Gain the skills to develop and audit smart contracts, enhancing the security and reliability of DeFi platforms.",
    complexity: "Advanced",
    internalId: "CT4P-031",
    isExtra: true
  },
];

export const allModules = [...modules, ...extraModules];
