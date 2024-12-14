import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCountries = () => {
  const { data: countries, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      console.log('Fetching countries...');
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
      console.log('Countries fetched:', data);
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

  return {
    countries,
    groupedCountries,
    sortedRegions,
    isLoading
  };
};