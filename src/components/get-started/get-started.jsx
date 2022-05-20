import React, { useState } from "react";
import "../../assets/css/get-started.css";
import LightNavbar from "../home/static/navbar";
import Country from "./questions/country";
import Degree from "./questions/degree";
import MajorPersue from "./questions/major-persue";
import Mode from "./questions/Mode";
import Duration from "./questions/duration";
import StudyLoad from "./questions/studyLoad";

const GetStarted = ({ loggedIn, role }) => {
  const [active, setActive] = useState("country");
  const [step, setStep] = useState(2);
  return (
    <>
      <div>{active === "country" && <Country setActive={setActive} />}</div>
      {active !== "country" && (
        <div className="uni-homepage min-h-screen relative z-10 bg-gray1">
          <LightNavbar loggedIn={loggedIn} role={role} />
          <div className=" px-4 py-10 md:py-16 lg:py-20 md:px-10 lg:px-24">
            <div className="rounded-lg border shadow-xl max-w-2xl w-full mx-auto bg-white">
              {/* progress  */}
              <div className="mt-10 flex justify-center">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">{active} </span>
                  {/* bar  */}
                  <div className="w-96 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="bg-pink4 py-1 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${step * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{step}/5</span>
                </div>
              </div>
              {active === "degree" && (
                <div className="flex  flex-col gap-4">
                  <Degree setActive={setActive} setStep={setStep} />
                </div>
              )}
              {active === "studyMode" && (
                <Mode setStep={setStep} setActive={setActive} />
              )}
              {active === "majorPersue" && (
                <MajorPersue setActive={setActive} />
              )}
              {active === "studyLoad" && (
                <StudyLoad setStep={setStep} setActive={setActive} />
              )}
              {active === "duration" && (
                <Duration setStep={setStep} setActive={setActive} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetStarted;
