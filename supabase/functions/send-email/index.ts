import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received email request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const emailData: EmailRequest = await req.json();
    console.log("Email request data:", {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from,
      replyTo: emailData.replyTo
    });

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: emailData.from || "Bit2Big <noreply@bit2big.com>",
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        reply_to: emailData.replyTo,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);