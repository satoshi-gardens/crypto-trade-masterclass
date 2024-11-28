import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  referralCode: string;
  websiteUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, referralCode, websiteUrl }: EmailRequest = await req.json();
    
    console.log("Sending referral registration email to:", to);
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ct4p@bit2big.com",
        to: [to],
        subject: "Welcome to Our Referral Program!",
        html: `
          <h2>Welcome to Our Referral Program!</h2>
          <p>Thank you for joining our referral program. Here are your referral details:</p>
          
          <h3>Your Referral Code:</h3>
          <p style="font-family: monospace; font-size: 18px; background: #f5f5f5; padding: 10px; border-radius: 4px;">
            ${referralCode}
          </p>
          
          <h3>Your Referral Link:</h3>
          <p style="font-family: monospace; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
            ${websiteUrl}/?ref=${referralCode}
          </p>
          
          <h3>How it works:</h3>
          <ol>
            <li>Share your referral link with potential students</li>
            <li>When they sign up using your link, you'll earn a commission</li>
            <li>Track your referrals and earnings in your dashboard</li>
          </ol>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
          
          <p>Best regards,<br>The Bit2Big Team</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending email:", error);
      throw new Error(error);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-referral-registration-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);