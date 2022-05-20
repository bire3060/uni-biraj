import React, { useState } from "react";
import "./getstart.css";
const BoardSelect = () => {
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
    <div className="h-screen bg-blue-100">
      <div className="w-3/5 pt-24 mx-auto text-3xl text-center">
        <div className="">
          Select your most relevant label of representation in any
          extracurriculam activities ?
        </div>
        <div className="text-sm text-gray-500 mt-8">
          Higher the label of your representation better the impact of your
          profile
        </div>
        <div className="mt-10">
          <div className=" h-10 w-64 mx-auto mt-12 relative">
            <div className="w-64 h-full border border-pink4 flex items-center rounded bg-white pl-6">
              <p className="text-gray-400 text-lg font-medium">
                Select your board
              </p>
            </div>
            <div
              onClick={() => setActive(!active)}
              className="absolute right-2 top-1"
            >
              {"->"}
            </div>
            {active && (
              <div className="w-full border border-pink4 text-lg bg-pink1 items-baseline absolute top-10">
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
export default BoardSelect;
