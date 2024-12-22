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
  isStudent: boolean;
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
          <h1>New ${notificationData.type} Submission</h1>
          <p><strong>Name:</strong> ${notificationData.name}</p>
          <p><strong>Email:</strong> ${notificationData.email}</p>
          <p><strong>Is Student:</strong> ${notificationData.isStudent ? 'Yes' : 'No'}</p>
          <h2>Content:</h2>
          <p>${notificationData.content}</p>
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
    console.error("Error in send-feedback-notification function:", error);
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