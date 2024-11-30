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
    if (!link) return <ExternalLink className="h-4 w-4" />;
    
    const url = link.toLowerCase();
    
    if (url.includes('telegram.')) return <MessageSquare className="h-4 w-4" />;
    if (url.includes('twitter.') || url.includes('x.com')) return <Twitter className="h-4 w-4" />;
    if (url.includes('whatsapp.')) return <Bell className="h-4 w-4 rotate-45" />; // Using Bell rotated as WhatsApp icon
    if (url.includes('discord.')) return <Bell className="h-4 w-4" />; // Using Bell as Discord icon
    
    // Default to ExternalLink for trading-related or other links
    return <ExternalLink className="h-4 w-4" />;
  };

  if (!notifications?.length) return null;

  return (
    <div className="space-y-2 mb-4">
      {notifications.map((notification) => (
        <Alert key={notification.id} variant="default" className="bg-primary/10">
          <Bell className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{notification.message}</span>
            {notification.link && (
              <Link 
                to={notification.link} 
                className="flex items-center text-primary hover:underline ml-2"
              >
                Learn More
                {getLinkIcon(notification.link)}
              </Link>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationArea;