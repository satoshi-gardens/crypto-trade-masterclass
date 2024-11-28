import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import PageLayout from "@/components/PageLayout";
import { ReferralRegistration } from "@/components/referral/ReferralRegistration";
import { ReferralStats } from "@/components/referral/ReferralStats";
import ReferralAdmin from "@/pages/ReferralAdmin";
import ReferralProgram from "@/pages/ReferralProgram";
import Index from "@/pages/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/referral-program" element={<ReferralProgram />} />
          <Route path="/referral-admin" element={<ReferralAdmin />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;