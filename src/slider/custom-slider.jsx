import React, { useState, useRef, useEffect } from "react";
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";
import { numberOfSlidesToDisplay } from "./slider-functions";

import "../assets/css/slider/custom-slider.css";

const CustomSlider = ({
  numberOfSlides,
  gapBetweenSlides = 10,
  cardwidth,
  comp,
  object,
  showButton,
}) => {
  const container = useRef();
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const slidesToShow = numberOfSlidesToDisplay(width, cardwidth);

  const handleSlideDecreement = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleSlideIncreement = () => {
    if (active < numberOfSlides - slidesToShow) {
      setActive(active + 1);
    }
  };

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (width !== innerWidth) {
      setActive(0);
      setWidth(innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div
      className="relative mx-auto"
      style={{
        width:
          slidesToShow * cardwidth +
          (slidesToShow - 1) * gapBetweenSlides +
          "px",
      }}
      ref={container}
    >
      <div className={`overflow-hidden w-full `}>
        <div
          className={`slide-container flex relative transition-all duration-500 md:${object}`}
          style={{
            left: -active * cardwidth - gapBetweenSlides * active + "px",
          }}
        >
          {comp}
        </div>
      </div>
      {showButton && (
        <>
          <div
            className={`slider-arrow absolute bg-white top-1/2 -right-12 w-10 h-10 rounded-full flex items-center justify-center 
                  ${
                    active < numberOfSlides - slidesToShow
                      ? " slider-arrow-enabled cursor-pointer"
                      : " slider-arrow-disabled cursor-default border"
                  }`}
            onClick={handleSlideIncreement}
          >
            <RightArrow />
          </div>
          <div
            className={`slider-arrow absolute bg-white top-1/2 -left-12 w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    active > 0
                      ? " slider-arrow-enabled cursor-pointer"
                      : " slider-arrow-disabled cursor-default border"
                  }
                  `}
            onClick={handleSlideDecreement}
          >
            <LeftArrow />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSlider;
