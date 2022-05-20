import React, { useRef } from "react";
import closeIcon from "../../assets/images/Login/delete.svg";
import { UploadEditDownloadButton } from "./buttons";
export const SimpleInputField = ({
  value,
  handleChange,
  type,
  placeholder,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        spellCheck="false"
        className={`${
          value && value.trim() !== "" ? "bg-pink1" : "bg-gray2"
        } text-sm w-full placeholder-gray-500 p-3 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
      />
    </div>
  );
};

export const SimpleSelectField = ({
  filter,
  value,
  handleChange,
  options,
  title,
}) => {
  return (
    <div className="simple-select w-full">
      <select
        value={value}
        onChange={handleChange}
        className={`text-sm appearance-none pr-10 w-full placeholder-gray-500 p-3 border rounded-lg focus:bg-pink1 ${
          filter ? "" : Boolean(value) ? "bg-pink1" : "bg-gray2"
        }`}
      >
        <option hidden>{title}</option>
        {options.map((option, index) => {
          const { label, value } = option;

          return (
            <option key={index} value={value} disabled={!Boolean(value)}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const SimpleCheckbox = ({ checked, handleChange, label, id ,idMain}) => {

  return (
    <div className="flex space-x-2 text-sm">
      <div>
        <input
          checked={checked}
          id={id}
          onChange={handleChange}
          type="checkbox"
          className="customized-checkbox cursor-pointer"
        />
      </div>
      <label
        htmlFor={id}
        className={`cursor-pointer ${checked ? "text-pink4" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export const SearchField = ({
  placeholder = "Search...",
  value,
  handleChange,
  handleSearch,
}) => {
  return (
    <div className="relative w-60 md:w-80 lg:w-96">
      <input
        type="text"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-full border-2 py-2 pl-5 pr-16 w-full focus:border-gray-300 transition-all duration-300"
        placeholder={placeholder}
      />
      {value && (
        <img
          src={closeIcon}
          alt="close icon"
          className="w-2 absolute right-12 top-1/2 cursor-pointer"
          style={{ transform: "translateY(-50%)" }}
          onClick={() => handleChange("")}
        />
      )}

      <button
        className="absolute bg-pink4 text-white top-1/2 h-9 w-9 rounded-full right-1 cursor-pointer flex items-center justify-center"
        style={{ transform: "translateY(-50%)" }}
        onClick={handleSearch}
      >
        <svg viewBox="0 0 512.005 512.005" fill="currentColor" className="w-5">
          <g>
            <g>
              <path
                d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export const AdvancedInputField = ({ label, placeholder }) => {
  return (
    <div className="relative rounded-2xl border border-gray4 bg-gray2 py-2.5 px-2 flex flex-col">
      <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full placeholder-gray-500 bg-gray2 px-3 pt-4 text-sm"
        spellCheck="false"
      />
    </div>
  );
};
export const AdvancedDatalistInputField = ({
  label,
  placeholder,
  list,
  values,
}) => {
  return (
    <div className="relative rounded-2xl border border-gray4 bg-gray2 py-2.5 px-2 flex flex-col">
      <label htmlFor="ice-cream-choice">Choose a flavor:</label>
      <input
        list="ice-cream-flavors"
        id="ice-cream-choice"
        name="ice-cream-choice"
      />

      <datalist id="ice-cream-flavors">
        <option value="Chocolate" />
        <option value="Coconut" />
        <option value="Mint" />
        <option value="Strawberry" />
        <option value="Vanilla" />
      </datalist>
    </div>
  );
};

export const AdvancedSelectField = ({ label, options, handleChange }) => {
  return (
    <div className="advanced-select relative bg-gray2 py-2.5 rounded-xl border border-gray4">
      <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
        {label}
      </label>
      <select
        className="w-full rounded-xl appearance-none px-3 text-sm bg-gray2 pt-5"
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option, index) => {
          const { value, label } = option;
          return (
            <option
              key={index}
              value={value}
              className="bg-gray2 hover:bg-red-400 py-2"
            >
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const SimpleFileSelectField = ({ file, handleImageChange }) => {
  const selectedFile = useRef();

  const handleUploadButtonClick = () => {
    selectedFile.current.click();
  };
  return (
    <div className="h-full">
      <input
        type="file"
        className="hidden"
        ref={selectedFile}
        onChange={handleImageChange}
      />
      <div className="h-full flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {file ? file.name : "Upload image"}
        </div>
        <UploadEditDownloadButton
          type="Upload"
          handleClick={handleUploadButtonClick}
        />
      </div>
    </div>
  );
};
