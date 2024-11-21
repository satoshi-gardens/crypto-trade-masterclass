import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundClass?: string;
}

const Hero = ({ title, subtitle, backgroundClass = "bg-gradient-to-r from-primary/5 to-secondary/5" }: HeroProps) => {
  return (
    <div className={`${backgroundClass} section-padding mt-16`}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;