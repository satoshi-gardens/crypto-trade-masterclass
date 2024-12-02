import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CheckoutValidationProps {
  state: any;
}

export const CheckoutValidation = ({ state }: CheckoutValidationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      console.error("No state provided to checkout page");
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
      return;
    }

    const { courseTitle, packageType, price, paymentType } = state;
    if (!courseTitle || !packageType || !price || !paymentType) {
      console.error("Missing required parameters:", { courseTitle, packageType, price, paymentType });
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
    }
  }, [state, navigate]);

  return null;
};