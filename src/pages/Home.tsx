import { Helmet } from "react-helmet";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { CountdownTimer } from "@/components/pricing/CountdownTimer";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingCard } from "@/components/pricing/PricingCard";
import { CourseStructure } from "@/components/course/CourseStructure";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import { useState } from "react";
import { PaymentToggle } from "@/components/pricing/PaymentToggle";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Cryptocurrency Trading Masterclass",
  "description": "Professional cryptocurrency trading course in Switzerland. Learn advanced trading strategies, technical analysis, and risk management.",
  "provider": {
    "@type": "Organization",
    "name": "KY Connect",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressRegion": "ZH",
      "postalCode": "8005",
      "streetAddress": "Turbinenstrasse 31",
      "addressCountry": "CH"
    }
  },
  "courseLanguage": ["de", "en"],
  "locationCreated": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressCountry": "Switzerland"
    }
  }
};

const Home = () => {
  const [paymentType, setPaymentType] = useState<"monthly" | "annual">("monthly");

  const handleStartJourney = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero
        title="Master Crypto Trading: Transform Your Financial Future Today"
        subtitle="Join Switzerland's premier trading program and learn to navigate the crypto market with confidence and profitability"
        buttonText="Join the Course"
        onButtonClick={handleStartJourney}
      />

      <ValueProposition />

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
      <CourseStructure />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of successful traders and learn the strategies that
            can transform your financial future.
          </p>
          <CTAButton
            text="Start Your Journey"
            className="bg-white text-primary hover:bg-white/90"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;