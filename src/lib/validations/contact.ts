import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z\s]*$/, "First name must contain only letters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-Z\s]*$/, "Last name must contain only letters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .refine((email) => !email.includes("tempmail") && !email.includes("disposable"), {
      message: "Please use a valid email address",
    }),
  phone: z
    .string()
    .regex(/^[+]?[\d\s-]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(1, "City is required")
    .regex(/^[a-zA-Z\s]*$/, "City must contain only letters"),
  country: z.string().min(1, "Country is required"),
  purpose: z.enum(["general", "enrollment", "support", "partnership"], {
    required_error: "Please select a contact purpose",
  }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(500, "Message must not exceed 500 characters")
    .regex(/^[^<>]*$/, "HTML tags are not allowed"),
});