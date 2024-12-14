import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/PageLayout";
import CoursesHero from "@/components/courses/CoursesHero";
import ChallengesSection from "@/components/courses/ChallengesSection";
import SolutionsSection from "@/components/courses/SolutionsSection";
import CourseModules from "@/components/course/CourseModules";
import ModuleCarousel from "@/components/ModuleCarousel";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { CountdownTimer } from "@/components/pricing/CountdownTimer";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PaymentToggle } from "@/components/pricing/PaymentToggle";
import { useState } from "react";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const referralCode = searchParams.get("ref");
  const [paymentType, setPaymentType] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    if (referralCode) {
      toast({
        title: "Referral Discount Applied!",
        description: "You're eligible for a 10% discount on your course purchase.",
        duration: 6000,
      });
    }

    // Check if we need to scroll to packages section (from URL hash)
    if (window.location.hash === '#packages') {
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [referralCode, toast]);

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout>
      <CoursesHero onStartJourney={handleStartJourney} />
      <ChallengesSection />
      <SolutionsSection />
      <CourseModules />

      {/* Pricing Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <PricingHeader />
          <CountdownTimer />
          <PaymentToggle paymentType={paymentType} onToggle={setPaymentType} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PricingCard
              title="Online Training"
              monthlyPrice={1800}
              annualPrice={9720}
              description="Designed for independent learners who value flexibility and small-group dynamics."
              features={[
                "Group-focused virtual sessions (max 5 participants)",
                "Coach reachable for inquiries during group time",
                "Weekly live online sessions",
                "Interactive assignments and quizzes",
                "Community access for peer support"
              ]}
              maxStudents={5}
              paymentType={paymentType}
            />
            <PricingCard
              title="Premium (In-Person)"
              monthlyPrice={3240}
              annualPrice={17496}
              description="The ultimate personalized experience with Fast Track option to complete in 3.5 months."
              features={[
                "Fast Track option: Complete in 3.5 months",
                "Tailored one-on-one coaching with unlimited session access",
                "Signals provided from the second month",
                "Personal support outside regular sessions",
                "Direct phone access to trainer",
                "Lifetime access to premium resources"
              ]}
              isPopular={true}
              additionalHourlyRate={450}
              paymentType={paymentType}
            />
            <PricingCard
              title="Hybrid Training"
              monthlyPrice={2700}
              annualPrice={14580}
              description="A perfect balance of personal coaching and peer collaboration."
              features={[
                "Small-group in-person and online sessions",
                "Signals provided from the second month",
                "Monthly in-person sessions",
                "Weekly online group discussions",
                "Access to premium tools"
              ]}
              maxStudents={5}
              additionalHourlyRate={450}
              paymentType={paymentType}
            />
          </div>
        </div>
      </section>

      <TrustSignals />
      <ModuleCarousel />
    </PageLayout>
  );
};

export default Courses;