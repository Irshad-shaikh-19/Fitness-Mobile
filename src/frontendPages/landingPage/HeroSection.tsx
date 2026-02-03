import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: (
   <>
  Unlimited fitness,
  <br />
  one simple plan
</>

    ),
    subtitle: "All of FitnessFlicks, starting at just ₹149.",
    image: "/images/360_F_480873521_7rven0fzdjpuDFn3FIpbm8xwQ8ktDI6j.jpg",
    fullBackground: true,
  },
  {
    title: (
      <>
        Download and
        <br />
        watch offline
      </>
    ),
    subtitle: "Always have something to watch",
    image: "/images/1_b1cjsJ5g0MzuztQZJr44YA-removebg-preview.png",
    fullBackground: false,
  },
  {
    title: (
      <>
        Watch anywhere,
        <br />
        anytime
      </>
    ),
    subtitle: "Stream workouts on mobile, tablet, or TV",
    image: "/images/506c9778580719.5ccdd3d002946-removebg-preview.png",
    fullBackground: false,
  },
  {
    title: (
      <>
        Fitness that fits
        <br />
        your lifestyle
      </>
    ),
    subtitle: "Personalized workouts for every goal",
    image: "/images/mga-11d83085-w375-w1500-w750_accroche-removebg-preview.png",
    fullBackground: false,
  },
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();
  const slide = slides[index];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e:any) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e:any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && index < slides.length - 1) {
      // Swipe left - go to next slide
      setIndex(index + 1);
    }
    
    if (isRightSwipe && index > 0) {
      // Swipe right - go to previous slide
      setIndex(index - 1);
    }
  };

  return (
    <section 
      className="fixed inset-0 bg-[#0D0F14] flex flex-col pt-20 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* First slide - Full background image */}
      {slide.fullBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      {/* Main content container with fixed structure */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 pt-4 z-10 max-h-full">
        
        {/* Fixed height image container for slides 2-4 */}
        <div className="h-[35vh] flex items-center justify-center mb-6 flex-shrink-0">
          {!slide.fullBackground && (
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[200px] h-[200px] rounded-full bg-[#F97316]/30 blur-3xl"></div>
              </div>
              {/* Image */}
              <img
                src={slide.image}
                alt="hero"
                className="relative z-10 w-[280px] h-[280px] object-contain"
              />
            </div>
          )}
        </div>

        {/* Fixed height text section */}
        <div className="text-center max-w-md min-h-[130px] flex flex-col justify-start mb-6 flex-shrink-0">
          <h1 className="text-white text-[32px] font-bold leading-tight mb-3">
            {slide.title}
          </h1>
          <p className="text-white/80 text-[15px]">
            {slide.subtitle}
          </p>
        </div>

        {/* Pagination Dots - with higher z-index for first slide */}
        <div className="flex justify-center gap-2 mb-6 flex-shrink-0 relative z-20">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition ${
                i === index ? "bg-[#F97316]" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* CTA Button - Fixed at bottom with higher z-index */}
        <div className="w-full max-w-md flex-shrink-0 relative z-20">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#F97316] text-white font-bold text-[16px] py-3 rounded-md hover:bg-[#F97316]/90 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};