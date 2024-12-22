import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "admin@kyconnect.com"; // Replace with actual admin email

interface TestimonialData {
  fullName: string;
  displayName: string;
  email: string;
  isStudent: boolean;
  testimonyText: string;
  verificationToken: string;
}

interface EmailRequest {
  testimonial: TestimonialData;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { testimonial }: EmailRequest = await req.json();
    const verificationUrl = `https://kyconnect.com/verify-testimonial?token=${testimonial.verificationToken}`;

    const emailContent = `
      <h1>New Testimonial Submission</h1>
      <h2>Testimonial Details:</h2>
      <ul>
        <li><strong>Full Name:</strong> ${testimonial.fullName}</li>
        <li><strong>Display Name:</strong> ${testimonial.displayName}</li>
        <li><strong>Email:</strong> ${testimonial.email}</li>
        <li><strong>Is Student:</strong> ${testimonial.isStudent ? 'Yes' : 'No'}</li>
      </ul>
      <h3>Testimony:</h3>
      <p>${testimonial.testimonyText}</p>
      <p>Click the link below to verify this testimonial:</p>
      <p><a href="${verificationUrl}">Verify Testimonial</a></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "KY Connect <no-reply@kyconnect.com>",
        to: [ADMIN_EMAIL],
        subject: "New Testimonial Submission - Action Required",
        html: emailContent,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);