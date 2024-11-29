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
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  area: "general" | "courses" | "platform" | "technical" | "other";
  message: string;
}

const generateUserEmail = (data: FeedbackRequest) => ({
  subject: "Thank you for your feedback - Bit2Big Crypto Trading",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your feedback, ${data.firstName}!</h2>
      <p>We greatly appreciate you taking the time to share your thoughts with us regarding our ${data.area} area.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <p><strong>Your message:</strong></p>
        <p style="font-style: italic;">${data.message}</p>
      </div>

      <h3>Discover More with Bit2Big</h3>
      
      <div style="margin: 20px 0;">
        <h4>🎓 Transform Your Trading Journey</h4>
        <p>Ready to take your crypto trading skills to the next level? Our comprehensive courses offer:</p>
        <ul>
          <li>Expert-led training sessions</li>
          <li>Practical trading strategies</li>
          <li>Real-world case studies</li>
          <li>Personalized coaching support</li>
        </ul>
        <p><a href="https://cryptocourse.bit2big.com/courses" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Our Courses</a></p>
      </div>

      <div style="margin: 20px 0;">
        <h4>💰 Join Our Referral Program</h4>
        <p>Share the knowledge and earn rewards! Our referral program offers:</p>
        <ul>
          <li>Earn up to 10% commission on referrals</li>
          <li>Get exclusive access to premium content</li>
          <li>Receive special discounts on courses</li>
        </ul>
        <p><a href="https://cryptocourse.bit2big.com/referral" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join Referral Program</a></p>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        This email was sent in response to your feedback submission. If you have any questions, please contact our support team.
      </p>
    </div>
  `
});

const generateAdminEmail = (data: FeedbackRequest) => ({
  subject: `New Feedback Submission: ${data.area.toUpperCase()}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Feedback Received</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>Contact Information</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
          <li><strong>Country:</strong> ${data.country}</li>
          <li><strong>Area:</strong> ${data.area}</li>
        </ul>
      </div>

      <div style="background-color: #fff; border: 1px solid #eee; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>Feedback Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>

      <p style="color: #666;">
        To respond, simply reply to this email.
      </p>
    </div>
  `
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const feedbackData: FeedbackRequest = await req.json();

    // Get site owner email from database
    const { data: siteSettings, error: settingsError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'site_owner_email')
      .single();

    if (settingsError) {
      console.error('Error fetching site settings:', settingsError);
      throw new Error('Failed to fetch site settings');
    }

    const siteOwnerEmail = siteSettings.value;

    // Send email to user
    const userEmail = generateUserEmail(feedbackData);
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [feedbackData.email],
        subject: userEmail.subject,
        html: userEmail.html,
      }),
    });

    // Send email to admin
    const adminEmail = generateAdminEmail(feedbackData);
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [siteOwnerEmail],
        subject: adminEmail.subject,
        html: adminEmail.html,
        reply_to: feedbackData.email,
      }),
    });

    if (!userEmailRes.ok || !adminEmailRes.ok) {
      throw new Error("Failed to send one or more emails");
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