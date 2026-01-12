import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes, privateRoutes, commonRoutes } from "./routes";
import { LandingLayout } from "./Layout/LandingLayout";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0D0F14]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

// 404 Redirect Component
const NotFoundRedirect = () => {
  const user = useSelector((state: any) => state.auth.user);
  return <Navigate to={user ? "/home" : "/"} replace />;
};

export default function App() {
  const user = useSelector((state: any) => state.auth.user);
  console.log("🚀 user --->", user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Main Layout Wrapper */}
          <Route element={<LandingLayout />}>
            {/* Public Routes - Only accessible when NOT logged in */}
            <Route element={<PublicRoute />}>
              {publicRoutes.map((route, index) => {
                const Component = route.element;
                return (
                  <Route
                    key={`public-${index}`}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>

            {/* Private Routes - Only accessible when logged in */}
            <Route element={<PrivateRoute />}>
              {privateRoutes.map((route, index) => {
                const Component = route.element;
                return (
                  <Route
                    key={`private-${index}`}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>

            {/* Common Routes - Accessible by everyone */}
            {commonRoutes.map((route, index) => {
              const Component = route.element;
              return (
                <Route
                  key={`common-${index}`}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}
          </Route>

          {/* 404 Fallback - Redirect based on auth state */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
