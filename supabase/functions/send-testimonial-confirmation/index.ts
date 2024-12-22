import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

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

    const verificationUrl = `https://bit2big.com/verify-testimonial?token=${testimonial.verificationToken}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
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
              <a href="${verificationUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Testimonial
              </a>
            </p>
          </div>
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email API response:", JSON.stringify(emailResult));

    if (!emailResponse.ok) {
      console.error("Failed to send email:", emailResult);
      throw new Error(`Failed to send email: ${JSON.stringify(emailResult)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-testimonial-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);