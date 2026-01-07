import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Smartphone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Add your registration logic here
      // After successful registration, navigate to OTP verification
      setTimeout(() => {
        setIsLoading(false);
        navigate("/verify-email", {
          state: {
            email: formData.email,
            name: formData.name,
          },
        });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#F97316] mb-2">
              FITNESSFLICKS
            </h1>
            <p className="text-gray-400">Join Your Fitness Community</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#F97316]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400">
                Start your fitness streaming journey today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white h-12 pl-10"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white h-12 pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white h-12 pl-10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white h-12 pl-10"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 6 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white h-12 pl-10"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-900/30 border border-red-800 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">
                    {errors.submit}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#F97316] hover:underline font-medium"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                By creating an account, you agree to our{" "}
                <span className="text-[#F97316] hover:underline cursor-pointer">
                  Terms
                </span>
                ,{" "}
                <span className="text-[#F97316] hover:underline cursor-pointer">
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="text-[#F97316] hover:underline cursor-pointer">
                  Content Guidelines
                </span>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Get access to exclusive fitness content • Personalized workout
              plans • Community challenges
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
