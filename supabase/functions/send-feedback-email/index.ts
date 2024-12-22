import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackEmailRequest {
  name: string;
  email: string;
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

    const feedbackData: FeedbackEmailRequest = await req.json();
    console.log("Processing feedback email for:", feedbackData.email);

    // Send email using Resend with verified domain
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Feedback <feedback@bit2big.com>",
        to: [feedbackData.email],
        subject: "Thank you for your feedback",
        html: `
          <h1>Thank you for your testimonial!</h1>
          <p>Dear ${feedbackData.name},</p>
          <p>We have received your testimonial and it is currently under review by our team. Once approved, it will be displayed on our website.</p>
          <p>Thank you for sharing your experience with us!</p>
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Failed to send email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-feedback-email function:", error);
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