import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS.COM</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </nav> */}

      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-gray-400 mb-8">Last updated: January 1, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using FitnessFlicks services, you agree to be
              bound by these Terms of Use and all applicable laws and
              regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-300 leading-relaxed">
              FitnessFlicks provides a subscription-based streaming service that
              allows members to access fitness and workout content streamed over
              the Internet to certain devices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Membership and Billing
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Your FitnessFlicks membership will continue until terminated. To
              use the service you must have Internet access and provide us with
              one or more Payment Methods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Health Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              The content provided through FitnessFlicks is for informational
              purposes only and is not intended to be a substitute for
              professional medical advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at
              legal@fitnessflicks.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
