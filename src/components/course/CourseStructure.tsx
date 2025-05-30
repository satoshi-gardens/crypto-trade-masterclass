import { Clock, BookOpen, HeadphonesIcon, Signal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseTimeline } from "./CourseTimeline";
import { CourseFAQ } from "./CourseFAQ";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StructureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center gap-4">
      <Icon className="w-8 h-8 text-primary" />
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export const CourseStructure = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">How the Course is Structured</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our 6-month program is designed for busy professionals and high-achievers. With a focused and flexible schedule, 
            the course ensures maximum learning with minimal disruption to your daily commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <StructureItem
            icon={Clock}
            title="Time Commitment"
            description="1-2 hours per week for live or in-person sessions. 3 weeks of active learning per month, ensuring time for self-study and practice."
          />
          <StructureItem
            icon={BookOpen}
            title="Modules and Blockbits"
            description="Each module includes practical Blockbits exercises designed to reinforce learning and build real-world trading skills. Modules are self-contained for flexible progression."
          />
          <StructureItem
            icon={HeadphonesIcon}
            title="Coach Support"
            description="Your coach is available during and outside scheduled sessions for inquiries and personalized feedback. Premium and Hybrid groups receive additional support via signals from month two."
          />
          <StructureItem
            icon={Signal}
            title="Signals and Insights"
            description="Premium and Hybrid participants receive exclusive trading signals to accelerate learning and profitability, providing real-world trading opportunities."
          />
        </div>

        <CourseTimeline />

        <div className="mt-12 text-center">
          <blockquote className="text-xl italic text-gray-600 max-w-2xl mx-auto mb-8">
            "The flexible structure allowed me to maintain my executive role while mastering crypto trading. 
            The focused sessions and practical exercises made every minute count."
            <footer className="text-sm mt-4 text-gray-500">
              — David R., Chief Investment Officer
            </footer>
          </blockquote>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg
                      font-bold shadow-lg hover:shadow-xl transition-all duration-300
                      text-lg"
          >
            <Link to="/courses">Join the Course</Link>
          </Button>
        </div>

        <CourseFAQ />

        <div className="text-center mt-12">
          <p className="text-2xl font-bold mb-4">Don't wait—seize this opportunity to transform your trading journey.</p>
          <p className="text-lg text-gray-600 mb-8">Book your course now and secure your December discount before spaces fill up!</p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg
                      font-bold shadow-lg hover:shadow-xl transition-all duration-300
                      text-lg"
          >
            <Link to="/courses">Join the Course</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};