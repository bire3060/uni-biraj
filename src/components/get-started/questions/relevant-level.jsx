import React from "react";
import { AdvancedSelectField } from "../../common/input-field";
import Header from "../common/header";
import Proceed from "../common/proceed";

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

const RelevantLevel = ({ setActive }) => {
  return (
    <div className="space-y-5 text-gray-700">
      <Header text="What English Language Test have you taken OR are planning to take?" />
      <div>
        <div className="text-sm text-gray-700 text-center mb-2">
          Higher the level of representation better the impact of your profile
        </div>
        <div className="flex justify-center space-x-5 "></div>
      </div>
      <div className="w-60 mx-auto md:w-72 lg:w-96">
        <AdvancedSelectField label="Select your board" options={boards} />
      </div>
      <div className="pt-5">
        <Proceed step={7} setActive={() => setActive("experience")} />
      </div>
    </div>
  );
};

export default RelevantLevel;
