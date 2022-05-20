import React from "react";

function Otherdetail({ HandelChange, input, error }) {
  const { nationality, preferred_country, preferred_intake } = input;
  return (
    <div>
      <div className="flex flex-col space-y-2">
        {/* first name  */}
        <div className="flex-1 flex flex-col ">
          <label
            htmlFor=""
            className="text-semibold mb-1 text-sm text-gray-700 ml-1"
          >
            Nationality:
          </label>
          <div>
            <input
              value={nationality}
              name="nationality"
              onChange={(e) => {
                HandelChange(e);
              }}
              type="text"
              placeholder="Nationality"
              spellCheck="false"
              className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
            />
            {error.nationality && (
              <p className="text-sm pl-2 text-red-500">{error.nationality}</p>
            )}
          </div>
          {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
        </div>

        {/* Preferred Intake  */}
        <div className="flex items-center justify-between space-x-4">
          {/* Preferred Intake  */}
          <div className="flex-1 flex flex-col ">
            <label
              htmlFor=""
              className="text-semibold mb-1 text-sm text-gray-700 ml-1"
            >
              Preferred Country:
            </label>
            <div>
              <input
                onChange={(e) => {
                  HandelChange(e);
                }}
                name="preferred_country"
                value={preferred_country}
                placeholder="Preferred country"
                className="text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1"
              />
              {error.preferred_country && (
                <p className="text-sm pl-2 text-red-500">
                  {error.preferred_country}
                </p>
              )}
            </div>
            {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
          </div>
          {/* Score Type  */}
          <div className="flex-1 flex flex-col ">
            <label
              htmlFor=""
              className="text-semibold mb-1 text-sm text-gray-700 ml-1"
            >
              Preferred Intake:
            </label>
            <div>
              <input
                onChange={(e) => {
                  HandelChange(e);
                }}
                type="date"
                name="preferred_intake"
                value={preferred_intake}
                className="text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1"
              />
              {error.preferred_intake && (
                <p className="text-sm pl-2 text-red-500">
                  {error.preferred_intake}
                </p>
              )}
            </div>
            {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otherdetail;
