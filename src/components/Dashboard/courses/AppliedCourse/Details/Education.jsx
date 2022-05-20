import { useSelector } from "react-redux";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
const Education = () => {
  const { academic, english_proficiency, academic_error } = useSelector(
    (state) => state.studentDetails
  );

  return (
    <>
      <form className="flex justify-between mt-10">
        <div className="flex justify-center absolute top-0 right-5"> </div>
        <div className="w-72 shadow-lg">
          <p className="text-blue3 text-lg font-bold pl-3">Academics</p>
        </div>
        <div></div>
      </form>
      <div className="mt-4">
        {academic_error && <div className="text-pink4">{academic_error}</div>}
        {academic.map((inputField, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2  p-3 ${
                index % 2 === 0 ? "" : "bg-pink-50"
              }`}
            >
              <div className="col-span-1">
                <div className="font-semibold text-sm">Degree Title</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.title}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Degree Level</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.degree_level}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Study Area</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.study_area}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Start Year</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.start_year}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">End Year</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.end_year}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Academic Score</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.score}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Score Type</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.score_type}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Institute</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.institute}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Institute Country</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.institute_country}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* English proficiency starts here */}
      <div className="flex justify-between mt-10">
        <div className="w-72 shadow-lg">
          <p className="text-blue3 text-lg font-bold pl-3">
            English Proficiency
          </p>
        </div>
        <div></div>
      </div>
      <div className="mt-4">
        {english_proficiency.map((inputField, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2  p-3 ${
                index % 2 === 0 ? "" : "bg-pink-50"
              }`}
            >
              <div className="col-span-1">
                <div className="font-semibold text-sm">English Test</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.name}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Listening</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.listening}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Speaking</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.speaking}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Writing</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.writing}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Reading</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.reading}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Overall Score</div>
                <div className=" shadow-md p-2 mb-2 rounded border border-primary">
                  {inputField.overall_score}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Education;
