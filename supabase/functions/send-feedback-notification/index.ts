import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  type: "testimonial" | "feedback";
  name: string;
  email: string;
  content: string;
  isStudent?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, name, email, content, isStudent }: FeedbackRequest = await req.json();

    const subject = type === "testimonial" 
      ? "New Testimonial Submission"
      : "New Feedback Received";

    const html = `
      <h2>${subject}</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      ${isStudent !== undefined ? `<p><strong>Student:</strong> ${isStudent ? "Yes" : "No"}</p>` : ""}
      <p><strong>Content:</strong></p>
      <p>${content}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: ["trading4profits@bit2big.com"],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

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