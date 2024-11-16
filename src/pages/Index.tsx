import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-primary py-20 text-white">
        <div className="container mx-auto px-6 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Master Crypto Trading for Sustainable Profits
            </h1>
            <p className="text-xl mb-8">
              Learn proven strategies, risk management, and the unique LOOP Method
              to build lasting wealth through cryptocurrency trading.
            </p>
            <div className="space-x-4">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                <Link to="/courses">Start Learning</Link>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our Program?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-primary" />,
                title: "Comprehensive Curriculum",
                description:
                  "From basics to advanced strategies, learn everything you need to succeed in crypto trading.",
              },
              {
                icon: <Wrench className="w-12 h-12 text-primary" />,
                title: "Professional Tools",
                description:
                  "Access premium trading tools and resources used by successful traders.",
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Expert Mentorship",
                description:
                  "Learn from experienced traders who have mastered the markets.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Full-time Trader"
              content="The LOOP Method changed my approach to trading. I'm now consistently profitable and have achieved financial freedom."
              imageUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Investment Analyst"
              content="The course provided me with a solid foundation in crypto trading. The tools and community support are invaluable."
              imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Trading Journey?
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
              Explore Courses <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;