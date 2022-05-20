import React from "react";

const Header = ({ text }) => {
  return (
    <div className="text-center font-semibold text-3xl text-pink4 max-w-2xl mx-auto">
      {text}
    </div>
  );
};

export default Header;
