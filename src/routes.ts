import React from "react";

// Lazy loaded pages
// const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const LandingPage = React.lazy(() => import("./frontendPages/landingPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

const LoginPage = React.lazy(() => import("./frontendPages/auth/LoginPage"));
const RegisterPage = React.lazy(
  () => import("./frontendPages/auth/RegisterPage")
);
const VerifyOtpPage = React.lazy(
  () => import("./frontendPages/auth/VerifyOtpPage")
);
const CompleteProfilePage = React.lazy(
  () => import("./pages/CompleteProfilePage")
);
const PricingPage = React.lazy(() => import("./pages/PricingPage"));
const SubscribePage = React.lazy(() => import("./pages/SubscribePage"));
const AccountPage = React.lazy(() => import("./pages/AccountPage"));
const WatchPage = React.lazy(() => import("./pages/WatchPage"));
const SubscriptionRequiredPage = React.lazy(
  () => import("./pages/SubscriptionRequiredPage")
);
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const MyListPage = React.lazy(() => import("./pages/MyListPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));

// Static pages
// const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const HelpCentrePage = React.lazy(() => import("./frontendPages/footerSupportPages/HelpCentrePage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const TermsPage = React.lazy(() => import("./pages/TermsPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const WorkoutPlayerPage = React.lazy(() => import("./pages/WorkoutPlayerPage"));

// import { JobsPage } from "./pages/JobPage";
// import { MediaCentrePage } from "./pages/MediaCentrePage";
// import { InvestorRelationsPage } from "./pages/InvestorRelationsPage";
import { WaysToWatchPage } from "./pages/WaysToWatchPage";
import { CookiePreferencesPage } from "./pages/CookiePreferencesPage";
import { CorporateInfoPage } from "./pages/CorporateInfoPage";
import { LegalNoticesPage } from "./pages/LegalNoticesPage";
import { SpeedTestPage } from "./pages/SpeedTestPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { JobsPage } from "./frontendPages/footerCompanyPages/JobPage";
import { MediaCentrePage } from "./frontendPages/footerCompanyPages/MediaCentrePage";
import { InvestorRelationsPage } from "./frontendPages/footerCompanyPages/InvestorRelationsPage";


const AboutPage = React.lazy(
  () => import("./frontendPages/footerCompanyPages/AboutPage")
);

//
// Route type definition
export interface RouteConfig {
  path: string;
  element:
    | React.LazyExoticComponent<React.ComponentType<any>>
    | React.ComponentType<any>;
}

// Public routes - Only accessible when NOT logged in
// Users will be redirected to /home if already authenticated
export const publicRoutes: RouteConfig[] = [
  { path: "/", element: LandingPage },
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
  { path: "/verify-otp", element: VerifyOtpPage },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password", element: ResetPasswordPage },
];

// Private routes - Only accessible when logged in
// Users will be redirected to /login if not authenticated
export const privateRoutes: RouteConfig[] = [
  { path: "/home", element: HomePage },
  { path: "/complete-profile", element: CompleteProfilePage },
  { path: "/subscribe", element: SubscribePage },
  { path: "/account", element: AccountPage },
  { path: "/watch/:id", element: WatchPage },
  { path: "/subscription-required", element: SubscriptionRequiredPage },
  { path: "/search", element: SearchPage },
  { path: "/my-list", element: MyListPage },
  { path: "/category/:id", element: CategoryPage },
  {path:"/workout/:id", element:WorkoutPlayerPage},
];

// Common routes - Accessible by everyone (both authenticated and non-authenticated)
export const commonRoutes: RouteConfig[] = [
  { path: "/pricing", element: PricingPage },
  { path: "/about", element: AboutPage },
  { path: "/faq", element: FAQPage },
  { path: "/help-centre", element: HelpCentrePage },
  { path: "/contact", element: ContactPage },
  { path: "/terms", element: TermsPage },
  { path: "/privacy", element: PrivacyPage },
  { path: "/jobs", element: JobsPage },
  { path: "/media-centre", element: MediaCentrePage },
  { path: "/investor-relations", element: InvestorRelationsPage },
  { path: "/ways-to-watch", element: WaysToWatchPage },
  { path: "/cookies", element: CookiePreferencesPage },
  { path: "/corporate", element: CorporateInfoPage },
  { path: "/legal", element: LegalNoticesPage },
  { path: "/speed-test", element: SpeedTestPage },
];

// Export all routes combined (for reference)
const routes = [...publicRoutes, ...privateRoutes, ...commonRoutes];

export default routes;
