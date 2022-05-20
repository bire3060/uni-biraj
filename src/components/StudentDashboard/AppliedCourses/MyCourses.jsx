import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
import Popup from "../../compare-courses/popup/popup";
import Skeleton from "../Common/skeleton";
import Searchcard from "./Searchcard";

function Details() {
  const [ShowCardModal, setShowCardModal] = useState(true);
  const [coursesPopup, setCoursesPopup] = useState(false);
  const [profileId, setprofileId] = useState("");

  // const pop = 0;
  const [load, setload] = useState(true);

  const [getdata, setgetdata] = useState([]);
  const getAllCourseList = (signal) => {
    axiosInstance
      .get("/courses/user-course-list/", { signal })
      .then((res) => {
        setgetdata(res.data);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCourseList(signal);
    return () => controller.abort();
  }, []);
  const cardModals = () => {
    setShowCardModal(!ShowCardModal);
  };

  const deleteAppliedList = (id) => {
    let formData = {
      course_id: id,
      profile_id: profileId,
    };
    axiosInstance
      .post("/courses/remove/", formData)
      .then((res) => {
        toast.success("Course removed from applied list", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        getAllCourseList();
      })
      .catch((err) => {
        toast.error(err.response.data.Error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      {coursesPopup && (
        <Popup
          closePopup={() => {
            setCoursesPopup(false);
            getAllCourseList();
          }}
        />
      )}
      <div className="h-8 mb-2 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Applied Courses"}</div>
        </div>
      </div>

      <main className="rounded-xl mx-4 bg-white relative md:p-7 p-3 shadow-2xl">
        <div className="flex justify-end">
          <button
            className="flex items-center space-x-2 bg-blue3 text-white rounded-md px-4 py-1"
            onClick={() => setCoursesPopup(!coursesPopup)}
          >
            <span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span>Add</span>
          </button>
        </div>
        <div style={{ minHeight: "65vh" }} className="">
          {getdata.length === 0 && !load && (
            <div className="flex justify-center">No data to show</div>
          )}

          {load && (
            <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
              <span className="text-lg">Loading</span>
              <span>
                {/* <Loader
                  type="ThreeDots"
                  color="#eb3434"
                  height={40}
                  width={40}
                  timeout={90000}
                /> */}
                <DataLoader />
              </span>
            </div>
          )}

          {/* getting all the datas */}
          {getdata.length > 0 && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-10 rounded-xl">
                {/* {getdata.map((persons, index) => {
                  return <div className="rounded-lg" key={index}></div>;
                })} */}

                {getdata.length > 0 &&
                  getdata.map((persons, index) => {
                    return (
                      <div
                        key={index}
                        className="relative shadow-lg rounded-lg"
                      >
                        <div
                          onClick={() => {
                            deleteAppliedList(persons.course_id);
                          }}
                          className="absolute top-0 rounded cursor-pointer px-2 text-gray-50 text-xl  bg-pink3 right-0"
                        >
                          X
                        </div>
                        <div className="rounded-lg">
                          <Searchcard
                            persons={persons}
                            cardModals={cardModals}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* {load ? (
              } */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Details;
