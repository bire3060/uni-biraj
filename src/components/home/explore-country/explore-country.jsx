import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import CustomSlider from "../../../slider/custom-slider";
import ExploreCountrySlider from "../../../slider/explore-country/explore-country-slider";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import DataLoader from "../../common/Loader";

// import ExploreCountrySlide from "./ExploreCountrySlide";

const locations = [
  "All",
  "Australia",
  "North America",
  "Europe",
  "Asia",
  "Africa",
  "South America",
  "Antarctica",
];

const ExploreCountry = () => {
  const [activeLocation, setActiveLocation] = useState("All");
  const [slides, setSlides] = useState([]);
  const [loader, setLoader] = useState(true);
  const [noData, setNoData] = useState(false);
  const [object, setObjecct] = useState("justify-center");
  const [showButton, setShowButton] = useState(false);

  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        if (res.data.length >= 4) {
          setObjecct("");
          setShowButton(true);
        }
        setSlides(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setNoData(true);
        console.log(err);
      });
  };
  const getcountrybycontinient = (data) => {
    if (data === "All") {
      getCountryList();
    } else {
      axiosInstance
        .get(`/institutes/country/list/?search=${data}`)
        .then((res) => {
          setSlides(res.data);
          if (res.data.length <= 4) {
            setObjecct("justify-center");
            setNoData(false);
            setShowButton(false);
          } else {
            setObjecct("");
            setNoData(false);
            setShowButton(true);
          }
          if (res.data.length === 0) {
            setNoData(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-10">
      <div className="">
        <div>
          <div className="large-heading max-w-sm text-center mx-auto">
            Explore by Country that you want to study
          </div>

          {loader && (
            <div className=" flex mt-4  w-full justify-center ml-12 space-x-2 items-center ">
              <span className="text-lg">Loading</span>
              <span>
                <DataLoader />
              </span>
            </div>
          )}
          <div className="flex space-x-4 justify-center my-3 md:my-5 flex-wrap">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`transition-all mt-2 duration-500 border-b-2 ${
                  activeLocation === location
                    ? "border-pink4 text-pink4 cursor-default"
                    : "border-transparent cursor-pointer"
                }`}
                onClick={() => {
                  setActiveLocation(location);
                  getcountrybycontinient(location);
                }}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>
      {noData && (
        <div className=" text-red-500 text-center">No Data Available</div>
      )}
      {/* {slides.length === 0 ? (
        <div className=" text-red-500 text-center">
          No Data Available
        </div>
      ) : ( */}
      {slides.length > 0 && !loader && (
        <CustomSlider
          numberOfSlides={slides.length}
          cardwidth={250}
          comp={<ExploreCountrySlider slides={slides} />}
          showButton={showButton}
        />
      )}
      {/* <ExploreCountrySlide /> */}
    </div>
  );
};

export default ExploreCountry;
