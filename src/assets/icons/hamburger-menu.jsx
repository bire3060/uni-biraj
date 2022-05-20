import React from "react";
import "../css/icons/hamburger.css";

const HamburgerMenu = ({ handleClick }) => {
  return (
    <div
      className="space-y-1 cursor-pointer hamburger-menu relative z-50"
      onClick={handleClick}
    >
      <div className="bg-gray-50 w-7"></div>
      <div className="bg-gray-50 w-7"></div>
      <div className="bg-gray-50 w-7"></div>
    </div>
  );
};

export default HamburgerMenu;
