import React from "react";
import { SimpleCheckbox } from "../../../common/input-field";

const FilterDropdown = ({
  index,
  header,
  expand,
  options,
  handleChange,
  handleExpand,
  noSubHeaders = false,
}) => {
  return (
    <div key={index}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => handleExpand(index)}
      >
        <div className={`mb-1 ${noSubHeaders ? "font-bold uppercase" : ""}`}>
          {header}
        </div>
        <div>
          <svg
            viewBox="0 0 240.811 240.811"
            className={`w-2.5 h-2.5 transform transition-all duration-300 ${
              expand ? "" : "-rotate-90"
            }`}
            fill="currentColor"
          >
            <g>
              <path
                d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0
		c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859
		c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div
        className="pl-4 overflow-hidden transition-all duration-300"
        style={{ height: expand ? `${options.length * 29}px` : "0" }}
      >
        {options.map((opt, i) => {
          const { checked, label } = opt;

          return (
            <div key={i} className="h-6 my-1 flex items-center">
              <SimpleCheckbox
                checked={checked}
                label={label}
                handleChange={() => handleChange(i)}
                id={`${(header + " " + label).replace(" ", "")}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(FilterDropdown);
