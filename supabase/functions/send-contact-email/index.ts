import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  purpose: string;
  message: string;
}

serve(async (req) => {
  console.log("Received contact form request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const formData: ContactFormData = await req.json();
    console.log("Processing contact form data:", {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      purpose: formData.purpose
    });

    // Send confirmation email to user
    console.log("Sending confirmation email to user:", formData.email);
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big <noreply@bit2big.com>",
        to: [formData.email],
        subject: "We've Received Your Message",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Contacting Us!</h2>
            <p>Dear ${formData.firstName},</p>
            <p>We've received your message and will get back to you shortly.</p>
            
            <div style="background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3>Your Message Details:</h3>
              <p><strong>Purpose:</strong> ${formData.purpose}</p>
              <p><strong>Message:</strong><br>${formData.message}</p>
            </div>

            <p>While you wait, why not explore our courses?</p>
            <p><a href="https://bit2big.com/courses" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Our Courses</a></p>
            
            <p>Best regards,<br>The Bit2Big Team</p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Error sending user confirmation email:", error);
      throw new Error(`Failed to send confirmation email: ${error}`);
    }

    console.log("User confirmation email sent successfully");

    // Send notification to admin
    console.log("Sending notification email to admin");
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bit2Big Contact Form <noreply@bit2big.com>",
        to: ["admin@bit2big.com"],
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <div style="background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3>Contact Details:</h3>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
              <p><strong>Location:</strong> ${formData.city || 'Not provided'}, ${formData.country || 'Not provided'}</p>
              <p><strong>Purpose:</strong> ${formData.purpose}</p>
              <p><strong>Message:</strong><br>${formData.message}</p>
            </div>
            <p>You can reply directly to this email to contact the sender.</p>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Error sending admin notification email:", error);
      throw new Error(`Failed to send admin notification: ${error}`);
    }

    console.log("Admin notification email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Contact form processed successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process contact form" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});