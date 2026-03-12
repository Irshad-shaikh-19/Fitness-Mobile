import { Check, Crown, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPlansQuery } from "@/store/api/pages/planApi";
import {
  useBuyPlanMutation,
  useGetMySubscriptionQuery,
  useCancelSubscriptionMutation,
} from "@/store/api/pages/userSubscriptionApi";
import Swal from "sweetalert2";

// ── Helpers ───────────────────────────────────────────────
const getDaysRemaining = (expiresAt: string): number => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// ── Component ─────────────────────────────────────────────
export default function PricingPage() {
  // Plans
  const { data: plansData, isLoading: plansLoading, isError: plansError } =
    useGetPlansQuery({ page: 1, limit: 10, is_active: true });
  const plans = plansData?.data?.plans || [];

  // Active subscription
  const {
    data: subscriptionData,
    isLoading: subLoading,
    refetch: refetchSubscription,
  } = useGetMySubscriptionQuery();
  const activeSub = subscriptionData?.data?.subscription ?? null;

  // Mutations
  const [buyPlan, { isLoading: buying }] = useBuyPlanMutation();
  const [cancelSubscription, { isLoading: cancelling }] = useCancelSubscriptionMutation();

  // ── Buy Handler ────────────────────────────────────────
  const handleBuy = async (plan: any) => {
    const result = await Swal.fire({
      title: `Subscribe to ${plan.plan_name}?`,
      html: `
        <div style="color: #9ca3af; font-size: 15px; line-height: 1.8;">
          You're about to subscribe to the
          <strong style="color: #f9fafb;">${plan.plan_name}</strong> plan.<br/>
          <br/>
          <span style="font-size: 28px; font-weight: 700; color: #F97316;">
            $${plan.monthly_price}
          </span>
          <span style="color: #9ca3af;">/month</span><br/>
          <br/>
          <span style="background: #1f2937; padding: 6px 14px; border-radius: 999px; font-size: 13px;">
            ${plan.resolution} &nbsp;·&nbsp; ${plan.video_sound_quality} quality
            &nbsp;·&nbsp; ${plan.duration} days access
          </span>
          ${
            activeSub
              ? `<br/><br/><span style="color:#f59e0b; font-size:13px;">
                  ⚠️ Your current <strong>${activeSub.planId?.plan_name}</strong> plan
                  will be cancelled and replaced.
                </span>`
              : ""
          }
        </div>
      `,
      background: "#111827",
      color: "#f9fafb",
      showCancelButton: true,
      confirmButtonText: "Yes, Subscribe!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316",
      cancelButtonColor: "#374151",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await buyPlan({ planId: plan._id }).unwrap();

      await Swal.fire({
        title: "You're all set! 🎉",
        html: `<div style="color: #9ca3af;">
          Your <strong style="color: #F97316;">${plan.plan_name}</strong> plan
          is now active. Enjoy your workouts!
        </div>`,
        icon: "success",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#F97316",
        confirmButtonText: "Start Watching",
      });

      refetchSubscription();
    } catch (err: any) {
      Swal.fire({
        title: "Oops!",
        text: err?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#F97316",
      });
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 text-xs"
                  >
                    {cancelling ? "Cancelling..." : "Cancel Plan"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {(plansLoading || subLoading) && (
            <div className="text-center text-gray-400 text-lg py-20">
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
                  const isBuying = buying;

                  return (
                    <div
                      key={plan._id}
                      className={`relative rounded-2xl p-8 transition-all duration-200 ${
                        isCurrent
                          ? "bg-gray-900/50 border-2 border-green-500/60"
                          : isPopular
                          ? "bg-gradient-to-b from-[#F97316]/20 to-gray-900/50 border-2 border-[#F97316]"
                          : "bg-gray-900/50 border border-gray-800"
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
                        <Button
                          disabled
                          className="w-full py-6 text-lg font-bold bg-green-500/20 text-green-400 border border-green-500/40 cursor-default"
                        >
                          ✓ Active Plan
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBuy(plan)}
                          disabled={isBuying}
                          className={`w-full py-6 text-lg font-bold transition-all ${
                            isPopular
                              ? "bg-[#F97316] hover:bg-[#F97316]/90 text-black"
                              : "bg-gray-800 hover:bg-gray-700"
                          }`}
                        >
                          {isBuying ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Subscribe Now"
                          )}
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}