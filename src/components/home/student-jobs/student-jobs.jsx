import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomSlider from "../../../slider/custom-slider";
import StudentJobsSlider from "../../../slider/student-jobs/student-jobs-slider";
import arrow from "../../../assets/images/icons/right-arrow.svg";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";

// const locations = ["Australia", "USA", "Canada", "India", "Denmark", "Germany"];

const StudentJobs = () => {
  // const [activeLocation, setActiveLocation] = useState("Australia");
  const [slides, setSlides] = useState([]);
  const [contentMore, setContentMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [blogLoading, setBlogLoading] = useState(true);

  const getJobLists = (signal) => {
    axiosInstance
      .get(`/job/all-list/`, { signal })
      .then((res) => {
        setBlogLoading(false);
        if (res.data.length >= 4) {
          setContentMore(true);
          setShowButton(true);
        }
        setSlides(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setBlogLoading(false);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getJobLists(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="flex flex-col py-10 bg-blue-100" id="jobs-and-offers">
      {/* top header  */}
      <div className=" text-4xl font-medium w-11/12 md:w-3/4 lg:w-2/5 mx-auto text-center">
        Browse Student Jobs
      </div>
      {/* category lists  */}
      {/* <div className=" mx-auto mt-5 font-bold text-sm text-gray5">
        <div className="flex space-x-4 flex-wrap">
          {locations.map((location, index) => (
            <div
              key={index}
              className={`transition-all duration-500 border-b-2 ${
                activeLocation === location
                  ? "border-pink4 text-pink4 cursor-default"
                  : "border-transparent cursor-pointer"
              }`}
              onClick={() => setActiveLocation(location)}
            >
              {location}
            </div>
          ))}
        </div>
      </div> */}
      {/* slider  */}
      {blogLoading && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {slides.length > 0 && (
        <div className="py-6 mt-5">
          <CustomSlider
            numberOfSlides={slides.length}
            cardwidth={250}
            comp={<StudentJobsSlider />}
            showButton={showButton}
          />
        </div>
      )}

      {contentMore && (
        <div className="flex justify-center text-pink4">
          <Link
            to="/alljobs"
            className="flex items-center"
            onClick={() => window.scroll(0, 0)}
          >
            <p className="ml-2 pr-2 font-semibold">View more</p>
            <img src={arrow} alt="" width="10" />
          </Link>
        </div>
      )}

      {slides.length === 0 && !blogLoading && (
        <div className="flex justify-center">No Data Available</div>
      )}
    </div>
  );
};

export default StudentJobs;
