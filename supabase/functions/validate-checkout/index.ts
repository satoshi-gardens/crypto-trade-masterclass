import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  courseTitle: string;
  packageType: string;
  referralCode?: string;
  ipAddress: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { courseTitle, packageType, referralCode, ipAddress }: CheckoutRequest = await req.json();

    // Validate referral code if provided
    let discountPercentage = 0;
    if (referralCode) {
      // Check rate limiting
      const { data: rateLimitCheck } = await supabaseClient
        .rpc('check_referral_rate_limit', {
          p_referral_code: referralCode,
          p_ip_address: ipAddress,
        });

      if (!rateLimitCheck) {
        return new Response(
          JSON.stringify({ 
            error: "Too many attempts. Please try again later." 
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }

      // Verify referral code
      const { data: referrer, error: referrerError } = await supabaseClient
        .from("referrers")
        .select("*")
        .eq("referral_code", referralCode)
        .eq("is_verified", true)
        .single();

      if (referrerError || !referrer) {
        return new Response(
          JSON.stringify({ error: "Invalid referral code" }),
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }

      discountPercentage = 10; // Default 10% discount for referrals
    }

    // Calculate base price based on package type
    let basePrice = 0;
    switch (packageType) {
      case "Online Training":
        basePrice = 1800;
        break;
      case "Premium (In-Person)":
        basePrice = 3240;
        break;
      case "Hybrid Training":
        basePrice = 2700;
        break;
      default:
        throw new Error("Invalid package type");
    }

    // Apply discount if referral code is valid
    const finalPrice = referralCode ? 
      basePrice * (1 - discountPercentage / 100) : 
      basePrice;

    return new Response(
      JSON.stringify({
        validatedPrice: finalPrice,
        discountApplied: discountPercentage > 0,
        discountPercentage,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});