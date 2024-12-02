import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema } from "@/lib/validations/checkout";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutValidation } from "@/components/checkout/CheckoutValidation";

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const location = useLocation();
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

        if (error) throw error;
        setValidatedPrice(data.validatedPrice);
      } catch (error) {
        console.error("Price validation error:", error);
        toast.error("Failed to validate price. Please try again.");
        navigate("/courses");
      }
    };

    if (location.state) {
      validatePrice();
    }
  }, [courseTitle, packageType, price, paymentType, urlReferralCode, navigate, location.state]);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!validatedPrice) {
      toast.error("Invalid price. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("course_applications")
        .insert([{
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          city: data.city.trim(),
          country: data.country,
          selected_course: courseTitle,
          package: packageType,
          price: validatedPrice,
          payment_type: paymentType,
          payment_understanding: data.agreement,
          referral_code: urlReferralCode,
        }])
        .select()
        .single();

      if (dbError) throw dbError;

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
          paymentType: paymentType,
          referralCode: urlReferralCode,
        },
      });

      if (emailError) throw emailError;

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
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <CheckoutValidation state={location.state} />
        <CheckoutHeader />
        {validatedPrice !== null && (
          <>
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
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Checkout;