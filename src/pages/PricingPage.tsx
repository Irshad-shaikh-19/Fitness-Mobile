import { useState } from "react";
import { Check, Crown, Zap, AlertCircle, X, CreditCard, Lock } from "lucide-react";
import { useGetPlansQuery } from "@/store/api/pages/planApi";
import {
  useGetMySubscriptionQuery,
  useCancelSubscriptionMutation,
} from "@/store/api/pages/userSubscriptionApi";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ── Helpers ───────────────────────────────────────────────
const getDaysRemaining = (expiresAt: string): number => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// ── Payment Form Component ─────────────────────────────────
const PaymentForm = ({
  planId,
  planName,
  amount,
  onSuccess,
  onCancel,
}: {
  planId: string;
  planName: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("fitnessFlicksToken")}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = data.data;

      // Step 2: Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Customer",
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Step 3: Confirm with backend
        const confirmResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payments/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("fitnessFlicksToken")}`,
            },
            body: JSON.stringify({ paymentIntentId }),
          }
        );

        const confirmData = await confirmResponse.json();

        if (!confirmData.success) {
          throw new Error(confirmData.message || "Failed to confirm payment");
        }

        await Swal.fire({
          title: "Payment Successful! 🎉",
          html: `<div style="color: #9ca3af;">
            Your <strong style="color: #F97316;">${planName}</strong> plan is now active.<br/>
            You can start enjoying your content immediately.
          </div>`,
          icon: "success",
          background: "#111827",
          color: "#f9fafb",
          confirmButtonColor: "#F97316",
        });

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message);
      Swal.fire({
        title: "Payment Failed",
        text: err.message,
        icon: "error",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#F97316",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
        "::placeholder": {
          color: "#6b7280",
        },
        padding: "12px",
      },
      invalid: {
        color: "#ef4444",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Details
        </label>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <CardElement options={cardElementOptions} />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 py-2.5 px-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-white font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 py-2.5 px-4 rounded-lg bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay ${amount}
            </>
          )}
        </button>
      </div>

      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2 pt-2">
        <CreditCard className="w-3 h-3" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
};

// ── Modal Component ───────────────────────────────────────
const PaymentModal = ({
  isOpen,
  onClose,
  plan,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
  onSuccess: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Subscribe to {plan.plan_name}</h2>
            <p className="text-gray-400 text-sm mt-1">
              ${plan.monthly_price}/month
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <Elements stripe={stripePromise}>
            <PaymentForm
              planId={plan._id}
              planName={plan.plan_name}
              amount={plan.monthly_price}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────
export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Plans
  const {
    data: plansData,
    isLoading: plansLoading,
    isError: plansError,
  } = useGetPlansQuery({ page: 1, limit: 10, is_active: true });
  const plans = plansData?.data?.plans || [];

  // Active subscription
  const {
    data: subscriptionData,
    isLoading: subLoading,
    refetch: refetchSubscription,
  } = useGetMySubscriptionQuery();
  const activeSub = subscriptionData?.data?.subscription ?? null;

  // Mutations
  const [cancelSubscription, { isLoading: cancelling }] = useCancelSubscriptionMutation();

  // ── Payment Handlers ────────────────────────────────────
  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    await refetchSubscription();
    setIsModalOpen(false);
  };

  // ── Cancel Handler ─────────────────────────────────────
  const handleCancel = async () => {
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

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Unlock unlimited access to world-class fitness content. Start your
              journey today with our flexible plans.
            </p>
          </div>

          {/* ── Active Plan Banner ── */}
          {!subLoading && activeSub && (
            <div className="mb-10 rounded-2xl border border-[#F97316]/40 bg-gradient-to-r from-[#F97316]/10 via-[#F97316]/5 to-transparent p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/20 flex items-center justify-center shrink-0">
                    <Crown className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#F97316]">
                        Active Plan
                      </span>
                      <span className="bg-[#F97316]/20 text-[#F97316] text-xs px-2 py-0.5 rounded-full font-medium">
                        Live
                      </span>
                    </div>
                    <p className="text-white font-bold text-lg leading-tight">
                      {activeSub.planId?.plan_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      ${activeSub.amount_paid}/month ·{" "}
                      <span className="text-white font-medium">
                        {getDaysRemaining(activeSub.expires_at)} days remaining
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 mb-0.5">Expires on</p>
                    <p className="text-sm text-gray-300 font-medium">
                      {new Date(activeSub.expires_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {cancelling ? "Cancelling..." : "Cancel Plan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {(plansLoading || subLoading) && (
            <div className="text-center text-gray-400 text-lg py-20">
              <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Loading plans...
            </div>
          )}

          {/* Error State */}
          {plansError && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-lg py-20">
              <AlertCircle className="w-5 h-5" />
              Failed to load plans
            </div>
          )}

          {/* Plans Grid */}
          {!plansLoading && !plansError && (
            <div className="grid md:grid-cols-3 gap-8">
              {plans.length === 0 ? (
                <div className="col-span-3 text-center text-gray-400 py-20">
                  No plans available
                </div>
              ) : (
                plans.map((plan: any, index: number) => {
                  const isPopular = index === 1;
                  const isCurrent = activeSub?.planId?._id === plan._id;

                  return (
                    <div
                      key={plan._id}
                      className={`relative rounded-2xl p-8 transition-all duration-200 transform hover:scale-105 ${
                        isCurrent
                          ? "bg-gradient-to-b from-green-500/10 to-gray-900/50 border-2 border-green-500/60"
                          : isPopular
                          ? "bg-gradient-to-b from-[#F97316]/20 to-gray-900/50 border-2 border-[#F97316]"
                          : "bg-gray-900/50 border border-gray-800 hover:border-[#F97316]/30"
                      }`}
                    >
                      {/* Badges */}
                      {isCurrent && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 whitespace-nowrap">
                            <Zap className="w-3.5 h-3.5" />
                            Current Plan
                          </span>
                        </div>
                      )}
                      {isPopular && !isCurrent && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="bg-[#F97316] text-black px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Plan Name */}
                      <h3 className="text-2xl font-bold mb-2">{plan.plan_name}</h3>

                      {/* Description */}
                      <p className="text-gray-400 mb-4">
                        {plan.resolution} streaming · {plan.video_sound_quality} sound
                      </p>

                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-4xl font-bold">${plan.monthly_price}</span>
                        <span className="text-gray-400">/month</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {[
                          `${plan.resolution} Video Resolution`,
                          `${plan.video_sound_quality} Audio Quality`,
                          `Watch on ${plan.watch_same_time} device(s) simultaneously`,
                          `Supported: ${plan.supported_devices?.join(", ")}`,
                          `${plan.duration} Days Access`,
                        ].map((feat) => (
                          <li key={feat} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#F97316] mt-0.5 shrink-0" />
                            <span className="text-gray-300 text-sm">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      {isCurrent ? (
                        <button
                          disabled
                          className="w-full py-3 text-lg font-bold bg-green-500/20 text-green-400 border border-green-500/40 rounded-xl cursor-default"
                        >
                          ✓ Active Plan
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSubscribe(plan)}
                          className={`w-full py-3 text-lg font-bold rounded-xl transition-all transform hover:scale-105 ${
                            isPopular
                              ? "bg-[#F97316] hover:bg-[#F97316]/90 text-black shadow-lg"
                              : "bg-gray-800 hover:bg-gray-700 text-white"
                          }`}
                        >
                          Subscribe Now
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plan={selectedPlan}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}