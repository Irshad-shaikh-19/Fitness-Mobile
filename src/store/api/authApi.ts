import Swal from "sweetalert2";
import { fetcher, fetcherPost, fetcherUpdate, fetcherDelete } from "../../utils/axios";
import { setUser, clearUser } from "../slice/authSlice";
import { Dispatch } from "redux";
import { persistor } from "../store";
import { getDeviceId, getDeviceName } from "../../utils/deviceId";

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
      // Attach deviceId and deviceName automatically
      const payload = {
        ...formData,
        deviceId: getDeviceId(),
        deviceName: getDeviceName(),
      };

      const res: any = await fetcherPost(["/user/login", payload]);

      // res is { success, message, data: { token, user } }
      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Unexpected response from server. Please try again.",
        });
        return { success: false };
      }

      // ✅ Always save token and user if login succeeded
      localStorage.setItem("fitnessFlicksToken", token);
      dispatch(setUser(user));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error: any) {
      const err = error?.response?.data;

      // ✅ OTP CASE (403 with requiresVerification flag)
      if (err?.error?.requiresVerification) {
        return {
          success: false,
          requiresVerification: true,
          tempToken: err.error.tempToken,
          email: err.error.email,
          name: err.error.name,
        };
      }

      // 🚫 DEVICE LIMIT REACHED (429)
      if (error?.response?.status === 429) {
        const { maxDevices, activeSessionCount } = err?.error || {};
        Swal.fire({
          icon: "warning",
          title: "Device Limit Reached",
          html: `
            <p>${err?.message || "You have reached your device limit."}</p>
            ${
              maxDevices
                ? `<p style="margin-top:8px;font-size:13px;color:#888">
                    Active devices: <strong>${activeSessionCount}</strong> / <strong>${maxDevices}</strong>
                  </p>`
                : ""
            }
            <p style="margin-top:8px;font-size:13px;color:#888">
              Please log out from another device and try again.
            </p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#F97316",
        });
        return { success: false, deviceLimitReached: true };
      }

      // ❌ WRONG PASSWORD / OTHER ERRORS
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.message || "Invalid email or password",
      });

      return { success: false };
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
      // Call backend to deactivate this device session
      await fetcherPost(["/user/logout", {}]);
    } catch (error: any) {
      // Even if backend call fails, still clear local state
      console.error("Backend logout error:", error);
    } finally {
      // Always clear local auth regardless of backend response
      localStorage.removeItem("fitnessFlicksToken");
      dispatch(clearUser());
      await persistor.purge();
    }

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been logged out successfully.",
      timer: 1200,
      showConfirmButton: false,
    });

    return true;
  };

// UPDATE USER PROFILE
export const updateUserProfile =
  (profileData: {
    name?: string;
    email?: string;
    mobile?: string;
    profile_name?: string;
  }) =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcherUpdate(["/user/profile", profileData]);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res?.message || "Profile update failed",
        });
        return null;
      }

      // Update redux user state
      dispatch(setUser(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        timer: 1500,
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

// CHANGE PASSWORD
export const changePassword =
  (passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) =>
  async (): Promise<boolean> => {
    try {
      const res: any = await fetcherPost([
        "/auth/change-password",
        passwordData,
      ]);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Failed to change password",
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been changed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return false;
    }
  };

// GET ACTIVE DEVICE SESSIONS
export const getActiveSessions =
  () =>
  async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const res: any = await fetcher("/user/sessions");

      if (!res?.success) return null;

      return res.data;
    } catch (error: any) {
      console.error("Get sessions error:", error);
      return null;
    }
  };

// LOGOUT A SPECIFIC DEVICE SESSION
export const logoutDevice =
  (sessionId: string) =>
  async (dispatch: Dispatch<any>): Promise<boolean> => {
    try {
      const res: any = await fetcherDelete(`/user/sessions/${sessionId}`);

      if (!res?.success) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Failed to log out device.",
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: "Device Logged Out",
        text: "The device has been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      return true;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      return false;
    }
  };