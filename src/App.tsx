import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thank-you-feedback" element={<ThankYouFeedback />} />
        <Route path="/verify-referral" element={<VerifyReferral />} />
        <Route path="/verify-testimonial" element={<VerifyTestimonial />} />
        <Route path="/referral/*" element={<ReferralIndex />} />
      </Routes>
    </Router>
  );
}

export default App;