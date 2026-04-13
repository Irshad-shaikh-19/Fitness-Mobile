import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useGetMySubscriptionQuery } from "@/store/api/pages/userSubscriptionApi";

const SUBSCRIPTION_FREE_ROUTES = [
  "/pricing",
  "/account",
  "/profile",
  "/complete-profile",
];

const PrivateRoute = () => {
  const user = useSelector((state: any) => state.auth.user);
  const location = useLocation();
  const context = useOutletContext();

 
  const { data, isLoading } = useGetMySubscriptionQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const isSubscriptionFreeRoute = SUBSCRIPTION_FREE_ROUTES.includes(
    location.pathname
  );

  if (isSubscriptionFreeRoute) {
    return <Outlet context={context} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasSubscription = !!(data?.data?.subscription);

  if (!hasSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet context={context} />;
};

export default PrivateRoute;