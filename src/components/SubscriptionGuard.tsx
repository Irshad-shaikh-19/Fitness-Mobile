import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMySubscriptionQuery } from "@/store/api/pages/userSubscriptionApi";

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

// Routes that are accessible even without a subscription
const SUBSCRIPTION_FREE_ROUTES = ["/pricing", "/account", "/profile"];

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const location = useLocation();
  const { data, isLoading } = useGetMySubscriptionQuery();

  // Allow access to subscription-free private routes regardless
  if (SUBSCRIPTION_FREE_ROUTES.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Show nothing while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasSubscription = !!(data?.data?.subscription);

  // No subscription — redirect to pricing
  if (!hasSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default SubscriptionGuard;