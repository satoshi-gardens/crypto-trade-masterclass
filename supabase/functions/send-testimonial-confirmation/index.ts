import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  name: string;
  verificationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, name, verificationToken }: EmailRequest = await req.json();

    const verificationUrl = `${req.headers.get("origin")}/verify-testimonial?token=${verificationToken}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com", // Update this with your verified domain
        to: [to],
        subject: "Verify your testimonial",
        html: `
          <h2>Thank you for your testimonial!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for sharing your experience with us. To publish your testimonial, please verify it by clicking the link below:</p>
          <p><a href="${verificationUrl}">Verify Testimonial</a></p>
          <p>If you didn't submit a testimonial, you can ignore this email.</p>
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-testimonial-confirmation function:", error);
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