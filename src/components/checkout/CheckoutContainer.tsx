import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema } from "@/lib/validations/checkout";
import type { CheckoutFormValues } from "@/types/checkout";
import { sendEmail, getEmailTemplate } from "@/lib/email/emailService";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import CheckoutHeader from "./CheckoutHeader";

export const CheckoutContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validatedPrice, setValidatedPrice] = useState<number | null>(null);
  
  const { courseTitle, packageType, price, paymentType, referralCode } = location?.state || {};

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      agreement: false,
    },
    mode: "onChange",
  });

  const handleApplicationSubmission = async (data: CheckoutFormValues) => {
    if (!validatedPrice) {
      toast.error("Invalid price. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData = {
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        city: data.city.trim(),
        country: data.country,
        selected_course: courseTitle,
        package: packageType,
        price: validatedPrice,
        payment_type: paymentType.toLowerCase(),
        payment_understanding: data.agreement,
        referral_code: referralCode || null,
      };

      const { error: dbError } = await supabase
        .from("course_applications")
        .insert([applicationData])
        .select()
        .single();

      if (dbError) throw dbError;

      // Get email template and send confirmation
      const template = await getEmailTemplate("application_confirmation", {
        firstName: data.firstName,
        courseTitle,
        packageType,
        price: validatedPrice,
        paymentType,
      });

      if (!template) {
        console.error("Failed to fetch email template");
        throw new Error("Failed to send confirmation email");
      }

      const emailResult = await sendEmail({
        to: [data.email],
        subject: template.subject,
        html: template.html,
        from: "Bit2Big Course Applications <courses@bit2big.com>",
      });

      if (!emailResult.success) {
        console.error("Error sending email:", emailResult.error);
        throw new Error("Failed to send confirmation email");
      }

      toast.success("Application submitted successfully!");
      navigate("/thank-you", {
        state: {
          courseTitle,
          email: data.email,
          firstName: data.firstName,
        },
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!location.state || !courseTitle || !packageType || !price || !paymentType) {
    console.error("Missing required parameters:", { courseTitle, packageType, price, paymentType });
    toast.error("Please select a course package to proceed to checkout.");
    navigate("/courses");
    return null;
  }

  return (
    <div className="container max-w-2xl mx-auto px-6 py-12">
      <CheckoutHeader />
      <CheckoutSummary
        courseTitle={courseTitle}
        packageType={packageType}
        paymentType={paymentType}
        validatedPrice={validatedPrice}
        referralCode={referralCode}
      />
      <CheckoutForm
        form={form}
        onSubmit={handleApplicationSubmission}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};