import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

function LandingNav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<any>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e:any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0D0F14]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        {/* <div
          onClick={() => navigate("/")}
          className="text-[#F97316] text-2xl font-extrabold cursor-pointer"
        >
          FITNESSFLICKS
        </div> */}

              <img
                  src="/images/istockphoto-1452538878-612x612-removebg-preview.png"
                  alt="FitnessFlicks"
                  onClick={() => navigate("/home")}
                  className="h-[52px] w-auto object-contain cursor-pointer"
                />


        {/* Right Menu */}
        <div className="flex items-center gap-4 text-sm font-semibold relative">
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

          {/* 3-dot menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <MoreVertical size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-36 rounded-lg bg-[#151822] border border-gray-800 shadow-lg">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/help-centre");
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-gray-800 hover:text-white"
                >
                  HELP
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/faq");
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-gray-800 hover:text-white"
                >
                  FAQs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
