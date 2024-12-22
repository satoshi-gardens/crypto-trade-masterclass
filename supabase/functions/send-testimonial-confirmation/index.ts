import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "admin@bit2big.com";

interface EmailData {
  to: string;
  name: string;
  verificationToken: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const emailData: EmailData = await req.json();
    console.log("Received email data:", JSON.stringify(emailData));

    if (!emailData || !emailData.to || !emailData.name || !emailData.verificationToken) {
      console.error("Invalid email data received:", emailData);
      throw new Error("Invalid email data");
    }

    console.log("Processing testimonial confirmation for:", emailData.to);

    // Send email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Testimonials <testimonials@bit2big.com>",
        to: [ADMIN_EMAIL],
        subject: "New Testimonial Submission - Action Required",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h1 style="color: #333; margin-bottom: 16px;">New Testimonial Submission</h1>
              <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0070f3; margin: 20px 0;">
                <h2 style="color: #666; margin-bottom: 12px;">Testimonial Details:</h2>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 8px;"><strong>Name:</strong> ${emailData.name}</li>
                  <li style="margin-bottom: 8px;"><strong>Email:</strong> ${emailData.to}</li>
                </ul>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="https://bit2big.com/verify-testimonial?token=${emailData.verificationToken}" 
                   style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Review & Verify Testimonial
                </a>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Failed to send admin email:", error);
      throw new Error(`Failed to send admin email: ${error}`);
    }

    // Send confirmation email to user with special offer
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Testimonials <testimonials@bit2big.com>",
        to: [emailData.to],
        subject: "Thank You for Your Testimonial - Special Offer Inside! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              <h1 style="color: #333; margin-bottom: 16px;">Thank You for Your Testimonial! 🌟</h1>
              
              <p style="color: #555; line-height: 1.6;">Dear ${emailData.name},</p>
              
              <p style="color: #555; line-height: 1.6;">Thank you for taking the time to share your experience with us. Your testimonial has been received and is currently under review. We truly value your feedback as it helps others understand the impact of our training programs.</p>
              
              <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #0070f3;">
                <h2 style="color: #0070f3; margin-bottom: 12px;">🎁 Special Thank You Offer</h2>
                <p style="color: #555; line-height: 1.6;">As a token of our appreciation, we'd like to offer you:</p>
                <ul style="color: #555; line-height: 1.6;">
                  <li>15% discount on your next course enrollment</li>
                  <li>Access to an exclusive webinar on advanced trading strategies</li>
                  <li>Priority support for your next 3 months of trading</li>
                </ul>
                <p style="color: #555; line-height: 1.6;"><strong>Use code: THANKS15 at checkout</strong></p>
              </div>
              
              <p style="color: #555; line-height: 1.6;">We'll notify you once your testimonial has been approved and published on our website. Your insights will help guide others on their trading journey.</p>
              
              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #555; line-height: 1.6;">Best regards,<br>The Bit2Big Team</p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", error);
      throw new Error(`Failed to send user confirmation email: ${error}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-testimonial-confirmation function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);