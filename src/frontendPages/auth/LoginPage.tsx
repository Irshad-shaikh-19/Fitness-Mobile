import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/store/api/authApi";

const LoginPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      try {
        const res = await dispatch(loginUser(values));
if (!res) return;

if (res.requiresVerification) {
  navigate("/verify-otp", {
    state: {
      email: res.email || values.email,
      name: res.name,
      tempToken: res.tempToken,
      fromLogin: true,
    },
  });
  return;
}

if (res.success) {
  navigate("/dashboard");
}

      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-5">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#F97316] mb-2">
              FITNESSFLICKS
            </h1>
            <p className="text-gray-400">Stream Your Fitness Journey</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#F97316]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-400">
                Enter your credentials to access your fitness content
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Email */}
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-800 border-gray-700 text-white h-12 pl-10 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    required
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-800 border-gray-700 text-white h-12 pl-10 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    required
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#F97316] focus:ring-[#F97316] focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-400"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#F97316] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading || !formik.isValid}
                className="w-full h-12 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm">
                New to FitnessFlicks?{" "}
                <Link
                  to="/register"
                  className="text-[#F97316] hover:underline font-medium"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
