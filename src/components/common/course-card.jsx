import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import whiteLogo from "../../assets/images/logo/logo.svg";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

import "react-toastify/dist/ReactToastify.css";
import {
  COMPARE_COURSE_ADD,
  AUTHENTICATION_POPUP_SHOW,
} from "../../redux/actions/actionsTypes";
import axiosInstance from "../../api/axiosInstance";
// import jwt_decode from "jwt-decode";

const CourseCard = ({
  addToCompare,
  closePopup = () => null,
  currentButton,
  courses,
  setCourses,
  index,
  ...all
}) => {
  const {
    title,
    // images,
    institution,
    institution_address,
    duration,
    domestic_fee,
    international_fee,
    study_mode,
    // city,
    id,
    // description,
    in_wishlist,
    slug,
    is_applied,
  } = all;
  const [courseIsApplied, setCourseIsApplied] = useState(false);

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
        setCourseIsApplied(res.data.is_applied);
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

  const [role, setRole] = useState("");
  // const [loggedIn, setLoggedIn] = useState("");
  const token = localStorage.getItem("refresh");
  function tokenManager() {
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
      } catch (e) {
        localStorage.clear();
      }

      const { user_type } = decoded;
      setRole(user_type);
    }
  }
  useEffect(() => {
    tokenManager();
  }, []);

  const toggleWishlistContainer = (index) => {
    const wishlistContainer = [...courses];
    wishlistContainer[index].in_wishlist =
      !wishlistContainer[index].in_wishlist;
    setCourses(wishlistContainer);
  };

  const addingRemoveWishlist = (index, id) => {
    const getActualIndex = [...courses];
    const postId = {
      course_id: id,
    };
    if (getActualIndex[index].in_wishlist === true) {
      axiosInstance
        .post(`/courses/wishlist/add/`, postId)
        .then((res) => {
          // alert("added to whishlist");
          toast.success("Added to wishlist", {
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
          } else {
            // alert(err.response.data.Error);
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
    } else {
      axiosInstance
        .post(`/courses/wishlist/remove/`, postId)
        .then((res) => {
          // alert("added to whishlist");
          toast.success("Removed from wishlist", {
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
          } else {
            // alert(err.response.data.Error);
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
    }
  };

  return (
    <div className="border bg-white rounded-lg p-3 text-gray7 space-y-2 text-sm flex flex-col">
      <Link
        to={`/courses/${slug}`}
        className="flex flex-col cursor-pointer  flex-1"
      >
        <div className="font-bold text-base line-clamp-1">
          {title === "" || null ? "N/A" : title}
        </div>
        <div>
          <img
            src={
              institution || institution.logo === null
                ? whiteLogo
                : institution.logo
            }
            alt="institution"
            className="h-7"
          />
        </div>
        <div>
          {institution === null || institution.name === ""
            ? "N/A"
            : institution.name}
        </div>
        <div>
          <div className="flex space-x-2 items-center">
            <div className="text-gray6">
              <svg viewBox="0 0 512 512" fill="currentColor" className="w-4">
                <g>
                  <g>
                    <path
                      d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
			c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
			C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
			s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div>{institution_address ? institution_address : "N/A"}</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="text-gray6">
              <svg fill="currentColor" className="w-4" viewBox="0 0 24 24">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M14.586,16l-3.293-3.293 C11.105,12.519,11,12.265,11,12V7c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4.586l3,3c0.39,0.39,0.39,1.024,0,1.414l0,0 C15.61,16.39,14.976,16.39,14.586,16z" />
              </svg>
            </div>
            <div>
              {!duration ||
              duration === undefined ||
              duration === "nan" ||
              duration === "0"
                ? "N/A"
                : `${
                    duration >= 12
                      ? (duration / 12).toFixed(2) + "Years"
                      : duration + "Month"
                  }`}
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="text-gray6">
              <svg
                viewBox="0 0 45.958 45.958"
                fill="currentColor"
                className="w-4"
              >
                <g>
                  <path
                    d="M22.979,0C10.287,0,0,10.288,0,22.979s10.287,22.979,22.979,22.979s22.979-10.289,22.979-22.979S35.67,0,22.979,0z
		 M24.37,33.215v2.66c0,0.415-0.323,0.717-0.739,0.717h-1.773c-0.416,0-0.751-0.302-0.751-0.717v-2.426
		c-1.632-0.074-3.278-0.422-4.524-0.896c-0.675-0.256-1.051-0.979-0.872-1.679L16,29.748c0.101-0.395,0.365-0.725,0.726-0.91
		c0.361-0.188,0.785-0.207,1.164-0.062c1.187,0.459,2.589,0.793,4.086,0.793c1.906,0,3.211-0.736,3.211-2.074
		c0-1.271-1.07-2.074-3.546-2.911c-3.579-1.204-6.03-2.876-6.03-6.121c0-2.943,2.083-5.251,5.644-5.954v-2.426
		c0-0.415,0.355-0.787,0.771-0.787h1.773c0.416,0,0.721,0.372,0.721,0.787v2.191c1.557,0.067,2.681,0.298,3.621,0.604
		c0.711,0.232,1.131,0.977,0.944,1.703l-0.254,1.008c-0.099,0.384-0.353,0.71-0.701,0.898s-0.759,0.222-1.135,0.093
		c-0.854-0.293-1.968-0.559-3.38-0.559c-2.174,0-2.877,0.937-2.877,1.874c0,1.104,1.171,1.806,4.014,2.877
		c3.98,1.405,5.579,3.245,5.579,6.254C30.33,30.003,28.227,32.547,24.37,33.215z"
                  />
                </g>
              </svg>
            </div>
            <div>
              {!domestic_fee || domestic_fee === "nan" ? "0" : domestic_fee}/
              {!international_fee || international_fee === "nan"
                ? "0"
                : international_fee}
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="text-gray6">
              <svg
                viewBox="0 0 296.999 296.999"
                fill="currentColor"
                className="w-4"
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M45.432,35.049c-0.008,0-0.017,0-0.025,0c-2.809,0-5.451,1.095-7.446,3.085c-2.017,2.012-3.128,4.691-3.128,7.543
				v159.365c0,5.844,4.773,10.61,10.641,10.625c24.738,0.059,66.184,5.215,94.776,35.136V84.023c0-1.981-0.506-3.842-1.461-5.382
				C115.322,40.849,70.226,35.107,45.432,35.049z"
                      />
                      <path
                        d="M262.167,205.042V45.676c0-2.852-1.111-5.531-3.128-7.543c-1.995-1.99-4.639-3.085-7.445-3.085c-0.009,0-0.018,0-0.026,0
				c-24.793,0.059-69.889,5.801-93.357,43.593c-0.955,1.54-1.46,3.401-1.46,5.382v166.779
				c28.592-29.921,70.038-35.077,94.776-35.136C257.394,215.651,262.167,210.885,262.167,205.042z"
                      />
                      <path
                        d="M286.373,71.801h-7.706v133.241c0,14.921-12.157,27.088-27.101,27.125c-20.983,0.05-55.581,4.153-80.084,27.344
				c42.378-10.376,87.052-3.631,112.512,2.171c3.179,0.724,6.464-0.024,9.011-2.054c2.538-2.025,3.994-5.052,3.994-8.301V82.427
				C297,76.568,292.232,71.801,286.373,71.801z"
                      />
                      <path
                        d="M18.332,205.042V71.801h-7.706C4.768,71.801,0,76.568,0,82.427v168.897c0,3.25,1.456,6.276,3.994,8.301
				c2.545,2.029,5.827,2.78,9.011,2.054c25.46-5.803,70.135-12.547,112.511-2.171c-24.502-23.19-59.1-27.292-80.083-27.342
				C30.49,232.13,18.332,219.963,18.332,205.042z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              {study_mode === "BO" && "Online/On Campus"}
              {study_mode === "ON" && "Online"}
              {study_mode === "OC" && "On Campus"}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex text-center items-center space-x-2">
        {/* {!addToCompare && decoded.user_type === "ST" && ( */}
        {role === "ST" || !token ? (
          <div className="flex-1" onClick={() => addCourses(id)}>
            <button
              disabled={
                is_applied || courseIsApplied || (is_applied && !in_wishlist)
                  ? true
                  : false
              }
              className={`w-full py-2 bg-pink1 rounded-full text-pink4 font-bold ${
                is_applied || courseIsApplied || (is_applied && !in_wishlist)
                  ? "cursor-not-allowed disabled opacity-50 border border-pink-400"
                  : "cursor-pointer"
              }`}
            >
              {courseIsApplied || is_applied ? "Applied" : "Apply"}
            </button>
          </div>
        ) : (
          <div className="flex-1">
            <button className="w-full py-2 bg-pink1 rounded-full text-pink4 font-bold cursor-not-allowed disabled opacity-20">
              Apply
            </button>
          </div>
        )}
        {/* )} */}
        <div className="flex-1">
          {/* {decoded.user_type === "ST" && ( */}
          <Link
            to="/compare-courses"
            onClick={() => {
              window.scrollTo(0, 0);
              closePopup();
              dispatch({
                type: COMPARE_COURSE_ADD,
                payload: {
                  course: all,
                },
              });
            }}
            className={`w-full block p-2 rounded-full font-bold ${
              addToCompare ? "bg-pink1 text-pink4" : "bg-pink1 text-pink4"
            }`}
          >
            Compare
          </Link>
          {/* )} */}
        </div>

        {role === "ST" ? (
          <div>
            <button
              className={`${
                is_applied ? "cursor-not-allowed disabled" : "cursor-pointer"
              }`}
              disabled={is_applied || courseIsApplied ? true : false}
              onClick={() => {
                toggleWishlistContainer(index);
                addingRemoveWishlist(index, id);
              }}
            >
              {in_wishlist && !(is_applied || courseIsApplied) ? (
                <BsFillBookmarkFill className="text-xl text-pink4" />
              ) : (
                <BsBookmark className="text-xl text-gray-600" />
              )}
            </button>
          </div>
        ) : (
          <div>
            <svg
              viewBox="0 0 431.972 431.972"
              fill="currentColor"
              className="w-4"
            >
              <g>
                <path
                  d="M393.146,14.279c-3.713-5.333-8.713-9.233-14.989-11.707c-3.997-1.711-8.186-2.568-12.565-2.568V0H66.378
		c-4.377,0-8.562,0.857-12.56,2.568c-6.28,2.472-11.278,6.377-14.989,11.707c-3.71,5.33-5.568,11.228-5.568,17.701v368.019
		c0,6.475,1.858,12.371,5.568,17.706c3.711,5.329,8.709,9.233,14.989,11.704c3.994,1.711,8.183,2.566,12.56,2.566
		c8.949,0,16.844-3.142,23.698-9.418l125.91-121.062l125.91,121.065c6.663,6.081,14.562,9.127,23.695,9.127
		c4.76,0,8.948-0.756,12.565-2.279c6.276-2.471,11.276-6.375,14.989-11.711c3.71-5.328,5.564-11.225,5.564-17.699V31.98
		C398.71,25.507,396.852,19.609,393.146,14.279z M362.166,391.139L241.397,275.224l-25.411-24.264l-25.409,24.264L69.809,391.139
		V36.549h292.357V391.139L362.166,391.139z"
                />
              </g>
            </svg>
          </div>
        )}
        {/* )} */}
      </div>
    </div>
  );
};

export default React.memo(CourseCard);

{
  /* <div className="flex items-center justify-center w-full h-full font-bold text-xl">
  <div>N/A</div>
</div>; */
}
