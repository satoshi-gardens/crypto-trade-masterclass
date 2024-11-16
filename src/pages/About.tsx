import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";

const About = () => {
  const navigate = useNavigate();

  const achievements = [
    "Creator of the LOOP (Live On yOur Profits) Method",
    "Featured speaker at Blockchance, a leading blockchain conference in Europe",
    "Profiled in Spiegel Germany",
    "TEDx Speaker on the future of finance and cryptocurrency",
  ];

  const courseFeatures = [
    "One-on-one sessions with Michael Kiberu",
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
      <Hero
        title="About Us"
        subtitle="Learn about our journey and commitment to crypto education"
      />
      <div className="container mx-auto px-4 py-12 space-y-16">
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
            <Button size="lg" onClick={() => navigate("/contact")}>
              Book Your First Session
            </Button>
          </div>
        </section>

        {/* Personal Coach Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">About Your Personal Coach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Michael Kiberu"
                className="rounded-lg w-full object-cover aspect-square"
              />
            </div>
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-semibold">Michael Kiberu</h3>
              <p className="text-muted-foreground">
                Michael Kiberu is a seasoned cryptocurrency trader and educator with over a decade
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
                <h4 className="text-xl font-semibold">Background and Expertise</h4>
                <p className="text-muted-foreground">
                  With a background in finance and computer science, Michael brings a unique
                  perspective to cryptocurrency trading. He has successfully navigated multiple
                  market cycles, developing robust strategies that have stood the test of time.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Teaching Philosophy</h4>
                <p className="text-muted-foreground">
                  Michael's teaching philosophy centers on empowering his students with knowledge
                  and practical skills. He believes in a hands-on approach, combining theoretical
                  understanding with real-world application.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;