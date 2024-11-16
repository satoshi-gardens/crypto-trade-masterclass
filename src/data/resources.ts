import { ResourceCategory } from "@/types/resources";

export const RESOURCES_DATA: ResourceCategory[] = [
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
];