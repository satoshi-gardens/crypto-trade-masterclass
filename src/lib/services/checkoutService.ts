import { supabase } from "@/integrations/supabase/client";
import { CheckoutFormValues } from "@/types/checkout";
import { toast } from "sonner";
import { getEmailTemplate, sendEmail } from "../email/emailService";

interface SubmissionData {
  formData: CheckoutFormValues;
  courseTitle: string;
  packageType: string;
  price: number;
  paymentType: string;
  referralCode?: string;
}

export const submitApplication = async ({
  formData,
  courseTitle,
  packageType,
  price,
  paymentType,
  referralCode,
}: SubmissionData) => {
  const applicationData = {
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    city: formData.city.trim(),
    country: formData.country,
    selected_course: courseTitle,
    package: packageType,
    price,
    payment_type: paymentType.toLowerCase(),
    payment_understanding: formData.agreement,
    referral_code: referralCode || null,
  };

  const { data, error: dbError } = await supabase
    .from("course_applications")
    .insert([applicationData])
    .select()
    .single();

  if (dbError) throw dbError;

  // Get email template and send confirmation
  const template = await getEmailTemplate("application_confirmation", {
    firstName: formData.firstName,
    courseTitle,
    packageType,
    price,
    paymentType,
  });

  if (!template) {
    console.error("Failed to fetch email template");
    throw new Error("Failed to send confirmation email");
  }

  const emailResult = await sendEmail({
    to: [formData.email],
    subject: template.subject,
    html: template.html,
    from: "Bit2Big Course Applications <courses@bit2big.com>",
  });

  if (!emailResult.success) {
    console.error("Error sending email:", emailResult.error);
    throw new Error("Failed to send confirmation email");
  }

  return data;
};