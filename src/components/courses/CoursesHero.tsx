import { Button } from "@/components/ui/button";

interface CoursesHeroProps {
  onStartJourney?: () => void;
}

const CoursesHero = ({ onStartJourney }: CoursesHeroProps) => {
  return (
    <section className="py-16 text-center bg-gradient-to-b from-purple-50 to-white">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Master Cryptocurrency Trading
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Transform your financial future with Switzerland's premier trading program. 
        Navigate the crypto market with confidence and profitability.
      </p>
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90"
        onClick={onStartJourney}
      >
        Explore Our Courses
      </Button>
    </section>
  );
};

export default CoursesHero;