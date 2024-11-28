import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Check for expiring tokens (24 hours before expiry)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    const { data: expiringTokens, error: tokenError } = await supabase
      .from("referrers")
      .select("*")
      .is("is_verified", false)
      .not("verification_token", "is", null)
      .lt("token_expiry", expiryDate.toISOString())
      .gt("token_expiry", new Date().toISOString());

    if (tokenError) {
      console.error("Error fetching expiring tokens:", tokenError);
    } else {
      // Send expiry notifications
      for (const referrer of expiringTokens) {
        await fetch(`${req.headers.get("origin")}/functions/v1/send-referral-notifications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            type: "token_expiry",
            referrerEmail: referrer.user_email,
            data: {
              tokenExpiryDate: referrer.token_expiry,
              from: "ct4p@bit2big.com"
            },
          }),
        });
      }
    }

    // Check for inactive users (no referrals after 7 days)
    const inactiveDate = new Date();
    inactiveDate.setDate(inactiveDate.getDate() - 7);

    const { data: inactiveUsers, error: inactiveError } = await supabase
      .from("referrers")
      .select(`
        *,
        referral_clicks (count),
        referral_conversions (count)
      `)
      .eq("is_verified", true)
      .lt("created_at", inactiveDate.toISOString())
      .eq("referral_clicks.count", 0)
      .eq("referral_conversions.count", 0);

    if (inactiveError) {
      console.error("Error fetching inactive users:", inactiveError);
    } else {
      // Send inactive user notifications
      for (const referrer of inactiveUsers) {
        await fetch(`${req.headers.get("origin")}/functions/v1/send-referral-notifications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            type: "inactive_user",
            referrerEmail: referrer.user_email,
            data: {
              referralCode: referrer.referral_code,
              from: "ct4p@bit2big.com"
            },
          }),
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Cron job completed successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in referral-notifications-cron function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Cron job failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);