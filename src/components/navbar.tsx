// import {
//   Search,
//   User,
//   Bell,
//   X,
//   LogOut,
//   Settings,
//   HelpCircle,
//   Crown,
//   Home,
//   List,
//   Film,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "@/store/api/authApi";

// export function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch<any>();

//   const user = useSelector((state: any) => state.auth.user);

//   useEffect(() => {
//     document.body.classList.toggle("menu-open", isMenuOpen);
//   }, [isMenuOpen]);

//   const handleNavigation = (path: string) => {
//     navigate(path);
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//     setIsProfileOpen(false);
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Netflix-Style Fixed Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent px-3 sm:px-4 py-2.5 sm:py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/home" className="flex items-center gap-1.5 sm:gap-2">
//             <div className="text-2xl sm:text-3xl font-black text-[#F97316]">
//               FITNESSFLICKS
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6 text-gray-300">
//             <button onClick={() => handleNavigation("/home")} className="hover:text-white flex items-center gap-2 cursor-pointer">
//               <Home className="w-4 h-4" /> Home
//             </button>
//             <button onClick={() => handleNavigation("/category/all")} className="hover:text-white flex items-center gap-2 cursor-pointer">
//               <Film className="w-4 h-4" /> Categories
//             </button>
//             <button onClick={() => handleNavigation("/my-list")} className="hover:text-white flex items-center gap-2 cursor-pointer">
//               <List className="w-4 h-4" /> My List
//             </button>
//             <button onClick={() => handleNavigation("/pricing")} className="text-red-600 flex items-center gap-2 cursor-pointer">
//               <Crown className="w-4 h-4" /> Upgrade
//             </button>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center gap-3">
//             <button onClick={() => handleNavigation("/search")} className="text-white cursor-pointer">
//               <Search className="w-6 h-6" />
//             </button>

//             <button className="hidden md:block text-white cursor-pointer">
//               <Bell className="w-6 h-6" />
//             </button>

//             {/* Desktop Profile */}
//             <div className="hidden md:block relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="w-8 h-8 rounded bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer"
//               >
//                 <User className="w-5 h-5 text-white" />
//               </button>

//               {isProfileOpen && (
//                 <>
//                   <div 
//                     className="fixed inset-0 z-[60]" 
//                     onClick={() => setIsProfileOpen(false)} 
//                   />
//                   <div className="absolute right-0 mt-2 w-64 bg-[#0D0F14] border border-gray-800 rounded-lg shadow-xl z-[70]">
//                     <div className="px-4 py-3 border-b border-gray-800">
//                       <p className="text-white font-medium truncate">{user?.name || "User"}</p>
//                       <p className="text-sm text-gray-400 truncate">{user?.email}</p>
//                     </div>

