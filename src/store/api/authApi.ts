import Swal from "sweetalert2";
import { fetcher, fetcherPost } from "../../utils/axios";
import { setUser, clearUser } from "../slice/authSlice";
import { Dispatch } from "redux";
import { persistor } from "../store";

// REGISTER USER
export const registerUser =
  (formData: any) =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcherPost(["/user/register", formData]);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: res?.message || "Registration failed. Please try again.",
        });
        return null;
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "OTP has been sent to your email. Please verify to continue.",
        timer: 3000,
        showConfirmButton: false,
      });

      return res.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return null;
    }
  };

// VERIFY OTP
export const verifyOTP =
  (otpData: any) =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcherPost(["/user/verify-otp", otpData]);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: res?.message || "Invalid OTP. Please try again.",
        });
        return null;
      }

      const { token, user } = res.data;

      localStorage.setItem("fitnessFlicksToken", token);
      dispatch(setUser(user));

      Swal.fire({
        icon: "success",
        title: "Email Verified!",
        text: "Your email has been verified successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      return res.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return null;
    }
  };

// RESEND OTP
export const resendOTP =
  (email: any) =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcherPost(["/user/resend-otp", { email }]);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Failed to resend OTP. Please try again.",
        });
        return null;
      }

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "New OTP has been sent to your email.",
        timer: 2000,
        showConfirmButton: false,
      });

      return res.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return null;
    }
  };

// LOGIN USER
export const loginUser =
  (formData: any) =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcherPost(["/user/login", formData]);

      if (!res?.success) {
        // Check if user needs email verification
        if (res?.error?.requiresVerification) {
          // Return verification data for redirect
          return {
            requiresVerification: true,
            tempToken: res.error.tempToken,
            email: res.error.email,
            name: res.error.name,
          };
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res?.message || "Invalid email or password",
        });
        return null;
      }

      const { token, user } = res.data;

      localStorage.setItem("fitnessFlicksToken", token);
      dispatch(setUser(user));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to FitnessFlicks!",
        timer: 1500,
        showConfirmButton: false,
      });

      return res.data;
    } catch (error: any) {
      // Handle axios error response for verification required
      if (error?.response?.data?.error?.requiresVerification) {
        const errorData = error.response.data.error;
        return {
          requiresVerification: true,
          tempToken: errorData.tempToken,
          email: errorData.email,
          name: errorData.name,
        };
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return null;
    }
  };
// GET USER PROFILE
export const getUserProfile =
  () =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcher("/user/profile");

      if (!res?.success) return null;

      dispatch(setUser(res?.data?.user));
      return res.data;
    } catch (error: any) {
      console.error("Get profile error:", error);
      return null;
    }
  };

// LOGOUT USER
export const logoutUser =
  () =>
  async (dispatch: Dispatch<any>): Promise<boolean> => {
    try {
      // Remove auth token
      localStorage.removeItem("fitnessFlicksToken");

      dispatch(clearUser());

      await persistor.purge();

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      return true;
    } catch (error: any) {
      console.error("Logout error:", error);
      return false;
    }
  };
