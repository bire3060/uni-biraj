import React from "react";

function FloatingBar({
  duration,
  international_fee,
  domestic_fee,
  study_mode,
  study_load,
}) {
  return (
    <div className="hidden sm:block absolute  sm:-bottom-24 lg:-bottom-14 w-full p-4 md:px-8 lg:px-16 2xl:px-24 z-0">
      <div className="bg-white rounded-xl shadow-md p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* duration  */}
        <div className="flex space-x-2">
          <span className="mt-1">
            <svg
              className="w-8 h-8 text-blue3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-gray-600">
              {/* {duration === "12" && "1 Year"}
              {duration === "24" && "2 Years"}
              {duration === "36" && "3 Years"}
              {duration === "48" && "4 Years"}
              {duration === "48,100" && "4+ Years"} */}
              {!duration ||
              duration === undefined ||
              duration === "nan" ||
              duration === "0"
                ? "N/A"
                : `${
                    duration >= 12
                      ? (duration / 12).toFixed(2) + "Years"
                      : duration + "Month"
                  }`}
            </span>
            <span className="text-pink4 text-sm">Duration</span>
          </div>
        </div>
        {/* tution fee  */}
        <div className="flex space-x-2">
          <span className="mt-1">
            <svg
              className="w-8 h-8 text-blue3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-gray-600">
              $ {international_fee}/{domestic_fee}
            </span>
            <span className="text-pink4 text-sm">Tution fee</span>
          </div>
        </div>
        {/* study load  */}
        <div className="flex space-x-2">
          <span className="mt-1">
            <svg
              className="w-8 h-8 text-blue3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </span>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-gray-600">
              {study_load === "PT" && "Part Time"}
              {study_load === "FT" && "Full Time"}
              {study_load === "BO" && "Both"}
            </span>
            <span className="text-pink4 text-sm">Study Load</span>
          </div>
        </div>
        {/* study load  */}
        <div className="flex space-x-2">
          <span className="mt-1">
            <svg
              className="w-8 h-8 text-blue3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-gray-600">
              {study_mode === "BO" && "Online/On Campus"}
              {study_mode === "ON" && "Online"}
              {study_mode === "OC" && "On Campus"}
            </span>
            <span className="text-pink4 text-sm">Study Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
