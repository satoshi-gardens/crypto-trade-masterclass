import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  verificationToken: string;
}

const validateRequest = (data: any): { isValid: boolean; error?: string } => {
  if (!data) return { isValid: false, error: "No data provided" };
  if (!data.email) return { isValid: false, error: "Email is required" };
  if (!data.verificationToken) return { isValid: false, error: "Verification token is required" };
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return { isValid: false, error: "Invalid email format" };
  
  return { isValid: true };
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: { 
        ...corsHeaders,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      }
    });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const requestData: EmailRequest = await req.json();
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    // Validate request data
    const validation = validateRequest(requestData);
    if (!validation.isValid) {
      console.error("Validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { email, verificationToken } = requestData;
    const verificationUrl = `${req.headers.get("origin")}/verify-referral?token=${verificationToken}`;
    
    console.log("Sending verification email to:", email);
    console.log("Verification URL:", verificationUrl);

    const emailResponse = await fetch("https://api.resend.com/emails", {
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

    const emailResult = await emailResponse.json();
    console.log("Email API response:", JSON.stringify(emailResult, null, 2));

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
    
    // Determine if it's a client error (4xx) or server error (5xx)
    const status = error.status || 500;
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
        status 
      }),
      {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);