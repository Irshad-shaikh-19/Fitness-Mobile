import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 bg-[#0D0F14] border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Section */}
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/about"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/media-centre"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Media Centre
              </Link>
            </li>
            <li>
              <Link
                to="/investor-relations"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Investor Relations
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/help-centre"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Help Centre
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/ways-to-watch"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Ways to Watch
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/terms"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Cookie Preferences
              </Link>
            </li>
            <li>
              <Link
                to="/legal"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Legal Notices
              </Link>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h4 className="font-bold mb-4">More</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/corporate"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Corporate Information
              </Link>
            </li>
            <li>
              <Link
                to="/speed-test"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Speed Test
              </Link>
            </li>
            {/* Additional links that might be useful */}
            <li>
              <Link
                to="/"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-[#F97316] cursor-pointer block"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 pt-8 border-t border-gray-800">
        © 2025 FitnessFlicks, Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
