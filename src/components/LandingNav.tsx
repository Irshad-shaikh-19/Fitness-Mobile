import React from "react";
import { useNavigate } from "react-router-dom";

function LandingNav() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0D0F14]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-[#F97316] text-2xl font-extrabold cursor-pointer"
        >
          FITNESSFLICKS
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <button
            onClick={() => navigate("/privacy")}
            className="text-white/80 hover:text-white"
          >
            PRIVACY
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-white/80 hover:text-white"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
