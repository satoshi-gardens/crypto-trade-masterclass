import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PhotoUploadFieldProps {
  form: UseFormReturn<any>;
}

export const PhotoUploadField = ({ form }: PhotoUploadFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="photo"
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>Photo (Optional)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => onChange(e.target.files)}
              {...field}
            />
          </FormControl>
          <FormDescription>
            Upload a JPEG or PNG image (max 2MB)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};