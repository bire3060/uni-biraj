import React from "react";
import { useState, useEffect } from "react";
import Documents from "./Documents";
import Education from "./Education";
import PersonalForm from "./PersonalForm";
import "./Details.css";
// import { useDispatch } from "react-redux"

const Details = () => {
  const [value, setValue] = useState(0);

  const buttons = [
    {
      id: 1,
      icon: "",
      title: "Personal",
    },
    {
      id: 2,
      icon: "",
      title: "Education",
    },
    {
      id: 3,
      icon: "",
      title: "Documents",
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > Details"}</div>
          </div>
        </div>

        {/* middle contents */}
        <div className="mt-5 pb-8">
          <div
            className="mx-auto relative flex justify-between items-center"
            style={{ width: "98%" }}
          >
            <div className="flex  flex-row items-center">
              {buttons.map((button, index) => {
                const { icon, title, id } = button;
                return (
                  <div key={id}>
                    <div
                      className={
                        index === value
                          ? `bg-blue3 cursor-pointer md:px-14 px-5 block rounded-tr-2xl p-2 text-gray-100 text-sm transition-all duration-500`
                          : `bg-white cursor-pointer text-blue3 md:px-14 px-5 block rounded-tr-2xl p-2 text-sm transition-all duration-500`
                      }
                      onClick={() => setValue(index)}
                    >
                      <span>{icon}</span>
                      <span className="font-medium tracking-wide">{title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="mx-auto bg-white p-3 sm:p-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border shadow-xl relative border-gray-100 "
            style={{ width: "98%" }}
          >
            <div>
              {value === 0 && <PersonalForm setValue={setValue} />}
              {value === 1 && <Education setValue={setValue} />}
              {value === 2 && <Documents />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
