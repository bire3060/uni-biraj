import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../../assets/images/common/404.jpg";

const Notfound = () => {
  return (
    <div className="h-screen w-full mx-auto ">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center py-10 sm:p-20 space-y-4">
          <div>
            <img src={pageNotFound} alt="pageNotFound" className="h-64 w-64" />
          </div>
          <div className="text-gray-800 tracking-wide text-center font-semibold text-xl">
            Oops! It's A Dead End
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="border border-secondary bg-secondary  px-4 ml-2 rounded hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-300 ease-in-out tracking-wide focus:outline-none border-blue-600 py-1.5 text-sm"
            >
              BACK HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
