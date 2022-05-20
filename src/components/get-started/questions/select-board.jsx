import React, { useState } from "react";
import Header from "../common/header";
import Proceed from "../common/proceed";
import { AdvancedSelectField } from "../../common/input-field";

const educationLevels = ["Grade 12", "Undergraduate"];

const boards = [
  {
    label: "IB",
    value: "IB",
  },
  {
    label: "ICSE",
    value: "ICSE",
  },
  {
    label: "CBSE",
    value: "CBSE",
  },
  {
    label: "STATE",
    value: "STATE",
  },
];

const SelectBoard = ({ setActive }) => {
  const [activeLevel, setActiveLevel] = useState("");
  return (
    <div className="space-y-5 text-gray-700">
      <Header text="Which is your highest education level?" />
      <div className="flex justify-center space-x-5">
        {educationLevels.map((level, index) => (
          <div
            key={index}
            className={`font-bold px-12 border cursor-pointer rounded py-2 ${
              activeLevel === level ? "bg-pink1 border-pink2" : "bg-white"
            }`}
            onClick={() => setActiveLevel(level)}
          >
            {level}
          </div>
        ))}
      </div>
      <div className="w-60 mx-auto md:w-72 lg:w-96">
        <AdvancedSelectField label="Select your board" options={boards} />
      </div>
      <div></div>
      <Header text="Which is your highest education level?" />
      <div className="w-60 mx-auto">
        <input
          type="text"
          className="border rounded-full border-pink2 w-full px-4 py-2 text-center"
          placeholder="Percentage %"
        />
      </div>
      <div className="">
        <Proceed step={4} setActive={() => setActive("majorPersue")} />
      </div>
    </div>
  );
};

export default SelectBoard;
