import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector((state: any) => state.auth.user);
  const location = useLocation();

  if (user) {
    // Redirect to the page they came from or home
    const from = location.state?.from?.pathname || "/home";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
