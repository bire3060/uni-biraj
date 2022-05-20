import React from "react";

const Schorlarship = () => {
  return (
    <div className="sm:w-11/12 mx-auto grid sm:grid-cols-2 grid-cols-1 gap-10">
      <div className="w-full col-span-1 sm:ml-8 mt-8 border border-gray-400 shadow-lg">
        <div className="border-b border-gray-400 shadow-lg">
          <input
            type="text"
            name=""
            placeholder="Heading"
            className="font-semibold text-2xl pl-3 w-full"
          />
        </div>
        <div className="mt-4 w-11/12 mx-auto rounded-lg shadow-md">
          <input
            type="text"
            name=""
            placeholder="Sub Heading"
            className="pl-4 font-medium border border-gray-200 rounded-lg overflow-hidden w-full"
          />
        </div>
        <div className="my-2 w-10/12  mx-auto border-b-2 border-purple-700">
          <input
            type="text"
            name=""
            placeholder="Description"
            className="pl-5 w-full"
          />
        </div>
        <div className="flex sm:flex-row flex-col my-2 mx-4 justify-between">
          <div>
            <input type="date" name="" className="shadow rounded-lg pl-5" />
          </div>
          <button className="text-sm font-semibold text-white bg-blue3 px-1 rounded self-end">
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schorlarship;
