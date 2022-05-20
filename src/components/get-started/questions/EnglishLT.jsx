import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../static/navbar";

const EnglishLT = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-blue-100">
        <div className="w-3/5 pt-24 mx-auto text-3xl text-center">
          <div className="">
            Which English Language Test have you taken OR are planning to take ?
          </div>
          <div className="text-sm text-gray-500 mt-8">
            Scoring high in Language Test increases your option multi fold
          </div>
          <div className=" flex gap-8 mt-2 justify-center ">
            <div className=" degree-act w-40  text-lg font-bold border border-gray-300 p-2 shadow-md flex justify-center items-center rounded-lg h-10 bg-white">
              ACT
            </div>
            <div className=" degree-act w-40  text-lg font-bold border border-gray-300 p-2 shadow-md flex justify-center items-center rounded-lg h-10 bg-white">
              SAT
            </div>
          </div>
          <div className="mt-8">Enter Your Score</div>
          <div>
            <input
              placeholder="Percentage %"
              className="bg-gray-50 rounded-sm text-lg pl-10 w-40  shadow-lg mt-8 border border-gray-300"
            />
          </div>
          <button
            style={{ backgroundColor: "rgb(235, 221, 224)", color: "crimson" }}
            className="text-base mt-8 font-semibold rounded-2xl px-2 py-1"
          >
            Not Planning to take any
          </button>
        </div>

        <div className="mt-4 w-full text-center">
          <div>
            <Link
              to="/jpt"
              style={{
                backgroundColor: "crimson",
                boxShadow: "0 0 8px crimson",
              }}
              className="inline-block h-8 rounded-2xl text-lg text-gray-50 w-32 "
            >
              Proceed
            </Link>
          </div>
          <div>step2</div>
        </div>
      </div>
    </>
  );
};
export default EnglishLT;
