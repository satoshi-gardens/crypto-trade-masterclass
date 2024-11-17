import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import ModuleCarousel from "@/components/ModuleCarousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { Brain, Shield, BookOpen, Users, Award } from "lucide-react";

const BENEFITS = [
  {
    icon: BookOpen,
    title: "Foundation in Trading",
    description: "Build a solid understanding of blockchain and cryptocurrency fundamentals."
  },
  {
    icon: Brain,
    title: "AI for Advanced Trading",
    description: "Use cutting-edge AI tools for market research and automated decision-making."
  },
  {
    icon: Shield,
    title: "Cybersecurity Essentials",
    description: "Protect your digital assets and trades from evolving threats."
  },
  {
    icon: Award,
    title: "Hands-On Learning",
    description: "Apply your knowledge through Blockbits exercises and community projects."
  },
  {
    icon: Users,
    title: "Tailored Learning",
    description: "Customize your learning journey with optional modules for deeper specialization."
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const [currentPage] = useState(1);

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    packagesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <Hero
        title="Transform Your Trading Journey"
        subtitle="Master cryptocurrency trading with our comprehensive program designed for ambitious individuals."
        backgroundClass="bg-gradient-to-r from-primary/95 to-secondary/95"
      />

      {/* Core Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} 
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
                <benefit.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Modules */}
      <section className="bg-gray-50">
        <ModuleCarousel />
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-accent to-accent/95">
        <div className="container mx-auto px-6">
          <PricingHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              description="The ultimate personalized experience for those serious about achieving excellence."
              features={[
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

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Take the First Step Toward Financial Freedom</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join a growing community of successful traders who have mastered the art of cryptocurrency trading.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={scrollToPackages}
              variant="secondary"
              size="lg"
              className="animate-fade-in bg-white text-primary hover:bg-white/90"
            >
              Explore Packages
            </Button>
            <Button
              onClick={() => navigate("/checkout")}
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 animate-fade-in"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-4 text-center text-muted-foreground">
        <p>Showing {(currentPage - 1) * 6 + 1}-{Math.min(currentPage * 6, 21)} of 21 modules</p>
      </div>
    </PageLayout>
  );
};

export default Courses;