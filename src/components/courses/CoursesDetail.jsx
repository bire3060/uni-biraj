import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../home/static/navbar";
import CourseInfoToggle from "./CourseInfoToggle";
import FloatingBar from "./FloatingBar";
import { useParams } from "react-router-dom";
import Preloader from "../get-started/common/PreLoader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTHENTICATION_POPUP_SHOW } from "../../redux/actions/actionsTypes";
import UNIIMAGE from "../../assets/images/logo/logo.svg";

function CoursesDetail({ loggedIn, role, closePopup = () => null, ...all }) {
  const [detail, setDetail] = useState([]);
  const [load, setLoad] = useState(true);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const addCourses = (id) => {
    let val = {
      course_id: id,
    };
    axiosInstance
      .post(`/courses/apply/`, val)
      .then((res) => {
        toast.success("Course has been applied", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: AUTHENTICATION_POPUP_SHOW });
          closePopup();
        } else {
          toast.error(`${err.response.data.Error}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    axiosInstance
      .get(`/courses/detail/${slug}/`)
      .then((res) => {
        // console.log(res.data);
        setDetail(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {load ? (
        <Preloader />
      ) : (
        <div>
          <div className="uni-homepage relative z-10 bg-gray1 mb-20">
            <Navbar loggedIn={loggedIn} role={role} />
            {detail.title && (
              <div className="w-full h-96 flex justify-center  text-white text-3xl md:text-5xl font-semibold">
                <span className="mt-20 text-center"> {detail.title}</span>
              </div>
            )}
            <FloatingBar {...detail} />
          </div>
          <div className="lg:flex justify-between md:space-x-10 p-4 md:px-8 lg:px-16 2xl:px-24">
            {/* right  */}
            <div className="flex flex-1 flex-col p-5">
              {/* about */}
              <div className="flex flex-col rounded-md border border-gray-200 p-5 shadow-md">
                <div className="text-2xl text-blue3 font-semibold">About</div>
                <div
                  className="text-gray-600 my-4"
                  dangerouslySetInnerHTML={{ __html: detail.description }}
                ></div>
              </div>
              {/* toggle  */}
              <CourseInfoToggle {...detail} />
            </div>
            {/* left */}
            <div className=" lg:w-96 pt-5">
              <div className="flex border border-gray-200 rounded-md pb-4 flex-col">
                <div className="p-5 text-blue3 text-2xl  border-b border-gray-200">
                  University Information
                </div>
                <div className="sm:flex items-center p-5 space-x-2">
                  <div className="0 w-36">
                    <img
                      src={
                        detail.institution === undefined ||
                        detail.institution.logo
                          ? detail.institution.logo
                          : UNIIMAGE
                      }
                      alt="university"
                    />
                  </div>
                  <div className="sm:text-center text-xl mt-5 sm:mt-0">
                    {detail.institution ? detail.institution.name : ""}
                  </div>
                </div>
                <div className="flex justify-center p-5">
                  <Link
                    to={`/universities/${
                      detail.institution ? detail.institution.slug : ""
                    }`}
                    className="bg-blue3 text-white px-6 py-2 shadow-md rounded-md"
                  >
                    Visit Institute Page
                  </Link>
                </div>
              </div>
              <div className="flex border border-gray-200 rounded-md pb-4 flex-col mt-5">
                <div className="p-5 text-blue3 text-2xl text-center">
                  Interested on this course ?
                </div>
                <div className="px-5 text-center">
                  <button
                    onClick={() => addCourses(detail.id)}
                    className="bg-pink4 px-4 py-1 rounded-lg text-lg text-white animate animate-bounce"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoursesDetail;
