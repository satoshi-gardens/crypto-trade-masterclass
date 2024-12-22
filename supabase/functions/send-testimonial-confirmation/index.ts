import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "admin@bit2big.com";

interface TestimonialData {
  fullName: string;
  displayName: string;
  email: string;
  isStudent: boolean;
  testimonyText: string;
  verificationToken: string;
}

interface EmailRequest {
  testimonial: TestimonialData;
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

    const { testimonial }: EmailRequest = await req.json();
    console.log("Processing testimonial confirmation for:", testimonial.email);

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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">New Testimonial Submission</h1>
            <h2 style="color: #666;">Testimonial Details:</h2>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Full Name:</strong> ${testimonial.fullName}</li>
              <li><strong>Display Name:</strong> ${testimonial.displayName}</li>
              <li><strong>Email:</strong> ${testimonial.email}</li>
              <li><strong>Is Student:</strong> ${testimonial.isStudent ? 'Yes' : 'No'}</li>
            </ul>
            <h3 style="color: #666;">Testimony:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${testimonial.testimonyText}</p>
            <p style="margin-top: 20px;">Click the link below to verify this testimonial:</p>
            <p style="text-align: center;">
              <a href="https://bit2big.com/verify-testimonial?token=${testimonial.verificationToken}" 
                 style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Testimonial
              </a>
            </p>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Failed to send admin email:", error);
      throw new Error(`Failed to send admin email: ${error}`);
    }

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Testimonials <testimonials@bit2big.com>",
        to: [testimonial.email],
        subject: "Thank You for Your Testimonial",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Thank You for Your Testimonial</h1>
            <p>Dear ${testimonial.fullName},</p>
            <p>Thank you for sharing your experience with us. Your testimonial has been received and is currently under review.</p>
            <p>We'll notify you once your testimonial has been approved and published on our website.</p>
            <p>Best regards,<br>The Bit2Big Team</p>
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