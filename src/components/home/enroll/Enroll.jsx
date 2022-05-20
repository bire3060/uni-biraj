import React from "react";
import Navbar from "../../static/navbar";
import EnrollClassLists from "./EnrollClassLists";
function Enroll({ loggedIn, role }) {
  return (
    <div className="relative">
      <Navbar loggedIn={loggedIn} role={role} />
      <div className="text-center  mt-20 mb-10 text-4xl font-black text-gray-800">
        Enroll
      </div>
      <div className="px-4 py-6 md:px-10 lg:px-24 flex w-full max-w-5xl  mx-auto">
        <EnrollClassLists />
      </div>
    </div>
  );
}

export default Enroll;
