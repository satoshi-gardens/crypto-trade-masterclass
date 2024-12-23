import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTAButtonProps {
  text?: string;
  to?: string;
  className?: string;
  onClick?: () => void;
}

export const CTAButton = ({ 
  text = "Join the Course", 
  to = "/courses",
  className = "",
  onClick
}: CTAButtonProps) => {
  return (
    <Button
      asChild
      size="lg"
      className={`bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg
                font-bold shadow-lg hover:shadow-xl transition-all duration-300
                text-lg ${className}`}
      onClick={onClick}
    >
      <Link to={to}>{text}</Link>
    </Button>
  );
};