import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema } from "@/lib/validations/checkout";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validatedPrice, setValidatedPrice] = useState<number | null>(null);
  
  const { courseTitle, packageType, price, paymentType } = location?.state || {};
  const urlReferralCode = searchParams.get("ref");

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

  useEffect(() => {
    if (!location.state) {
      console.error("No state provided to checkout page");
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
      return;
    }

    if (!courseTitle || !packageType || !price || !paymentType) {
      console.error("Missing required parameters:", { courseTitle, packageType, price, paymentType });
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
      return;
    }

    const validatePrice = async () => {
      try {
        let ipAddress;
        try {
          const { data: ipResponse } = await fetch('https://api.ipify.org?format=json')
            .then(res => res.json());
          ipAddress = ipResponse?.ip;
        } catch (error) {
          console.error("Error fetching IP:", error);
          ipAddress = '0.0.0.0';
        }

        const { data, error } = await supabase.functions.invoke("validate-checkout", {
          body: {
            courseTitle,
            packageType,
            price,
            paymentType,
            referralCode: urlReferralCode,
            ipAddress,
          },
        });

        if (error) {
          console.error("Price validation error:", error);
          toast.error(error.message || "Failed to validate price. Please try again.");
          navigate("/courses");
          return;
        }

        setValidatedPrice(data.validatedPrice);
      } catch (error) {
        console.error("Price validation error:", error);
        toast.error("Failed to validate price. Please try again.");
        navigate("/courses");
      }
    };

    validatePrice();
  }, [courseTitle, packageType, price, paymentType, urlReferralCode, navigate, location.state]);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!validatedPrice) {
      toast.error("Invalid price. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting application with data:", {
        ...data,
        courseTitle,
        packageType,
        price: validatedPrice,
        paymentType,
        referralCode: urlReferralCode,
      });

      // Ensure payment_type is either 'monthly' or 'annual'
      const normalizedPaymentType = paymentType.toLowerCase();
      if (!['monthly', 'annual'].includes(normalizedPaymentType)) {
        throw new Error("Invalid payment type. Must be either 'monthly' or 'annual'.");
      }

      // Format the data according to the database schema
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
        payment_type: normalizedPaymentType,
        payment_understanding: data.agreement,
        referral_code: urlReferralCode || null,
      };

      const { error: dbError } = await supabase
        .from("course_applications")
        .insert([applicationData])
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(dbError.message);
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke("send-application-email", {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          country: data.country,
          selectedCourse: courseTitle,
          package: packageType,
          price: validatedPrice,
          paymentType: normalizedPaymentType,
          referralCode: urlReferralCode,
        },
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
        // Continue with success flow but log the error
        toast.error("Application submitted but there was an issue sending the confirmation email. Our team will contact you shortly.");
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

  if (!location.state || !courseTitle || !packageType || !price || !paymentType || validatedPrice === null) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <CheckoutHeader />
        <CheckoutSummary
          courseTitle={courseTitle}
          packageType={packageType}
          paymentType={paymentType}
          validatedPrice={validatedPrice}
          referralCode={urlReferralCode}
        />
        <CheckoutForm
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </PageLayout>
  );
};

export default Checkout;