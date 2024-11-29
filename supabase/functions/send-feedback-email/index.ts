import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SITE_OWNER_EMAIL = "info@bit2big.com";
const WEBSITE_URL = Deno.env.get("WEBSITE_URL") || "https://cryptocourse.bit2big.com";

interface FeedbackRequest {
  email: string;
  name: string;
  feedback: string;
  rating: string;
  experience: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedback: FeedbackRequest = await req.json();

    // Send confirmation email to user with marketing content
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Feedback!</h2>
        <p>Dear ${feedback.name},</p>
        <p>We greatly appreciate you taking the time to share your thoughts about our cryptocurrency course. Your feedback helps us improve and provide better education for all our students.</p>
        
        <div style="background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Did you know?</h3>
          <p>We offer comprehensive cryptocurrency trading courses designed for all skill levels:</p>
          <ul>
            <li>Learn from industry experts</li>
            <li>Access to exclusive trading strategies</li>
            <li>Real-world trading scenarios</li>
            <li>Lifetime access to course updates</li>
          </ul>
          <p><a href="${WEBSITE_URL}/courses" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Our Courses</a></p>
        </div>

        <div style="background-color: #f0f8ff; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Join Our Referral Program!</h3>
          <p>Share the knowledge and earn rewards:</p>
          <ul>
            <li>Earn commission for each successful referral</li>
            <li>Get access to exclusive course content</li>
            <li>Help others start their crypto journey</li>
          </ul>
          <p><a href="${WEBSITE_URL}/referral" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join Referral Program</a></p>
        </div>

        <p>Best regards,<br>The Bit2Big Team</p>
      </div>
    `;

    // Send notification email to admin with detailed feedback
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Course Feedback Received</h2>
        <div style="background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Feedback Details:</h3>
          <p><strong>Name:</strong> ${feedback.name}</p>
          <p><strong>Email:</strong> ${feedback.email}</p>
          <p><strong>Rating:</strong> ${feedback.rating}</p>
          <p><strong>Experience Level:</strong> ${feedback.experience}</p>
          <p><strong>Feedback:</strong><br>${feedback.feedback}</p>
        </div>
        <p>You can reply directly to this email to contact the student.</p>
      </div>
    `;

    // Send email to user
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Crypto Course <noreply@bit2big.com>",
        to: [feedback.email],
        subject: "Thank You for Your Feedback - Explore More with Bit2Big",
        html: userEmailHtml,
      }),
    });

    // Send notification to admin
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Feedback System <noreply@bit2big.com>",
        to: [SITE_OWNER_EMAIL],
        reply_to: feedback.email,
        subject: `New Course Feedback from ${feedback.name}`,
        html: adminEmailHtml,
      }),
    });

    return new Response(
      JSON.stringify({ message: "Feedback submitted successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing feedback:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process feedback" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);