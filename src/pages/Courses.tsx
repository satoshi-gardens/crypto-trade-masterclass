import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/PageLayout";
import CoursesHero from "@/components/courses/CoursesHero";
import ChallengesSection from "@/components/courses/ChallengesSection";
import SolutionsSection from "@/components/courses/SolutionsSection";
import CourseModules from "@/components/course/CourseModules";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    if (referralCode) {
      toast({
        title: "Referral Discount Applied!",
        description: "You're eligible for a 10% discount on your course purchase.",
        duration: 6000,
      });
    }
  }, [referralCode, toast]);

  return (
    <PageLayout>
      <CoursesHero />
      <ChallengesSection />
      <SolutionsSection />
      <CourseModules />
    </PageLayout>
  );
};

export default Courses;