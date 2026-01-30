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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile,changePassword } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";



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
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
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








  const Dummyuser = {
    firstName: "Chetan",
    lastName: "Makwana",
    email: "dreamstech123@gmail.com",
    phone: "+91 8460765785",
    subscriptionPlan: "standard",
    subscriptionStatus: "active",
    subscriptionExpiresAt: "2026-02-02",
  };

  const paymentMethods = [
    {
      id: "pm_1",
      card: { brand: "visa", last4: "4242", exp_month: 12, exp_year: 2028 },
    },
  ];

  const transactions = [
    {
      id: "txn_1",
      planId: "Standard",
      amount: "13.99",
      currency: "USD",
      status: "succeeded",
      cardLast4: "4242",
      cardBrand: "Visa",
      createdAt: "2026-01-02",
      description: "Monthly subscription",
    },
    {
      id: "txn_2",
      planId: "Standard",
      amount: "13.99",
      currency: "USD",
      status: "succeeded",
      cardLast4: "4242",
      cardBrand: "Visa",
      createdAt: "2025-12-02",
      description: "Monthly subscription",
    },
  ];

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
              {Dummyuser.firstName} {Dummyuser.lastName}
            </h1>
            <p className="text-gray-400 truncate">{Dummyuser.email}</p>
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
  <TabsList className="bg-gray-900 border border-gray-800 p-1 w-max  flex-nowrap">
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


          {/* PROFILE */}
         <TabsContent value="profile" className="space-y-6">
  {/* Personal Information */}
  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <h2 className="text-xl font-bold mb-6">Personal Information</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      {/* Profile Name */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Profile Name
        </label>
        <Input
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className="bg-gray-800 border-gray-700"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Email
        </label>
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
        <label className="block text-sm text-gray-400 mb-2">
          Phone
        </label>
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

  {/* Subscription (UNCHANGED) */}
  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <h2 className="text-xl font-bold mb-4">Subscription</h2>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-medium capitalize">
            {Dummyuser.subscriptionPlan} Plan
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
            {Dummyuser.subscriptionStatus}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Renews on{" "}
          {new Date(Dummyuser.subscriptionExpiresAt).toLocaleDateString()}
        </p>
      </div>

 <div className="flex justify-center mt-2">
       <Button
         onClick={() => navigate("/pricing")}
    className="bg-[#F97316] hover:bg-[#F97316]/90 text-black w-48"
  >
    Change Plan
  </Button>
 </div>
    </div>
  </div>
</TabsContent>


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
    <label className="block text-sm text-gray-400 mb-2">
      Current Password
    </label>
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
    {passwordFormik.touched.oldPassword &&
      passwordFormik.errors.oldPassword && (
        <p className="text-red-400 text-sm mt-1">
          {passwordFormik.errors.oldPassword}
        </p>
      )}
  </div>

  {/* NEW PASSWORD */}
  <div>
    <label className="block text-sm text-gray-400 mb-2">
      New Password
    </label>
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
    {passwordFormik.touched.newPassword &&
      passwordFormik.errors.newPassword && (
        <p className="text-red-400 text-sm mt-1">
          {passwordFormik.errors.newPassword}
        </p>
      )}
  </div>

  {/* CONFIRM PASSWORD */}
  <div>
    <label className="block text-sm text-gray-400 mb-2">
      Confirm New Password
    </label>
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
    {passwordFormik.touched.confirmPassword &&
      passwordFormik.errors.confirmPassword && (
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

          <TabsContent value="notifications" className="space-y-6">
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
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <p className="font-medium">Promotional Emails</p>
                    <p className="text-sm text-gray-400">
                      Receive offers, deals, and promotions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Workout Reminders</p>
                    <p className="text-sm text-gray-400">
                      Get reminded to continue your workouts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* BILLING */}
          <TabsContent value="billing" className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Payment Methods</h2>
                <Button
                  size="sm"
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

             {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium capitalize">
                          {method.card.brand} •••• {method.card.last4}
                        </p>
                        <p className="text-sm text-gray-400">
                          Expires {method.card.exp_month}/{method.card.exp_year}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>

            {/* Payment History */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F97316]" /> Payment History
              </h2>

              <div className="overflow-x-auto scrollbar-hide">
                <table className="min-w-[700px] w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-gray-800/50">
                        <td className="py-4">
                          {new Date(txn.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4">{txn.description}</td>
                        <td className="py-4">${txn.amount}</td>
                        <td className="py-4 text-green-400">Paid</td>
                        <td className="py-4">
                          <Download className="w-4 h-4 text-[#F97316]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}