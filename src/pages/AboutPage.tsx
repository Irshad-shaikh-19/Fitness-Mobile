import { ArrowLeft, Target, Users, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS.COM</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </nav> */}

      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>

          <section className="mb-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              FitnessFlicks was founded in 2020 with a simple mission: make
              world-class fitness accessible to everyone, everywhere.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <Target className="w-12 h-12 text-[#F97316] mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-400">
                To democratize fitness by providing affordable, accessible, and
                effective workout content to people worldwide.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <Heart className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Values</h3>
              <p className="text-gray-400">
                We believe in inclusivity, authenticity, and continuous
                improvement. Fitness is for everyone.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Community</h3>
              <p className="text-gray-400">
                Over 10 million members worldwide trust FitnessFlicks for their
                daily workout needs.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <Award className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Trainers</h3>
              <p className="text-gray-400">
                500+ certified trainers with expertise in various fitness
                disciplines create content for our platform.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
