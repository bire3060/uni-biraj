import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../static/navbar";

const HighEdu = () => {
  const [active, setActive] = useState(false);
  const boards = [
    {
      nam: "IB",
    },
    {
      nam: "ICSE",
    },
    {
      nam: "CBSE",
    },
    {
      nam: "STATE",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="relative bg-blue-100">
        <div className="text-center text-4xl font-semibold pt-20">
          Which is your highest education level ?
        </div>
        <div className="flex justify-center mt-10">
          <div className="w-44 text-center text-lg font-bold py-2 border bg-white border-gray-400 cursor-pointer hover:border-pink4 hover:bg-pink1 rounded mr-10">
            Grade 12
          </div>
          <div className="w-44 text-center text-lg font-bold py-2 border bg-white border-gray-400 cursor-pointer hover:border-pink4 hover:bg-pink1 rounded">
            Undergraduate
          </div>
        </div>
        <div className=" h-10 w-64 mx-auto mt-12 relative">
          <div className="w-64 h-full border border-pink4 flex items-center rounded bg-white pl-6">
            <p className="text-gray-400 text-lg font-medium">
              Select your board
            </p>
          </div>
          <div
            onClick={() => setActive(!active)}
            className="absolute right-2 top-1 cursor-pointer"
          ></div>
          {active && (
            <div className="w-36 border border-pink4 bg-pink1 items-baseline absolute top-10 left-6">
              {boards.map((board, index) => {
                const { nam } = board;
                return (
                  <div
                    key={index}
                    className="w-full border-b border-pink4 font-bold pl-6 cursor-pointer"
                  >
                    {nam}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="text-center text-4xl font-semibold pt-14">
          Which is your highest education ?
        </div>
        <div className="flex justify-center mt-6 pb-32">
          <input
            type="text"
            name="percent"
            className="w-52 p-1 rounded-full text-lg font-medium text-center border border-pink4"
            placeholder="Percentage %"
          />
        </div>
        <div className="absolute h-24 bottom-0 w-full text-center">
          <div>
            <Link
              to="/subject"
              onClick={() => window.scrollTo(0, 0)}
              style={{
                backgroundColor: "crimson",
                boxShadow: "0 0 8px crimson",
              }}
              className="inline-block h-8 rounded-2xl text-lg text-gray-50 w-36 font-semibold "
            >
              Proceed
            </Link>
          </div>
          <div className="text-sm font-medium mt-2">STEP 3</div>
        </div>
      </div>
    </>
  );
};

export default HighEdu;
