import { UseFormReturn } from "react-hook-form";
import { FeedbackFormValues } from "./FeedbackForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFieldsProps {
  form: UseFormReturn<FeedbackFormValues>;
}

const FeedbackFields = ({ form }: FeedbackFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="area"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Feedback Area</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback area" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="courses">Course Content</SelectItem>
                <SelectItem value="platform">Platform Experience</SelectItem>
                <SelectItem value="technical">Technical Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Feedback</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share your thoughts..."
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Your feedback helps us improve our services
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FeedbackFields;