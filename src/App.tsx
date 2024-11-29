import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import Tools from "@/pages/Tools";
import LoopMethod from "@/pages/LoopMethod";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Referral from "@/pages/Referral";
import Testimonials from "@/pages/Testimonials";
import Feedback from "@/pages/Feedback";
import VerifyTestimonial from "@/pages/verify-testimonial";
import ThankYouFeedback from "@/pages/ThankYouFeedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/tools",
    element: <Tools />,
  },
  {
    path: "/loop-method",
    element: <LoopMethod />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/referral",
    element: <Referral />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/verify-testimonial",
    element: <VerifyTestimonial />,
  },
  {
    path: "/thank-you-feedback",
    element: <ThankYouFeedback />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;