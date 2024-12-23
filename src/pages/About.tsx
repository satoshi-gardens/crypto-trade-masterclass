import PageLayout from "@/components/PageLayout";
import { Helmet } from "react-helmet";
import AboutHero from "@/components/about/AboutHero";
import CoachProfile from "@/components/about/CoachProfile";
import CourseFeatures from "@/components/about/CourseFeatures";
import { motion } from "framer-motion";

const About = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>About Bit2Big | Our Mission in Crypto Education</title>
        <meta 
          name="description" 
          content="Discover the story behind Bit2Big and meet the team dedicated to helping you master cryptocurrency investing. Learn about our mission to make digital assets accessible." 
        />
        <meta 
          name="keywords" 
          content="crypto education, cryptocurrency experts, Bit2Big mission, blockchain technology, digital assets education" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Bit2Big",
            "description": "Learn about Bit2Big's mission in cryptocurrency education",
            "mainEntity": {
              "@type": "Organization",
              "name": "Bit2Big",
              "description": "Leading cryptocurrency education platform",
              "founder": {
                "@type": "Person",
                "name": "Dr. Michael Kiberu",
                "jobTitle": "Founder & Lead Instructor"
              }
            }
          })}
        </script>
      </Helmet>

      <AboutHero />

      <div className="container mx-auto px-4">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 lg:py-24"
        >
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Your Personal Coach
          </h2>
          <CoachProfile />
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-16 lg:py-24"
        >
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Our Personal Course
          </h2>
          <CourseFeatures />
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default About;