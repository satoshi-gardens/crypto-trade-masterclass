import { UseFormReturn } from "react-hook-form";
import { CityInput } from "@/components/location/CityInput";
import { CountrySelect } from "@/components/location/CountrySelect";

interface LocationFieldsProps {
  form: UseFormReturn<any>;
}

const LocationFields = ({ form }: LocationFieldsProps) => {
  return (
    <div className="grid gap-4">
      <CityInput form={form} />
      <CountrySelect form={form} />
    </div>
  );
};

export default LocationFields;