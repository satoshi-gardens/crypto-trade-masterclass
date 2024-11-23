import React from "react";
import { Award, ChartBarIncreasing, ChartLine } from "lucide-react";

const benefits = [
  {
    icon: <ChartLine className="w-12 h-12 text-primary mb-4" />,
    title: "Master Trading Strategies",
    description: "Learn proven cryptocurrency trading techniques and risk management."
  },
  {
    icon: <Award className="w-12 h-12 text-primary mb-4" />,
    title: "Expert Guidance",
    description: "Get mentored by experienced Swiss crypto trading professionals."
  },
  {
    icon: <ChartBarIncreasing className="w-12 h-12 text-primary mb-4" />,
    title: "Market Analysis",
    description: "Access exclusive insights and advanced technical analysis tools."
  }
];

const ValueProposition = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Why Choose Our Trading Masterclass?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;