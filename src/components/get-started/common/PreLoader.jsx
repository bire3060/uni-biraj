import React from "react";
import whiteLogo from "../../../assets/images/logo/logo-white.svg";
const Preloader = () => {
  return (
    <div className="z-20 h-screen fixed w-full top-0 left-0 flex items-center justify-center bg-blue3">
      <img
        src={whiteLogo}
        alt="Uni and colleges logo"
        className="w-52 bg-gray-00 animate-pulse transition duration-150 ease-in-out"
      />
    </div>
  );
};
export default Preloader;
