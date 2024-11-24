import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import LocationFields from "@/components/contact/LocationFields";
import InquiryFields from "@/components/contact/InquiryFields";
import Hero from "@/components/Hero";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      purpose: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast.success("Thank you for reaching out! We'll get back to you shortly.");
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Hero
        title="Contact Us"
        subtitle="Have questions? We'd love to hear from you"
        showButton={false}
      />
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoFields form={form} />
            <LocationFields form={form} />
            <InquiryFields form={form} />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default Contact;