import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  selectedCourse: string;
  package: string;
  price: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationRequest = await req.json();

    // Send confirmation email to applicant
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [applicationData.email],
        subject: "Thank you for your course application!",
        html: `
          <h2>Congratulations on Taking the First Step!</h2>
          <p>Dear ${applicationData.firstName},</p>
          
          <p>Thank you for applying to our ${applicationData.selectedCourse} course. We're excited to have you join our community of traders!</p>
          
          <h3>Your Application Details:</h3>
          <ul>
            <li>Selected Course: ${applicationData.selectedCourse}</li>
            <li>Package Type: ${applicationData.package}</li>
            <li>Investment: CHF ${applicationData.price.toLocaleString()}</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your application and contact you within 24-48 hours.</li>
            <li>We'll schedule an initial discussion to understand your goals better.</li>
            <li>You'll receive detailed payment instructions to secure your spot.</li>
          </ol>
          
          <h3>While You Wait:</h3>
          <p>We invite you to explore our <a href="https://bit2big.com/tools">Tools and Resources</a> section. 
          It contains valuable trading insights and materials that will give you a head start on your journey.</p>
          
          <p>If you have any questions in the meantime, feel free to reach out to us.</p>
          
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    // Send detailed notification to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: ["mail@bit2big.com"],
        subject: `New Course Application - ${applicationData.selectedCourse}`,
        html: `
          <h2>New Course Application Received</h2>
          
          <h3>Applicant Information</h3>
          <ul>
            <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
            <li><strong>Email:</strong> ${applicationData.email}</li>
            <li><strong>Phone:</strong> ${applicationData.phone || 'Not provided'}</li>
            <li><strong>Location:</strong> ${applicationData.city || 'Not provided'}, ${applicationData.country || 'Not provided'}</li>
          </ul>
          
          <h3>Course Details</h3>
          <ul>
            <li><strong>Selected Course:</strong> ${applicationData.selectedCourse}</li>
            <li><strong>Package Type:</strong> ${applicationData.package}</li>
            <li><strong>Price:</strong> CHF ${applicationData.price.toLocaleString()}</li>
          </ul>
          
          <p><em>To reply, simply respond to this email.</em></p>
        `,
        reply_to: applicationData.email,
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
    console.error("Error in send-application-email function:", error);
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