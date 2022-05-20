import { useDispatch, useSelector } from "react-redux";
import { inputs } from "./basic_details_lists";
import { ADD_STUDENT_DETAILS } from "../../../redux/actions/student_details_types";
import errorHandler from "../../common/error-handler";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  // ADD_STUDENT_DETAILS,
  ADD_STUDENT_DETAILS_ERROR,
  ADD_MORE_EDU,
  ADD_ENGLISH_PRO,
  ADD_STD_DOCS,
  // ACADEMIC_UPDATE,
  // ENGLISH_PRO_UPDATE,
  ADD_ISFETCHED,
} from "../../../redux/actions/student_details_types";
import axiosInstance from "../../../api/axiosInstance";
const PersonalForm = ({ setValue }) => {
  const dispatch = useDispatch();
  const [save, setsave] = useState(false);
  const [countryList, setCountryList] = useState([]);
  // const [isFetched, setIsFetched] = useState(false);
  const { basic_details, isFetched } = useSelector(
    (state) => state.studentDetails
  );
  const submitHandler = (e) => {
    e.preventDefault();

    let headingErr = false;
    let goAheadAndSubmit = true;
    inputs.map((field) => {
      const { property } = field;
      const error = errorHandler(property, basic_details[property], true);
      dispatch({
        type: ADD_STUDENT_DETAILS_ERROR,
        payload: {
          property: property,
          error: error,
        },
      });
      if (error) {
        goAheadAndSubmit = false;
        headingErr = true;
      }
      return "";
    });
    if (goAheadAndSubmit && !headingErr) {
      setsave(true);
      const token = localStorage.getItem("access");
      const { user_id } = jwt_decode(token);
      const {
        DOB,
        address,
        country_code,
        created,
        email,
        fname,
        gender,
        lname,
        nationality,
        passport_no,
        phone,
        preferred_country,
        preferred_date,
        preferred_intake,
      } = basic_details;
      let pid = localStorage.getItem("pid");
      let val = {
        personalInfo: {
          user: { id: user_id, fname, lname, country_code, phone, address },

          email,
          DOB,
          created,
          gender,
          nationality,
          passport_no,
          preferred_country,
          preferred_date,
          preferred_intake,
        },
      };
      axiosInstance
        .patch(`/user/profile-update/${pid}/`, val)
        .then((res) => {
          toast.success("Save Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setsave(false);
          getUserDetail();
        })
        .catch((err) => {
          console.log(err);
          setsave(false);
        });
    } else {
      console.log("error");
    }
  };
  const getUserDetail = (signal) => {
    // alert("sdfghjk");
    const token = localStorage.getItem("access");
    const { user_id } = jwt_decode(token);
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
      "created",
      "gender",
      "nationality",
      "passport_no",
      "preferred_country",
      "preferred_intake",
      "preferred_date",
    ];
    axiosInstance
      .get(`/user/profile-detail/${user_id}/`, { signal })
      .then((res) => {
        localStorage.setItem("pid", res.data.std_profile[0].id);
        // setValue(1);
        dispatch({
          type: ADD_ISFETCHED,
        });
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
              value: res.data[details[i]] === null ? "" : res.data[details[i]],
            },
          });
        }
        for (let i = 0; i < profile.length; i++) {
          dispatch({
            type: ADD_STUDENT_DETAILS,
            payload: {
              property: profile[i],
              value:
                res.data.std_profile[0][profile[i]] === null
                  ? ""
                  : res.data.std_profile[0][profile[i]],
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
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        setCountryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (!isFetched) {
      getUserDetail(signal);
    }
    getCountryList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="md:w-4/5 lg:w-3/5 mx-auto  w-full py-1 mb-4">
        <form onSubmit={submitHandler}>
          {inputs.map((input, index) => {
            const { property, label, type, data } = input;
            const error = basic_details.errors[property];
            return (
              <div key={index}>
                <div
                  className="flex md:flex-row flex-col items-center"
                  style={{ paddingTop: 12 }}
                >
                  <div className="md:w-72 w-full font-bold text-blue3 tracking-wide">
                    {label}
                  </div>
                  <div className="w-full">
                    {type === "select" ? (
                      <select
                        className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                        onChange={(event) => {
                          dispatch({
                            type: ADD_STUDENT_DETAILS,
                            payload: {
                              property: property,
                              value: event.target.value,
                            },
                          });
                        }}
                        name={property}
                        value={basic_details[property]}
                      >
                        <option disabled>select gender</option>
                        {data.map((slt, index) => {
                          return (
                            <option key={index} value={slt.value}>
                              {slt.title}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input
                        className="border w-full rounded-md shadow-md px-3 border-gray-400"
                        type={type}
                        name={property}
                        value={basic_details[property]}
                        readOnly={property === "email" ? true : false}
                        // onKeyDown={handleKeyDown}
                        onCopy={(e) => {
                          e.preventDefault();
                        }}
                        onCut={(e) => {
                          e.preventDefault();
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key) && type === "Number") {
                            event.preventDefault();
                          }
                        }}
                        onChange={(event) => {
                          // console.log(event.target.value);

                          dispatch({
                            type: ADD_STUDENT_DETAILS,
                            payload: {
                              property: property,
                              value: event.target.value,
                            },
                          });
                        }}
                      />
                    )}
                    {error && (
                      <div className="text-sm text-red-400">{error}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="flex md:flex-row flex-col items-center"
            style={{ paddingTop: 12 }}
          >
            <div className="md:w-72 w-full font-bold text-blue3 tracking-wide">
              Preferred Country
            </div>
            <select
              className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
              onChange={(event) => {
                dispatch({
                  type: ADD_STUDENT_DETAILS,
                  payload: {
                    property: "preferred_country",
                    value: event.target.value,
                  },
                });
              }}
              name="preferred_country"
              value={basic_details["preferred_country"]}
            >
              <option disabled>select country</option>
              {countryList.map((slt, index) => {
                return (
                  <option key={index} value={slt.id}>
                    {slt.title}
                  </option>
                );
              })}
            </select>
          </div>
          {/* common save button */}
          <div className="flex justify-center mt-7">
            {" "}
            <button
              disabled={save ? true : false}
              type="submit"
              className={` h-10 text-white rounded-lg text-lg flex justify-center items-center w-32 ${
                save ? "bg-pink3 cursor-not-allowed" : "bg-pink5"
              }`}
            >
              {save ? (
                <div className="lds-ring mb-1.5">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalForm;
