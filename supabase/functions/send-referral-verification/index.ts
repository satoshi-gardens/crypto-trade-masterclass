import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBSITE_URL = Deno.env.get("VITE_WEBSITE_URL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  verificationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to send verification email");
    const requestData = await req.json();
    console.log("Request data:", requestData);

    const { email, verificationToken } = requestData as EmailRequest;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!verificationToken) {
      console.error("Missing verification token for email:", email);
      throw new Error("Verification token is required");
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!WEBSITE_URL) {
      console.error("WEBSITE_URL is not configured");
      throw new Error("WEBSITE_URL is not configured");
    }

    const verificationUrl = `${WEBSITE_URL}/verify-referral?token=${verificationToken}`;

    console.log("Sending verification email to:", email);
    console.log("Verification URL:", verificationUrl);
    console.log("Verification Token:", verificationToken);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [email],
        subject: "Verify your referral program registration",
        html: `
          <h2>Welcome to our Referral Program!</h2>
          <p>Please click the link below to verify your email and activate your referral account:</p>
          <p><a href="${verificationUrl}">Verify Email</a></p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-referral-verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);