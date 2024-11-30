import { useQuery } from "@tanstack/react-query";
import { Bell, ExternalLink, Twitter, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  link?: string;
}

const NotificationArea = () => {
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
  });

  const getLinkIcon = (link: string) => {
    if (!link) return <ExternalLink className="h-3 w-3" />;
    
    const url = link.toLowerCase();
    
    if (url.includes('telegram.')) return <MessageSquare className="h-3 w-3" />;
    if (url.includes('twitter.') || url.includes('x.com')) return <Twitter className="h-3 w-3" />;
    if (url.includes('whatsapp.')) return <Bell className="h-3 w-3 rotate-45" />; // Using Bell rotated as WhatsApp icon
    if (url.includes('discord.')) return <Bell className="h-3 w-3" />; // Using Bell as Discord icon
    
    return <ExternalLink className="h-3 w-3" />;
  };

  const renderLink = (notification: Notification) => {
    if (!notification.link) return null;

    // Check if link is internal (starts with '/')
    if (notification.link.startsWith('/')) {
      return (
        <Link 
          to={notification.link} 
          className="flex items-center text-primary hover:underline ml-2 text-sm"
        >
          More
          {getLinkIcon(notification.link)}
        </Link>
      );
    }

    // External link
    return (
      <a 
        href={notification.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-primary hover:underline ml-2 text-sm"
      >
        More
        {getLinkIcon(notification.link)}
      </a>
    );
  };

  if (!notifications?.length) return null;

  return (
    <div className="space-y-1 mb-2">
      {notifications.map((notification) => (
        <Alert key={notification.id} variant="default" className="bg-primary/5 py-2 px-3">
          <Bell className="h-3 w-3" />
          <AlertDescription className="flex items-center justify-between text-sm">
            <span className="line-clamp-1">{notification.message}</span>
            {renderLink(notification)}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationArea;