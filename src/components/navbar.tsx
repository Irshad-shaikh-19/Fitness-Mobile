import { Search, User, Bell, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            FITNESSFLICKS
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            <span className="hover:text-white cursor-pointer transition-colors">
              Home
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Categories
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              My List
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
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
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Icons (Search only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Hamburger Menu Button - Mobile Only (on right side) */}
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

      {/* Mobile Sidebar (appears from right side) */}
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
          <span className="text-xl font-bold text-primary">Menu</span>
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
        <div className="p-6 space-y-6">
          {/* Navigation Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Navigation
            </h3>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Home</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Categories</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">My List</span>
            </div>
          </div>

          {/* Right Side Icons in Sidebar */}
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Account
            </h3>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notifications</span>
              <span className="ml-auto bg-primary text-xs px-2 py-1 rounded-full">
                3
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </div>
          </div>

          {/* Additional menu items */}
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Settings</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Help & Support</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors p-3 rounded-lg hover:bg-gray-800/50">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="font-medium">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
