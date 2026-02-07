import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import LandingNav from "@/components/LandingNav";
import { Navbar } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function LandingLayout() {
  const user = useSelector((state: any) => state.auth.user);
  const [isEditMode, setIsEditMode] = useState(false);

  // Add console log to debug
  useEffect(() => {
    console.log("Edit Mode in Layout:", isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    const checkSidebar = () => {
      const sidebar = document.querySelector(
        '.md\\:hidden [class*="translate-x-0"]'
      );
      handleBodyScroll(!!sidebar);
    };

    checkSidebar();
    window.addEventListener("resize", checkSidebar);

    return () => {
      window.removeEventListener("resize", checkSidebar);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* Pass edit mode state to Navbar */}
      {user ? (
        <Navbar isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      ) : (
        <LandingNav />
      )}

      <main className={`pt-16 ${user ? "pb-[72px] md:pb-0" : "pb-0"}`}>
        {/* Pass edit mode state to child routes via context */}
        <Outlet context={{ isEditMode, setIsEditMode }} />
      </main>

      <Footer />
    </div>
  );
}