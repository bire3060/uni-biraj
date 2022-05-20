import React from "react";
import ButtonLoader from "./ButtonLoader";

const SaveButton = ({ buttonLoader, text }) => {
  return (
    <>
      <button
        className={`md:w-32 flex items-center justify-center  relative rounded-md border-2 h-12 w-full focus:border-gray-300 bg-pink4 hover:bg-pink5 transition-all duration-300 text-center`}
        type="submit"
      >
        {!buttonLoader && (
          <div className="font-semibold uppercase text-white tracking-wide text-lg">
            {text}
          </div>
        )}
        {buttonLoader && <ButtonLoader />}
      </button>
    </>
  );
};

export default SaveButton;
