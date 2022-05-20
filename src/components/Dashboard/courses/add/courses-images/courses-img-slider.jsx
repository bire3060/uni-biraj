import React from "react";
import CoursesImgSliderData from "./courses-img-slider-data";
const CoursesImgSlider = () => {
  const sliderdatas = [
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
    {
      name: "IMAGE NAME",
      description: "Description here",
    },
  ];
  return (
    <div
      style={{ width: window.innerWidth > 1019 && "70vw" }}
      className="flex h-6 updiv mx-auto gap-8 overflow-x-auto sliderdiv"
    >
      {sliderdatas.map((sliderdata, index) => {
        return <CoursesImgSliderData key={index} {...sliderdata} />;
      })}
    </div>
  );
};
export default CoursesImgSlider;
