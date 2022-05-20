import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const StudentPerksSlider = ({
  handleSearch,
  setEmptyData,
  setShowButton,
  setObjecct,
  gapBetweenSlides = 10,
}) => {
  const [slides, setSlides] = useState([]);
  const fetchPerkLists = async (signal) => {
    axiosInstance
      .get(`/std-gift-list/?search=${handleSearch}`, { signal })
      .then((res) => {
        // let val = [];
        // for (let i = 0; i < res.data.length; i++) {
        //   if (i < 4) {
        //     val.push(res.data[i]);
        //   }
        // }
        setSlides(res.data);
        setEmptyData(res.data);
        if (res.data.length <= 4) {
          setObjecct("justify-center");
          setShowButton(false);
        } else {
          setObjecct("");
          setShowButton(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // getAllCountry(signal);
    fetchPerkLists(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, [handleSearch]);

  return (
    <div>
      <div>
        <div className="w-full flex lg:justify-center">
          {slides.length > 0 &&
            slides.map((prek, index) => {
              const { image, title, details, id } = prek;
              return (
                <Link
                  key={index}
                  to={`/perks/all-perks/${id}`}
                  className=" flex-shrink-0 border mb-2 rounded-lg relative"
                  style={{
                    marginRight:
                      slides.length - 1 > index ? `${gapBetweenSlides}px` : "",
                    width: 250,
                  }}
                >
                  <img
                    src={image}
                    className="h-28 w-full object-cover rounded-t-lg"
                    alt=""
                  />
                  <div className="flex flex-col items-center">
                    <div className="text-center my-5">
                      <p className="text-sm font-semibold leading-6">{title}</p>
                      <p className="text-xs text-gray-900">{details}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StudentPerksSlider;
