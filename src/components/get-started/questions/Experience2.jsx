import React from "react";
import "./getstart.css";

const Experience2 = () => {
  return (
    <div className="h-screen bg-blue-100">
      <div className="w-3/5 pt-24 mx-auto text-3xl text-center">
        <div className="">
          Do you have any Experience working with an NGO or an equivalent
          organizetion ?
        </div>
        <div className="text-sm text-gray-500 mt-8">
          Add value to your profile
        </div>
        <div className=" flex gap-8 mt-2 justify-center ">
          <div className=" degree-act w-40  text-lg font-bold border border-gray-300 p-2 shadow-md flex justify-center items-center rounded-lg h-10 bg-white">
            YES
          </div>
          <div className=" degree-act w-40  text-lg font-bold border border-gray-300 p-2 shadow-md flex justify-center items-center rounded-lg h-10 bg-white">
            NO
          </div>
        </div>
        <div className="relative my-14 mx-auto w-3/5">
          <div
            style={{ color: "crimson" }}
            className="absolute font-semibold right-0 text-sm"
          >
            18+ months
          </div>
          <div
            style={{ color: "crimson" }}
            className="absolute font-semibold left-0 text-sm"
          >
            0
          </div>
          <input
            type="range"
            start="0"
            end="20"
            className="Eslider w-full h-1 border-0"
          />
        </div>
      </div>

      <div className="absolute h-32 bottom-0 w-full text-center">
        <div>
          <button
            style={{ backgroundColor: "crimson", boxShadow: "0 0 8px crimson" }}
            className="h-8 rounded-2xl text-lg text-gray-50 w-32 "
          >
            Procced
          </button>
        </div>
        <div>step2</div>
      </div>
    </div>
  );
};
export default Experience2;
