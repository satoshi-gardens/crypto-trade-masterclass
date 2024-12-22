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
  area: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received feedback email request");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
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
          <h2>Thank you for your feedback, ${feedbackData.name}!</h2>
          <p>We have received your feedback regarding ${feedbackData.area} and will review it shortly.</p>
          <p>Your message:</p>
          <blockquote>${feedbackData.message}</blockquote>
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-feedback-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);