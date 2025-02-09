import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import TradingScene from "./3d/TradingScene";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundClass?: string;
  buttonText?: string;
  buttonLink?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  scene?: "trading" | "resources";
}

const Hero = ({ 
  title = "Master Crypto Trading: Transform Your Financial Future Today",
  subtitle = "Join Switzerland's premier trading program and learn to navigate the crypto market with confidence and profitability",
  backgroundClass = "bg-gradient-to-b from-[#F9F9F9] to-white",
  buttonText = "Join the Course",
  buttonLink = "#packages",
  showButton = true,
  onButtonClick,
  scene = "trading"
}: HeroProps) => {
  const benefits = [
    "Learn how to minimize risk and maximize returns",
    "Analyze crypto markets like a pro with proven techniques",
    "Identify high-potential altcoins before the crowd"
  ];

  return (
    <div className={`${backgroundClass} min-h-[600px] md:min-h-[700px] flex items-center relative overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c"
          alt="Crypto trading chart showing profitable upward trend"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      {scene === "trading" && <TradingScene />}
      {scene === "resources" && <ResourceScene />}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up px-4 md:px-0 space-y-12 md:space-y-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg py-4 px-6 max-w-2xl mx-auto">
            <blockquote className="text-sm md:text-base italic text-[#333333] mb-1 font-normal">
              "I was never interested in trading—until I joined this course. Now I'm a part-time trader!"
            </blockquote>
            <cite className="text-xs md:text-sm text-[#666666] font-medium not-italic">
              —Soots, Entrepreneur & Ex-Banker
            </cite>
          </div>

          <div className="space-y-8">
            <h1 className="text-[32px] md:text-[42px] leading-tight font-bold bg-gradient-to-b from-[#1A1A1A] to-[#333333] bg-clip-text text-transparent" 
                itemScope itemType="https://schema.org/Course">
              <span itemProp="name">{title}</span>
            </h1>
            <p className="text-lg md:text-2xl font-normal text-[#333333] max-w-2xl mx-auto" 
               itemProp="description">
              {subtitle}
            </p>
          </div>
          
          <div className="text-left max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-[#333333]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {showButton && (
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 
                          min-h-[44px] md:min-h-[48px] rounded-lg
                          font-bold shadow-lg hover:shadow-xl transition-all duration-300
                          text-lg w-full md:w-auto"
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
