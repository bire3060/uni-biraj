import React from "react";
import { useSelector } from "react-redux";
import ImgSliderData from "./institution-img-slider-data";
const ImgSlider = () => {
  const { images } = useSelector((state) => state.institute);
  // console.log(images);
  return (
    <div
      style={{ width: window.innerWidth > 1019 && "70vw" }}
      className=" updiv h-60 flex gap-8 overflow-x-auto sliderdiv mx-auto"
    >
      {Array.isArray(images) &&
        images.map((sliderdata, index) => {
          return <ImgSliderData key={index} index={index} {...sliderdata} />;
        })}
    </div>
  );
};
export default ImgSlider;
