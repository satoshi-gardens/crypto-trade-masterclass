import { z } from "zod";
import { checkoutFormSchema } from "@/lib/validations/checkout";

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;