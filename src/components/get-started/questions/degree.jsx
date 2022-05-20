import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { ADD_GET_STARTED_FILTER } from "../../../redux/actions/getStartedType";
import "../../../slider/get-started-country/getStarted.css";

// import Proceed from "../common/proceed";
import Header from "../common/header";
import MajorPersue from "./major-persue";
const Degree = ({ setActive, setStep }) => {
  const dispatch = useDispatch();
  const [degrees, setDegrees] = useState([]);
  const [catId, setCatId] = useState("");
  const [degreeId, setDegreeId] = useState("");
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/courses/degree-level/list/`, { signal })
      .then((res) => {
        setDegrees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const scrollToTop = () => window.scrollTo(0, 0);
  const setDegreesLevel = (data) => {
    // dispatch({
    //   type: ADD_GET_STARTED_FILTER,
    //   payload: data.id,
    //   property: "degree_level_started",
    // });
    // setActive("majorPersue");
    setDegreeId(data.id);
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (degreeId !== "" && catId !== "") {
      dispatch({
        type: ADD_GET_STARTED_FILTER,
        payload: degreeId,
        property: "degree_level_started",
      });
      dispatch({
        type: ADD_GET_STARTED_FILTER,
        payload: catId,
        property: "category_started",
      });
      setStep((preVal) => preVal + 1);
      setActive("studyMode");
    }
    // eslint-disable-next-line
  }, [catId, degreeId]);
  return (
    <>
      <div className="space-y-10 p-6 overflow-hidden ">
        <Header text="Which Degree do you wish to pursue?" />
        <div className="grid grid-cols-4 gap-2 text-pink4 place-content-center">
          {degrees.map((degree, index) => (
            <button
              key={index}
              className={` py-3 rounded-lg border-2 cursor-pointer overflow-hidden bg-gray1 border-gray-200 transition-all duration-300 getStartedBorder`}
              onClick={() => {
                setDegreesLevel(degree);
                scrollToTop();
              }}
            >
              <div>
                <svg
                  viewBox="0 0 349.2 349.2"
                  fill="currentColor"
                  className="w-10 mx-auto"
                >
                  <g>
                    <g>
                      <path
                        d="M337.6,114.25l-139.2-68c-12-6-32.4-6-44.4,0l-142.4,68c-10,4.8-11.6,11.6-11.6,15.2c0,3.6,1.6,10,11.6,15.2l11.6,5.6v64
			c-7.2,2.8-12.4,10-12.4,18s5.2,15.2,12,18l-18,57.2h50.4l-18-57.2c7.2-2.8,12-10,12-18c0-8.4-5.2-15.2-12.4-18v-57.2l21.2,10.4
			v83.2c0,1.2,0.4,2.4,1.2,3.6c2,2.4,39.2,53.2,115.2,53.2s113.2-51.2,114.8-53.2c0.8-1.2,1.2-2.4,1.2-3.6v-82.8l47.2-23.2
			c10-4.8,11.6-11.6,11.6-15.2C348.8,125.85,347.6,119.05,337.6,114.25z M277.6,248.65c-6.4,8-40.8,46.4-103.2,46.4
			c-62.4,0-96.8-38.4-103.2-46.4v-75.6l82.8,39.6c6,2.8,14,4.4,22,4.4c8.4,0,16.4-1.6,22.4-4.8l79.2-38.8V248.65z M332,133.45
			l-48,23.6c-2,0-3.6,0.8-4.4,2.4l-86.8,42c-8.4,4.4-24.8,4.4-33.6,0l-106.8-51.2l122.8-14.4c3.6-0.4,6-3.6,5.6-6.8
			c-0.4-3.6-3.6-6-6.8-5.6l-142.4,16.8l-14.4-6.8c-3.6-1.6-4.4-3.6-4.4-3.6c0-0.4,0.8-2,4.4-3.6l142.4-68.4c4.4-2,10.4-3.2,16.4-3.2
			c6.4,0,12.8,1.2,16.8,3.2l139.2,68c3.6,1.6,4.4,3.2,4.4,4C336.4,129.85,335.2,131.85,332,133.45z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="font-bold text-center text-gray-700">
                {degree.title}
              </div>
            </button>
          ))}
        </div>
        {/* <Proceed setActive={() => setActive("highestEducationLevel")} step={2} /> */}
        {/* <Proceed setActive={() => setActive("majorPersue")} step={2} /> */}
        <MajorPersue setCatId={setCatId} />
      </div>
    </>
  );
};

export default Degree;
