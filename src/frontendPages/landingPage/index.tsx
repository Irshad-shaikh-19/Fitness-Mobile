import React from "react";
import { HeroSection } from "./HeroSection";
import { WhySection } from "./WhySection";
import { TestimonialSection } from "./TestimonialSection";
import { CTASection } from "./CTASection";

function index() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <HeroSection />
      <WhySection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}

export default index;
