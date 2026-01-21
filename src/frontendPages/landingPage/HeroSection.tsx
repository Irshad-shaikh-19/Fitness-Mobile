import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { HeroSectionSkeleton } from "./HeroSectionSkeleton";
import { useGetPublicHeroQuery } from "@/store/api/pages/landingPageApi";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { data: heroData, isLoading, isError } = useGetPublicHeroQuery();

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleViewPlans = () => {
    navigate("/pricing");
  };

  if (isLoading) {
    return (
      <>
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0D0F14]">
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
            <div className="h-16 md:h-24 bg-gray-800 rounded-lg mb-6 animate-pulse mx-auto max-w-3xl"></div>
            <div className="h-16 md:h-24 bg-gray-800 rounded-lg mb-6 animate-pulse mx-auto max-w-2xl"></div>
            <div className="h-6 md:h-8 bg-gray-800 rounded mb-8 animate-pulse mx-auto max-w-2xl"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-16 bg-gray-800 rounded-lg animate-pulse w-48"></div>
              <div className="h-16 bg-gray-800 rounded-lg animate-pulse w-48"></div>
            </div>
            <div className="h-4 bg-gray-800 rounded mt-4 animate-pulse mx-auto max-w-xs"></div>
          </div>
        </section>{" "}
      </>
    );
  }

  if (isError || !heroData?.data) {
    // Fallback to default content
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F97316]/20 via-transparent to-[#0D0F14]"></div>
        <div className="absolute inset-0 bg-gray-800 opacity-20"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Unlimited Fitness.
            <br />
            <span className="text-[#F97316]">Anytime. Anywhere.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stream thousands of workout videos from world-class trainers. From
            HIIT to Yoga, find the perfect workout for your fitness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold px-8 py-6 text-lg cursor-pointer"
              onClick={handleGetStarted}
            >
              Get Started <ChevronRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 hover:bg-white/10 px-8 py-6 text-lg cursor-pointer"
              onClick={handleViewPlans}
            >
              View Plans
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Start your free trial today. Cancel anytime.
          </p>
        </div>
      </section>
    );
  }

  const { data } = heroData;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: data.background_image
          ? `url(${import.meta.env.VITE_BACKEND_URL}${data.background_image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0D0F14]"></div>
      <div className="absolute inset-0 bg-gray-800 opacity-20"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {data.main_title}
          <br />
          <span className="text-[#F97316]">{data.highlighted_text}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {data.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold px-8 py-6 text-lg cursor-pointer"
            onClick={() => navigate(data.primary_button.action)}
          >
            {data.primary_button.text} <ChevronRight className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 hover:bg-white/10 px-8 py-6 text-lg cursor-pointer"
            onClick={() => navigate(data.secondary_button.action)}
          >
            {data.secondary_button.text}
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-4">{data.footer_text}</p>
      </div>
    </section>
  );
};
