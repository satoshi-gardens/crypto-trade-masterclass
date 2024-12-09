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

interface FeedbackEmailRequest {
  name: string;
  email: string;
  area: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const feedbackData: FeedbackEmailRequest = await req.json();

    // Get email template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("type", "feedback_confirmation")
      .single();

    if (templateError) {
      console.error("Error fetching template:", templateError);
      throw new Error("Failed to fetch email template");
    }

    // Get website URL from site settings
    const { data: siteSettings, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "website_url")
      .single();

    if (settingsError) {
      console.error("Error fetching site settings:", settingsError);
      throw new Error("Failed to fetch site settings");
    }

    // Process template variables
    const currentYear = new Date().getFullYear();
    const websiteUrl = siteSettings.value;
    
    let html = template.html_content
      .replace(/{{name}}/g, feedbackData.name)
      .replace(/{{area}}/g, feedbackData.area)
      .replace(/{{websiteUrl}}/g, websiteUrl)
      .replace(/{{currentYear}}/g, currentYear.toString());

    // Send email using Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Feedback <feedback@bit2big.com>",
        to: [feedbackData.email],
        subject: template.subject,
        html: html,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
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