import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import Tools from "@/pages/Tools";
import Testimonials from "@/pages/Testimonials";
import ThankYou from "@/pages/ThankYou";
import ThankYouFeedback from "@/pages/ThankYouFeedback";
import VerifyReferral from "@/pages/verify-referral";
import VerifyTestimonial from "@/pages/verify-testimonial";
import ReferralIndex from "@/pages/referral/Index";
import LoopMethod from "@/pages/LoopMethod";
import Feedback from "@/pages/Feedback";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/resources" element={<Navigate to="/tools" replace />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thank-you-feedback" element={<ThankYouFeedback />} />
        <Route path="/verify-referral" element={<VerifyReferral />} />
        <Route path="/verify-testimonial" element={<VerifyTestimonial />} />
        <Route path="/referral/*" element={<ReferralIndex />} />
        <Route path="/loop-method" element={<LoopMethod />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;