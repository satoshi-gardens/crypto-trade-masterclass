import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailNotificationRequest {
  type: "new_registration" | "new_purchase" | "token_expiry" | "inactive_user";
  referrerEmail: string;
  data?: {
    referralCode?: string;
    purchaseAmount?: number;
    rewardAmount?: number;
    totalRewards?: number;
    tokenExpiryDate?: string;
    from?: string;
  };
}

const emailTemplates = {
  new_registration: (data: any) => ({
    subject: "Good News! You've Referred a New User",
    html: `
      <h2>Congratulations!</h2>
      <p>Someone just registered using your referral link. Keep sharing to earn more rewards!</p>
      <p>Your referral code: ${data.referralCode}</p>
      <p>Share your unique link: ${data.referralLink}</p>
      <h3>Tips for Successful Referrals:</h3>
      <ul>
        <li>Share on social media</li>
        <li>Tell your friends about the benefits</li>
        <li>Explain your positive experience</li>
      </ul>
    `,
  }),
  new_purchase: (data: any) => ({
    subject: "Congratulations! You've Earned a Reward",
    html: `
      <h2>Great News!</h2>
      <p>Someone has made a purchase using your referral link!</p>
      <p>Reward earned: $${data.rewardAmount}</p>
      <p>Your total rewards balance: $${data.totalRewards}</p>
      <p>Keep sharing your referral link to earn more rewards!</p>
    `,
  }),
  token_expiry: (data: any) => ({
    subject: "Reminder: Verify Your Email to Activate Your Referral Account",
    html: `
      <h2>Don't Miss Out!</h2>
      <p>Your verification link will expire in 24 hours.</p>
      <p>Click the link in your previous email to activate your account and start earning rewards!</p>
      <p>If you need a new verification link, please visit our referral page.</p>
    `,
  }),
  inactive_user: (data: any) => ({
    subject: "Start Earning Rewards with Your Referral Link",
    html: `
      <h2>Hello!</h2>
      <p>We noticed you haven't shared your referral link yet.</p>
      <p>Your referral code: ${data.referralCode}</p>
      <h3>Quick Tips to Get Started:</h3>
      <ul>
        <li>Share on your favorite social media platforms</li>
        <li>Tell friends who might be interested in crypto trading</li>
        <li>Mention the benefits they'll receive</li>
      </ul>
      <p>Start sharing today and earn rewards for each successful referral!</p>
    `,
  }),
};

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

    const notification: EmailNotificationRequest = await req.json();
    console.log("Notification request:", notification);

    const template = emailTemplates[notification.type]({
      ...notification.data,
      referralLink: `${req.headers.get("origin")}/referral?ref=${notification.data?.referralCode}`,
    });

    // Send email using Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: notification.data?.from || "ct4p@bit2big.com",
        to: [notification.referrerEmail],
        subject: template.subject,
        html: template.html,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in send-referral-notifications function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send notification" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);