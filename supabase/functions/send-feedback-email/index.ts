import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  name: string;
  email: string;
  phone?: string;
  country: string;
  area: "general" | "courses" | "platform" | "technical" | "other";
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const feedbackData: FeedbackRequest = await req.json();

    // Get country name from code
    const { data: countryData } = await supabase
      .from('countries')
      .select('name')
      .eq('code', feedbackData.country)
      .single();

    const countryName = countryData?.name || feedbackData.country;

    // Send confirmation email to user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [feedbackData.email],
        subject: "Thank you for your feedback",
        html: `
          <h2>Thank you for your feedback!</h2>
          <p>We appreciate you taking the time to share your thoughts with us.</p>
          <p>Your message:</p>
          <p>${feedbackData.message}</p>
        `,
      }),
    });

    // Send notification to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: ["mail@bit2big.com"],
        subject: `New Feedback Received - ${feedbackData.area.toUpperCase()}`,
        html: `
          <h2>New Feedback Submission</h2>
          <p><strong>From:</strong> ${feedbackData.name}</p>
          <p><strong>Email:</strong> ${feedbackData.email}</p>
          <p><strong>Phone:</strong> ${feedbackData.phone || 'Not provided'}</p>
          <p><strong>Country:</strong> ${countryName}</p>
          <p><strong>Area:</strong> ${feedbackData.area}</p>
          <p><strong>Message:</strong></p>
          <p>${feedbackData.message}</p>
        `,
        reply_to: feedbackData.email,
      }),
    });

    if (!userEmailRes.ok || !adminEmailRes.ok) {
      throw new Error("Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
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