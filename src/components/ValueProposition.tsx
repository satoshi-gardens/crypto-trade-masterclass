import React from "react";
import { Award, ChartBarIncreasing, ChartLine } from "lucide-react";

const benefits = [
  {
    icon: <ChartLine className="w-12 h-12 text-primary mb-4" />,
    title: "Expert Trading Strategies",
    description: "Learn risk management and proven cryptocurrency trading techniques from experienced professionals."
  },
  {
    icon: <Award className="w-12 h-12 text-primary mb-4" />,
    title: "Swiss Quality Education",
    description: "Get mentored by experienced Swiss crypto trading professionals with a track record of success."
  },
  {
    icon: <ChartBarIncreasing className="w-12 h-12 text-primary mb-4" />,
    title: "Advanced Market Analysis",
    description: "Master technical analysis and gain access to exclusive market insights and professional trading tools."
  }
];

const ValueProposition = () => {
  return (
    <section className="bg-muted">
      <div className="container">
        <h2 className="text-center mb-16">
          Why Choose Our Trading Masterclass?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="mb-4">
                {benefit.title}
              </h3>
              <p className="text-body">
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