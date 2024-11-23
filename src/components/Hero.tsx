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
  backgroundClass = "bg-gradient-to-r from-[#F8F8F8] to-[#EDECFD]",
  buttonText = "Get Started",
  buttonLink = "/courses",
  showButton = true 
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} section-padding mt-16`}>
      <div className="container px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-[48px] font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-10">
            {subtitle}
          </p>
          {showButton && (
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 rounded-lg 
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