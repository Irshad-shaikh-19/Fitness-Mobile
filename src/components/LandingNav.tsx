import React from "react";
import { Button } from "./ui";
import { useNavigate } from "react-router-dom";

function LandingNav() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    // Handle sign-in click
    navigate("/login");
  };
  return (
    <>
      {/* Landing Header */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
        <div
          className="text-2xl font-bold text-[#F97316] cursor-pointer"
          onClick={() => navigate("/")}
        >
          FITNESSFLICKS
        </div>
        <Button
          variant="outline"
          className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-black cursor-pointer"
          onClick={handleOnClick}
        >
          Sign In
        </Button>
      </nav>
    </>
  );
}

export default LandingNav;
