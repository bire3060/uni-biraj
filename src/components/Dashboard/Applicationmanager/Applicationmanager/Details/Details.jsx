import React from "react";
import { useState, useEffect } from "react";
import ApplicationManagerDetail from "./ApplcationManagerDetail";
import Documents from "./Documents";
import Education from "./Education";
import PersonalForm from "./PersonalForm";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  ADD_STUDENT_DETAILS,
  ADD_MORE_EDU,
  ADD_ENGLISH_PRO,
  ADD_STD_DOCS,
  CLEAR_STD_DETAILS,
} from "../../../../../redux/actions/student_details_types";
// import axiosInstance from "../../../api/axiosInstance";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../../../api/axiosInstance";
const Details = () => {
  const history = useHistory();
  const [profileId, setprofileId] = useState("");
  const [value, setValue] = useState(0);
  const [coursedetail, setCourseDetail] = useState([]);
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
    {
      id: 4,
      icon: "",
      title: "Course",
    },
  ];
  const dispatch = useDispatch();
  const { id } = useParams();
  // const handleAccept = () => {
  //   let formData = {
  //     course: id,
  //   };
  //   axiosInstance
  //     .post(`courses/approve-applied-course/`, formData)
  //     .then((res) => {
  //       // console.log(res.data);
  //       toast.success("Course Accepted", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       history.push("/dashboard/appliedcourse");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleDeclined = () => {
    let formData = {
      course_id: coursedetail.id,
      profile_id: profileId,
    };
    axiosInstance
      .post(`/courses/remove/`, formData)
      .then((res) => {
        // console.log(res.data);
        toast.success("Declined", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/dashboard/appliedcourse");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserDetail = (signal) => {
    let details = [
      "address",
      "country_code",
      "email",
      "fname",
      "lname",
      "phone",
    ];
    let profile = [
      "DOB",
      "gender",
      "nationality",
      "passport_no",
      "preferred_country",
      "preferred_intake",
      "preferred_date",
    ];
    axiosInstance
      .get(`/courses/follow-up-course-detail/${id}/`, { signal })
      .then((res) => {
        setCourseDetail(res.data.course);
        setprofileId(res.data.user.id);
        for (let i = 0; i < res.data.student_doc.length; i++) {
          dispatch({
            type: ADD_STD_DOCS,
            payload: {
              id: res.data.student_doc[i].id,
              file: res.data.student_doc[i].file,
              name: res.data.student_doc[i].name,
            },
          });
        }
        for (let i = 0; i < details.length; i++) {
          dispatch({
            type: ADD_STUDENT_DETAILS,
            payload: {
              property: details[i],
              value:
                res.data.user[details[i]] === null
                  ? ""
                  : res.data.user.user[details[i]],
            },
          });
        }
        for (let i = 0; i < profile.length; i++) {
          dispatch({
            type: ADD_STUDENT_DETAILS,
            payload: {
              property: profile[i],
              value:
                res.data.user[profile[i]] === null
                  ? ""
                  : res.data.user[profile[i]],
            },
          });
        }
        for (let i = 0; i < res.data.student_edu_detail.length; i++) {
          dispatch({
            type: ADD_MORE_EDU,
            payload: {
              id: res.data.student_edu_detail[i].id,
              title: res.data.student_edu_detail[i].title,
              degree_level: res.data.student_edu_detail[i].degree_level,
              score: res.data.student_edu_detail[i].score,
              score_type: res.data.student_edu_detail[i].score_type,
              institute: res.data.student_edu_detail[i].institute,
              institute_country:
                res.data.student_edu_detail[i].institute_country,
              start_year: res.data.student_edu_detail[i].start_year,
              end_year: res.data.student_edu_detail[i].end_year,
              study_area: res.data.student_edu_detail[i].study_area,
            },
          });
        }
        for (let j = 0; j < res.data.english.length; j++) {
          dispatch({
            type: ADD_ENGLISH_PRO,
            payload: {
              id: res.data.english[j].id,
              name: res.data.english[j].name,
              overall_score: res.data.english[j].overall_score,
              reading: res.data.english[j].reading,
              writing: res.data.english[j].writing,
              listening: res.data.english[j].listening,
              speaking: res.data.english[j].speaking,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (id) {
      getUserDetail(signal);
    }
    return () => {
      controller.abort();
      dispatch({
        type: CLEAR_STD_DETAILS,
      });
    };
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
            className="mx-auto relative flex sm:flex-row flex-col  justify-between items-center"
            style={{ width: "98%" }}
          >
            <div className="sm:flex  grid grid-cols-2 gap-1 sm:gap-0  flex-row items-center">
              {buttons.map((button, index) => {
                const { icon, title, id } = button;
                return (
                  <div key={id}>
                    <div
                      className={
                        index === value
                          ? `bg-blue3 cursor-pointer md:px-14 px-5 block sm:rounded-tr-2xl p-2 text-gray-100 text-sm transition-all duration-500`
                          : `bg-white cursor-pointer text-blue3 md:px-14 px-5 block sm:rounded-tr-2xl p-2 text-sm transition-all duration-500`
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
            <div className="mr-2">
              {/* <button
                className="cursor-pointer m-1  px-2 bg-blue3 rounded text-gray-50"
                onClick={handleAccept}
              >
                Accept
              </button> */}
              <button
                className="cursor-pointer  m-1 px-2 bg-pink4 rounded text-gray-50"
                onClick={handleDeclined}
              >
                Decline
              </button>
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
              {value === 3 && (
                <ApplicationManagerDetail coursedetail={coursedetail} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
