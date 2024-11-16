import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Blockchain Basics",
    description: "Dive into the bedrock of cryptocurrencies.",
    level: "Beginner",
  },
  {
    title: "AI in Trading",
    description: "Explore advanced applications of AI in trading.",
    level: "Advanced",
  },
  {
    title: "Risk Management",
    description: "Learn to minimize losses and maximize returns.",
    level: "Intermediate",
  },
  {
    title: "Technical Analysis",
    description: "Master chart patterns and indicators.",
    level: "Intermediate",
  },
  {
    title: "Fundamental Analysis",
    description: "Evaluate crypto projects effectively.",
    level: "Advanced",
  },
];

const ModuleCarousel = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Featured Modules</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Explore our comprehensive learning modules
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {modules.map((module) => (
              <CarouselItem key={module.title} className="md:basis-1/3 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <span className="inline-block px-2 py-1 text-sm text-white bg-primary rounded">
                      {module.level}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ModuleCarousel;