import {
  ArrowLeft,
  Search,
  Play,
  CreditCard,
  User,
  Settings,
  Monitor,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const helpCategories = [
  {
    icon: Play,
    title: "Getting Started",
    description: "New to FitnessFlicks? Start here.",
    articles: 12,
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Manage your subscription.",
    articles: 8,
  },
  {
    icon: User,
    title: "Account Settings",
    description: "Update your profile.",
    articles: 15,
  },
  {
    icon: Monitor,
    title: "Device Support",
    description: "Set up and troubleshoot.",
    articles: 20,
  },
  {
    icon: Settings,
    title: "Technical Issues",
    description: "Fix playback problems.",
    articles: 18,
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Get in touch with support.",
    articles: 5,
  },
];

export default function HelpCentrePage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS.COM</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </nav> */}

      <main className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Centre</h1>
            <p className="text-lg text-gray-400 mb-8">
              How can we help you today?
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                className="pl-12 py-6 bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#F97316]/50 transition-colors cursor-pointer"
                >
                  <cat.icon className="w-10 h-10 text-[#F97316] mb-4" />
                  <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {cat.description}
                  </p>
                  <p className="text-sm text-[#F97316]">
                    {cat.articles} articles
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
