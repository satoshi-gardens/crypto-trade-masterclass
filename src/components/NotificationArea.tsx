import { useQuery } from "@tanstack/react-query";
import { Bell, ExternalLink, Twitter, MessageSquare, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  link?: string;
}

const NotificationArea = () => {
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([]);

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

  useEffect(() => {
    // Auto-dismiss notifications after 3 minutes
    const timer = setTimeout(() => {
      if (notifications?.length) {
        setDismissedNotifications(notifications.map(n => n.id));
      }
    }, 180000); // 3 minutes in milliseconds

    return () => clearTimeout(timer);
  }, [notifications]);

  const getLinkIcon = (link: string) => {
    if (!link) return <ExternalLink className="h-3 w-3" />;
    
    const url = link.toLowerCase();
    
    if (url.includes('telegram.')) return <MessageSquare className="h-3 w-3" />;
    if (url.includes('twitter.') || url.includes('x.com')) return <Twitter className="h-3 w-3" />;
    if (url.includes('whatsapp.')) return <Bell className="h-3 w-3 rotate-45" />;
    if (url.includes('discord.')) return <Bell className="h-3 w-3" />;
    
    return <ExternalLink className="h-3 w-3" />;
  };

  const handleDismiss = (id: string) => {
    setDismissedNotifications(prev => [...prev, id]);
  };

  const renderLink = (notification: Notification) => {
    if (!notification.link) return null;

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

  const activeNotifications = notifications?.filter(n => !dismissedNotifications.includes(n.id));
  
  if (!activeNotifications?.length) return null;

  return (
    <div className="space-y-1 mb-2 max-w-2xl mx-auto">
      {activeNotifications.map((notification) => (
        <Alert 
          key={notification.id} 
          variant="default" 
          className="bg-primary/5 py-2 px-3 relative"
        >
          <Bell className="h-3 w-3" />
          <AlertDescription className="flex items-center justify-between text-sm">
            <span className="line-clamp-1 mr-2">{notification.message}</span>
            <div className="flex items-center gap-2 shrink-0">
              {renderLink(notification)}
              <button
                onClick={() => handleDismiss(notification.id)}
                className="p-1 hover:bg-primary/10 rounded-full"
                aria-label="Dismiss notification"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationArea;