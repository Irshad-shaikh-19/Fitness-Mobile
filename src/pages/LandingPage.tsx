import { Play, Zap, Trophy, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Add this import

export default function LandingPage() {
  const navigate = useNavigate(); // Initialize navigation

  // Function to handle navigation to login
  const handleGetStarted = () => {
    navigate("/login");
  };

  // Function to handle navigation to pricing
  const handleViewPlans = () => {
    navigate("/pricing");
  };

  // Function to handle start free trial
  const handleStartFreeTrial = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
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
              onClick={handleGetStarted} // Add onClick handler
            >
              Get Started <ChevronRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 hover:bg-white/10 px-8 py-6 text-lg cursor-pointer"
              onClick={handleViewPlans} // Add onClick handler
            >
              View Plans
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Start your free trial today. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why FitnessFlicks?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-[#F97316]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Unlimited Access</h3>
            <p className="text-gray-400">
              Stream thousands of workouts on any device, anytime you want.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Trainers</h3>
            <p className="text-gray-400">
              Learn from certified fitness professionals and athletes.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-400">
              Monitor your fitness journey with detailed progress tracking.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-400">
              Join millions of members on their fitness journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Members Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah M.",
              text: "FitnessFlicks changed my life! I lost 30 pounds and feel amazing.",
              rating: 5,
            },
            {
              name: "James K.",
              text: "The variety of workouts keeps me motivated. Best fitness app ever!",
              rating: 5,
            },
            {
              name: "Emily R.",
              text: "Love the expert trainers and the progress tracking features.",
              rating: 5,
            },
          ].map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 fill-[#F97316] text-[#F97316]"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{review.text}"</p>
              <p className="font-bold text-[#F97316]">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

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
            onClick={handleStartFreeTrial} // Add onClick handler
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
