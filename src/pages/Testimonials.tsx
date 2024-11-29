import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const testimonialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  isStudent: z.boolean(),
  testimonyText: z.string().min(10, "Testimony must be at least 10 characters"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const Testimonials = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      isStudent: false,
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      setIsSubmitting(true);

      // Generate verification token
      const verificationToken = crypto.randomUUID();

      // Save testimonial to database
      const { error: dbError } = await supabase.from("testimonials").insert({
        full_name: data.fullName,
        display_name: data.displayName,
        is_student: data.isStudent,
        testimony_text: data.testimonyText,
        email: data.email,
        verification_token: verificationToken,
      });

      if (dbError) throw dbError;

      // Send email notifications
      const { error: notificationError } = await supabase.functions.invoke(
        "send-testimonial-confirmation",
        {
          body: {
            to: data.email,
            name: data.displayName,
            verificationToken,
          },
        }
      );

      if (notificationError) throw notificationError;

      // Notify admin
      await supabase.functions.invoke("send-feedback-notification", {
        body: {
          type: "testimonial",
          name: data.fullName,
          email: data.email,
          content: data.testimonyText,
          isStudent: data.isStudent,
        },
      });

      toast({
        title: "Testimonial submitted!",
        description:
          "Please check your email to verify and publish your testimonial.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Share Your Story</h1>
            <p className="text-gray-600">
              Your experience matters! Share your journey and help others understand
              the value of our trading community.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This will not be displayed publicly
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be shown publicly
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll send you a verification link
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isStudent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Student</FormLabel>
                      <FormDescription>
                        Are you a current or former student?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testimonyText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Testimony</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Testimonial"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Testimonials;