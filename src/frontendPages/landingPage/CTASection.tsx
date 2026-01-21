import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetPublicCTASectionQuery } from "@/store/api/pages/landingPageApi";
export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { data: ctaData, isLoading, isError } = useGetPublicCTASectionQuery();

  const handleStartFreeTrial = () => {
    navigate("/login");
  };

  if (isLoading) {
    return (
      <>
        <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#F97316]/20 to-cyan-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-gray-800 rounded mb-6 animate-pulse mx-auto max-w-xl"></div>
            <div className="h-6 bg-gray-800 rounded mb-8 animate-pulse mx-auto max-w-md"></div>
            <div className="h-16 bg-gray-800 rounded animate-pulse mx-auto max-w-xs"></div>
          </div>
        </section>
      </>
    );
  }

  if (isError || !ctaData?.data) {
    // Fallback to default content
    return (
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#F97316]/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join millions of members and start your fitness journey today.
          </p>
          <Button
            size="lg"
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold px-12 py-6 text-lg cursor-pointer"
            onClick={handleStartFreeTrial}
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    );
  }

  const { data } = ctaData;

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#F97316]/20 to-cyan-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {data.section_title}
        </h2>
        <p className="text-lg text-gray-300 mb-8">{data.description}</p>
        <Button
          size="lg"
          className="bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold px-12 py-6 text-lg cursor-pointer"
          onClick={() => navigate(data.button_link)}
        >
          {data.button_text}
        </Button>
      </div>
    </section>
  );
};
