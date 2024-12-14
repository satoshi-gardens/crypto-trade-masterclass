import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CityInputProps {
  form: UseFormReturn<any>;
  label?: boolean;
}

export const CityInput = ({ form, label = true }: CityInputProps) => {
  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>City</FormLabel>}
          <FormControl>
            <Input placeholder="Enter your city" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};