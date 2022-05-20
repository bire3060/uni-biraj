import React, { useState } from "react";
import Header from "../common/header";
import Proceed from "../common/proceed";

const languageTests = ["ACT", "SAT"];

const NextEnglishLanguage = ({ setActive }) => {
  const [activeLanguageTest, setActiveLanguageTest] = useState("");
  return (
    <div className="space-y-5 ">
      <Header text="What English Language Test have you taken OR are planning to take?" />
      <div>
        <div className="text-sm text-gray-700 text-center mb-2">
          Scoring high in language tests increases your option multi fold
        </div>
        <div className="flex justify-center space-x-5 ">
          {languageTests.map((test, index) => (
            <div
              key={index}
              className={`font-bold text-gray-700 px-12 border cursor-pointer rounded py-2 ${
                activeLanguageTest === test
                  ? "bg-pink1 border-pink2"
                  : "bg-white"
              }`}
              onClick={() => setActiveLanguageTest(test)}
            >
              {test}
            </div>
          ))}
        </div>
      </div>
      <Header text="Enter your score" />
      <div className="w-60 mx-auto">
        <input
          type="text"
          className="border rounded-full border-pink2 w-full px-4 py-2 text-center"
          placeholder="Percentage %"
        />
      </div>
      <div className="text-center">
        <div className="bg-pink1 inline-block text-pink4 font-bold px-4 py-2 rounded-full cursor-pointer">
          Not Planning to take any
        </div>
      </div>
      <Proceed step={5} setActive={() => setActive("internship")} />
    </div>
  );
};

export default NextEnglishLanguage;
