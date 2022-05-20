import React, { useState } from "react";
import Header from "../common/header";
import Proceed from "../common/proceed";

const educationLevels = ["Grade 12", "Undergraduate"];

const HighestEducationLevel = ({ setActive }) => {
  const [activeLevel, setActiveLevel] = useState("");

  return (
    <div>
      <Header text="Which is your highest education level?" />
      <div className="flex justify-center space-x-5 mt-8">
        {educationLevels.map((level, index) => (
          <div
            key={index}
            className={`font-bold text-gray-700 px-12 border cursor-pointer rounded py-2 ${
              activeLevel === level ? "bg-pink1 border-pink2" : "bg-white"
            }`}
            onClick={() => setActiveLevel(level)}
          >
            {level}
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Proceed step={5} setActive={() => setActive("selectBoard")} />
      </div>
    </div>
  );
};

export default HighestEducationLevel;
