import { supabase } from "@/integrations/supabase/client";

export interface EmailData {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.functions.invoke("send-email", {
      body: emailData,
    });

    if (error) throw error;
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
}) => {
  const { email, name, feedback, rating, experience } = feedbackData;

  // Send confirmation to user
  await sendEmail({
    to: [email],
    subject: "Thank You for Your Feedback - Bit2Big",
    html: `
      <h2>Thank You for Your Feedback!</h2>
      <p>Dear ${name},</p>
      <p>We greatly appreciate you taking the time to share your thoughts with us.</p>
      <p>Your feedback helps us improve our services.</p>
      <p>Best regards,<br>The Bit2Big Team</p>
    `,
    from: "Bit2Big Feedback <feedback@bit2big.com>",
  });

  // Send notification to admin
  await sendEmail({
    to: ["admin@bit2big.com"],
    subject: `New Feedback Received from ${name}`,
    html: `
      <h2>New Feedback Received</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      ${rating ? `<p><strong>Rating:</strong> ${rating}</p>` : ''}
      ${experience ? `<p><strong>Experience Level:</strong> ${experience}</p>` : ''}
      <p><strong>Feedback:</strong></p>
      <p>${feedback}</p>
    `,
    from: "Bit2Big Feedback System <feedback@bit2big.com>",
    replyTo: email,
  });
};