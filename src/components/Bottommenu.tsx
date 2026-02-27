import React, { useEffect } from "react";
import { Edit, Settings, User, HelpCircle, Share2, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/api/authApi";

interface BottomMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomMenu({ isOpen, onClose }: BottomMenuProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Menu - Auto height */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-50 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Menu Content */}
        <div className="px-4 py-6 pb-8">
          {/* Menu Items */}
          <div className="space-y-0">

            <button
              onClick={() => handleNavigate("/account")}
              className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 rounded-lg transition"
            >
              <User className="w-6 h-6" />
              <span className="text-lg">Account</span>
            </button>

            {/* <button
              onClick={() => handleNavigate("/manage-profiles")}
              className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 rounded-lg transition"
            >
              <Edit className="w-6 h-6" />
              <span className="text-lg">Manage Profiles</span>
            </button> */}

            {/* Updated Categories button - navigate to /category without ID */}
            <button
              onClick={() => handleNavigate("/category")}
              className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 rounded-lg transition"
            >
              <Film className="w-6 h-6" />
              <span className="text-lg">Categories</span>
            </button>

            <button
              onClick={() => handleNavigate("/help-centre")}
              className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 rounded-lg transition"
            >
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg">Help</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 rounded-lg transition"
            >
              <Share2 className="w-6 h-6" />
              <span className="text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}