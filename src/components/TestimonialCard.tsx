import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  imageUrl: string;
}

const TestimonialCard = ({ name, role, content, imageUrl }: TestimonialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLongContent = content.length > 200;
  const displayContent = isLongContent ? content.slice(0, 200) + "..." : content;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="text-gray-700 leading-relaxed italic">
          {isOpen ? content : displayContent}
        </div>
        
        {isLongContent && (
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full mt-4 flex items-center justify-center"
            >
              {isOpen ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        )}
      </Collapsible>

      <div className="mt-6 flex justify-start">
        <div className="flex -space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;