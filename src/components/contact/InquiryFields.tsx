import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "@/lib/validations/contact";

interface InquiryFieldsProps {
  form: UseFormReturn<ContactFormValues>;
}

const InquiryFields = ({ form }: InquiryFieldsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-primary">Inquiry Details</h2>
      <FormField
        control={form.control}
        name="purpose"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Contact Purpose</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="general" />
                  </FormControl>
                  <FormLabel className="font-normal">General Inquiry</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="enrollment" />
                  </FormControl>
                  <FormLabel className="font-normal">Course Enrollment</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="support" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Tools/Resources Support
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="partnership" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Partnership/Collaboration
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your message"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InquiryFields;