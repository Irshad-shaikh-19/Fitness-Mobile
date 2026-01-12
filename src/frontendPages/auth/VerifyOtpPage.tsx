import { useState, useRef, useEffect } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOTP, verifyOTP } from "@/store/api/authApi";

export default function VerifyEmailOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get state from navigation - can come from Register or Login
  const { email, name, tempToken, fromLogin } = location.state || {
    email: "",
    name: "",
    tempToken: "",
    fromLogin: false,
  };

  // Store tempToken in a ref to handle updates from resend
  const tempTokenRef = useRef(tempToken);

  // Redirect if no email/tempToken provided
  useEffect(() => {
    if (!email || !tempToken) {
      navigate("/login");
    }
  }, [email, tempToken, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setErrorMessage("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const verificationData = {
        otp: otpString,
        tempToken: tempTokenRef.current,
      };

      const res = await dispatch(verifyOTP(verificationData));

      if (res) {
        setVerificationSuccess(true);
        // Navigate to dashboard/home after 2 seconds
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await dispatch(resendOTP(email));

      if (res) {
        setResendTimer(60);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        // Update tempToken if new one was sent
        if (res.tempToken) {
          tempTokenRef.current = res.tempToken;
        }
      }
    } catch (error) {
      setErrorMessage("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to login or register based on where user came from
    if (fromLogin) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col my-10">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to{" "}
              {fromLogin ? "Login" : "Register"}
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#F97316]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-gray-400">
                {fromLogin
                  ? "Your email needs verification before you can login."
                  : "Enter the 6-digit code to complete registration."}
                <br />
                Code sent to:{" "}
                <span className="text-white font-medium">{email}</span>
              </p>
              {name && (
                <p className="text-gray-500 text-sm mt-2">
                  Welcome{fromLogin ? " back" : ""}, {name}!
                </p>
              )}
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
                  {fromLogin
                    ? "You can now access your account. Redirecting..."
                    : "Your account has been successfully verified. Redirecting to your dashboard..."}
                </p>
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="flex justify-center gap-3 mb-6"
                  onPaste={handlePaste}
                >
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

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                    <p className="text-red-400 text-sm text-center">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleVerify}
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                      <span className="text-[#F97316] font-medium">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-[#F97316] hover:underline text-sm font-medium disabled:opacity-50"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-xs text-center">
                    💡 Tip: Check your spam folder if you don't see the email.
                    The OTP expires in 10 minutes.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
