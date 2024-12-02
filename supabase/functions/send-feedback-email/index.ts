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
            .content { background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .cta-button { display: inline-block; background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .feature-box { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #8b5cf6; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #8b5cf6; font-weight: bold; }
            .testimonial { font-style: italic; color: #666; margin: 15px 0; padding: 10px; border-left: 2px solid #8b5cf6; }
            .benefits-list { padding-left: 20px; }
            .benefits-list li { margin: 8px 0; }
            .discount-banner { background-color: #fef3c7; color: #92400e; padding: 10px; border-radius: 4px; text-align: center; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${WEBSITE_URL}/logo.png" alt="Bit2Big Logo" style="max-width: 150px; margin-bottom: 15px;">
              <h1 style="margin: 0; font-size: 24px;">Thank You for Your Feedback!</h1>
            </div>
            <div class="content">
              <p>Dear ${feedback.name},</p>
              <p>Thank you for taking the time to share your thoughts about our cryptocurrency course. Your feedback is invaluable in helping us improve and provide better education for all our students.</p>
              
              <div class="feature-box">
                <h2 style="color: #1a1f2c; margin-top: 0;">Transform Your Trading Journey</h2>
                <p>Take your crypto trading to the next level with our comprehensive courses:</p>
                <ul class="benefits-list">
                  <li>Master proven trading strategies used by professionals</li>
                  <li>Access real-time market analysis and insights</li>
                  <li>Join our exclusive community of successful traders</li>
                  <li>Get personalized mentoring support</li>
                  <li>Learn risk management techniques that protect your capital</li>
                </ul>
              </div>

              <div class="testimonial">
                "The course completely transformed my understanding of cryptocurrency trading. The strategies I learned helped me achieve consistent results." - John D., Professional Trader
              </div>

              <div class="discount-banner">
                <h3 style="margin: 0;">🎉 Special Offer Just for You!</h3>
                <p style="margin: 10px 0;">Get <span class="highlight">15% off</span> any course package when you enroll within the next 48 hours.</p>
                <p style="margin: 0; font-weight: bold;">Use code: <span style="background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 4px;">FEEDBACK15</span></p>
              </div>

              <div class="feature-box">
                <h3 style="color: #1a1f2c; margin-top: 0;">Why Choose Bit2Big?</h3>
                <ul class="benefits-list">
                  <li>Industry-leading instructors with proven track records</li>
                  <li>Comprehensive curriculum covering both technical and fundamental analysis</li>
                  <li>Flexible learning schedule to fit your lifestyle</li>
                  <li>Lifetime access to course materials and updates</li>
                </ul>
                <a href="${WEBSITE_URL}/courses" class="cta-button" style="color: white;">Explore Our Courses</a>
              </div>

              <p>Stay connected with our trading community:</p>
              <ul class="benefits-list">
                <li>Follow us on Twitter: <a href="https://twitter.com/Bit2Big" style="color: #8b5cf6;">@Bit2Big</a></li>
                <li>Join our Telegram community for daily insights</li>
                <li>Subscribe to our newsletter for exclusive trading tips</li>
              </ul>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Bit2Big Crypto Course. All rights reserved.</p>
                <p>You received this email because you submitted feedback on our platform.</p>
                <p>Our address: Crypto Valley, Zug, Switzerland</p>
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
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
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

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Error sending user email:", error);
      throw new Error("Failed to send confirmation email");
    }

    // Send notification to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
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

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Error sending admin email:", error);
      throw new Error("Failed to send admin notification");
    }

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