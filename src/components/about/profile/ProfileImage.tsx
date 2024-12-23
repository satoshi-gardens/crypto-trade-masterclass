import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLink {
  title: string;
  url: string;
}

interface ProfileImageProps {
  socialLinks: SocialLink[];
}

const ProfileImage = ({ socialLinks }: ProfileImageProps) => {
  return (
    <div className="md:col-span-1">
      <img
        src="/lovable-uploads/b787c942-a5bd-43a5-839b-d3c2a76e8c87.png"
        alt="Dr. Michael Kiberu Nagenda - A professional headshot showing him wearing a light grey suit and white shirt, with a warm, engaging smile that reflects his approachable leadership style. The image is set against a textured golden background."
        className="rounded-lg w-full object-cover shadow-lg"
      />
      <div className="mt-6 space-y-3">
        {socialLinks.map((link, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => window.open(link.url, "_blank")}
          >
            {link.title}
            <ExternalLink className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileImage;