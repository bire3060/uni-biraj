import React from "react";
import IconManager from "./IconManager";

export const AddButton = () => {
  return (
    <div className="bg-pink3 text-sm font-semibold py-1 text-white flex space-x-1 items-center px-2 rounded-md cursor-pointer hover:bg-pink4">
      <div>
        <IconManager icon="Add" className="w-4 h-4" />
      </div>
      <div>Add</div>
    </div>
  );
};

export const SaveButton = ({ handleClick, update }) => {
  return (
    <button
      className="bg-pink3 text-sm font-semibold py-1 text-white flex space-x-1 items-center px-2 rounded-md cursor-pointer hover:bg-pink4"
      onClick={handleClick}
    >
      <div>
        <IconManager icon="Save" className="w-4 h-4" />
      </div>
      <div>{update ? update : "SAVE"}</div>
    </button>
  );
};

export const UploadEditDownloadButton = ({ type, handleClick }) => {
  return (
    <div
      className={`text-sm font-semibold py-1 text-white flex space-x-1 items-center px-3 rounded-full cursor-pointer ${
        type === "Download"
          ? "bg-blue-800 hover:bg-blue-900"
          : "bg-pink3 hover:bg-pink4"
      }`}
      onClick={handleClick}
    >
      <div>
        <IconManager icon={type} className="w-4 h-4" />
      </div>
      <div>{type}</div>
    </div>
  );
};
