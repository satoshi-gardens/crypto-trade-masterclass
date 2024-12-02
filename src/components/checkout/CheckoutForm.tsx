import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalInfoFields from "@/components/contact/PersonalInfoFields";
import LocationFields from "@/components/contact/LocationFields";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CheckoutFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export const CheckoutForm = ({ form, onSubmit, isSubmitting }: CheckoutFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <PersonalInfoFields form={form} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Location Details</h2>
          <LocationFields form={form} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="agreement"
                    name="agreement"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="agreement"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand that payment must be completed within 7 days to secure my spot.
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </Card>

        <Separator className="my-6" />

        <Button 
          type="submit" 
          className="w-full"
          disabled={!form.formState.isValid || isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Processing...
            </span>
          ) : (
            "Confirm and Get Payment Instructions"
          )}
        </Button>
      </form>
    </Form>
  );
};