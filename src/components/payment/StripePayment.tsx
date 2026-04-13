import { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Lock } from "lucide-react";
import Swal from "sweetalert2";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card Element Styling
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

interface StripePaymentProps {
  planId: string;
  planName: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

// Inner component that uses Stripe hooks
const PaymentForm = ({ planId, planName, amount, onSuccess, onCancel }: StripePaymentProps) => {
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/create-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("fitnessFlicksToken")}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = data.data;

      // Step 2: Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer", // You can get this from user context
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Step 3: Confirm with backend
        const confirmResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("fitnessFlicksToken")}`,
          },
          body: JSON.stringify({ paymentIntentId }),
        });

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Details
        </label>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <CardElement options={cardElementOptions} />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 border border-gray-700 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay ${amount}
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2 pt-2">
        <CreditCard className="w-3 h-3" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
};

// Wrapper component with Elements provider
export default function StripePayment(props: StripePaymentProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
}