import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 120),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  // setting the 5 equals values

  // checking for min value
  const handleMinRangeChange = (e) => {
    const value = Math.min(+e.target.value, maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };

  // checking for max value
  const handleMaxRangeChange = (e) => {
    const value = Math.max(+e.target.value, minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        step="10000"
        onChange={(event) => handleMinRangeChange(event)}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 120 && "5" }}
        value={minVal}
      />
      <input
        type="range"
        min={min}
        max={max}
        step="10000"
        onChange={(event) => handleMaxRangeChange(event)}
        className="thumb thumb--right"
        value={maxVal}
      />
      <div className="slider__part">
        <div className="part1" />
        <div className="part2" />
        <div className="part3" />
        <div className="part4" />
        <div className="part5" />
      </div>

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range " />
        <div className="flex w-full absolute">
          <div className="slider__left-value">0</div>
          <div className="slider__left2-value">50k</div>
          <div className="slider__mid-value">100k</div>
          <div className="slider__right2-value">150k</div>
          <div className="slider__right-value">200k</div>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
