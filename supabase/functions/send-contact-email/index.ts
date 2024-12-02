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

    // Send confirmation email to user with improved template
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [contactData.email],
        subject: "Thank you for contacting Bit2Big",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you for contacting us</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                <img src="https://bit2big.com/logo.png" alt="Bit2Big Logo" style="max-width: 150px; margin-bottom: 20px;">
                <h1 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Reaching Out!</h1>
                <p style="margin-bottom: 15px;">Dear ${contactData.firstName},</p>
                <p style="margin-bottom: 15px;">We have received your inquiry and want to thank you for taking the time to contact us. Our team will review your message and get back to you as soon as possible.</p>
                
                <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #2c3e50; margin-top: 0;">Your Message Details:</h3>
                  <p style="margin: 10px 0;"><strong>Purpose:</strong> ${contactData.purpose}</p>
                  <p style="margin: 10px 0;"><strong>Message:</strong><br>${contactData.message}</p>
                </div>

                <p style="margin-bottom: 15px;">While you wait for our response, you might want to:</p>
                <ul style="margin-bottom: 20px; padding-left: 20px;">
                  <li>Visit our <a href="https://bit2big.com/courses" style="color: #3498db; text-decoration: none;">courses page</a></li>
                  <li>Check out our <a href="https://bit2big.com/resources" style="color: #3498db; text-decoration: none;">learning resources</a></li>
                  <li>Follow us on social media for updates</li>
                </ul>

                <p style="margin-bottom: 15px;">If you have any urgent concerns, please don't hesitate to reach out to us directly at support@bit2big.com.</p>
                
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                
                <p style="font-size: 12px; color: #666; margin-top: 20px;">This is an automated message. Please do not reply directly to this email.</p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    // Send detailed notification email to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: ["mail@bit2big.com"],
        subject: `New Contact Form Submission - ${contactData.purpose}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <h3>Contact Information</h3>
          <ul>
            <li><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</li>
            <li><strong>Email:</strong> ${contactData.email}</li>
            <li><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</li>
            <li><strong>Location:</strong> ${contactData.city || 'Not provided'}, ${contactData.country || 'Not provided'}</li>
          </ul>
          
          <h3>Inquiry Details</h3>
          <ul>
            <li><strong>Purpose:</strong> ${contactData.purpose}</li>
          </ul>
          
          <h3>Message</h3>
          <p>${contactData.message}</p>
          
          <p><em>To reply, simply respond to this email.</em></p>
        `,
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