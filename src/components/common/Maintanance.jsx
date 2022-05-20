import React from "react";
// import { Link } from "react-router-dom";
import maintanance from "../../assets/images/common/maintanance.jpg";

const Maintanance = () => {
  return (
    <div className="h-screen w-full mx-auto ">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center py-10 sm:p-20 ">
          <div>
            <img src={maintanance} alt="maintanance" className="h- w-full" />
          </div>
          <div className="text-gray-800 tracking-wide text-center font-semibold text-lg">
            This page is currently
          </div>
          <div className="text-gray-800 tracking-wide text-center font-bold  text-3xl">
            Under Construction
          </div>
          <div className="text-gray-800 tracking-wide text-center font-semibold text-lg">
            Plese Check back soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintanance;
