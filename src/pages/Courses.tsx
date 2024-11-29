import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ReferralBanner from "@/components/ReferralBanner";
import CourseModules from "@/components/course/CourseModules";

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
        
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses..."
          />
        </div>

        <CourseModules />
      </div>
    </PageLayout>
  );
};

export default Courses;