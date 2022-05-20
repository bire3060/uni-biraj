import React from "react";
import IconManager from "../../../../common/icon-manager";

const CoursesImgSliderData = ({ name, description }) => {
  return (
    <div className="w-52  flex-shrink-0 h-48 shadow-xl">
      <div className="w-full  h-32 relative  bg-white">
        <div className="w-7 cursor-pointer flex items-center justify-center bg-blue-900 absolute top-1 right-10 h-7 rounded-full">
          <IconManager icon="Edit" className="w-4 h-4 text-white" />
        </div>
        <div className="w-7 cursor-pointer flex items-center justify-center crimson absolute top-1 right-1 h-7 rounded-full">
          <IconManager icon="Download" className="w-4 h-4 text-white" />
        </div>
        <img src="" alt="" />
      </div>
      <div className="text-center">
        <div className=" text-lg font-medium">{name}</div>
        <div className="text-xs">{description}</div>
      </div>
    </div>
  );
};
export default CoursesImgSliderData;