//                     <div className="py-2">
//                       <button 
//                         onClick={() => handleNavigation("/account")} 
//                         className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors cursor-pointer"
//                       >
//                         <User className="w-4 h-4" /> 
//                         <span>Profile</span>
//                       </button>
//                       <button 
//                         onClick={() => handleNavigation("/help-centre")} 
//                         className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors cursor-pointer"
//                       >
//                         <HelpCircle className="w-4 h-4" /> 
//                         <span>Help & Support</span>
//                       </button>
//                       <button 
//                         onClick={() => handleNavigation("/settings")} 
//                         className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors cursor-pointer"
//                       >
//                         <Settings className="w-4 h-4" /> 
//                         <span>Settings</span>
//                       </button>
//                       <div className="border-t border-gray-800 my-2" />
//                       <button 
//                         onClick={handleLogout} 
//                         className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-colors cursor-pointer"
//                       >
//                         <LogOut className="w-4 h-4" /> 
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* ✅ Mobile Profile Icon (replaced hamburger) */}
//             <button
//               onClick={() => setIsMenuOpen(true)}
//               className="md:hidden w-8 h-8 rounded bg-red-600 flex items-center justify-center cursor-pointer"
//             >
//               <User className="w-5 h-5 text-white" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-black/70 z-50 md:hidden" onClick={() => setIsMenuOpen(false)} />
//       )}

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-70 sm:w-64 bg-[#0D0F14] z-50 border-l border-gray-800 md:hidden flex flex-col transform transition-transform ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between p-4 border-b border-gray-800 shrink-0">
//           <div>
//             <p className="text-white font-medium">{user?.name}</p>
//             <p className="text-sm text-gray-400">{user?.email}</p>
//           </div>
//           <button onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
//             <X className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
//           {/* Navigation Items */}
//           <div className="space-y-1 sm:space-y-2">
//             <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
//               Navigation
//             </h3>

//             <button
//               onClick={() => handleNavigation("/home")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Home className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Home</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/category/all")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Film className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Categories</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/my-list")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <List className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">My List</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/search")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Search className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Search</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/pricing")}
//               className="flex items-center gap-3 w-full text-left text-red-600 hover:text-red-500 active:text-red-500 cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Crown className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Upgrade Plan</span>
//             </button>
//           </div>

//           {/* Account Section */}
//           <div className="pt-3 sm:pt-4 border-t border-gray-800 space-y-1 sm:space-y-2">
//             <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
//               Account
//             </h3>

//             <button
//               onClick={() => handleNavigation("/account")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <User className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Profile</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("#")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Bell className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Notifications</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/help-centre")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <HelpCircle className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Help & Support</span>
//             </button>
//           </div>

//           {/* Settings & More */}
//           <div className="pt-3 sm:pt-4 border-t border-gray-800 space-y-1 sm:space-y-2">
//             <button
//               onClick={() => handleNavigation("#")}
//               className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white active:text-white cursor-pointer transition-colors p-2.5 sm:p-3 rounded-lg hover:bg-gray-800/50 active:bg-gray-800/70"
//             >
//               <Settings className="w-5 h-5 shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Settings</span>
//             </button>
//           </div>
//         </div>
//         {/* End of scrollable content */}

//         {/* ✅ Sticky Logout Button - Always visible at bottom */}
//         <div className="border-t border-gray-800 p-4 shrink-0 bg-[#0D0F14]">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full text-red-400 hover:text-red-300 p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { Search, Download, Menu, ArrowLeft, Pencil, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomMenu from "./Bottommenu";

interface NavbarProps {
  isEditMode?: boolean;
  setIsEditMode?: (value: boolean) => void;
}

export function Navbar({ isEditMode = false, setIsEditMode }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isProfilePage = location.pathname === "/profile";
  const isMyListPage = location.pathname === "/my-list";
  const isDownloadsPage = location.pathname === "/downloads";
  const isSearchPage = location.pathname === "/search";
  const isCategoryPage = location.pathname.startsWith("/category/");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset edit mode when leaving My List page
  useEffect(() => {
    if (!isMyListPage && setIsEditMode) {
      setIsEditMode(false);
    }
  }, [isMyListPage, setIsEditMode]);

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const toggleEditMode = () => {
    if (setIsEditMode) {
      setIsEditMode(!isEditMode);
    }
  };

  const handleBackClick = () => {
    if (isEditMode && setIsEditMode) {
      setIsEditMode(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300
          ${isMyListPage && isEditMode ? 'bg-red-600' : scrolled || isMyListPage || isDownloadsPage || isSearchPage || isCategoryPage ? "bg-black" : "bg-transparent"}
          px-4`}
      >
        <div className="h-full flex items-center justify-between">
          {/* Search Page Header */}
          {isSearchPage ? (
            <>
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-white/80 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate("/downloads")}
                className="text-white hover:text-white/80 transition"
              >
                <Download className="w-6 h-6" />
              </button>
            </>
          ) : /* Category Page Header */
          isCategoryPage ? (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-white hover:text-white/80 transition"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-white">Category</h1>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate("/search")}
                  className="text-white/80 hover:text-white transition"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleMenuClick}
                  className="text-white/80 hover:text-white transition"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : /* Downloads Page Header */
          isDownloadsPage ? (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-white hover:text-white/80 transition"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-white">Downloads</h1>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate("/search")}
                  className="text-white/80 hover:text-white transition"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleMenuClick}
                  className="text-white/80 hover:text-white transition"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : /* My List Page Header */
          isMyListPage ? (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackClick}
                  className="text-white hover:text-white/80 transition"
                >
                  {isEditMode ? <X className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
                </button>
                <h1 className="text-2xl font-bold text-white">
                  {isEditMode ? "Edit" : "My List"}
                </h1>
              </div>
              {!isEditMode && (
                <button
                  onClick={toggleEditMode}
                  className="text-white hover:text-white/80 transition"
                >
                  <Pencil className="w-6 h-6" />
                </button>
              )}
              {isEditMode && <div className="w-6" />}
            </>
          ) : /* Profile Page Header */
          isProfilePage ? (
            <>
              <div className="flex items-center">
                <h1 className="text-white text-2xl font-semibold tracking-wide">
                  My Profile
                </h1>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate("/search")}
                  className="text-white/80 hover:text-white transition"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleMenuClick}
                  className="text-white/80 hover:text-white transition"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : /* Default Header (Home and other pages) */ (
            <>
              <div className="flex items-center">
                <img
                  src="/images/istockphoto-1452538878-612x612-removebg-preview.png"
                  alt="FitnessFlicks"
                  onClick={() => navigate("/home")}
                  className="h-[52px] w-auto object-contain cursor-pointer"
                />

                <button
                  onClick={() => navigate("/home")}
                  className="text-white text-2xl font-semibold tracking-wide hover:text-white/80 transition"
                >
                  Home
                </button>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => navigate("/downloads")}
                  className="text-white/80 hover:text-white transition"
                >
                  <Download className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate("/search")}
                  className="text-white/80 hover:text-white transition"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Bottom Menu */}
      <BottomMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}