import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import CourseList from "@/components/CourseList";
import SearchBar from "@/components/SearchBar";
import ReferralBanner from "@/components/ReferralBanner";
import CourseModules from "@/components/course/CourseModules";
import ModuleCarousel from "@/components/ModuleCarousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Book, Users, ChartBar } from "lucide-react";

const coursesData = [
  {
    id: "1",
    title: "Online Training",
    description: "Perfect for self-paced learning with comprehensive online resources.",
    duration: 6,
    price: 1800,
    packageType: "Online",
  },
  {
    id: "2",
    title: "Premium (In-Person)",
    description: "Intensive in-person training with direct mentorship and hands-on practice.",
    duration: 8,
    price: 3240,
    packageType: "Premium",
  },
  {
    id: "3",
    title: "Hybrid Training",
    description: "Combine online flexibility with periodic in-person sessions for optimal learning.",
    duration: 12,
    price: 2700,
    packageType: "Hybrid",
  },
];

const challenges = [
  {
    title: "Market Volatility",
    description: "Crypto markets are highly volatile, making it challenging to maintain consistent profits.",
    icon: ChartBar,
  },
  {
    title: "Information Overload",
    description: "The abundance of information makes it difficult to identify reliable sources and strategies.",
    icon: Book,
  },
  {
    title: "Technical Complexity",
    description: "Understanding blockchain technology and trading mechanics can be overwhelming.",
    icon: Users,
  },
];

const solutions = [
  {
    title: "Fundamentals Training",
    description: "Build a solid foundation in crypto trading basics and market analysis.",
    icon: "📊",
  },
  {
    title: "AI & Advanced Trading",
    description: "Learn to leverage cutting-edge tools and AI-powered analysis for better trading decisions.",
    icon: "🤖",
  },
  {
    title: "Community & Essentials",
    description: "Join a supportive community of traders and access essential trading resources.",
    icon: "👥",
  },
  {
    title: "Holistic Onboarding",
    description: "Get step-by-step guidance through every aspect of crypto trading.",
    icon: "🎯",
  },
  {
    title: "Tailored Learning",
    description: "Personalized learning paths to match your goals and experience level.",
    icon: "📚",
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    const verifyReferralCode = async () => {
      if (!referralCode) return;

      try {
        const { data: referrer } = await supabase
          .from("referrers")
          .select("*")
          .eq("verification_token", referralCode)
          .single();

        if (referrer) {
          await supabase
            .from("referrers")
            .update({ is_verified: true, verification_token: null })
            .eq("id", referrer.id);

          toast({
            title: "Email Verified!",
            description: "Your referral account has been verified. You can now start referring others!",
          });
        }
      } catch (error) {
        console.error("Error verifying referral code:", error);
      }
    };

    verifyReferralCode();
  }, [referralCode, toast]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        {referralCode && <ReferralBanner referralCode={referralCode} />}
        
        <section className="py-16 text-center bg-gradient-to-b from-purple-50 to-white">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Master Cryptocurrency Trading
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your financial future with Switzerland's premier trading program. 
            Navigate the crypto market with confidence and profitability.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a href="#packages">Explore Our Courses</a>
          </Button>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Common Trading Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <challenge.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">{challenge.title}</h3>
                </div>
                <p className="text-gray-600">{challenge.description}</p>
                <Button variant="link" className="mt-4 text-primary">
                  How We Address It →
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <CourseModules />

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Comprehensive Solution</h2>
            <p className="text-lg text-gray-600">
              A complete approach to mastering cryptocurrency trading through expert
              guidance and practical experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
            {solutions.map((solution, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{solution.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16" id="packages">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Path to Financial Independence</h2>
            <p className="text-lg text-gray-600">
              Join an exclusive program designed for ambitious individuals seeking mastery in
              cryptocurrency trading. Our proven framework delivers measurable results through
              personalized mentorship.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search courses and packages..."
            />
          </div>

          <CourseList
            courses={coursesData}
            searchQuery={searchQuery}
          />
        </section>
        
        <ModuleCarousel />
      </div>
    </PageLayout>
  );
};

export default Courses;