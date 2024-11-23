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
  backgroundClass = "bg-[#F8F8F8]",
  buttonText = "Get Started",
  buttonLink = "/courses",
  showButton = true 
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} py-16 mt-16`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-3xl md:text-[36px] font-bold mb-6 text-[#6A4CFF]">
            {title}
          </h1>
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
          {showButton && (
            <Button
              asChild
              size="lg"
              className="bg-[#6A4CFF] hover:bg-[#8C72FF] text-white px-6 py-3 rounded-md 
                        font-bold shadow-sm hover:shadow-md transition-all duration-300"
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