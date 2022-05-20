import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import TableHeaderLoader from "../common/TableHeaderLoader";
import axiosInstance from "../../../api/axiosInstance";
// import {
//   MdPersonOutline,
//   MdOutlinePlace,
//   MdOutlineDateRange,
// } from "react-icons/md";
// import { TiContacts } from "react-icons/ti";

const ContactUsDetailModal = ({ detailModal, setDetailModal, userSlug }) => {
  const [getAllUsersInfo, setGetAllUsersInfo] = useState({});
  //   const [tableHeaderLoader, setTableHeaderLoader] = useState(true);
  const messageHeight = useRef("");
  //   console.log(messageHeight.current.getBoundingClientRect());
  const totalHeight = messageHeight.current.clientHeight;

  // getting the individual data for the details
  const getAllInfos = (signal) => {
    axiosInstance
      .get(`/settings/contact-us-update/${userSlug}/`, { signal })
      .then((res) => {
        setGetAllUsersInfo(res.data);
        // setTableHeaderLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        // setTableHeaderLoader(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllInfos(signal);
    return () => controller.abort();
  }, []);

  const { country, created, f_name, message, phone, phone_code } =
    getAllUsersInfo;

  console.log(totalHeight);

  return (
    <>
      {" "}
      <div className="fixed top-0 bottom-0 left-0 right-0  overflow-y-auto z-50">
        <div
          onClick={() => {
            setDetailModal(!detailModal);
          }}
          className="fixed top-0 bottom-0 left-0 right-0  bg-black bg-opacity-25 "
        ></div>
        <div className="mx-5">
          <motion.div
            animate={{ y: 150 }}
            className="max-w-xl w-full mx-auto relative  bg-white shadow-lg rounded-lg mb-10"
          >
            <div>
              <div className=" w-full border-b border-gray-300 py-3 md:flex md:space-y-0 space-y-4 md:justify-between">
                <div className="w-full flex flex-col  items-center mx-auto">
                  {/* header  */}
                  <div className="flex items-center space-x-1 px-10 border-b border-gray-300 pb-4 text-lg font-semibold uppercase relative tracking-wide w-full text-gray-700 ">
                    <span>
                      <span>ALL CONTACT US DETAILS</span>
                    </span>
                    {/* <div>{tableHeaderLoader && <TableHeaderLoader />}</div> */}
                  </div>

                  <div className="w-full space-y-4 mb-4 px-8 overflow-hidden box-border mt-5">
                    <div className="w-full flex items-start box-border">
                      <span className="flex items-center text-base text-gray-500 font-semibold w-48 mr-2">
                        {/* <MdPersonOutline className="w-5 h-5 text-teal-500 mr-3" /> */}
                        Name:
                      </span>
                      <div className=" w-full h-auto text-gray-500 text-sm font-semibold  box-border">
                        {!f_name ? "N/A" : f_name}
                      </div>
                    </div>
                    <div className="w-full flex items-start box-border">
                      <span className="flex items-center text-base text-gray-500 font-semibold w-48 mr-2">
                        {/* <TiContacts className="w-5 h-5 text-teal-500 mr-3" /> */}
                        Country :
                      </span>
                      <div className="w-full h-auto text-gray-500 text-sm font-semibold box-border ">
                        {!country ? "N/A" : country}
                      </div>
                    </div>
                    <div className="w-full flex items-start box-border">
                      <span className="flex items-center text-base text-gray-500 font-semibold w-48 mr-2">
                        {/* <MdOutlinePlace className="w-5 h-5 text-teal-500 mr-3" /> */}
                        Phone :
                      </span>
                      <div className="w-full h-auto text-gray-500 text-sm font-semibold box-border">
                        {`${!phone_code ? "" : phone_code}, ${
                          !phone ? "" : phone
                        }`}
                      </div>
                    </div>
                    <div className="w-full flex items-start box-border">
                      <span className="flex items-center text-base text-gray-500 font-semibold w-48 mr-2">
                        {/* <MdOutlineDateRange className="w-5 h-5 text-teal-500 mr-3" /> */}
                        Created :
                      </span>
                      <div className="w-full h-auto text-gray-500 text-sm font-semibold box-border ">
                        {!created ? "N/A" : created.split("T")[0]}
                      </div>
                    </div>
                    <div className="w-full flex items-start box-border">
                      <span className="flex items-center text-base text-gray-500 font-semibold w-48 mr-2">
                        {/* <MdOutlineDateRange className="w-5 h-5 text-teal-500 mr-3" /> */}
                        Message :
                      </span>
                      <div
                        className={`w-full h-auto text-gray-500 text-sm font-semibold box-border overflow-y-auto`}
                        style={{
                          height:
                            totalHeight && totalHeight > 50
                              ? "overflow-y-auto"
                              : "",
                        }}
                        ref={messageHeight}
                      >
                        {!message ? "N/A" : message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUsDetailModal;
