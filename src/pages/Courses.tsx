import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import ModuleCarousel from "@/components/ModuleCarousel";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PaymentToggle } from "@/components/pricing/PaymentToggle";
import CourseModules from "@/components/course/CourseModules";
import CourseCurriculumOverview from "@/components/course/CourseCurriculumOverview";
import { Brain, Shield, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CHALLENGES = [
  {
    title: "Market Volatility",
    description: "Crypto markets operate 24/7 with high volatility, making it challenging to time entries and exits."
  },
  {
    title: "Information Overload",
    description: "With thousands of cryptocurrencies and constant market updates, finding reliable signals is overwhelming."
  },
  {
    title: "Technical Complexity",
    description: "Understanding blockchain technology and trading mechanics requires specialized knowledge."
  }
];

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
  const [currentPage] = useState(1);
  const [paymentType, setPaymentType] = useState<"monthly" | "annual">("monthly");

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    packagesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <Hero
        title="Master Cryptocurrency Trading"
        subtitle="Transform market complexity into profitable opportunities with our comprehensive trading courses"
        buttonText="Explore Our Courses"
        buttonLink="#packages"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Trading Challenges</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {CHALLENGES.map((challenge) => (
              <Card key={challenge.title} className="hover:shadow-lg transition-all duration-300 border-2 border-gray-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={scrollToPackages} className="group bg-primary hover:bg-primary/90">
              See Our Solution
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <CourseCurriculumOverview />
      <CourseModules />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Comprehensive Solution</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to mastering cryptocurrency trading through expert guidance and practical experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} 
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <PricingHeader />
          <PaymentToggle 
            paymentType={paymentType} 
            onToggle={setPaymentType} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
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
      <ModuleCarousel />
    </PageLayout>
  );
};

export default Courses;