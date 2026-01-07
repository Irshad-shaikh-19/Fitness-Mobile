import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$8.99",
    period: "/month",
    description: "Great for casual fitness enthusiasts",
    features: [
      "Access to 500+ workout videos",
      "Basic progress tracking",
      "Watch on 1 device",
      "Standard video quality",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: "$13.99",
    period: "/month",
    description: "Perfect for regular workout routines",
    features: [
      "Access to 2,000+ workout videos",
      "Advanced progress tracking",
      "Watch on 2 devices",
      "HD video quality",
      "Download for offline viewing",
      "Priority email support",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$17.99",
    period: "/month",
    description: "Ultimate fitness experience",
    features: [
      "Unlimited workout videos",
      "Personalized workout plans",
      "Watch on 4 devices",
      "4K Ultra HD quality",
      "Offline downloads",
      "Live training sessions",
      "1-on-1 trainer consultations",
      "24/7 priority support",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS.COM</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </nav> */}

      <main className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Unlock unlimited access to world-class fitness content. Start your
              journey today with our flexible plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#F97316]/20 to-gray-900/50 border-2 border-[#F97316]"
                    : "bg-gray-900/50 border border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#F97316] text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-6 text-lg font-bold ${
                    plan.popular
                      ? "bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  Subscribe Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
