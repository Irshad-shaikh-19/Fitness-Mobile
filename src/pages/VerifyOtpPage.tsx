import { useState, useRef, useEffect } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmailOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { email, name } = location.state || {
    email: "user@example.com",
    name: "User",
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    // Add your OTP verification logic here
    setTimeout(() => {
      setIsLoading(false);
      setVerificationSuccess(true);
      // Navigate to dashboard after successful verification
      setTimeout(() => navigate("/dashboard"), 2000);
    }, 1500);
  };

  const handleResendCode = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Add your resend OTP logic here
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col my-10">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center text-gray-400 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#F97316]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-gray-400">
                Enter the 6-digit code sent to
                <br />
                <span className="text-white font-medium">{email}</span>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Welcome aboard, <span className="text-[#F97316]">{name}</span>!
                Let's get you started.
              </p>
            </div>

            {verificationSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-gray-400 mb-6">
                  Your account has been successfully verified. Redirecting to
                  your dashboard...
                </p>
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center gap-3 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg mb-4"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-gray-400 text-sm">
                      Resend code in{" "}
                      <span className="text-[#F97316]">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendCode}
                      className="text-[#F97316] hover:underline text-sm font-medium"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                  For testing, use code:{" "}
                  <span className="text-[#F97316] font-mono">123456</span>
                </p>

                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">
                    <span className="text-[#F97316] font-medium">Tip:</span>{" "}
                    Check your spam folder if you don't see the email. Your
                    verification ensures secure access to exclusive fitness
                    content.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Unlock personalized fitness journeys • Track your progress • Join
              live workout sessions
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
