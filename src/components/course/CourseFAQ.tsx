import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CourseFAQ = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>What happens if I miss a session?</AccordionTrigger>
            <AccordionContent>
              All sessions are recorded and made available in our learning portal. You can catch up at your convenience and schedule a brief catch-up call with your coach to address any questions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I request additional coaching hours?</AccordionTrigger>
            <AccordionContent>
              Yes! Additional coaching hours are available at the specified hourly rate for your package. Premium and Hybrid members receive priority scheduling for extra sessions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do signals work?</AccordionTrigger>
            <AccordionContent>
              Starting from month two, Premium and Hybrid members receive curated trading signals through our secure platform. Each signal includes entry points, stop-loss levels, and detailed rationale to enhance your learning.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};