import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-400 mb-12">
            We'd love to hear from you.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

              {submitted ? (
                <div className="p-8 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                  <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        className="bg-gray-900 border-gray-700"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        className="bg-gray-900 border-gray-700"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      className="bg-gray-900 border-gray-700"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      className="bg-gray-900 border-gray-700 min-h-[150px]"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold py-6"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <Mail className="w-8 h-8 text-[#F97316] mb-4" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-400">support@fitnessflicks.com</p>
              </div>

              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <Phone className="w-8 h-8 text-[#F97316] mb-4" />
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-gray-400">+1 (800) 555-FLEX</p>
              </div>

              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <MapPin className="w-8 h-8 text-[#F97316] mb-4" />
                <h3 className="font-bold mb-2">Headquarters</h3>
                <p className="text-gray-400">
                  100 Fitness Way, Los Angeles, CA 90001
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <Clock className="w-8 h-8 text-[#F97316] mb-4" />
                <h3 className="font-bold mb-2">Support Hours</h3>
                <p className="text-gray-400">24/7 Online Support</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
