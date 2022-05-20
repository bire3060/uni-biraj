import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import email from "../../assets/images/icons/email.svg";
import { Link } from "react-router-dom";
import whiteLogo from "../../assets/images/logo/logo-white.svg";
const TalkToMentorSlider = ({ gapBetweenSlides = 10, setMentorLoading }) => {
  const [slides, setSlides] = useState([]);

  const getMentorList = (signal) => {
    axiosInstance
      .get(`/buddy-mentor/all-list/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setSlides(res.data);
        setMentorLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getMentorList(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return slides.map((slide, index) => {
    const { image, name, study_at, work_industry, id } = slide;
    return (
      <Link
        to={`/allmentors/${id}`}
        key={index}
        onClick={() => window.scrollTo(0, 0)}
        style={{
          marginRight: slides.length - 1 > index ? `${gapBetweenSlides}px` : "",
          width: 250,
        }}
        className="rounded-lg flex-shrink-0 bg-white overflow-hidden"
      >
        <div>
          {image ? (
            <img
              src={image}
              className="w-full h-44 bg-cover object-cover"
              alt={`img of ${name}`}
            />
          ) : (
            <img
              src={whiteLogo}
              className="w-full h-44  gradient"
              alt="Uni And College Logo"
            />
          )}
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
            <p className="text-xs text-gray-500">Work industry</p>
            <p className="text-xs">{work_industry}</p>
          </div>
        </div>
      </Link>
    );
  });
};

export default TalkToMentorSlider;
