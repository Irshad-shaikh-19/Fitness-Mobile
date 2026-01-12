import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    return {
      ...requirements,
      isValid: Object.values(requirements).every(Boolean),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordValidation = validatePassword(formData.password);
    const newErrors = { password: "", confirmPassword: "", general: "" };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      newErrors.password = "Password doesn't meet all requirements";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    setErrors(newErrors);

    if (newErrors.password || newErrors.confirmPassword) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordReset(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }, 1500);
  };

  const passwordRequirements = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#F97316] mb-2">
              FITNESSFLICKS
            </h1>
            <p className="text-gray-400">Set New Password</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            {!passwordReset ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    Create New Password
                  </h1>
                  <p className="text-gray-400">
                    Your new password must be different from previous passwords
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white h-12 pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">
                      Password Requirements
                    </h3>
                    <ul className="space-y-2">
                      {[
                        {
                          key: "length",
                          label: "At least 8 characters",
                          met: passwordRequirements.length,
                        },
                        {
                          key: "uppercase",
                          label: "One uppercase letter",
                          met: passwordRequirements.uppercase,
                        },
                        {
                          key: "lowercase",
                          label: "One lowercase letter",
                          met: passwordRequirements.lowercase,
                        },
                        {
                          key: "number",
                          label: "One number",
                          met: passwordRequirements.number,
                        },
                        {
                          key: "special",
                          label: "One special character",
                          met: passwordRequirements.special,
                        },
                      ].map((req) => (
                        <li key={req.key} className="flex items-center text-sm">
                          <div
                            className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                              req.met
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-700/50 text-gray-500"
                            }`}
                          >
                            {req.met ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            )}
                          </div>
                          <span
                            className={
                              req.met ? "text-green-400" : "text-gray-400"
                            }
                          >
                            {req.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white h-12 pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {errors.general && (
                    <div className="bg-red-900/30 border border-red-800 rounded-lg p-3">
                      <p className="text-red-400 text-sm text-center">
                        {errors.general}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Password Reset Successfully!
                </h2>
                <p className="text-gray-400 mb-6">
                  Your password has been updated. You'll be redirected to the
                  login page shortly.
                </p>
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-500 text-sm mt-6">
                  Redirecting in 3 seconds...
                </p>
                <Link to="/login">
                  <Button className="mt-6 h-12 bg-gray-800 hover:bg-gray-700 text-white font-bold">
                    Go to Login Now
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm">
                Remember your password?{" "}
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
                Your password is encrypted and securely stored
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Bank-level encryption • Secure password storage • Regular security
              audits
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
