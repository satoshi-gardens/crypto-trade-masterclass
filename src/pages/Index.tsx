import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import PageLayout from "@/components/PageLayout";
import LoopMethod from "@/components/LoopMethod";
import ModuleCarousel from "@/components/ModuleCarousel";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-primary py-20 text-white">
        <div className="container mx-auto px-6 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Start Trading Crypto Profitably in 2 Weeks
            </h1>
            <p className="text-xl mb-8">
              Learn from experts with proven methods
            </p>
            <div className="space-x-4">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Link to="/loop-method">Discover LOOP Method</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LOOP Method Section */}
      <LoopMethod />

      {/* Modules Section */}
      <ModuleCarousel />

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