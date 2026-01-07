import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { Suspense } from "react";
import routes from "./routes";
import { LandingLayout } from "./Layout/LandingLayout";

const Loader = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
);

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<LandingLayout />}>
              {routes.map((route, index) => {
                const Component = route.element;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
