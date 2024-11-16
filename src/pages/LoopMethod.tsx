import { BookOpen, Settings, Eye, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import TestimonialCard from "@/components/TestimonialCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoopMethod = () => {
  const steps = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Learn",
      description: "Master the fundamentals of cryptocurrency trading.",
      details: [
        "Understand blockchain technology",
        "Learn market dynamics",
        "Master trading strategies"
      ]
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Optimize",
      description: "Discover tools to streamline your trading strategies.",
      details: [
        "Reduce trading costs",
        "Manage risks effectively",
        "Automate repetitive tasks"
      ]
    },
    {
      icon: <Eye className="w-12 h-12 text-primary" />,
      title: "Observe",
      description: "Analyze market trends and data effectively.",
      details: [
        "Identify patterns",
        "Monitor market sentiment",
        "Make data-driven decisions"
      ]
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Profit",
      description: "Consistently achieve returns on your investments.",
      details: [
        "Execute calculated trades",
        "Learn from mistakes",
        "Continuously improve"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Michael S.",
      role: "Full-time Trader",
      content: "The LOOP Method transformed my trading journey. It provided me with a clear framework for success that I still use today.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Sarah K.",
      role: "Investment Analyst",
      content: "What sets the LOOP Method apart is its emphasis on continuous improvement. It's not just about making profits, but becoming a better trader.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-primary py-20 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Master Crypto Trading with the LOOP Method
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Learn how to trade smarter, not harder. The LOOP Method empowers traders with a clear pathway to success, combining technical expertise, market insights, and the right mindset for sustainable profitability.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/courses">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* LOOP Method Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">The LOOP Method Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={step.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{step.icon}</div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mindset Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">The Mindset for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Discipline", content: "Stick to your strategy and avoid emotional decisions." },
              { title: "Patience", content: "Understand that profits grow over time; avoid rushing trades." },
              { title: "Adaptability", content: "Stay open to learning and evolving with market conditions." }
            ].map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your LOOP Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our courses, tools, and community resources today. Let's trade smarter together.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/courses">View Courses</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LoopMethod;