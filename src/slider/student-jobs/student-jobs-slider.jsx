import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import whiteLogo from "../../assets/images/logo/logo-white.svg";
const StudentJobsSlider = ({ gapBetweenSlides = 10 }) => {
  const [slides, setSlides] = useState([]);
  const Monthdate = [
    "January",
    "February",
    "march",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getJobLists = (signal) => {
    axiosInstance
      .get(`/job/all-list/`, { signal })
      .then((res) => {
        setSlides(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
    <>
      {slides.map((slide, index) => {
        const { company, title, description, tags, vaccany_close, slug } =
          slide;
        return (
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={`/alljobs/job/${slug}`}
            key={index}
            style={{
              marginRight:
                slides.length - 1 > index ? `${gapBetweenSlides}px` : "",
              width: 250,
            }}
            className=" rounded-lg flex-shrink-0 bg-white relative overflow-hidden"
          >
            <div className="">
              {company.image ? (
                <img
                  src={company.image}
                  alt="logo"
                  className="pl-2 h-20 mx-auto rounded-tr-lg rounded-tl-lg "
                />
              ) : (
                <img
                  src={whiteLogo}
                  alt="logo"
                  className="pl-2 h-20 mx-auto rounded-tr-lg rounded-tl-lg gradient"
                />
              )}

              <div className="pl-2 font-bold text-base text-left text-gray-900 mt-1">
                {title.length > 30 ? title.substring(0, 30) + "..." : title}
              </div>
              <div
                className="text-xs pl-2  text-gray-700 mt-1"
                dangerouslySetInnerHTML={{
                  __html:
                    description.length > 230
                      ? description.substring(0, 230) + "..."
                      : description,
                }}
              ></div>
              <div className="py-2 pl-2 w-full">
                <ul>
                  <li className="inline-block mb-1 mr-1 px-2 py-1 text-xs rounded-full pl-2 bg-gray-100 text-gray-500">
                    {tags}
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-2 w-full bg-red-200 text-center rounded-b-lg absolute bottom-0">
              <p className="text-sm text-gray-700">
                Ends at{" "}
                <span className="text-pink4 font-semibold">
                  {vaccany_close.split("T")[0].split("-")[0]}{" "}
                  {Monthdate[vaccany_close.split("T")[0].split("-")[1] - 1]}{" "}
                  {vaccany_close.split("T")[0].split("-")[2]}
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default StudentJobsSlider;
