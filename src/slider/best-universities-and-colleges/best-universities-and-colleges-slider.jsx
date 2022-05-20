import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import whiteLogo from "../../assets/images/logo/logo-white.svg";
const BestUniAndColSlider = ({ gapBetweenSlides = 10 }) => {
  const [slides, setSlides] = useState([]);
  const getAllInstitution = (signal) => {
    axiosInstance
      .get(`/institutes/`, { signal })
      .then((res) => {
        setSlides(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllInstitution(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="grid grid-flow-col grid-rows-2">
      {slides.map((slide, index) => {
        const { name, add, logo, width, address, slug } = slide;
        return (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/universities/${slug}`}
            key={index}
            className=" bg-white rounded-lg overflow-hidden"
            style={{
              marginRight:
                slides.length - 1 > index ? `${gapBetweenSlides}px` : "",
              width: 250,
              height: 150,
              marginBottom: index % 2 === 0 ? "10px" : "0",
            }}
          >
            <div className="flex h-full gap-3 flex-col items-center justify-center">
              <div>
                {logo ? (
                  <img src={logo} alt="logo" width={width} className="h-14" />
                ) : (
                  <img
                    src={whiteLogo}
                    alt="logo"
                    width={width}
                    className="h-14 gradient"
                  />
                )}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-900 font-semibold">
                  {name}
                </div>
                <div className="text-xs text-gray-600">{add}</div>
                <div className="text-xs text-gray-600 font-bold mt-2">
                  {address}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BestUniAndColSlider;
