import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import PageLayout from "@/components/PageLayout";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { CountdownTimer } from "@/components/pricing/CountdownTimer";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingCard } from "@/components/pricing/PricingCard";
import { CourseStructure } from "@/components/course/CourseStructure";
import Hero from "@/components/Hero";
import { Helmet } from "react-helmet";

const Index = () => {
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

  return (
    <PageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero
        title="Professional Crypto Trading Course in Switzerland"
        subtitle="Master cryptocurrency trading with Switzerland's leading experts. Comprehensive training in Zürich for beginners to advanced traders."
        buttonText="Explore Courses"
        buttonLink="/courses"
      />

      {/* Rest of the sections */}
      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <PricingHeader />
          <CountdownTimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PricingCard
              title="Online Training"
              price={12000}
              discountedPrice={10800}
              description="Designed for independent learners who value flexibility and small-group dynamics."
              features={[
                "Group-focused virtual sessions (max 5 participants)",
                "Coach reachable for inquiries during group time",
                "Weekly live online sessions",
                "Interactive assignments and quizzes",
                "Community access for peer support"
              ]}
              maxStudents={5}
            />
            <PricingCard
              title="Premium (In-Person)"
              price={21600}
              discountedPrice={19440}
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
            />
            <PricingCard
              title="Hybrid Training"
              price={18000}
              discountedPrice={16200}
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
            />
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* Course Structure Section */}
      <CourseStructure />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Michael S."
              role="Full-time Trader"
              content="This course transformed my trading journey. The LOOP method provided me with a clear framework for success."
              imageUrl="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
            />
            <TestimonialCard
              name="Sarah K."
              role="Investment Analyst"
              content="The structured approach and expert guidance helped me build a solid foundation in crypto trading."
              imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            />
          </div>
        </div>
      </section>

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
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/courses">
              Get Started Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
