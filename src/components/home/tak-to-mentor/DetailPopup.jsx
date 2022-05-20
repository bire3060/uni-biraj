import React from "react";
import emailImg from "../../../assets/images/icons/email.svg";
import "./DetailPopup.css";

const DetailPopup = ({ popup, popupFxn, detail }) => {
  const { details, email, image, study_at, work_industry, name } = detail;
  return (
    <>
      <div
        className="fixed inset-0 min-h-screen overflow-auto w-full md:px-0 px-8"
        style={{ zIndex: 1 }}
      >
        <div
          className="bg-black opacity-60 w-full h-full fixed top-0 right-0"
          style={{
            zIndex: "-1",
          }}
          onClick={() => popupFxn(!popup)}
        ></div>
        <div
          className="info-container bg-white w-full flex flex-col justify-center max-w-lg m-auto py-2 rounded-2xl z-30 mt-10 "
          // style={{ height: 780 }}
        >
          <div className="flex justify-between items-center px-3 border-b-2 pb-2 mb-1 border-gray-300">
            <div className="font-bold text-xl text-gray-700 tracking-wide">
              Details
            </div>
            <button
              className="bg-gray-800 rounded-full text-gray-100 md:h-10 h-8 w-8 md:w-10 flex items-center justify-center"
              onClick={() => popupFxn(!popup)}
            >
              X
            </button>
          </div>
          <div className="h-full overflow-y-auto sbar mr-2">
            <div className="p-4">
              <div>
                <div className=" rounded-lg overflow-hidden">
                  <div>
                    <img
                      className="w-full h-72 overflow-hidden bg-cover object-cover"
                      src={image}
                      alt={name}
                    />
                  </div>
                  <div className="p-3">
                    <div className="">
                      <div className="font-bold text-xl text-gray-700 ">
                        {name}
                      </div>
                      <div className="flex space-x-2 cursor-pointer mt-3">
                        <img src={emailImg} alt="" width="20" />
                        <span className="md:text-sm text-xs text-gray-500">
                          {email}
                        </span>
                      </div>
                    </div>
                    <div className=" py-1 grid grid-cols-2 gap-2 mt-2 text-left">
                      <div className="col-span-1">
                        <p className="font-semibold text-gray-600 md:text-md text-sm">
                          Studied At
                        </p>
                        <p className="md:text-sm text-xs text-gray-500">
                          {study_at}
                        </p>
                      </div>
                      <div className="col-span-1">
                        <p className="font-semibold text-gray-600 md:text-md text-sm">
                          Work industry
                        </p>
                        <p className="md:text-sm text-xs text-gray-500">
                          {work_industry}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="font-semibold text-gray-600 md:text-md text-sm">
                        Description:
                      </div>
                      <div className="md:text-sm text-xs text-gray-400">
                        {details}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-500">{details}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPopup;
