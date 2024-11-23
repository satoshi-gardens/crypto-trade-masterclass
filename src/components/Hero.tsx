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
  backgroundClass = "bg-gradient-to-b from-[#F8F8F8] to-white",
  buttonText = "Start Your Journey",
  buttonLink = "#packages",
  showButton = true 
}: HeroProps) => {
  return (
    <div className={`${backgroundClass} py-24 relative overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c"
          alt="Crypto trading chart showing profitable upward trend"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary-hover bg-clip-text text-transparent" 
              itemScope itemType="https://schema.org/Course">
            <span itemProp="name">{title}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-10 max-w-2xl mx-auto" 
             itemProp="description">
            {subtitle}
          </p>
          {showButton && (
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg
                        font-bold shadow-lg hover:shadow-xl transition-all duration-300
                        text-lg"
            >
              <a href={buttonLink}>{buttonText}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;