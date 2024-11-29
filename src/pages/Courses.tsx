import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import CourseList from "@/components/CourseList";
import ReferralBanner from "@/components/ReferralBanner";
import CourseModules from "@/components/course/CourseModules";
import ModuleCarousel from "@/components/ModuleCarousel";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CoursesHero from "@/components/courses/CoursesHero";
import ChallengesSection from "@/components/courses/ChallengesSection";
import SolutionsSection from "@/components/courses/SolutionsSection";

const coursesData = [
  {
    id: "1",
    title: "Online Training",
    description: "Designed for independent learners who value flexibility and small-group dynamics.",
    duration: 6,
    price: 1800,
    packageType: "Online",
    features: [
      "Group-focused virtual sessions (max 5 participants)",
      "Coach reachable for inquiries during group time",
      "Weekly live online sessions",
      "Interactive assignments and quizzes",
      "Community access for peer support"
    ],
    maxStudents: 5,
    monthlyPayment: 1800
  },
  {
    id: "2",
    title: "Premium (In-Person)",
    description: "The ultimate personalized experience with Fast Track option to complete in 3.5 months.",
    duration: 3.5,
    price: 3240,
    packageType: "Premium",
    features: [
      "Fast Track option: Complete in 3.5 months",
      "Tailored one-on-one coaching with unlimited session access",
      "Signals provided from the second month",
      "Personal support outside regular sessions",
      "Direct phone access to trainer",
      "Lifetime access to premium resources"
    ],
    additionalHourlyRate: 450,
    monthlyPayment: 3240,
    isPopular: true
  },
  {
    id: "3",
    title: "Hybrid Training",
    description: "A perfect balance of personal coaching and peer collaboration.",
    duration: 6,
    price: 2700,
    packageType: "Hybrid",
    features: [
      "Small-group in-person and online sessions",
      "Signals provided from the second month",
      "Monthly in-person sessions",
      "Weekly online group discussions",
      "Access to premium tools"
    ],
    maxStudents: 5,
    additionalHourlyRate: 450,
    monthlyPayment: 2700
  },
];

const Courses = () => {
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
        
        <CoursesHero />
        <ChallengesSection />
        <CourseModules />
        <SolutionsSection />

        <section className="py-16" id="packages">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Path to Financial Independence</h2>
            <p className="text-lg text-gray-600">
              Join an exclusive program designed for ambitious individuals seeking mastery in
              cryptocurrency trading. Our proven framework delivers measurable results through
              personalized mentorship.
            </p>
          </div>

          <CourseList
            courses={coursesData}
            searchQuery=""
          />
        </section>
        
        <ModuleCarousel />
      </div>
    </PageLayout>
  );
};

export default Courses;