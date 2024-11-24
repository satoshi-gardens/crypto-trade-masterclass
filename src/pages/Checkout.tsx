import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import LocationFields from "@/components/contact/LocationFields";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the payment terms",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { courseTitle, packageType, price } = location.state || {};

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
    if (!courseTitle || !packageType || !price) {
      toast.error("Please select a course package to proceed to checkout.");
      navigate("/courses");
    }
  }, [courseTitle, packageType, price, navigate]);

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      // Store application in database using the correct method
      const { error: dbError } = await supabase
        .from("course_applications")
        .insert([{
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          country: data.country,
          selected_course: courseTitle,
          package: packageType,
          price: price,
          payment_understanding: data.agreement,
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      // Send confirmation emails
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
          price: price,
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

  if (!courseTitle || !packageType || !price) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Complete Your Application</h1>
        
        <div className="bg-accent/10 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Selected Course:</span> {courseTitle}</p>
            <p><span className="font-medium">Package:</span> {packageType}</p>
            <p><span className="font-medium">Price:</span> CHF {price.toLocaleString()}</p>
            <p className="text-primary font-medium mt-4">
              Please complete payment within 7 days to secure your spot.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoFields form={form} />
            <LocationFields form={form} />

            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label
                      htmlFor="agreement"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I understand that payment must be completed within 7 days to secure my spot.
                    </label>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={!form.formState.isValid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm and Get Payment Instructions"}
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default Checkout;