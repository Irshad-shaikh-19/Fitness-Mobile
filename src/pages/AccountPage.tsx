import {
  User,
  Mail,
  CreditCard,
  Lock,
  Bell,
  Plus,
  Trash2,
  Check,
  Phone,
  Shield,
  FileText,
  Download,
  Crown,
  Zap,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, changePassword } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  useGetEmailAlertSettingsQuery,
  useUpdateEmailAlertSettingsMutation,
} from "@/store/api/pages/emailAlertSettingApi";
import {
  useGetMySubscriptionQuery,
  useGetPaymentHistoryQuery,
  useCancelSubscriptionMutation,
} from "@/store/api/pages/userSubscriptionApi";

function NotificationsTab() {
  const { data, isLoading } = useGetEmailAlertSettingsQuery();
  const [updateEmailAlertSettings] = useUpdateEmailAlertSettingsMutation();

  const handleToggle = async (
    field: "new_content_alert" | "promotional_emails" | "workout_reminders",
    value: boolean
  ) => {
    try {
      await updateEmailAlertSettings({ [field]: value }).unwrap();
      Swal.fire({
        title: "Updated!",
        text: "Notification preference saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#F97316",
      });
    } catch {
      Swal.fire({
        title: "Failed!",
        text: "Failed to update notification preference.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#F97316",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const settings = data?.data;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Email Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div>
            <p className="font-medium">New Content Alerts</p>
            <p className="text-sm text-gray-400">
              Get notified when new workouts are added
            </p>
          </div>
          <Switch
            checked={settings?.new_content_alert ?? true}
            onCheckedChange={(val) => handleToggle("new_content_alert", val)}
          />
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div>
            <p className="font-medium">Promotional Emails</p>
            <p className="text-sm text-gray-400">
              Receive offers, deals, and promotions
            </p>
          </div>
          <Switch
            checked={settings?.promotional_emails ?? true}
            onCheckedChange={(val) => handleToggle("promotional_emails", val)}
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium">Workout Reminders</p>
            <p className="text-sm text-gray-400">
              Get reminded to continue your workouts
            </p>
          </div>
          <Switch
            checked={settings?.workout_reminders ?? true}
            onCheckedChange={(val) => handleToggle("workout_reminders", val)}
          />
        </div>
      </div>
    </div>
  );
}

// Helper function to get days remaining
const getDaysRemaining = (expiresAt: string): number => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "expired":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "cancelled":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "succeeded":
      return "bg-green-500/20 text-green-400";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "failed":
      return "bg-red-500/20 text-red-400";
    case "refunded":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default function AccountPage() {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  // local state for form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileName, setProfileName] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Get active subscription
  const {
    data: subscriptionData,
    isLoading: subLoading,
    refetch: refetchSubscription,
  } = useGetMySubscriptionQuery();
  const activeSub = subscriptionData?.data?.subscription ?? null;

  // Get payment history
  const {
    data: paymentHistoryData,
    isLoading: paymentLoading,
    error: paymentError,
  } = useGetPaymentHistoryQuery({ page: 1, limit: 10 });

  // Cancel subscription mutation
  const [cancelSubscription, { isLoading: cancelling }] = useCancelSubscriptionMutation();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
      setProfileName(user.profile_name || "");
    }
  }, [user]);

  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
      ).then((success: boolean) => {
        if (success) resetForm();
      });
    },
  });

  const handleUpdateProfile = () => {
    dispatch(
      updateUserProfile({
        name,
        email,
        mobile,
        profile_name: profileName,
      })
    );
  };

  const handleCancelSubscription = async () => {
    if (!activeSub) return;

    const result = await Swal.fire({
      title: "Cancel subscription?",
      html: `<div style="color: #9ca3af; font-size: 15px;">
        Are you sure you want to cancel your
        <strong style="color: #f9fafb;">${activeSub.planId?.plan_name}</strong> plan?
        You will lose access when it expires.
      </div>`,
      icon: "warning",
      background: "#111827",
      color: "#f9fafb",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Keep Plan",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await cancelSubscription(activeSub._id).unwrap();
      await Swal.fire({
        title: "Cancelled",
        text: "Your subscription has been cancelled.",
        icon: "success",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#F97316",
      });
      refetchSubscription();
    } catch (err: any) {
      Swal.fire({
        title: "Oops!",
        text: err?.data?.message || "Could not cancel. Please try again.",
        icon: "error",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#F97316",
      });
    }
  };

  const payments = paymentHistoryData?.data?.payments || [];
  const pagination = paymentHistoryData?.data?.pagination;

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white overflow-x-hidden">
      <main className="px-4 sm:px-6 md:px-12 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F97316]/20 flex items-center justify-center shrink-0">
            <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#F97316]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">
              {name.replace(/\b\w/g, (c) => c.toUpperCase())}
            </h1>
            <p className="text-gray-400 truncate">{email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          {/* Tabs Header */}
          <div
            className="overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <TabsList className="bg-gray-900 border border-gray-800 p-1 w-max flex-nowrap">
              {[
                { value: "profile", icon: User, label: "Profile" },
                { value: "security", icon: Lock, label: "Security" },
                { value: "notifications", icon: Bell, label: "Notifications" },
                { value: "billing", icon: CreditCard, label: "Billing" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-[state=active]:bg-[#F97316] data-[state=active]:text-black whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                {/* Profile Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Profile Name</label>
                  <Input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                    <Input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleUpdateProfile}
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-black w-48"
                >
                  Update Profile
                </Button>
              </div>
            </div>

            {/* Current Subscription Section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#F97316]" />
                Current Subscription
              </h2>

              {subLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#F97316]" />
                </div>
              ) : activeSub && activeSub.status === "active" ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-medium capitalize">
                          {activeSub.planId?.plan_name} Plan
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full border ${getStatusBadge(
                            activeSub.status
                          )}`}
                        >
                          {activeSub.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        ${activeSub.amount_paid}/month ·{" "}
                        <span className="text-white font-medium">
                          {getDaysRemaining(activeSub.expires_at)} days remaining
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Renews on{" "}
                        {new Date(activeSub.expires_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => navigate("/pricing")}
                        className="bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                      >
                        Change Plan
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                        disabled={cancelling}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        {cancelling ? "Cancelling..." : "Cancel"}
                      </Button>
                    </div>
                  </div>

                  {/* Subscription Features */}
                  <div className="border-t border-gray-800 pt-4 mt-2">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3">Plan Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#F97316]" />
                        {activeSub.planId?.resolution} Video Quality
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#F97316]" />
                        {activeSub.planId?.video_sound_quality} Audio
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#F97316]" />
                        Watch on {activeSub.planId?.watch_same_time} device(s)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#F97316]" />
                        {activeSub.planId?.duration} days access
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No active subscription</p>
                  <Button
                    onClick={() => navigate("/pricing")}
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                  >
                    Subscribe Now
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F97316]" /> Change Password
              </h2>
              <form
                className="space-y-4 max-w-md"
                onSubmit={passwordFormik.handleSubmit}
              >
                {/* CURRENT PASSWORD */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showOld ? "text" : "password"}
                      name="oldPassword"
                      value={passwordFormik.values.oldPassword}
                      onChange={passwordFormik.handleChange}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showOld ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {passwordFormik.touched.oldPassword && passwordFormik.errors.oldPassword && (
                    <p className="text-red-400 text-sm mt-1">{passwordFormik.errors.oldPassword}</p>
                  )}
                </div>

                {/* NEW PASSWORD */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      value={passwordFormik.values.newPassword}
                      onChange={passwordFormik.handleChange}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                    <p className="text-red-400 text-sm mt-1">{passwordFormik.errors.newPassword}</p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordFormik.values.confirmPassword}
                      onChange={passwordFormik.handleChange}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {passwordFormik.errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                >
                  Update Password
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationsTab />
          </TabsContent>

          {/* BILLING TAB */}
          <TabsContent value="billing" className="space-y-6">
            {/* Payment History */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F97316]" /> Payment History
              </h2>

              {paymentLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
                </div>
              ) : paymentError ? (
                <div className="text-center text-red-500 py-12">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                  <p>Failed to load payment history</p>
                </div>
              ) : payments.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-lg">No payment history found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Your payment transactions will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="min-w-[800px] w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Plan</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Payment Method</th>
                        <th className="pb-3">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 text-sm">
                            {new Date(payment.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="py-4">
                            <span className="font-medium">{payment.planId?.plan_name || "Unknown"}</span>
                          </td>
                          <td className="py-4 font-semibold">
                            ${payment.amount?.toFixed(2) || "0.00"}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(
                                payment.status
                              )}`}
                            >
                              {payment.status === "succeeded"
                                ? "Paid"
                                : payment.status === "pending"
                                ? "Pending"
                                : payment.status === "failed"
                                ? "Failed"
                                : "Refunded"}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-400">
                            {payment.payment_method || "Card"}
                          </td>
                          <td className="py-4">
                            {payment.receipt_url ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(payment.receipt_url, "_blank")}
                                className="text-[#F97316] hover:text-[#F97316]/80 hover:bg-[#F97316]/10"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            ) : (
                              <span className="text-gray-500 text-xs">Not available</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-gray-800">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-gray-700"
                      >
                        Previous
                      </Button>
                      <span className="text-gray-400 text-sm flex items-center">
                        Page 1 of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-gray-700"
                      >
                        Next
                      </Button>
                    </div>
                  )}

                  {/* Summary */}
                  {payments.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Total Transactions:</span>
                        <span className="text-white font-semibold">{pagination?.total || 0}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-gray-400">Total Spent:</span>
                        <span className="text-white font-semibold">
                          $
                          {payments
                            .filter((p) => p.status === "succeeded")
                            .reduce((sum, p) => sum + (p.amount || 0), 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}