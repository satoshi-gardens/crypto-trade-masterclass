import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import CourseList from "@/components/CourseList";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import ReferralBanner from "@/components/ReferralBanner";

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
      
      <div className="container mx-auto px-4 py-12">
        {referralCode && <ReferralBanner referralCode={referralCode} />}
        
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>

        <CourseList
          courses={coursesData}
          searchQuery={searchQuery}
        />
      </div>
    </PageLayout>
  );
};

export default Courses;