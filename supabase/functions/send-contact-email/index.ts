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

interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  purpose: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const contactData: ContactRequest = await req.json();

    // Store in database
    const { error: dbError } = await supabase
      .from("general_inquiries")
      .insert({
        first_name: contactData.firstName,
        last_name: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        city: contactData.city,
        country: contactData.country,
        contact_purpose: contactData.purpose,
        message: contactData.message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store inquiry");
    }

    // Get site URL from database
    const { data: siteSettings, error: urlError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'website_url')
      .single();

    if (urlError) {
      console.error('Failed to fetch site settings:', urlError);
      throw new Error('Failed to fetch site settings');
    }

    const websiteUrl = siteSettings?.value || 'https://cryptocourse.bit2big.com';

    // Get email templates
    const { data: templates, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .in('type', ['contact_confirmation', 'contact_notification_admin']);

    if (templateError) {
      console.error('Failed to fetch email templates:', templateError);
      throw new Error('Failed to fetch email templates');
    }

    const userTemplate = templates.find(t => t.type === 'contact_confirmation');
    const adminTemplate = templates.find(t => t.type === 'contact_notification_admin');

    if (!userTemplate || !adminTemplate) {
      throw new Error('Email templates not found');
    }

    // Replace variables in templates
    const userHtml = userTemplate.html_content.replace(/{{websiteUrl}}/g, websiteUrl);
    
    const adminHtml = adminTemplate.html_content
      .replace(/{{firstName}}/g, contactData.firstName)
      .replace(/{{lastName}}/g, contactData.lastName)
      .replace(/{{email}}/g, contactData.email)
      .replace(/{{phone}}/g, contactData.phone || 'Not provided')
      .replace(/{{city}}/g, contactData.city || 'Not provided')
      .replace(/{{country}}/g, contactData.country || 'Not provided')
      .replace(/{{purpose}}/g, contactData.purpose)
      .replace(/{{message}}/g, contactData.message);

    // Send confirmation to user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big <contact@bit2big.com>",
        to: [contactData.email],
        subject: userTemplate.subject,
        html: userHtml,
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
        from: "Bit2Big Contact Form <contact@bit2big.com>",
        to: ["admin@bit2big.com"],
        subject: adminTemplate.subject,
        html: adminHtml,
        reply_to: contactData.email,
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
    console.error("Error in contact-form function:", error);
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