import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundClass?: string;
  buttonText?: string;
  buttonLink?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

const Hero = ({ 
  title, 
  subtitle, 
  backgroundClass = "bg-gradient-to-b from-[#F9F9F9] to-white",
  buttonText = "Start Your Journey",
  buttonLink = "#packages",
  showButton = true,
  onButtonClick
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} min-h-[600px] flex items-center relative overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c"
          alt="Crypto trading chart showing profitable upward trend"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-h1 bg-gradient-to-b from-[#1A1A1A] to-[#333333] bg-clip-text text-transparent" 
              itemScope itemType="https://schema.org/Course">
            <span itemProp="name">{title}</span>
          </h1>
          <p className="text-h3 font-normal text-[#333333] mb-10 max-w-2xl mx-auto" 
             itemProp="description">
            {subtitle}
          </p>
          {showButton && (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg
                        font-bold shadow-lg hover:shadow-xl transition-all duration-300
                        text-lg"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;