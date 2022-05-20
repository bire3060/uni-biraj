import React, { useState } from "react";
import Header from "../common/header";
import Proceed from "../common/proceed";

const languageTests = ["YES", "NO"];

const Internship = ({ setActive }) => {
  const [activeLanguageTest, setActiveLanguageTest] = useState("");
  return (
    <div className="space-y-5 ">
      <Header text="Do you have any internship/fellowship/work/ experience in your area of interest ?" />

      <div className="flex justify-center space-x-5 ">
        {languageTests.map((test, index) => (
          <div
            key={index}
            className={`font-bold text-gray-700 px-12 border cursor-pointer rounded py-2 ${
              activeLanguageTest === test ? "bg-pink1 border-pink2" : "bg-white"
            }`}
            onClick={() => setActiveLanguageTest(test)}
          >
            {test}
          </div>
        ))}
      </div>

      <div className="relative my-14 mx-auto w-3/5">
        <div
          style={{ color: "crimson" }}
          className="absolute font-semibold right-0 -top-2 text-sm"
        >
          18+ months
        </div>
        <div
          style={{ color: "crimson" }}
          className="absolute font-semibold left-0 -top-2 text-sm"
        >
          0
        </div>
        <input
          type="range"
          start="0"
          end="20"
          className="Eslider w-full h-1 border-0 cursor-pointer"
        />
      </div>

      <div className="text-center pt-4">
        <div className="bg-pink1 inline-block text-pink4 font-bold px-4 py-2 rounded-full cursor-pointer">
          Not Planning to take any
        </div>
      </div>
      <Proceed step={6} setActive={() => setActive("relevantLevel")} />
    </div>
  );
};

export default Internship;
