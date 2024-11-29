import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import CourseList from "@/components/CourseList";
import SearchBar from "@/components/SearchBar";
import ReferralBanner from "@/components/ReferralBanner";
import CourseModules from "@/components/course/CourseModules";
import { CourseStructure } from "@/components/course/CourseStructure";

const coursesData = [
  {
    id: "1",
    title: "Crypto Trading Fundamentals",
    description: "Master the basics of cryptocurrency trading with our comprehensive course designed for beginners.",
    duration: 6,
    price: 2000,
  },
  {
    id: "2",
    title: "Advanced Trading Strategies",
    description: "Take your trading to the next level with advanced technical analysis and risk management techniques.",
    duration: 8,
    price: 3000,
  },
  {
    id: "3",
    title: "Professional Trading Program",
    description: "Join our elite program for aspiring professional traders, featuring personalized mentoring and live trading sessions.",
    duration: 12,
    price: 5000,
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");

  return (
    <PageLayout>
      <Hero
        title="Cryptocurrency Trading Courses"
        subtitle="Transform your trading journey with our expert-led courses"
        showButton={false}
      />
      
      <div className="container mx-auto px-4">
        {referralCode && <ReferralBanner referralCode={referralCode} />}
        
        <section className="py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Path to Trading Excellence</h2>
            <p className="text-lg text-gray-600">
              Our comprehensive trading education program is designed to take you from beginner 
              to professional trader. With expert mentorship, practical exercises, and real-world 
              trading experience, you'll develop the skills needed to succeed in the cryptocurrency markets.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search courses and modules..."
            />
          </div>

          <div className="space-y-20">
            <section>
              <h2 className="text-3xl font-bold text-center mb-12">Course Packages</h2>
              <CourseList
                courses={coursesData}
                searchQuery={searchQuery}
              />
            </section>

            <CourseStructure />

            <section>
              <CourseModules />
            </section>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Courses;