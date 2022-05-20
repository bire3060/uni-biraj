import React from "react";

function EduDetail({ HandelChange, input, error, category, degreeLevels }) {
  const { degree, course_cat, aca_score, scoretype, eng_test, overall_score } =
    input;
  return (
    <div>
      <div className="flex flex-col space-y-2">
        {/* first name  */}
        <div className="flex-1 flex flex-col ">
          <label
            htmlFor=""
            className="text-semibold mb-1 text-sm text-gray-700 ml-1"
          >
            Degree Level:
          </label>
          <div>
            <select
              name="degree"
              value={degree}
              onChange={(e) => {
                HandelChange(e);
              }}
              className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
            >
              <option hidden>Select Degree Level</option>
              {Array.isArray(degreeLevels) &&
                degreeLevels.map((data, index) => {
                  return (
                    <option key={index} value={data.label}>
                      {data.label}
                    </option>
                  );
                })}
            </select>
            {error.degree && (
              <p className="text-sm pl-2 text-red-500">{error.degree}</p>
            )}
          </div>
          {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
        </div>
        {/* lname  */}
        <div className="flex-1 flex flex-col ">
          <label
            htmlFor=""
            className="text-semibold mb-1 text-sm text-gray-700 ml-1"
          >
            Course Category:
          </label>
          <div>
            <select
              name="course_cat"
              value={course_cat}
              onChange={(e) => {
                HandelChange(e);
              }}
              className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
            >
              <option hidden>Select Category</option>
              {Array.isArray(category) &&
                category.map((data, index) => {
                  return (
                    <option key={index} value={data.title}>
                      {data.title}
                    </option>
                  );
                })}
            </select>
            {error.course_cat && (
              <p className="text-sm pl-2 text-red-500">{error.course_cat}</p>
            )}
          </div>
          {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
        </div>

        {/* Academic Score  */}
        <div className="flex items-center justify-between space-x-4">
          {/* Academic Score  */}
          <div className="flex-1 flex flex-col ">
            <label
              htmlFor=""
              className="text-semibold mb-1 text-sm text-gray-700 ml-1"
            >
              Academic Score:
            </label>
            <div>
              <input
                name="aca_score"
                value={aca_score}
                onChange={(e) => {
                  HandelChange(e);
                }}
                type="number"
                placeholder="Academic Score"
                spellCheck="false"
                className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
              />
              {error.aca_score && (
                <p className="text-sm pl-2 text-red-500">{error.aca_score}</p>
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
              Score Type:
            </label>
            <div>
              <select
                name="scoretype"
                value={scoretype}
                onChange={(e) => {
                  HandelChange(e);
                }}
                className="text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1"
              >
                <option hidden></option>
                <option value="PE">PER</option>
                <option value="GPA">GPA</option>
              </select>
              {error.scoretype && (
                <p className="text-sm pl-2 text-red-500">{error.scoretype}</p>
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
        <div className="flex items-center justify-between space-x-4">
          {/* English Test:  */}
          <div className="flex-1 flex flex-col ">
            <label
              htmlFor=""
              className="text-semibold mb-1 text-sm text-gray-700 ml-1"
            >
              English Test:
            </label>
            <div>
              <select
                name="eng_test"
                value={eng_test}
                onChange={(e) => {
                  HandelChange(e);
                }}
                className="text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1"
              >
                <option hidden></option>
                <option value="IELTS">IELTS</option>
                <option value="PTE">PTE</option>
              </select>
              {error.eng_test && (
                <p className="text-sm pl-2 text-red-500">{error.eng_test}</p>
              )}
            </div>
            {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
          </div>
          {/* Overall Score:  */}
          <div className="flex-1 flex flex-col ">
            <label
              htmlFor=""
              className="text-semibold mb-1 text-sm text-gray-700 ml-1"
            >
              Overall Score:
            </label>
            <div>
              <input
                name="overall_score"
                value={overall_score}
                onChange={(e) => {
                  HandelChange(e);
                }}
                type="number"
                placeholder="Overall Score:"
                spellCheck="false"
                className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
              />
              {error.overall_score && (
                <p className="text-sm pl-2 text-red-500">
                  {error.overall_score}
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

export default EduDetail;
