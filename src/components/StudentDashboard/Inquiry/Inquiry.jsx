import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import InquiryChat from "./inquiryChat";
import InquiryAdd from "./inquiryAdd";
import InquiryView from "./inquiryView";
// import userImage from "../../../assets/images/student-dashboard/userImage.jpg";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";

const StudentInquiry = () => {
  const [chatdata, setChatdata] = useState([]);
  const [msgTitle, setMessageTitle] = useState([]);
  const [loader, setLoader] = useState(true);
  const [popUp, setPopUp] = useState({
    add: false,
    view: false,
    edit: false,
  });
  const [userId, setUserId] = useState("");
  const [qstAns, setqstAns] = useState([]);
  const getAllMessages = (signal) => {
    axiosInstance
      .get(`/inquery/get-topic/`, { signal })
      .then((res) => {
        setChatdata(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  let token = localStorage.getItem("refresh");
  let decoded = jwt_decode(token);
  useEffect(() => {
    setUserId(decoded.user_id);
    const controller = new AbortController();
    const { signal } = controller;
    getAllMessages(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="h-8 w-full mb-4 bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Inquiry"}</div>
        </div>
      </div>
      <div
        className="mx-auto bg-white p-3 sm:p-4 rounded-2xl border-2 shadow-xl relative  border-gray-200 "
        style={{ width: "98%", minHeight: "80vh" }}
      >
        <div>
          <div>
            <div className="flex gap-6 border-b mb-6 justify-end">
              <button
                onClick={() => {
                  setPopUp((preval) => {
                    return {
                      ...preval,
                      add: true,
                    };
                  });
                }}
                className="bg-blue3 text-3xl font-semibold h-9  w-10 pb-1.5 flex justify-center items-center rounded-xl my-2  text-gray-50"
              >
                +
              </button>
            </div>

            {chatdata.length > 0 &&
              chatdata.map((data, index) => {
                const { title } = data;
                return (
                  <div
                    style={{ width: window.innerWidth > 1019 && "100%" }}
                    className="pb-6 mx-auto overflow-x-auto updiv "
                    key={index}
                  >
                    <div className="sm:w-11/12 w-100 rounded-lg bg-pink-50 shadow-xl border border-gray-400 mx-auto px-2">
                      <div className="flex ">
                        <div className=" space-y-2 border-r-2 py-2 border-gray-400  sm:w-24 flex-col flex w-20 justify-center  font-bold">
                          <div className="h-10 w-10 bg-pink3 rounded-full mx-auto uppercase grid place-content-center text-white">
                            {decoded.username.charAt(0)}
                          </div>
                        </div>
                        <div className=" flex-1 py-2  px-4">
                          <div className="flex flex-col gap-5">
                            <div>
                              <input
                                disabled
                                value={title}
                                className=" w-full bg-white border focus:border-gray-400 font-medium text-gray-600   px-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 py-4">
                          <button
                            onClick={() => {
                              setMessageTitle(data);
                              setqstAns(data);
                              setPopUp((preval) => {
                                return {
                                  ...preval,
                                  view: true,
                                };
                              });
                            }}
                            className="text-sm font-semibold py-0.5 text-white flex space-x-1 items-center w-20 text-center justify-center rounded-full cursor-pointer bg-pink3 hover:bg-pink4"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {chatdata.length === 0 && !loader && (
              <div className="flex justify-center">No data to show</div>
            )}

            {loader && (
              <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
                <span className="text-lg">Loading</span>
                <span>
                  <DataLoader />
                </span>
              </div>
            )}
          </div>
          {(popUp.add || popUp.edit || popUp.view) && (
            <div className="absolute w-full h-full top-0 left-0">
              <div
                onClick={() => {
                  setPopUp(() => {
                    return {
                      add: false,
                      edit: false,
                      value: false,
                    };
                  });
                }}
                className="absolute w-full h-full rounded-xl bg-black opacity-25 top-0 left-0"
              ></div>
              <div className=" h-full flex justify-center w-full items-center ">
                <div className=" relative  bg-white rounded-lg w-10/12 sm:8/12 md:w-6/12 m-auto">
                  <div className="text-center relative border-b-2 border-gray-500">
                    <div className="text-2xl py-2 font-bold text-blue3">
                      Inquiry
                    </div>
                    <div
                      onClick={() => {
                        setPopUp(() => {
                          return {
                            add: false,
                            edit: false,
                            value: false,
                          };
                        });
                      }}
                      className="absolute right-5 top-2 cursor-pointer text-white font-extrabold w-8 h-8 rounded-full bg-blue3"
                    >
                      X
                    </div>
                  </div>
                  {popUp.add ? (
                    <InquiryChat
                      userId={userId}
                      getAllMessages={getAllMessages}
                      setPopUp={setPopUp}
                    />
                  ) : popUp.edit ? (
                    <InquiryAdd />
                  ) : (
                    <InquiryView
                      userId={userId}
                      qstAns={qstAns}
                      msgTitle={msgTitle}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentInquiry;
