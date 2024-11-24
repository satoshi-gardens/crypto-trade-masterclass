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

    // Send confirmation email to user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [contactData.email],
        subject: "We received your inquiry",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>We have received your inquiry and will get back to you shortly.</p>
          <p>Your message:</p>
          <p>${contactData.message}</p>
        `,
      }),
    });

    // Send notification email to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: ["ct4p@bit2big.com"],
        subject: `New Contact Form Submission - ${contactData.purpose}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> ${contactData.city || 'Not provided'}, ${contactData.country || 'Not provided'}</p>
          <p><strong>Purpose:</strong> ${contactData.purpose}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
        `,
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