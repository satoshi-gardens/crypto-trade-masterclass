import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "@/lib/validations/contact";
import { countries } from "@/lib/constants";

interface LocationFieldsProps {
  form: UseFormReturn<ContactFormValues>;
}

const LocationFields = ({ form }: LocationFieldsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-primary">Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Swiss and surrounding countries first */}
                  <SelectItem value="CH">Switzerland</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="AT">Austria</SelectItem>
                  <SelectItem value="LI">Liechtenstein</SelectItem>
                  
                  {/* East African countries */}
                  <SelectItem value="UG">Uganda</SelectItem>
                  <SelectItem value="NG">Nigeria</SelectItem>
                  <SelectItem value="GH">Ghana</SelectItem>
                  
                  {/* Other countries */}
                  {countries
                    .filter(country => 
                      !['CH', 'DE', 'FR', 'IT', 'AT', 'LI', 'UG', 'NG', 'GH']
                        .includes(country.code))
                    .map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LocationFields;