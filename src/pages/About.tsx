import PageLayout from "@/components/PageLayout";
import { Helmet } from "react-helmet";
import AboutHero from "@/components/about/AboutHero";
import CoachProfile from "@/components/about/CoachProfile";
import CourseFeatures from "@/components/about/CourseFeatures";

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

      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">About Your Personal Coach</h2>
          <CoachProfile />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">About Our Personal Course</h2>
          <CourseFeatures />
        </section>
      </div>
    </PageLayout>
  );
};

export default About;