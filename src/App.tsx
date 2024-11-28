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
          <Route path="/" element={<PageLayout><Index /></PageLayout>} />
          <Route path="/referral-program" element={<PageLayout><ReferralProgram /></PageLayout>} />
          <Route path="/referral-admin" element={<PageLayout><ReferralAdmin /></PageLayout>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;