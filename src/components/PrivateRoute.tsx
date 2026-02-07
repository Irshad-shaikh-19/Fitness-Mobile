import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state: any) => state.auth.user);
  const location = useLocation();
  const context = useOutletContext(); // Get context from parent

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Pass the context through to child routes
  return <Outlet context={context} />;
};

export default PrivateRoute;