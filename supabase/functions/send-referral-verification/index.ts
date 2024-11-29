import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  verificationToken: string;
  isExisting: boolean;
  from: string;
}

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

    const requestData: EmailRequest = await req.json();
    console.log("Request data:", JSON.stringify(requestData));

    if (!requestData.email || !requestData.verificationToken || !requestData.from) {
      throw new Error("Missing required fields");
    }

    const verificationUrl = `${req.headers.get("origin")}/verify-referral?token=${requestData.verificationToken}`;
    
    let emailSubject, emailContent;
    
    if (requestData.isExisting) {
      emailSubject = "Access Your Bit2Big Referral Dashboard";
      emailContent = `
        <h2>Welcome Back to Bit2Big!</h2>
        <p>You've requested access to your referral dashboard. Click the secure link below to access it:</p>
        <p style="margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Access Your Dashboard
          </a>
        </p>
        <p><strong>Important:</strong> This link is valid for 48 hours for your security.</p>
        <p>With your referral dashboard, you can:</p>
        <ul>
          <li>Track your referrals and earnings</li>
          <li>Access your unique referral link</li>
          <li>View your rewards and benefits</li>
        </ul>
        <p>If you didn't request this access, please ignore this email.</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from Bit2Big. Please do not reply to this email.
        </p>
      `;
    } else {
      emailSubject = "Welcome to Bit2Big's Referral Program - Verify Your Email";
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 24px;">Welcome to Bit2Big's Referral Program!</h2>
          
          <p>Thank you for joining our community of successful traders! To get started and activate your referral account, please verify your email by clicking the button below:</p>
          
          <p style="margin: 32px 0; text-align: center;">
            <a href="${verificationUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email & Activate Account
            </a>
          </p>

          <div style="background-color: #f5f5f5; padding: 24px; border-radius: 8px; margin: 32px 0;">
            <h3 style="color: #0070f3; margin-top: 0;">Your Benefits as a Referrer:</h3>
            
            <div style="margin-bottom: 16px;">
              <h4 style="color: #333; margin-bottom: 8px;">💰 Earn Commission</h4>
              <p style="color: #666; margin: 0;">Receive up to 10% commission for each successful referral</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4 style="color: #333; margin-bottom: 8px;">🎁 Reward Tokens</h4>
              <p style="color: #666; margin: 0;">Get 100 tokens for every 5 successful referrals</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4 style="color: #333; margin-bottom: 8px;">👥 Help Others Succeed</h4>
              <p style="color: #666; margin: 0;">Your referrals get a 10% discount on their first course</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4 style="color: #333; margin-bottom: 8px;">🏆 Exclusive Access</h4>
              <p style="color: #666; margin: 0;">Unlock additional courses and special benefits as you refer more people</p>
            </div>
          </div>

          <p><strong>Note:</strong> This verification link is valid for 48 hours.</p>
          
          <p>After verification, you'll be able to:</p>
          <ul style="color: #666;">
            <li>Access your unique referral link</li>
            <li>Track your referrals and earnings</li>
            <li>Monitor your rewards progress</li>
            <li>View detailed statistics</li>
          </ul>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="color: #666; font-size: 12px; text-align: center;">
            This is an automated message from Bit2Big. Please do not reply to this email.
          </p>
        </div>
      `;
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: requestData.from,
        to: [requestData.email],
        subject: emailSubject,
        html: emailContent,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email API response:", JSON.stringify(emailResult));

    if (!emailResponse.ok) {
      throw new Error(`Failed to send email: ${JSON.stringify(emailResult)}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in send-referral-verification function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);