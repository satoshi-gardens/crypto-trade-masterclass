import * as z from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => {
      // Validate email domain
      const domain = email.split('@')[1];
      return !['tempmail.com', 'throwaway.com'].includes(domain);
    }, "Please use a valid email domain")
    .transform(str => str.toLowerCase().trim()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  city: z
    .string()
    .min(1, "City is required")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "City name can only contain letters, spaces, hyphens, and apostrophes"),
  country: z.string().min(1, "Country is required"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the payment terms",
  }),
});