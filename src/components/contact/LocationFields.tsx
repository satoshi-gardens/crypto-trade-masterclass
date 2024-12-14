import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationFieldsProps {
  form: UseFormReturn<any>;
}

const LocationFields = ({ form }: LocationFieldsProps) => {
  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true })
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
      return data;
    },
  });

  const groupedCountries = countries?.reduce((acc, country) => {
    const region = country.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(country);
    return acc;
  }, {} as Record<string, typeof countries>);

  const sortedRegions = Object.keys(groupedCountries || {}).sort((a, b) => {
    if (a === 'Switzerland') return -1;
    if (b === 'Switzerland') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="grid gap-4">
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
            {isLoadingCountries ? (
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
    </div>
  );
};

export default LocationFields;