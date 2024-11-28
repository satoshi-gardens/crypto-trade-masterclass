import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReferralRequest {
  referralCode: string;
  courseApplicationId: number;
  price: number;
}

const calculateCommission = (price: number) => {
  return price * 0.1; // 10% commission
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { referralCode, courseApplicationId, price }: ReferralRequest = await req.json();
    console.log(`Processing referral for code: ${referralCode}, application: ${courseApplicationId}`);

    // Calculate commission
    const commissionAmount = calculateCommission(price);
    console.log(`Calculated commission amount: ${commissionAmount}`);

    // Create conversion record
    const { error: conversionError } = await supabase
      .from("referral_conversions")
      .insert({
        referral_code: referralCode,
        course_application_id: courseApplicationId,
        commission_amount: commissionAmount,
      });

    if (conversionError) {
      console.error("Error creating conversion record:", conversionError);
      throw conversionError;
    }

    // Update referrer's total earnings
    const { data: referrer, error: referrerError } = await supabase
      .from("referrers")
      .select("total_earnings")
      .eq("referral_code", referralCode)
      .single();

    if (referrerError) {
      console.error("Error fetching referrer:", referrerError);
      throw referrerError;
    }

    const newTotalEarnings = (referrer.total_earnings || 0) + commissionAmount;
    const { error: updateError } = await supabase
      .from("referrers")
      .update({ total_earnings: newTotalEarnings })
      .eq("referral_code", referralCode);

    if (updateError) {
      console.error("Error updating referrer earnings:", updateError);
      throw updateError;
    }

    // Update referral click as converted
    await supabase
      .from("referral_clicks")
      .update({ converted: true })
      .eq("referral_code", referralCode)
      .is("converted", null);

    console.log("Referral processing completed successfully");

    return new Response(
      JSON.stringify({ success: true, commission: commissionAmount }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing referral:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});