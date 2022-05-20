import React from "react";

const Proceed = ({ active, setActive, step }) => {
  return (
    <div
      className={`flex justify-center ${
        active === "country"
          ? "bg-blue1 px-4 py-10 md:py-16 md:px-10 lg:px-24"
          : ""
      }`}
    >
      <div className="space-y-1">
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            setActive();
          }}
          className="proceed-button transition-all duration-300 bg-pink4 inline-block px-8 py-1.5 text-lg cursor-pointer rounded-full text-gray-50 text-center font-semibold"
        >
          Proceed
        </div>
        <div className="text-center">Step {step}</div>
      </div>
    </div>
  );
};

export default Proceed;
