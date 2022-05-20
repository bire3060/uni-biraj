import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/action";
import "./Study.css";
const StudyMode = () => {
  const [col, setcol] = useState("Both");
  const dispatch = useDispatch();
  const { study_mode_started } = useSelector((state) => state.getStarted);
  const handleMode = (mode) => {
    setcol(mode);
    let sl = "";
    if (mode === "Both") {
      sl = ["BO"];
    } else if (mode === "On Campus") {
      sl = ["OC"];
    } else {
      sl = ["ON"];
    }
    dispatch(actions.add_study_mode(sl));
  };
  useEffect(() => {
    let val = ["BO", "OC", "ON"];
    dispatch(actions.add_study_mode(val));
    if (study_mode_started !== "") {
      if (study_mode_started === "BO") {
        setcol("Both");
      } else if (study_mode_started === "OC") {
        setcol("On Campus");
      } else {
        setcol("Online");
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="text-lg font-semibold">STUDY MODE</div>
      <div className="radio mt-2 ml-1">
        <div
          onClick={() => {
            handleMode("Both");
          }}
          className={col === "Both" ? "radio__label active" : "radio__label"}
        >
          Both
        </div>
        <div
          onClick={() => {
            handleMode("On Campus");
          }}
          className={
            col === "On Campus" ? "radio__label active" : "radio__label"
          }
        >
          On Campus
        </div>
        <div
          onClick={() => {
            handleMode("Online");
          }}
          className={col === "Online" ? "radio__label active" : "radio__label"}
        >
          Online
        </div>
      </div>
    </div>
  );
};
export default StudyMode;
