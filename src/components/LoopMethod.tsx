import { BookOpen, Settings, Eye, DollarSign } from "lucide-react";

const LoopMethod = () => {
  const steps = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Learn",
      description: "Master the fundamentals of crypto trading.",
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Optimize",
      description: "Discover tools to streamline your trading strategies.",
    },
    {
      icon: <Eye className="w-12 h-12 text-primary" />,
      title: "Observe",
      description: "Analyze market trends and data effectively.",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Profit",
      description: "Consistently achieve returns on your investments.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">The LOOP Method</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Learn the step-by-step LOOP Method to trade profitably
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoopMethod;