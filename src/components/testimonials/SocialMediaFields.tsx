import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TestimonialFormValues } from "./TestimonialForm";

interface SocialMediaFieldsProps {
  form: UseFormReturn<TestimonialFormValues>;
}

export const SocialMediaFields = ({ form }: SocialMediaFieldsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-primary">Social Media (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="telegramHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Handle</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitterHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Handle</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagramHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Handle</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};