import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
// import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import logo3 from "../../../assets/images/courses/Course-card-logo3.png";

// import CourseCard from "../../common/course-card";
// import Ccard from "../Common/CCard";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
import Skeleton from "../Common/skeleton";
import WCourseCard from "./wcard";

function Wishlist() {
  const [load, setload] = useState(true);
  const applyc = (id) => {
    // console.log(id);
    const postdata = {
      course_id: id,
    };
    axiosInstance
      .post(`/courses/apply/`, postdata)
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
        fetchWishlistData();
      })
      .catch((err) => {
        toast.error("Course has been applied already!", {
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

  const [getDetails, setGetDetails] = useState([]);

  const deleteWishList = (id) => {
    let val = { course_id: id };
    axiosInstance
      .post("/courses/wishlist/remove/", val)
      .then((res) => {
        toast.error("Course removed from wishlist", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        fetchWishlistData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchWishlistData = () => {
    axiosInstance
      .get(`/courses/wishlist/`)
      .then((res) => {
        // console.log(res.data);
        setGetDetails(res.data);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  return (
    <div>
      <div className="h-8 mb-2 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Wishlist"}</div>
        </div>
      </div>

      <main className="rounded-xl mx-2 bg-white shadow-2xl p-3 overflow-hidden">
        <div className="md:p-7 p-2 ">
          <div className="">
            {getDetails.length === 0 && !load && (
              <div className="flex justify-center items-center">
                No data to show
              </div>
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
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  items-center gap-14 rounded-xl">
              {getDetails.length > 0 &&
                getDetails.map((person, index) => {
                  return (
                    <div key={index} className="relative shadow-lg rounded-lg">
                      <div
                        onClick={() => {
                          deleteWishList(person.course_id);
                        }}
                        className="absolute top-0 rounded cursor-pointer px-2 text-gray-50 text-xl  bg-pink3 right-0"
                      >
                        X
                      </div>
                      <WCourseCard
                        applyc={applyc}
                        key={index}
                        persons={person}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Wishlist;
