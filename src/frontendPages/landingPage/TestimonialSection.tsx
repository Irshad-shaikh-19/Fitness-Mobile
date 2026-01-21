import React from "react";
import { Star } from "lucide-react";
import { useGetPublicTestimonialsQuery } from "@/store/api/pages/landingPageApi";

export const TestimonialSection: React.FC = () => {
  const {
    data: testimonialData,
    isLoading,
    isError,
  } = useGetPublicTestimonialsQuery();

  if (isLoading) {
    return (
      <>
        <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
          <div className="h-12 bg-gray-800 rounded mb-12 animate-pulse mx-auto max-w-md"></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="w-5 h-5 bg-gray-800 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-5 bg-gray-800 rounded w-24 animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (isError || !testimonialData?.data) {
    // Fallback to default content
    return (
      <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Members Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Default testimonials would go here */}
        </div>
      </section>
    );
  }

  const { data } = testimonialData;

  return (
    <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {data.section_title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.testimonials.map((testimonial: any) => (
          <div
            key={testimonial._id}
            className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < testimonial.rating
                      ? "fill-[#F97316] text-[#F97316]"
                      : "fill-gray-800 text-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
            <p className="font-bold text-[#F97316]">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
