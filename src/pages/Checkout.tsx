import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import LocationFields from "@/components/contact/LocationFields";
import { toast } from "sonner";

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
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // Here you would typically send the data to your backend
    toast.success("Application submitted successfully!");
    navigate("/thank-you", {
      state: {
        courseTitle,
        email: data.email,
      },
    });
  };

  if (!courseTitle || !packageType || !price) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Checkout Session</h1>
          <p className="mb-4">Please select a course package first.</p>
          <Button asChild>
            <Link to="/courses">View Courses</Link>
          </Button>
        </div>
      </PageLayout>
    );
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

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreement"
                checked={form.watch("agreement")}
                onCheckedChange={(checked) => form.setValue("agreement", checked as boolean)}
              />
              <label htmlFor="agreement" className="text-sm">
                I understand that payment must be completed within 7 days to secure my spot.
              </label>
            </div>

            <Button type="submit" className="w-full">
              Confirm and Get Payment Instructions
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default Checkout;