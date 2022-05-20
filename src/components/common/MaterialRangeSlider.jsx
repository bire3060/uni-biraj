import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
// import { currentButtonReset } from "../../redux/actions/currentButtonReset";
// import axiosInstance from "../../api/axiosInstance";
import { rangeSliderHandler } from "../../redux/actions/rangeSliderHandler";
import { currentButtonReset } from "../../redux/actions/currentButtonReset";
// import axiosInstance from "../../api/axiosInstance";

const MaterialRangeSlider = () => {
  // const { minMaxInputs } = useSelector((state) => state.multiRangeSlider);

  const dispatch = useDispatch();

  // for the initial value and reset value updating with the api
  React.useEffect(() => {
    // dispatch the value
    // dispatch(currentButtonReset(1));
    dispatch(rangeSliderHandler([0, 1000000]));
  }, []);

  const handleChange = (event, newValue) => {
    // dispatch the value
    dispatch(currentButtonReset(1));
    dispatch(rangeSliderHandler(newValue));
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 200000,
      label: "200K",
    },
    {
      value: 400000,
      label: "400K",
    },
    {
      value: 600000,
      label: "600K",
    },
    {
      value: 800000,
      label: "800K",
    },
    {
      value: 1000000,
      label: "1000K",
    },
  ];

  return (
    <>
      <div className="mt-4 mb-2 font-semibold text-gray-900 text-lg">
        FEE PER YEAR
      </div>
      <div style={{ width: 200, marginLeft: 12 }}>
        <Slider
          getAriaLabel={() => "Courses Range"}
          // value={minMaxInputs}
          style={{ color: "#EF0F50" }}
          onChangeCommitted={handleChange}
          // valueLabelDisplay="auto"
          max={1000000}
          aria-label="Small"
          min={0}
          step={20}
          marks={marks}
          valueLabelDisplay="auto"
          color="secondary"
        />
      </div>
    </>
  );
};

export default MaterialRangeSlider;
