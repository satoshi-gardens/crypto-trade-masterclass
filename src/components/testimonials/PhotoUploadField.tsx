import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface PhotoUploadFieldProps {
  form: UseFormReturn<any>;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const PhotoUploadField = ({ form }: PhotoUploadFieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: FileList | null) => void) => {
    const files = e.target.files;
    if (!files?.length) return;

    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 2MB");
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      e.target.value = "";
      return;
    }

    onChange(files);
  };

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
              onChange={(e) => handleFileChange(e, onChange)}
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