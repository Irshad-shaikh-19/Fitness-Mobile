import {
  User,
  Mail,
  CreditCard,
  Lock,
  Bell,
  Plus,
  Trash2,
  Check,
  ArrowLeft,
  Phone,
  Shield,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const user = {
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
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">FITNESSFLICKS</span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </nav> */}

      <main className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#F97316]/20 flex items-center justify-center">
            <User className="w-8 h-8 text-[#F97316]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#F97316] data-[state=active]:text-black"
            >
              <User className="w-4 h-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-[#F97316] data-[state=active]:text-black"
            >
              <Lock className="w-4 h-4 mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#F97316] data-[state=active]:text-black"
            >
              <Bell className="w-4 h-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-[#F97316] data-[state=active]:text-black"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    First Name
                  </label>
                  <Input
                    defaultValue={user.firstName}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Last Name
                  </label>
                  <Input
                    defaultValue={user.lastName}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <Input
                      defaultValue={user.email}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Phone
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <Input
                      defaultValue={user.phone}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Subscription</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium capitalize">
                      {user.subscriptionPlan} Plan
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                      {user.subscriptionStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Renews on{" "}
                    {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                  </p>
                </div>
                <Button className="bg-[#F97316] hover:bg-[#F97316]/90 text-black">
                  Change Plan
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F97316]" /> Change Password
              </h2>
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    className="bg-gray-800 border-gray-700"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="bg-[#F97316] hover:bg-[#F97316]/90 text-black">
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

          <TabsContent value="billing" className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Payment Methods</h2>
                <Button
                  size="sm"
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Method
                </Button>
              </div>
              <div className="space-y-3">
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
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F97316]" /> Payment History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-gray-800/50">
                        <td className="py-4">
                          {new Date(txn.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <p className="font-medium">{txn.description}</p>
                          <p className="text-gray-400 text-xs">
                            {txn.cardBrand} •••• {txn.cardLast4}
                          </p>
                        </td>
                        <td className="py-4">${txn.amount}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 flex items-center gap-1 w-fit">
                            <Check className="w-3 h-3" /> Paid
                          </span>
                        </td>
                        <td className="py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#F97316] hover:text-[#F97316]/80"
                          >
                            <Download className="w-4 h-4 mr-1" /> PDF
                          </Button>
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
