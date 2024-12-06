import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  name: string;
  verificationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { to, name, verificationToken }: EmailRequest = await req.json();

    // Fetch website URL from site_settings
    const { data: siteSettings, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "website_url")
      .single();

    if (settingsError) {
      throw new Error(`Failed to fetch site settings: ${settingsError.message}`);
    }

    const websiteUrl = siteSettings.value;
    const verificationUrl = `${websiteUrl}/verify-testimonial?token=${verificationToken}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [to],
        subject: "Verify your testimonial",
        html: `
          <h2>Thank you for your testimonial!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for sharing your experience with us. To publish your testimonial, please verify it by clicking the link below:</p>
          <p><a href="${verificationUrl}">Verify Testimonial</a></p>
          <p>If you didn't submit a testimonial, you can ignore this email.</p>
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-testimonial-confirmation function:", error);
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