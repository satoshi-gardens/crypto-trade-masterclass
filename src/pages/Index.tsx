import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import PageLayout from "@/components/PageLayout";
import ModuleCarousel from "@/components/ModuleCarousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Our Trading Course?</h2>
            <p className="text-xl text-gray-600 mb-8">
              In a market where 95% of traders lose money, our students consistently achieve profitability through proven methods and personalized mentorship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700">Average ROI of 127% for our graduates in their first year</p>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700">Direct mentorship from industry experts with 10+ years experience</p>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700">Lifetime access to our trading community and resources</p>
              </div>
            </div>
          </div>

          {/* Course Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative hover:shadow-xl transition-shadow animate-fade-in">
              <CardHeader>
                <Badge className="w-fit mb-4">Premium</Badge>
                <CardTitle>In-Person Training</CardTitle>
                <CardDescription>One-on-one personalized training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">15,000 CHF</p>
                  <p className="text-gray-600">6-month program</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Personal 1-on-1 sessions with Michael Kiberu</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Customized learning path</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Direct phone access for urgent queries</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/contact">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-shadow animate-fade-in delay-100">
              <CardHeader>
                <Badge className="w-fit mb-4" variant="secondary">Hybrid</Badge>
                <CardTitle>Hybrid Training</CardTitle>
                <CardDescription>Mix of in-person & online (max 5 students)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">12,000 CHF</p>
                  <p className="text-gray-600">6-month program</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Monthly in-person sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Weekly online group sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Access to recorded sessions</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/contact">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-shadow animate-fade-in delay-200">
              <CardHeader>
                <Badge className="w-fit mb-4" variant="outline">Online</Badge>
                <CardTitle>Online Training</CardTitle>
                <CardDescription>Virtual group sessions (max 5 students)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">8,000 CHF</p>
                  <p className="text-gray-600">6-month program</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Live online group sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Interactive learning platform</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Community support</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/contact">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
