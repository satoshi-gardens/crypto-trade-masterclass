import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: string;
  name: string;
  email: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received feedback notification request");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const notificationData: NotificationRequest = await req.json();
    console.log("Processing notification for:", notificationData.type);

    // Send notification email using Resend with verified domain
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Notifications <notifications@bit2big.com>",
        to: ["admin@bit2big.com"],
        subject: `New ${notificationData.type} Submission`,
        html: `
          <h2>New ${notificationData.type} Submission</h2>
          <p><strong>From:</strong> ${notificationData.name} (${notificationData.email})</p>
          <p><strong>Content:</strong></p>
          <blockquote>${notificationData.content}</blockquote>
        `,
        reply_to: notificationData.email,
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
    console.error("Error in send-feedback-notification function:", error);
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