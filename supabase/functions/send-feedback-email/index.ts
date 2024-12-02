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
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Thank You for Your Feedback</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
            .header { background-color: #1a1f2c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; }
            .cta-button { display: inline-block; background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .feature-box { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 6px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Thank You for Your Feedback!</h1>
            </div>
            <div class="content">
              <p>Dear ${feedback.name},</p>
              <p>Thank you for taking the time to share your thoughts about our cryptocurrency course. Your feedback is invaluable in helping us improve and provide better education for all our students.</p>
              
              <div class="feature-box">
                <h2 style="color: #1a1f2c; margin-top: 0;">Transform Your Trading Journey</h2>
                <p>Take your crypto trading to the next level with our comprehensive courses:</p>
                <ul style="padding-left: 20px;">
                  <li>Learn proven trading strategies</li>
                  <li>Access real-time market analysis</li>
                  <li>Join our community of successful traders</li>
                  <li>Get personalized mentoring support</li>
                </ul>
                <a href="${WEBSITE_URL}/courses" class="cta-button">Explore Our Courses</a>
              </div>

              <div class="feature-box">
                <h3 style="color: #1a1f2c; margin-top: 0;">Limited Time Offer!</h3>
                <p>🎉 Get 10% off any course package when you enroll within the next 48 hours.</p>
                <p>Use code: <strong>FEEDBACK10</strong></p>
              </div>

              <p>Stay connected with us:</p>
              <ul style="padding-left: 20px;">
                <li>Follow us on Twitter: @Crypto4Profits</li>
                <li>Join our Telegram community</li>
                <li>Subscribe to our newsletter for trading insights</li>
              </ul>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Bit2Big Crypto Course. All rights reserved.</p>
                <p>You received this email because you submitted feedback on our platform.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send notification email to admin with detailed feedback
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>New Course Feedback Received</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
            .header { background-color: #1a1f2c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; }
            .feedback-details { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Course Feedback Received</h1>
            </div>
            <div class="content">
              <div class="feedback-details">
                <h3 style="margin-top: 0;">Feedback Details:</h3>
                <p><strong>Name:</strong> ${feedback.name}</p>
                <p><strong>Email:</strong> ${feedback.email}</p>
                <p><strong>Rating:</strong> ${feedback.rating}</p>
                <p><strong>Experience Level:</strong> ${feedback.experience}</p>
                <p><strong>Feedback:</strong><br>${feedback.feedback}</p>
              </div>
              <p>You can reply directly to this email to contact the student.</p>
            </div>
          </div>
        </body>
      </html>
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
        subject: "Thank You for Your Feedback - Special Course Offer Inside!",
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