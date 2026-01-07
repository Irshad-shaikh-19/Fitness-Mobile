import { Lock, Crown, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionRequiredPage() {
  const plans = [
    { id: "basic", name: "Basic", price: "$8.99", popular: false },
    { id: "standard", name: "Standard", price: "$13.99", popular: true },
    { id: "premium", name: "Premium", price: "$17.99", popular: false },
  ];

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </nav> */}

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-[#F97316]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock This Workout
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Subscribe to FitnessFlicks to access this workout and thousands more
            from expert trainers.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-xl border ${
                  plan.popular
                    ? "bg-[#F97316]/10 border-[#F97316]"
                    : "bg-gray-900/50 border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="flex items-center justify-center gap-1 text-[#F97316] text-sm font-bold mb-2">
                    <Crown className="w-4 h-4" /> Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">
                  {plan.price}
                  <span className="text-sm text-gray-400">/mo</span>
                </p>
                <Button
                  className={`w-full mt-4 ${
                    plan.popular
                      ? "bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Unlimited workouts</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
