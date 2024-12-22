import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const ADMIN_EMAIL = "admin@bit2big.com";

interface EmailData {
  to: string;
  name: string;
  verificationToken: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY!
);

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

    const emailData: EmailData = await req.json();
    console.log("Received email data:", JSON.stringify(emailData));

    if (!emailData || !emailData.to || !emailData.name || !emailData.verificationToken) {
      console.error("Invalid email data received:", emailData);
      throw new Error("Invalid email data");
    }

    console.log("Processing testimonial confirmation for:", emailData.to);

    // Fetch email templates
    const { data: templates, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .in('type', ['testimonial_confirmation', 'testimonial_admin_notification']);

    if (templateError) {
      console.error("Error fetching email templates:", templateError);
      throw new Error("Failed to fetch email templates");
    }

    const userTemplate = templates.find(t => t.type === 'testimonial_confirmation');
    const adminTemplate = templates.find(t => t.type === 'testimonial_admin_notification');

    if (!userTemplate || !adminTemplate) {
      console.error("Email templates not found");
      throw new Error("Email templates not found");
    }

    // Send email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Testimonials <testimonials@bit2big.com>",
        to: [ADMIN_EMAIL],
        subject: adminTemplate.subject,
        html: adminTemplate.html_content
          .replace(/{{name}}/g, emailData.name)
          .replace(/{{email}}/g, emailData.to)
          .replace(/{{verificationToken}}/g, emailData.verificationToken),
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Failed to send admin email:", error);
      throw new Error(`Failed to send admin email: ${error}`);
    }

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Testimonials <testimonials@bit2big.com>",
        to: [emailData.to],
        subject: userTemplate.subject,
        html: userTemplate.html_content.replace(/{{name}}/g, emailData.name),
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", error);
      throw new Error(`Failed to send user confirmation email: ${error}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-testimonial-confirmation function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);