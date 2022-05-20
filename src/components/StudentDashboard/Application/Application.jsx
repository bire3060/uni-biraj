import React from "react";
import Timeline from "./Timeline";

const Application = () => {
  return (
    <>
      <div>
        <div className="h-8 w-full mb-4 bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > Application"}</div>
          </div>
        </div>
        <div
          className="mx-auto bg-white p-3 sm:p-4   rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border-2 shadow-xl relative border-gray-200 "
          style={{ width: "98%" }}
        >
          <p className="text-center text-3xl font-bold text-blue3 w-full">
            MY TIMELINE
          </p>
          <div className="overflow-auto sbar">
            <div className="pb-10">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
