import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "submission" | "admin_review";
  to?: string;
  name: string;
  displayName?: string;
  content?: string;
  telegram?: string;
  twitter?: string;
  instagram?: string;
  verificationToken?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const emailData: EmailRequest = await req.json();

    // Fetch site settings for website URL
    const { data: siteSettings, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "website_url")
      .single();

    if (settingsError) {
      throw new Error(`Failed to fetch site settings: ${settingsError.message}`);
    }

    const websiteUrl = siteSettings.value;

    // Fetch appropriate email template
    const templateType = emailData.type === "submission" 
      ? "testimonial_submission" 
      : "testimonial_admin_review";

    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("type", templateType)
      .single();

    if (templateError) {
      throw new Error(`Failed to fetch email template: ${templateError.message}`);
    }

    let html = template.html_content;
    const verificationUrl = emailData.verificationToken 
      ? `${websiteUrl}/verify-testimonial?token=${emailData.verificationToken}`
      : "";

    // Replace template variables
    const variables = {
      name: emailData.name,
      displayName: emailData.displayName,
      content: emailData.content,
      telegram: emailData.telegram,
      twitter: emailData.twitter,
      instagram: emailData.instagram,
      verificationUrl,
    };

    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        const regex = new RegExp(`{{${key}}}`, "g");
        html = html.replace(regex, value);
      }
    });

    // Send email using Resend
    const to = emailData.type === "submission" 
      ? emailData.to! 
      : "admin@bit2big.com";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Testimonials <testimonials@bit2big.com>",
        to: [to],
        subject: template.subject,
        html: html,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-testimonial-email function:", error);
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