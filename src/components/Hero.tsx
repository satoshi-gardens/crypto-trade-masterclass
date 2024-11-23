import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundClass?: string;
  buttonText?: string;
  buttonLink?: string;
  showButton?: boolean;
}

const Hero = ({ 
  title, 
  subtitle, 
  backgroundClass = "bg-white",
  buttonText = "Get Started",
  buttonLink = "/courses",
  showButton = true 
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} py-16 mt-16`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#6A4CFF] bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          {showButton && (
            <Button
              asChild
              size="lg"
              className="bg-[#6A4CFF] hover:bg-[#8C72FF] text-white px-8 py-6 rounded-lg 
                        shadow-lg hover:shadow-xl transition-all duration-300 
                        transform hover:-translate-y-0.5"
            >
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;