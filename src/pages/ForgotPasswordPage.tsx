import { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      // In real implementation, you would handle errors here
    }, 1500);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    setEmail("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#F97316] mb-2">
              FITNESSFLICKS
            </h1>
            <p className="text-gray-400">Reset Your Password</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <Link
              to="/login"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
            </Link>

            {!emailSent ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                  <p className="text-gray-400">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        className={`bg-gray-800 border-gray-700 text-white h-12 pl-10 ${
                          error ? "border-red-500" : ""
                        }`}
                        required
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
                <p className="text-gray-400 mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-white font-medium text-lg mb-6">{email}</p>
                <p className="text-gray-400 text-sm mb-8">
                  Click the link in the email to reset your password. The link
                  will expire in 1 hour.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    className="w-full h-12 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg"
                  >
                    Resend Email
                  </Button>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-gray-700 text-white hover:bg-gray-800"
                    >
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="space-y-4">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-[#F97316] mb-2">
                    Didn't receive the email?
                  </h3>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email address</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-[#F97316] hover:underline cursor-pointer"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Secure account recovery • 24/7 support • Encrypted communication
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
