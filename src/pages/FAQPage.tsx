import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I sign up for FitnessFlicks?",
        a: "Simply click the 'Get Started' button on our homepage and create an account.",
      },
      {
        q: "What devices can I use to watch workouts?",
        a: "FitnessFlicks works on smartphones, tablets, computers, and smart TVs.",
      },
    ],
  },
  {
    category: "Subscription & Billing",
    questions: [
      {
        q: "What subscription plans do you offer?",
        a: "We offer three plans: Basic ($8.99/month), Standard ($13.99/month), and Premium ($17.99/month).",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel anytime from your account settings.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-[#F97316] transition-colors"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <p className="pb-4 text-gray-400">{a}</p>}
    </div>
  );
}

export default function FAQPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400 mb-12">
            Find answers to common questions about FitnessFlicks.
          </p>

          {faqs.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#F97316]">
                {section.category}
              </h2>
              <div className="space-y-1">
                {section.questions.map((faq, j) => (
                  <FAQItem key={j} q={faq.q} a={faq.a} />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-12 p-6 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-4">
              Our support team is here to help you 24/7.
            </p>
            <Button className="bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
