import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import LocationFields from "@/components/contact/LocationFields";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Move form schema to a separate file
import { checkoutFormSchema } from "@/lib/validations/checkout";
type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Move summary section to a separate component
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validatedPrice, setValidatedPrice] = useState<number | null>(null);
  
  // Log the state for debugging
  console.log("Checkout state:", location.state);
  
  const { courseTitle, packageType, price, paymentType } = location.state || {};
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
    // Validate required parameters
    if (!courseTitle || !packageType || !price || !paymentType) {
      console.error("Missing required parameters:", { courseTitle, packageType, price, paymentType });
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
      return;
    }

    // Validate price on component mount
    const validatePrice = async () => {
      try {
        const { data: ipResponse } = await fetch('https://api.ipify.org?format=json')
          .then(res => res.json());

        console.log("Validating price with parameters:", {
          courseTitle,
          packageType,
          price,
          paymentType,
          referralCode: urlReferralCode,
          ipAddress: ipResponse.ip,
        });

        const { data, error } = await supabase.functions.invoke("validate-checkout", {
          body: {
            courseTitle,
            packageType,
            price,
            paymentType,
            referralCode: urlReferralCode,
            ipAddress: ipResponse.ip,
          },
        });

        if (error) {
          console.error("Price validation error:", error);
          toast.error(error.message || "Failed to validate price. Please try again.");
          navigate("/courses");
          return;
        }

        console.log("Price validation successful:", data);
        setValidatedPrice(data.validatedPrice);
      } catch (error) {
        console.error("Price validation error:", error);
        toast.error("Failed to validate price. Please try again.");
        navigate("/courses");
      }
    };

    validatePrice();
  }, [courseTitle, packageType, price, paymentType, urlReferralCode, navigate]);

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

  if (!courseTitle || !packageType || !price || !paymentType || validatedPrice === null) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Complete Your Application</h1>
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