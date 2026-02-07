import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector((state: any) => state.auth.user);
  const location = useLocation();
  const context = useOutletContext(); // Get context from parent

  if (user) {
    // Redirect to the page they came from or home
    const from = location.state?.from?.pathname || "/home";
    return <Navigate to={from} replace />;
  }

  // Pass the context through to child routes
  return <Outlet context={context} />;
};

export default PublicRoute;