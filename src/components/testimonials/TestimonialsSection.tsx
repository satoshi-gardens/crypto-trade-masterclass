import { useState, useEffect } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { supabase } from "@/integrations/supabase/client";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(2);

      if (error) {
        console.error('Error fetching testimonials:', error);
        return;
      }

      setTestimonials(data || []);
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.display_name}
              role={testimonial.is_student ? "Student" : "Trading Professional"}
              content={testimonial.testimony_text}
              imageUrl={testimonial.photo_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};