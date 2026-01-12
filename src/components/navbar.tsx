import {
  Search,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  HelpCircle,
  Crown,
  Home,
  List,
  Film,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/api/authApi";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const user = useSelector((state: any) => state.auth.user);
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setIsProfileOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/home"
            className="text-xl sm:text-2xl font-bold text-primary"
          >
            FITNESSFLICKS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            <button
              onClick={() => handleNavigation("/home")}
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => handleNavigation("/category/all")}
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              Categories
            </button>
            <button
              onClick={() => handleNavigation("/my-list")}
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              My List
            </button>
            <button
              onClick={() => handleNavigation("/pricing")}
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 text-primary"
            >
              <Crown className="w-4 h-4" />
              Upgrade
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => handleNavigation("/search")}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-5 h-5" />
              </Button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#0D0F14] border border-gray-800 rounded-lg shadow-lg z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="font-medium text-white">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => handleNavigation("/account")}
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => handleNavigation("/help-centre")}
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>

                      <button
                        onClick={() => handleNavigation("/settings")}
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>

                      <div className="border-t border-gray-800 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Icons (Search only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => handleNavigation("/search")}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Hamburger Menu Button - Mobile Only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-64 bg-[#0D0F14] z-50
        transform transition-transform duration-300 ease-in-out
        border-l border-gray-800 md:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <p className="font-medium text-white">{user?.name || "Welcome"}</p>
            <p className="text-sm text-gray-400">{user?.email || ""}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="p-6 space-y-6 h-[calc(100%-120px)] overflow-y-auto">
          {/* Navigation Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Navigation
            </h3>

            <button
              onClick={() => handleNavigation("/home")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>

            <button
              onClick={() => handleNavigation("/category/all")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Film className="w-5 h-5" />
              <span className="font-medium">Categories</span>
            </button>

            <button
              onClick={() => handleNavigation("/my-list")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <List className="w-5 h-5" />
              <span className="font-medium">My List</span>
            </button>

            <button
              onClick={() => handleNavigation("/search")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </button>

            <button
              onClick={() => handleNavigation("/pricing")}
              className="flex items-center gap-3 w-full text-left text-primary hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Crown className="w-5 h-5" />
              <span className="font-medium">Upgrade Plan</span>
            </button>
          </div>

          {/* Account Section */}
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Account
            </h3>

            <button
              onClick={() => handleNavigation("/account")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>

            <button
              onClick={() => handleNavigation("/help-centre")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notifications</span>
            </button>

            <button
              onClick={() => handleNavigation("/help-centre")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help & Support</span>
            </button>
          </div>

          {/* Additional menu items */}
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <button
              onClick={() => handleNavigation("/settings")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>

            <button
              onClick={() => handleNavigation("/about")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">About Us</span>
            </button>

            <button
              onClick={() => handleNavigation("/contact")}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Contact Us</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left text-red-400 hover:text-red-300 cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50 mt-6"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
