import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { Helmet } from "react-helmet";

const About = () => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate("/courses#packages");
  };

  const achievements = [
    "Creator of the LOOP (Live On yOur Profits) Method",
    "Featured speaker at multiple blockchain conferences in Europe",
    "Profiled in Spiegel Germany",
    "TEDx Speaker on the future of finance and cryptocurrency",
  ];

  const courseFeatures = [
    "One-on-one sessions with Dr. Michael Kiberu",
    "Customized learning path based on your goals and experience",
    "Real-time market analysis and trading practice",
    "Access to proprietary trading tools and resources",
    "Ongoing support and mentorship",
  ];

  const courseRequirements = [
    "A laptop or desktop computer",
    "A trading account (we'll set this up together on the first day)",
    "Starting capital of at least 1000 CHF",
    "Dedication and willingness to learn",
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>About Bit2Big | Our Mission in Crypto Education</title>
        <meta name="description" content="Discover the story behind Bit2Big and meet the team dedicated to helping you master cryptocurrency investing. Learn about our mission to make digital assets accessible." />
        <meta name="keywords" content="crypto education, cryptocurrency experts, Bit2Big mission, blockchain technology, digital assets education" />
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

      <Hero
        title="Our Mission: Making Digital Assets Matter"
        subtitle="We started Bit2Big with a clear vision: to demystify cryptocurrency trading and create awareness of blockchain's transformative potential."
        showButton={false}
      />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">About Your Personal Coach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Dr. Michael Kiberu"
                className="rounded-lg w-full object-cover aspect-square"
              />
            </div>
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-semibold">Dr. Michael Kiberu</h3>
              <p className="text-muted-foreground">
                Dr. Michael Kiberu is a seasoned cryptocurrency trader and educator with over a decade
                of experience in the financial markets. His journey in the crypto space began in
                the early days of Bitcoin, and he has since become a respected voice in the
                industry.
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Key Achievements</h4>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Our Story</h4>
                <p className="text-muted-foreground">
                  Bit2Big was born from a simple observation: while blockchain technology and cryptocurrencies 
                  were revolutionizing finance, most people lacked the knowledge to participate confidently. 
                  We set out to change that by creating a comprehensive education platform that makes digital 
                  assets accessible to everyone.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Teaching Philosophy</h4>
                <p className="text-muted-foreground">
                  Our approach combines theoretical understanding with practical application. We believe in 
                  empowering our students with both knowledge and hands-on experience, ensuring they can 
                  navigate the crypto markets with confidence and success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">About Our Personal Course</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {courseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {courseRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleBookSession}>
              Book Your First Session
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;