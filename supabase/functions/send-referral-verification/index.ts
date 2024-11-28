import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  verificationToken: string;
  from: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const requestData: EmailRequest = await req.json();
    console.log("Request data:", JSON.stringify(requestData));

    if (!requestData.email || !requestData.verificationToken || !requestData.from) {
      throw new Error("Missing required fields");
    }

    const verificationUrl = `${req.headers.get("origin")}/verify-referral?token=${requestData.verificationToken}`;
    console.log("Verification URL:", verificationUrl);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: requestData.from,
        to: [requestData.email],
        subject: "Verify your referral program registration",
        html: `
          <h2>Welcome to our Referral Program!</h2>
          <p>Please click the link below to verify your email and activate your referral account:</p>
          <p><a href="${verificationUrl}">Verify Email</a></p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email API response:", JSON.stringify(emailResult));

    if (!emailResponse.ok) {
      throw new Error(`Failed to send email: ${JSON.stringify(emailResult)}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Verification email sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in send-referral-verification function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);