import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkoutFormSchema } from "@/lib/validations/checkout";
import type { CheckoutFormValues } from "@/types/checkout";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import CheckoutHeader from "./CheckoutHeader";
import { submitApplication } from "@/lib/services/checkoutService";

export const CheckoutContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { courseTitle, packageType, price, paymentType, referralCode } = location?.state || {};

  // Validate price and set initial state with a default value
  const [validatedPrice, setValidatedPrice] = useState<number>(() => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      console.error("Invalid price received:", price);
      return 0;
    }
    return numericPrice;
  });

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
    if (validatedPrice <= 0) {
      toast.error("Invalid price. Please try again.");
      navigate("/courses");
      return;
    }

    if (!courseTitle || !packageType || !paymentType) {
      toast.error("Missing required course information. Please select a course package.");
      navigate("/courses");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication({
        formData: data,
        courseTitle,
        packageType,
        price: validatedPrice,
        paymentType,
        referralCode,
      });

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

  // Redirect if missing required data
  if (!location.state || !courseTitle || !packageType || validatedPrice <= 0 || !paymentType) {
    console.error("Missing required parameters:", { courseTitle, packageType, validatedPrice, paymentType });
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