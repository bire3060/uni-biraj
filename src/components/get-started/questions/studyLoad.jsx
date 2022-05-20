import React from "react";
import Header from "../common/header";
// import Proceed from "../common/proceed";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_GET_STARTED_FILTER } from "../../../redux/actions/getStartedType";
import { REMOVE_HOME_COURSES_FILTER } from "../../../redux/actions/home_page_course_filter";
const degrees = [
  { title: "Full Time", val: "FT" },
  { title: "Part Time", val: "PT" },
  { title: "Both", val: "BO" },
];

const StudyLoad = ({ setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const setStudyLoad = (data) => {
    dispatch({ type: REMOVE_HOME_COURSES_FILTER });
    dispatch({
      type: ADD_GET_STARTED_FILTER,
      payload: data.val,
      property: "study_load_started",
    });
    setStep(2);
    history.push("/courses");
  };
  const scrollToTop = () => window.scrollTo(0, 0);
  return (
    <div className="space-y-10  py-6 rounded-lg ">
      <Header text="Load of your study?" />
      <div className="flex space-x-3 justify-center text-pink4">
        {degrees.map((degree, index) => (
          <button
            key={index}
            className={`getStartedBorder w-28 w mt-6 py-6 rounded-lg border-2 cursor-pointer bg-gray1 border-gray-200 transition-all duration-300 `}
            onClick={() => {
              setStudyLoad(degree);
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
      {/* <Proceed setActive={() => history.push("/courses")} step={6} /> */}
    </div>
  );
};

export default StudyLoad;
