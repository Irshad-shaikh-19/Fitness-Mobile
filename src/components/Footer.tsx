// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Footer() {
//   const user = useSelector((state: any) => state.auth.user);
//   const isLoggedIn = !!user;

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // 👇 Reactively watch body class changes
//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setIsMenuOpen(document.body.classList.contains("menu-open"));
//     });

//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     // initial check
//     setIsMenuOpen(document.body.classList.contains("menu-open"));

//     return () => observer.disconnect();
//   }, []);

//   // 🚫 Hide footer when mobile menu is open
//   if (isLoggedIn && isMenuOpen) return null;

//   // 🔹 LOGGED-IN FOOTER (Mobile Bottom Nav)
//   if (isLoggedIn) {
//     return (
//       <footer className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 px-4 py-2 z-40 ">
//         <div className="flex items-center justify-around">
//           <Link to="/home" className="flex flex-col items-center gap-1 text-white">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//             </svg>
//             <span className="text-xs">Home</span>
//           </Link>

//           <Link to="/pricing" className="flex flex-col items-center gap-1 text-gray-400">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
//               <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
//               <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
//               <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
//             </svg>
//             <span className="text-xs">Plans</span>
//           </Link>

//           <Link to="/my-list" className="flex flex-col items-center gap-1 text-gray-400">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M19 11H5M19 11V19H5V11M7 7h10v4H7z" strokeWidth="2" />
//             </svg>
//             <span className="text-xs">My List</span>
//           </Link>

//           <Link to="/settings" className="flex flex-col items-center gap-1 text-gray-400">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <circle cx="12" cy="12" r="3" strokeWidth="2" />
//               <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" strokeWidth="2" />
//             </svg>
//             <span className="text-xs">Settings</span>
//           </Link>
//         </div>
//       </footer>
//     );
//   }

  // 🔹 NOT LOGGED-IN FOOTER (Website Footer)
  // return (
  //   <footer className="px-6 md:px-12 py-12 bg-[#0D0F14] border-t border-gray-800">
  //     <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
  //       <div>
  //         <h4 className="font-bold mb-4">Company</h4>
  //         <ul className="space-y-2 text-gray-400">
  //           <li><Link to="/about" className="hover:text-[#F97316]">About Us</Link></li>
  //           <li><Link to="/jobs" className="hover:text-[#F97316]">Jobs</Link></li>
  //           <li><Link to="/media-centre" className="hover:text-[#F97316]">Media Centre</Link></li>
  //           <li><Link to="/investor-relations" className="hover:text-[#F97316]">Investor Relations</Link></li>
  //         </ul>
  //       </div>

  //       <div>
  //         <h4 className="font-bold mb-4">Support</h4>
  //         <ul className="space-y-2 text-gray-400">
  //           <li><Link to="/help-centre" className="hover:text-[#F97316]">Help Centre</Link></li>
  //           <li><Link to="/faq" className="hover:text-[#F97316]">FAQ</Link></li>
  //           <li><Link to="/contact" className="hover:text-[#F97316]">Contact Us</Link></li>
  //           <li><Link to="/ways-to-watch" className="hover:text-[#F97316]">Ways to Watch</Link></li>
  //         </ul>
  //       </div>

  //       <div>
  //         <h4 className="font-bold mb-4">Legal</h4>
  //         <ul className="space-y-2 text-gray-400">
  //           <li><Link to="/terms" className="hover:text-[#F97316]">Terms of Use</Link></li>
  //           <li><Link to="/privacy" className="hover:text-[#F97316]">Privacy</Link></li>
  //           <li><Link to="/cookies" className="hover:text-[#F97316]">Cookie Preferences</Link></li>
  //           <li><Link to="/legal" className="hover:text-[#F97316]">Legal Notices</Link></li>
  //         </ul>
  //       </div>

  //       <div>
  //         <h4 className="font-bold mb-4">More</h4>
  //         <ul className="space-y-2 text-gray-400">
  //           <li><Link to="/corporate" className="hover:text-[#F97316]">Corporate Info</Link></li>
  //           <li><Link to="/speed-test" className="hover:text-[#F97316]">Speed Test</Link></li>
  //           <li><Link to="/" className="hover:text-[#F97316]">Home</Link></li>
  //           <li><Link to="/pricing" className="hover:text-[#F97316]">Pricing</Link></li>
  //         </ul>
  //       </div>
  //     </div>

  //     <div className="text-center text-gray-500 mt-12 pt-8 border-t border-gray-800">
  //       © 2025 FitnessFlicks, Inc. All rights reserved.
  //     </div>
  //   </footer>
  // );
//   return null;
// }

// export default Footer;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

function Footer() {
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 👇 Reactively watch body class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsMenuOpen(document.body.classList.contains("menu-open"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // initial check
    setIsMenuOpen(document.body.classList.contains("menu-open"));

    return () => observer.disconnect();
  }, []);

  // 🚫 Hide footer when mobile menu is open
  if (isLoggedIn && isMenuOpen) return null;

  // 🔹 LOGGED-IN FOOTER (Mobile Bottom Nav)
  if (isLoggedIn) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          <Link to="/home" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs">Home</span>
          </Link>

          <Link to="/pricing" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
            </svg>
            <span className="text-xs">Plans</span>
          </Link>

          <Link to="/my-list" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H5M19 11V19H5V11M7 7h10v4H7z" strokeWidth="2" />
            </svg>
            <span className="text-xs">My List</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-xs">My Profile</span>
          </Link>
        </div>
      </footer>
    );
  }
  return null;
}

export default Footer;