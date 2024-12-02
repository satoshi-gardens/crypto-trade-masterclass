import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface EmailData {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

interface EmailTemplate {
  subject: string;
  html_content: string;
  variables?: Json;
}

const processTemplate = (template: EmailTemplate, data: Record<string, any>) => {
  let processedHtml = template.html_content;
  let processedSubject = template.subject;

  // Replace variables in both subject and content
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processedHtml = processedHtml.replace(regex, String(value));
    processedSubject = processedSubject.replace(regex, String(value));
  });

  return {
    subject: processedSubject,
    html: processedHtml,
  };
};

export const getEmailTemplate = async (
  type: string,
  data: Record<string, any>
): Promise<{ subject: string; html: string } | null> => {
  try {
    const { data: template, error } = await supabase
      .from("email_templates")
      .select("subject, html_content, variables")
      .eq("type", type)
      .single();

    if (error) {
      console.error("Error fetching email template:", error);
      return null;
    }
    
    if (!template) {
      console.error("Email template not found for type:", type);
      return null;
    }

    return processTemplate(template, data);
  } catch (error) {
    console.error("Error in getEmailTemplate:", error);
    return null;
  }
};

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.functions.invoke("send-application-email", {
      body: {
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        from: emailData.from || "Bit2Big <noreply@bit2big.com>",
        replyTo: emailData.replyTo,
      },
    });

    if (error) {
      console.error("Error in sendEmail:", error);
      throw error;
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      error: error.message || "Failed to send email" 
    };
  }
};

export const sendFeedbackEmail = async (data: {
  name: string;
  email: string;
  area: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get the feedback confirmation email template
    const userTemplate = await getEmailTemplate("feedback_confirmation", {
      name: data.name,
      area: data.area,
    });

    if (!userTemplate) {
      throw new Error("Failed to fetch feedback confirmation email template");
    }

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: [data.email],
      subject: userTemplate.subject,
      html: userTemplate.html,
      from: "Bit2Big Feedback <feedback@bit2big.com>",
    });

    if (!userEmailResult.success) {
      throw new Error("Failed to send confirmation email to user");
    }

    // Get the admin notification email template
    const adminTemplate = await getEmailTemplate("feedback_notification", {
      name: data.name,
      email: data.email,
      area: data.area,
      message: data.message,
    });

    if (!adminTemplate) {
      throw new Error("Failed to fetch admin notification email template");
    }

    // Send notification email to admin
    const adminEmailResult = await sendEmail({
      to: ["admin@bit2big.com"],
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      replyTo: data.email,
    });

    if (!adminEmailResult.success) {
      throw new Error("Failed to send notification email to admin");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error in sendFeedbackEmail:", error);
    return {
      success: false,
      error: error.message || "Failed to send feedback emails",
    };
  }
};