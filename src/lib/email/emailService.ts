import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types/json";

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

    if (error) throw error;
    if (!template) return null;

    return processTemplate(template, data);
  } catch (error) {
    console.error("Error fetching email template:", error);
    return null;
  }
};

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; error?: string }> => {
  console.log("Sending email:", {
    to: emailData.to,
    subject: emailData.subject,
    from: emailData.from,
    replyTo: emailData.replyTo
  });

  try {
    const { error } = await supabase.functions.invoke("send-email", {
      body: emailData,
    });

    if (error) {
      console.error("Error in sendEmail:", error);
      throw error;
    }
    
    console.log("Email sent successfully to:", emailData.to);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export const sendFeedbackEmails = async (feedbackData: {
  email: string;
  name: string;
  feedback: string;
  rating?: string;
  experience?: string;
}): Promise<{ success: boolean; error?: string }> => {
  console.log("Processing feedback emails for:", feedbackData.email);
  
  try {
    // Get user confirmation template
    const userTemplate = await getEmailTemplate("feedback_confirmation", {
      name: feedbackData.name,
      feedback: feedbackData.feedback,
      rating: feedbackData.rating || "Not provided",
      experience: feedbackData.experience || "Not provided"
    });

    if (!userTemplate) {
      throw new Error("Failed to fetch user feedback template");
    }

    // Send confirmation to user
    const userEmailResult = await sendEmail({
      to: [feedbackData.email],
      subject: userTemplate.subject,
      html: userTemplate.html,
      from: "Bit2Big Feedback <feedback@bit2big.com>",
    });

    if (!userEmailResult.success) {
      console.error("Failed to send user confirmation email:", userEmailResult.error);
      throw new Error(userEmailResult.error || "Failed to send confirmation email");
    }

    // Get admin notification template
    const adminTemplate = await getEmailTemplate("feedback_notification_admin", {
      name: feedbackData.name,
      email: feedbackData.email,
      feedback: feedbackData.feedback,
      rating: feedbackData.rating || "Not provided",
      experience: feedbackData.experience || "Not provided"
    });

    if (!adminTemplate) {
      throw new Error("Failed to fetch admin notification template");
    }

    // Send notification to admin
    const adminEmailResult = await sendEmail({
      to: ["admin@bit2big.com"],
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      from: "Bit2Big Feedback System <feedback@bit2big.com>",
      replyTo: feedbackData.email,
    });

    if (!adminEmailResult.success) {
      console.error("Failed to send admin notification email:", adminEmailResult.error);
      throw new Error(adminEmailResult.error || "Failed to send admin notification");
    }

    console.log("All feedback emails sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending feedback emails:", error);
    return { success: false, error: error.message };
  }
};