import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import LandingNav from "@/components/LandingNav";
import { Navbar } from "@/components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function LandingLayout() {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    // Listen for sidebar state changes
    const checkSidebar = () => {
      const sidebar = document.querySelector(
        '.md\\:hidden [class*="translate-x-0"]'
      );
      handleBodyScroll(!!sidebar);
    };

    // Check on mount
    checkSidebar();

    // Re-check on resize
    window.addEventListener("resize", checkSidebar);

    return () => {
      window.removeEventListener("resize", checkSidebar);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* Conditional Navbar Rendering */}
      {user ? <Navbar /> : <LandingNav />}

      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
