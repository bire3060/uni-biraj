import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/action";
const StudyLoad = () => {
  const [col, setcol] = useState("Both");
  const dispatch = useDispatch();
  const { study_load_started } = useSelector((state) => state.getStarted);
  const handleLoad = (load) => {
    setcol(load);
    let sl = [];
    if (load === "Both") {
      sl = ["BO"];
    } else if (load === "Full Time") {
      sl = ["FT"];
    } else {
      sl = ["PT"];
    }
    dispatch(actions.add_study_load(sl));
  };
  useEffect(() => {
    let val = ["BO", "FT", "PT"];
    dispatch(actions.add_study_load(val));
    if (study_load_started !== "") {
      if (study_load_started === "BO") {
        setcol("Both");
      } else if (study_load_started === "FT") {
        setcol("Full Time");
      } else {
        setcol("Part Time");
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="text-lg font-semibold">STYDY LOAD</div>
      <div className="radio mt-2 ml-1">
        <div
          onClick={() => {
            handleLoad("Both");
          }}
          className={col === "Both" ? "radio__label active" : "radio__label"}
        >
          Both
        </div>
        <div
          onClick={() => {
            handleLoad("Full Time");
          }}
          className={
            col === "Full Time" ? "radio__label active" : "radio__label"
          }
        >
          Full Time
        </div>
        <div
          onClick={() => {
            handleLoad("Part Time");
          }}
          className={
            col === "Part Time" ? "radio__label active" : "radio__label"
          }
        >
          Part Time
        </div>
      </div>
    </div>
  );
};
export default StudyLoad;
