import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSE_STUDY_LOAD_ADD,
  COURSE_STUDY_MODE_ADD,
} from "../../../../redux/actions/actionsTypes";

const CoursesStudyLoads = () => {
  const dispatch = useDispatch();
  const [load, setload] = useState("FT");
  const [loadToggle, setLoadToggle] = useState(false);
  const [mode, setmode] = useState("ON");
  const [modeToggle, setModeToggle] = useState(false);
  const { study_mode, study_load } = useSelector((state) => state.course);
  useEffect(() => {
    if (study_load) {
      dispatch({
        type: COURSE_STUDY_LOAD_ADD,
        payload: study_load,
      });
      setload(study_load);
    } else {
      dispatch({
        type: COURSE_STUDY_LOAD_ADD,
        payload: load,
      });
    }
    if (study_mode) {
      dispatch({
        type: COURSE_STUDY_MODE_ADD,
        payload: study_mode,
      });
      setmode(study_mode);
    } else {
      dispatch({
        type: COURSE_STUDY_MODE_ADD,
        payload: mode,
      });
    }
    // eslint-disable-next-line
  }, [load, mode]);
  return (
    <div className="w-11/12 mx-auto mt-10 grid sm:grid-cols-2 grid-cols-1 gap-10">
      <div className="border col-span-1 border-blue-400 shadow-lg">
        <div className="w-full font-bold text-white bg-blue3 uppercase pl-5">
          Study Loads
        </div>
        <div className="flex space-x-4 p-4">
          <div className="flex">Load Type</div>
          <div className="flex-1 relative">
            <div
              className="flex justify-between border border-blue-400 px-3 rounded-full cursor-pointer items-center shadow-lg z-20"
              onClick={() => setLoadToggle((loadToggle) => !loadToggle)}
            >
              <p className="flex-1">
                {load === "FT" && "Full Time"}
                {load === "PT" && "Part Time"}
                {load === "BO" && "Full/Part Time"}
              </p>
              <div className="">
                <div className="text-white bg-blue-400 rounded-full p-0.5">
                  <svg
                    className="w-4 h-4 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {loadToggle && (
              <div className="absolute inset-x-0 -bottom-30 w-full flex flex-col bg-white text-black z-0 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer">
                <div
                  className="w-full px-5"
                  onClick={() => {
                    setload("FT");
                    dispatch({
                      type: COURSE_STUDY_LOAD_ADD,
                      payload: "FT",
                    });
                    setLoadToggle(false);
                  }}
                >
                  Full TIme
                </div>
                <div
                  className="w-full px-5"
                  onClick={() => {
                    setload("PT");
                    dispatch({
                      type: COURSE_STUDY_LOAD_ADD,
                      payload: "PT",
                    });
                    setLoadToggle(false);
                  }}
                >
                  Part TIme
                </div>
                <div
                  className="w-full px-5"
                  onClick={() => {
                    setload("BO");
                    dispatch({
                      type: COURSE_STUDY_LOAD_ADD,
                      payload: "BO",
                    });
                    setLoadToggle(false);
                  }}
                >
                  Both
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border col-span-1 border-blue-400 shadow-lg">
        <div className="w-full font-bold text-white bg-blue3 uppercase pl-5">
          Study Modes
        </div>
        <div className="flex space-x-4 p-4">
          <div className="flex">Mode Type</div>
          <div className="flex-1 relative">
            <div
              className="flex justify-between border border-blue-400 px-3 rounded-full cursor-pointer items-center shadow-lg z-20"
              onClick={() => setModeToggle((modeToggle) => !modeToggle)}
            >
              <p className="flex-1">
                {mode === "BO" && "Online/On Campus"}
                {mode === "ON" && "Online"}
                {mode === "OC" && "On Campus"}
              </p>
              <div className="">
                <div className="text-white bg-blue-400 rounded-full p-0.5">
                  <svg
                    className="w-4 h-4 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {modeToggle && (
              <div className="absolute inset-x-0 -bottom-30 w-full flex flex-col bg-white text-black z-0 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer">
                <div
                  className="w-full px-5"
                  onClick={() => {
                    dispatch({
                      type: COURSE_STUDY_MODE_ADD,
                      payload: "ON",
                    });
                    setmode("ON");
                    setModeToggle(false);
                  }}
                >
                  Online
                </div>
                <div
                  className="w-full px-5"
                  onClick={() => {
                    dispatch({
                      type: COURSE_STUDY_MODE_ADD,
                      payload: "OC",
                    });
                    setmode("OC");
                    setModeToggle(false);
                  }}
                >
                  On Campus
                </div>
                <div
                  className="w-full px-5"
                  onClick={() => {
                    dispatch({
                      type: COURSE_STUDY_MODE_ADD,
                      payload: "BO",
                    });
                    setmode("BO");
                    setModeToggle(false);
                  }}
                >
                  Both
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesStudyLoads;
