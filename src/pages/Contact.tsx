import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import InquiryFields from "@/components/contact/InquiryFields";
import LocationFields from "@/components/contact/LocationFields";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      // Insert into general_inquiries table
      const { error: dbError } = await supabase
        .from("general_inquiries")
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            country: data.country,
            contact_purpose: data.purpose,
            message: data.message,
          },
        ]);

      if (dbError) throw dbError;

      // Send emails using the edge function
      const emailResponse = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (emailResponse.error) throw emailResponse.error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setIsSubmitted(true);
      
      // Redirect to courses page after 5 seconds
      setTimeout(() => {
        navigate("/courses");
      }, 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Thank You!</h1>
            <p className="text-lg text-muted-foreground">
              We've received your message and will get back to you shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to our courses page in a few seconds...
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground mt-2">
              Have a question or want to learn more? We're here to help!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PersonalInfoFields form={form} />
              <LocationFields form={form} />
              <InquiryFields form={form} />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;