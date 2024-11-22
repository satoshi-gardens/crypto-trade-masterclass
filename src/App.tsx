import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import LoopMethod from "./pages/LoopMethod";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import CryptoBasics from "./pages/guides/CryptoBasics";
import AITrading from "./pages/guides/AITrading";
import TradingFundamentals from "./pages/guides/TradingFundamentals";
import Security from "./pages/guides/Security";
import CryptoBasicsGuide from "./pages/guides/CryptoBasicsGuide";
import AdvancedStrategies from "./pages/guides/AdvancedStrategies";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loop-method" element={<LoopMethod />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/guides/crypto-basics" element={<CryptoBasics />} />
          <Route path="/guides/ai-trading" element={<AITrading />} />
          <Route path="/guides/trading-fundamentals" element={<TradingFundamentals />} />
          <Route path="/guides/security" element={<Security />} />
          <Route path="/guides/crypto-basics-guide" element={<CryptoBasicsGuide />} />
          <Route path="/guides/advanced-strategies" element={<AdvancedStrategies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;