import React from "react";
import Coursescard from "./Courses-card";
import { BsPlusLg } from "react-icons/bs";

const Comparecard = ({ showPopup, courses }) => {
  return (
    <div className="h-full">
      <div className="h-full py-2 flex items-center">
        <div className="flex-shrink-0 flex items-center w-36 justify-center mr-4">
          <button
            className="h-10 w-10 text-xl text-gray-50 bg-pink4 hover:bg-pink5 font-semibold rounded-full flex items-center justify-center"
            onClick={showPopup}
          >
            <BsPlusLg className="text-sm" />
          </button>
        </div>
        {courses.map((course, index) => (
          <Coursescard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};
export default Comparecard;
