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
  try {
    console.log("Starting application submission process...");
    
    // First, get admin email from site settings
    const { data: siteSettings, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_email")
      .single();

    if (settingsError) {
      console.error("Error fetching admin email:", settingsError);
      throw new Error("Failed to process application");
    }

    console.log("Admin email fetched successfully:", siteSettings?.value);
    const adminEmail = siteSettings?.value;

    // Insert the application data
    const applicationData = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim(),
      city: formData.city?.trim(),
      country: formData.country,
      selected_course: courseTitle,
      package: packageType,
      price,
      payment_type: paymentType.toLowerCase(),
      payment_understanding: formData.agreement,
      referral_code: referralCode || null,
    };

    console.log("Inserting application data:", applicationData);

    const { data: application, error: dbError } = await supabase
      .from("course_applications")
      .insert([applicationData])
      .select()
      .single();

    if (dbError) throw dbError;

    console.log("Application data inserted successfully:", application);

    // Send confirmation email to user
    console.log("Fetching user email template...");
    const userTemplate = await getEmailTemplate("application_confirmation", {
      firstName: formData.firstName,
      courseTitle,
      packageType,
      price: price.toLocaleString(),
      paymentType: paymentType === 'annual' ? 'One-time Payment' : 'Monthly Payments'
    });

    if (!userTemplate) {
      console.error("Failed to fetch user email template");
      throw new Error("Failed to send confirmation email");
    }

    console.log("Sending confirmation email to user...");
    const userEmailResult = await sendEmail({
      to: [formData.email],
      subject: userTemplate.subject,
      html: userTemplate.html,
      from: "Bit2Big Course Applications <courses@bit2big.com>",
    });

    if (!userEmailResult.success) {
      console.error("Error sending user email:", userEmailResult.error);
      throw new Error("Failed to send confirmation email");
    }

    console.log("User confirmation email sent successfully");

    // Send notification email to admin
    console.log("Fetching admin notification template...");
    const adminTemplate = await getEmailTemplate("admin_application_notification", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      city: formData.city || 'Not provided',
      country: formData.country || 'Not provided',
      courseTitle,
      packageType,
      price: price.toLocaleString(),
      paymentType,
      referralCode: referralCode || 'None'
    });

    if (!adminTemplate) {
      console.error("Failed to fetch admin email template");
      // Don't throw here, as user's application was already processed
      toast.error("Admin notification failed, but your application was received");
    } else {
      console.log("Sending notification email to admin...");
      const adminEmailResult = await sendEmail({
        to: [adminEmail],
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        from: "Bit2Big Course Applications <courses@bit2big.com>",
        replyTo: formData.email
      });

      if (!adminEmailResult.success) {
        console.error("Error sending admin email:", adminEmailResult.error);
        // Don't throw here, as user's application was already processed
        toast.error("Admin notification failed, but your application was received");
      } else {
        console.log("Admin notification email sent successfully");
      }
    }

    return application;
  } catch (error: any) {
    console.error("Error submitting application:", error);
    throw error;
  }
};