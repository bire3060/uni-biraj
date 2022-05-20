import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Preloader from "../../get-started/common/PreLoader";
import Navbar from "../../static/navbar";
import pageNotFound from "../../../assets/images/common/404.jpg";
import jobs from "../../../assets/images/home/job.jpg";
import Pagination from "../../common/Pagination";
import UniLogo from "../../../assets/images/logo/logo.svg";

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
const AllJobs = ({ loggedIn, role }) => {
  const [allJobCat, setAllJobCat] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  const [slides, setSlides] = useState([]);
  const [selected, setSelected] = useState("");
  const getJobLists = (signal) => {
    axiosInstance
      .get(`/job/user/list/?page=${currentButton}`, { signal })
      .then((res) => {
        setSlides(res.data.results);
        setPage(res.data.total_pages);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllJobCategory = (signal) => {
    axiosInstance
      .get(`/job-category/list/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setAllJobCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchjob = (title) => {
    if (title === "all") {
      getJobLists();
    } else {
      axiosInstance
        .get(`/job/user/list/?search=${title}`)
        .then((res) => {
          setSlides(res.data.results);
          // console.log(res.data.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getJobLists(signal);
    getAllJobCategory(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);
  return (
    <>
      <div>
        {load && <Preloader />}
        <Navbar loggedIn={loggedIn} role={role} />
        <div
          className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
          style={{
            backgroundImage: `url(${jobs})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
          <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-10">
            Jobs & Offers
          </span>
        </div>
        <div className="sm:flex justify-end px-5 sm:px-10 sm:space-x-3 md:px-20 items-center mt-10">
          <div className="font-semibold">Filter by category</div>
          <div>
            <select
              type="text"
              placeholder="Enter country name"
              className=" placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent border border-gray-300 focus:border-transparent"
              onChange={(e) => {
                searchjob(e.target.value);
                setSelected(e.target.value);
              }}
              value={selected}
            >
              <option value="0" disabled selected>
                Select category
              </option>
              <option value="all">All</option>
              {Array.isArray(allJobCat) &&
                allJobCat.map((cat) => {
                  return (
                    <option value={cat.title} key={cat.id}>
                      {cat.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        {slides.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center mb-10 text-gray-700">
            <img src={pageNotFound} alt="" className="h-64 w-64" />
            <div className="text-3xl font-bold">No data is available</div>
          </div>
        ) : (
          <div className="px-4 py-6 md:px-10 lg:px-24 ">
            <div className="">
              <div className="max-w-7xl mx-auto ">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 grid-cols-1">
                  {slides.map((slide, index) => {
                    const {
                      company,
                      title,
                      description,
                      tags,
                      vaccany_close,
                      slug,
                    } = slide;
                    return (
                      <Link
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                        to={`/alljobs/job/${slug}`}
                        className=" rounded-lg flex-shrink-0 bg-white relative h-64 border border-gray-100"
                        key={index}
                      >
                        <div className=" ">
                          {company.image === null ? (
                            <img
                              src={UniLogo}
                              alt="logo"
                              className="h-20 w-40 px-2 mx-auto rounded-tr-lg rounded-tl-lg"
                            />
                          ) : (
                            <img
                              src={company.image}
                              alt="logo"
                              className="h-20 px-2 mx-auto rounded-tr-lg rounded-tl-lg"
                            />
                          )}
                          <div className="font-bold line-clamp-1 text-base text-gray-900 px-3 text-justify mt-3">
                            {title.length > 30
                              ? title.substring(0, 30) + "..."
                              : title}
                          </div>
                          <div
                            className=" text-xs  text-gray-700 mt-1 px-3 text-justify overflow-hidden"
                            dangerouslySetInnerHTML={{
                              __html:
                                description.length > 175
                                  ? description.substring(0, 175) + "..."
                                  : description,
                            }}
                            style={{ height: 62 }}
                          />
                          <div className="py-2 w-full px-2">
                            <ul>
                              <li className=" inline-block mb-1 mr-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500">
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
                              {
                                Monthdate[
                                  vaccany_close.split("T")[0].split("-")[1] - 1
                                ]
                              }{" "}
                              {vaccany_close.split("T")[0].split("-")[2]}
                            </span>
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="my-10">
          {page > 1 && (
            <Pagination
              setCurrentButton={setCurrentButton}
              currentButton={currentButton}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllJobs;
