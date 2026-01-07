import { useState } from "react";
import { User, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompleteProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-black" />
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
              <p className="text-gray-400">Tell us a bit about yourself</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white h-12"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional - for receipts and updates
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg mt-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Continue to Plans"
                )}
              </Button>

              <button
                type="button"
                className="w-full text-gray-400 hover:text-white text-sm mt-2"
              >
                Skip for now
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
