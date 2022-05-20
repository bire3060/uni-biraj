import React, { useState, useEffect } from "react";
import Navbar from "../../static/navbar";
import DetailPopup from "./DetailPopup";
import axiosInstance from "../../../api/axiosInstance";
import email from "../../../assets/images/icons/email.svg";
import Preloader from "../../get-started/common/PreLoader";
import pageNotFound from "../../../assets/images/common/404.jpg";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import mentors from "../../../assets/images/home/mentors.jpg";
const AllMentors = ({ loggedIn, role }) => {
  //   popup state
  const { id } = useParams();
  const [popup, setPopup] = useState(false);
  const [selectedMentor, setSelecetdMentor] = useState([]);
  const [load, setLaad] = useState(true);
  const [slides, setSlides] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const getMentorList = (signal) => {
    if (id) {
      axiosInstance
        .get(`/buddy-mentor-detail/${id}`, { signal })
        .then((res) => {
          setSlides([res.data]);
          // console.log(res.data);
          setLaad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance
        .get(`/buddy-mentor/?page=${currentButton}`, { signal })
        .then((res) => {
          setSlides(res.data.results);
          setPage(res.data.total_pages);
          setLaad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handlePopUpDetails = (data) => {
    setSelecetdMentor(data);
    setPopup(!popup);
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getMentorList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [id, currentButton]);
  return (
    <>
      <div className="relative pb-20">
        {load && <Preloader />}
        <Navbar loggedIn={loggedIn} role={role} />
        <div
          className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
          style={{
            backgroundImage: `url(${mentors})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
          <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-0">
            Mentors
          </span>
        </div>
        <div className="text-center  mt-10 mb-10  relative">
          {id && (
            <Link
              to="/allmentors"
              className="absolute top-0 right-28 cursor-pointer underline"
            >
              View all mentors
            </Link>
          )}
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
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 grid-cols-1 ">
                  {slides.map((slide, index) => {
                    const { image, name, study_at, work_industry } = slide;

                    return (
                      <div
                        className="rounded-lg flex-shrink-0 bg-white border border-gray-100 shadow-lg overflow-hidden cursor-pointer"
                        onClick={() => handlePopUpDetails(slide)}
                        key={index}
                      >
                        <div>
                          <img
                            src={image}
                            className="w-full h-60 object-cover bg-cover"
                            alt={`img of ${name}`}
                          />
                        </div>
                        <div className="flex items-center justify-between px-2 pt-2">
                          <div>{name}</div>
                          <div>
                            <img src={email} alt="" width="20" />
                          </div>
                        </div>
                        <div className="px-2 pt-2 pb-4 grid grid-cols-2 gap-2  text-left">
                          <div className="col-span-1">
                            <p className="text-xs text-gray-500">Studied At</p>
                            <p className="text-xs">{study_at}</p>
                          </div>
                          <div className="col-span-1">
                            <p className="text-xs text-gray-500">
                              Work industry
                            </p>
                            <p className="text-xs">{work_industry}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* detail popup  */}
                {popup && (
                  <div>
                    <DetailPopup
                      popup={popup}
                      detail={selectedMentor}
                      popupFxn={setPopup}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {page > 1 && (
          <Pagination
            setCurrentButton={setCurrentButton}
            currentButton={currentButton}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default AllMentors;
