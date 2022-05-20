import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// import userImage from "../../../assets/images/student-dashboard/userImage.jpg";
import axiosInstance from "../../../api/axiosInstance";
// import InquiryChat from "../../StudentDashboard/Inquiry/inquiryChat";
// import InquiryAdd from "../../StudentDashboard/Inquiry/inquiryAdd";
// import InquiryView from "../../StudentDashboard/Inquiry/inquiryView";
import CourseInquiryChat from "./CourseInquiryChat";
import CourseInquiryView from "./CourseInquiryView";
import CourseInquiryAdd from "./CourseInquiryAdd";
import DataLoader from "../../common/Loader";
const CourseEnuiry = () => {
  const [chatdata, setChatdata] = useState([]);
  const [msgTitle, setMessageTitle] = useState([]);
  const [popUp, setPopUp] = useState({
    add: false,
    view: false,
    edit: false,
  });
  const [userId, setUserId] = useState("");
  const [qstAns, setqstAns] = useState([]);
  const [loader, setLoader] = useState(true);

  const getAllMessages = (signal) => {
    axiosInstance
      .get(`/inquery/get-admin-topic/`, { signal })
      .then((res) => {
        setChatdata(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  useEffect(() => {
    let token = localStorage.getItem("refresh");
    let decoded = jwt_decode(token);
    setUserId(decoded.user_id);
    const controller = new AbortController();
    const { signal } = controller;
    getAllMessages(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <div className="h-8 w-full mb-4 bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Inquiry"}</div>
        </div>
      </div>

      {chatdata.length === 0 && !loader && (
        <div className="flex items-center justify-center mt-2">
          No Data Available
        </div>
      )}

      {loader && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {chatdata.length > 0 && (
        <div className="bg-white p-3 sm:p-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border-2 shadow-xl relative  border-gray-200 lg:mx-10 mx-4">
          {chatdata.map((data, index) => {
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
                      <div className=" space-y-2 border-r-2 py-2 border-gray-400  sm:w-24 flex-col flex w-20 justify-center  font-bold">
                        <div className="h-10 w-10 bg-pink3 rounded-full mx-auto uppercase grid place-content-center text-white">
                          A
                        </div>
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
          {(popUp.add || popUp.edit || popUp.view) && (
            <div className="fixed w-full min-h-screen flex items-center justify-center top-0 left-0">
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
                className="absolute w-full h-full bg-black opacity-25 top-0 left-0"
              ></div>
              <div className=" mx-auto " style={{ height: 450 }}>
                <div className="h-full relative bg-white max-w-lg mx-auto">
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
                    <CourseInquiryChat
                      userId={userId}
                      getAllMessages={getAllMessages}
                      setPopUp={setPopUp}
                    />
                  ) : popUp.edit ? (
                    <CourseInquiryAdd />
                  ) : (
                    <CourseInquiryView
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
      )}
    </>
  );
};

export default CourseEnuiry;
