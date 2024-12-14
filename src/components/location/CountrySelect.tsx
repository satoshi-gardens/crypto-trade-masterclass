import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/hooks/useCountries";
import { useEffect } from "react";

interface CountrySelectProps {
  form: UseFormReturn<any>;
  label?: boolean;
}

export const CountrySelect = ({ form, label = true }: CountrySelectProps) => {
  const { groupedCountries, sortedRegions, isLoading } = useCountries();

  // Set Switzerland as default when countries are loaded
  useEffect(() => {
    if (!isLoading && !form.getValues("country") && groupedCountries?.["Switzerland"]?.[0]) {
      form.setValue("country", groupedCountries["Switzerland"][0].code);
    }
  }, [isLoading, groupedCountries, form]);

  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>Country</FormLabel>}
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px]">
                {sortedRegions?.map((region) => (
                  <div key={region}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground bg-muted">
                      {region}
                    </div>
                    {groupedCountries?.[region]?.map((country) => (
                      <SelectItem 
                        key={country.code} 
                        value={country.code}
                        className="pl-4"
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};