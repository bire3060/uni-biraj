import React from "react";
import { useState } from "react";
import userImage from "../../../assets/images/student-dashboard/userImg.webp";

const CourseInquiryAdd = () => {
  const [inputFields, setInputFields] = useState({
    message: "",
  });

  const handleChange = (e) => {
    setInputFields((preval) => {
      return {
        ...preval,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-2">
      <div className="cursor-pointer flex space-x-2 items-center text-blue3">
        <img
          src={userImage}
          alt="userimage"
          className="h-12 w-12 rounded-full object-cover bg-cover "
        />
        <div className="text-xl font-bold ">Roshan Khanal</div>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="sm:flex justify-between mb-2">
            <div className="text-sm font-semibold">Message</div>
            <div className=" w-full sm:w-2/3 mr-5">
              <textarea
                value={inputFields.message}
                name="message"
                style={{ resize: "none" }}
                onChange={handleChange}
                className="border px-3 border-gray-400 rounded-md shadow-md w-full h-30 sm:h-64"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-blue3 flex justify-center md:my-2 font-bold text-lg py-1 text-white"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseInquiryAdd;
