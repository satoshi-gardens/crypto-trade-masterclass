import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundClass?: string;
}

const Hero = ({ title, subtitle, backgroundClass = "bg-accent" }: HeroProps) => {
  return (
    <div className={`${backgroundClass} text-white py-20`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-gray-300">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;