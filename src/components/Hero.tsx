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
  backgroundClass = "bg-gradient-to-r from-primary/95 to-[#E0D6FF]/95",
  buttonText = "Get Started",
  buttonLink = "/courses",
  showButton = true 
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} section-padding mt-16`}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            {subtitle}
          </p>
          {showButton && (
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground transition-colors duration-300"
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