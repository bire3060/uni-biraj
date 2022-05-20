import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import {
  ADD_MORE_EDU,
  ADD_ENGLISH_PRO,
  ACADEMIC_UPDATE,
  ENGLISH_PRO_UPDATE,
  REMOVE_EDU,
  REMOVE_ENGLISH_PRO,
  EDU_ERROR,
  ENGLISH_ERROR,
  MAKE_EDU_BLANK,
  MAKE_ENGLISH_PRO,
} from "../../../redux/actions/student_details_types";
// import errorHandler from "../../common/error-handler";
// import eduErrorHandler from "../../common/eduErrorHandler";
const Education = () => {
  const dispatch = useDispatch();
  const [save, setsave] = useState(false);
  const [saveAD, setsaveAD] = useState(false);
  const [indexAD, setindexAD] = useState("");
  const [saveEN, setsaveEN] = useState(false);
  const [indexEN, setindexEN] = useState("");
  const { academic, english_proficiency, academic_error, english_error } =
    useSelector((state) => state.studentDetails);
  const handleSubmit = (e) => {
    e.preventDefault(academic);
    // seterror(validation());
    let goAheadAndSubmit = true;
    for (let i = 0; i < academic.length; i++) {
      if (
        academic[i].title === "" ||
        academic[i].degree_level === "" ||
        academic[i].score === "" ||
        academic[i].score_type === "" ||
        academic[i].institute === "" ||
        academic[i].institute_country === "" ||
        academic[i].start_year === "" ||
        academic[i].end_year === "" ||
        academic[i].study_area === ""
      ) {
        dispatch({
          type: EDU_ERROR,
          payload: "Please fill all the fields",
        });
        goAheadAndSubmit = false;
      } else if (academic[i].score > 9 || academic[i].score < 0) {
        dispatch({
          type: EDU_ERROR,
          payload: "Academic Score must be greater then 0 and less then 9",
        });
        goAheadAndSubmit = false;
      } else {
        dispatch({
          type: EDU_ERROR,
          payload: "",
        });
        goAheadAndSubmit = true;
      }
    }
    for (let i = 0; i < english_proficiency.length; i++) {
      if (
        english_proficiency[i].name !== "" ||
        english_proficiency[i].overall_score !== "" ||
        english_proficiency[i].reading !== "" ||
        english_proficiency[i].writing !== "" ||
        english_proficiency[i].listening !== "" ||
        english_proficiency[i].speaking !== ""
      ) {
        if (english_proficiency[i].name === "") {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Select the English Proficiency name",
          });
          goAheadAndSubmit = false;
        } else if (
          english_proficiency[i].overall_score > 9 ||
          english_proficiency[i].overall_score === "" ||
          english_proficiency[i].overall_score < 0
        ) {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Overall score must be greater then 0 and less then 9",
          });
          goAheadAndSubmit = false;
        } else if (
          english_proficiency[i].reading > 9 ||
          english_proficiency[i].reading === "" ||
          english_proficiency[i].reading < 0
        ) {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Reading must be greater then 0 and less then 9",
          });
          goAheadAndSubmit = false;
        } else if (
          english_proficiency[i].writing > 9 ||
          english_proficiency[i].writing === "" ||
          english_proficiency[i].writing < 0
        ) {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Writing must be greater then 0 and less then 9",
          });
          goAheadAndSubmit = false;
        } else if (
          english_proficiency[i].listening > 9 ||
          english_proficiency[i].listening === "" ||
          english_proficiency[i].listening < 0
        ) {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Listening must be greater then 0 and less then 9",
          });
          goAheadAndSubmit = false;
        } else if (
          english_proficiency[i].speaking > 9 ||
          english_proficiency[i].speaking === "" ||
          english_proficiency[i].speaking < 0
        ) {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "Speaking must be greater then 0 and less then 9",
          });
          goAheadAndSubmit = false;
        } else {
          dispatch({
            type: ENGLISH_ERROR,
            payload: "",
          });
          goAheadAndSubmit = true;
        }
      } else {
        dispatch({
          type: ENGLISH_ERROR,
          payload: "",
        });
        goAheadAndSubmit = true;
      }
    }
    if (goAheadAndSubmit) {
      dispatch({
        type: EDU_ERROR,
        payload: "",
      });
      dispatch({
        type: ENGLISH_ERROR,
        payload: "",
      });
      setsave(true);
      let newAcademic = [];
      let newEnglishProficiency = [];
      let pid = localStorage.getItem("pid");
      for (let i = 0; i < academic.length; i++) {
        if (academic[i].id === undefined) {
          newAcademic.push({
            student: pid,
            title: academic[i].title,
            degree_level: academic[i].degree_level,
            score: academic[i].score,
            study_area: academic[i].study_area,
            score_type: academic[i].score_type,
            institute: academic[i].institute,
            institute_country: academic[i].institute_country,
            start_year: academic[i].start_year,
            end_year: academic[i].end_year,
          });
        } else {
          newAcademic.push({
            id: academic[i].id,
            student: pid,
            title: academic[i].title,
            degree_level: academic[i].degree_level,
            score: academic[i].score,
            score_type: academic[i].score_type,
            study_area: academic[i].study_area,
            institute: academic[i].institute,
            institute_country: academic[i].institute_country,
            start_year: academic[i].start_year,
            end_year: academic[i].end_year,
          });
        }
      }
      for (let j = 0; j < english_proficiency.length; j++) {
        if (english_proficiency[j].id === undefined) {
          if (
            english_proficiency[j].name !== "" &&
            english_proficiency[j].overall_score !== "" &&
            english_proficiency[j].reading !== "" &&
            english_proficiency[j].writing !== "" &&
            english_proficiency[j].listening !== "" &&
            english_proficiency[j].speaking !== ""
          ) {
            newEnglishProficiency.push({
              student: pid,
              name: english_proficiency[j].name,
              overall_score: english_proficiency[j].overall_score,
              reading: english_proficiency[j].reading,
              writing: english_proficiency[j].writing,
              listening: english_proficiency[j].listening,
              speaking: english_proficiency[j].speaking,
            });
          }
        } else {
          newEnglishProficiency.push({
            id: english_proficiency[j].id,
            student: pid,
            name: english_proficiency[j].name,
            overall_score: english_proficiency[j].overall_score,
            reading: english_proficiency[j].reading,
            writing: english_proficiency[j].writing,
            listening: english_proficiency[j].listening,
            speaking: english_proficiency[j].speaking,
          });
        }
      }
      let formData = {
        academics: newAcademic,
      };
      if (newEnglishProficiency.length !== 0) {
        formData.english_proficency = newEnglishProficiency;
      }
      axiosInstance
        .post(`/user/education/bulk-update/`, formData)
        .then((res) => {
          setsave(false);
          toast.success("Saved Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getUserDetail();
        })
        .catch((err) => {
          setsave(false);
          let [key, value] = Object.entries(err.response.data)[0];
          toast.error(`${key}:${value}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
        });
    }
  };
  const removeAcademic = (i, id) => {
    if (id === undefined) {
      dispatch({
        type: REMOVE_EDU,
        payload: i,
      });
    } else {
      setindexAD(i);
      setsaveAD(true);
      axiosInstance
        .delete(`/user/education/detail/${id}`)
        .then((res) => {
          setsaveAD(false);
          //tostify delete
          toast.error("Delete Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: REMOVE_EDU,
            payload: i,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const removeEnglish = (i, id) => {
    if (id === undefined) {
      dispatch({
        type: REMOVE_ENGLISH_PRO,
        payload: i,
      });
    } else {
      setsaveEN(true);
      setindexEN(i);
      axiosInstance
        .delete(`/user/education/english-test/${id}`)
        .then((res) => {
          //tostify delete
          setsaveEN(false);

          toast.error("Delete Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: REMOVE_ENGLISH_PRO,
            payload: i,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getUserDetail = (signal) => {
    // alert("sdfghjk");
    const token = localStorage.getItem("access");
    const { user_id } = jwt_decode(token);
    dispatch({
      type: MAKE_EDU_BLANK,
      payload: [],
    });
    dispatch({
      type: MAKE_ENGLISH_PRO,
      payload: [],
    });
    axiosInstance
      .get(`/user/profile-detail/${user_id}/`, { signal })
      .then((res) => {
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
  React.useEffect(() => {
    if (academic.length === 0) {
      dispatch({
        type: ADD_MORE_EDU,
        payload: {
          // student: "",
          title: "",
          degree_level: "",
          // category: "",
          score: "",
          score_type: "",
          institute: "",
          institute_country: "",
          start_year: "",
          end_year: "",
          study_area: "",
        },
      });
    }
    if (english_proficiency.length === 0) {
      dispatch({
        type: ADD_ENGLISH_PRO,
        payload: {
          name: "",
          overall_score: "",
          reading: "",
          writing: "",
          listening: "",
          speaking: "",
        },
      });
    }
    // eslint-disable-next-line
  }, []);
  // console.log(engProfNull);
  return (
    <>
      <form className="flex justify-between mt-10" onSubmit={handleSubmit}>
        <div className="flex justify-center absolute top-0 right-5">
          {" "}
          <button
            disabled={save ? true : false}
            type="submit"
            className={` h-8 my-1 text-white rounded-lg text-lg flex justify-center items-center w-26 ${
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
        <div className="w-72 shadow-lg">
          <p className="text-blue3 text-lg font-bold pl-3">Academics</p>
        </div>
        <div>
          <span
            onClick={() =>
              dispatch({
                type: ADD_MORE_EDU,
                payload: {
                  // student: "",
                  title: "",
                  degree_level: "",
                  // category: "",
                  score: "",
                  score_type: "",
                  institute: "",
                  institute_country: "",
                  start_year: "",
                  end_year: "",
                  study_area: "",
                },
              })
            }
            className="text-sm cursor-pointer bg-blue3 text-white px-3 py-1 rounded hover:bg-blue2"
          >
            Add More
          </span>
        </div>
      </form>
      <div className="mt-4">
        {academic_error && <div className="text-pink4">{academic_error}</div>}
        {academic.map((inputField, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2  p-3 ${
                index % 2 === 0 ? "" : "bg-pink-50"
              }`}
            >
              <div className="col-span-1">
                <div className="font-semibold text-sm">Degree Title</div>
                <input
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "title",
                      },
                    })
                  }
                  name="title"
                  type="text"
                  value={inputField.title}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Degree Level</div>
                <input
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "degree_level",
                      },
                    })
                  }
                  name="degree_level"
                  type="text"
                  value={inputField.degree_level}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Study Area</div>
                <input
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "study_area",
                      },
                    })
                  }
                  name="study_area"
                  type="text"
                  value={inputField.study_area}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Start Year</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    let value = event.target.value;
                    value.length < 5 &&
                      dispatch({
                        type: ACADEMIC_UPDATE,
                        payload: {
                          index: index,
                          value: event.target.value,
                          property: "start_year",
                        },
                      });
                  }}
                  name="start_year"
                  type="number"
                  style={{ width: "100%" }}
                  value={inputField.start_year}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">End Year</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    let value = event.target.value;
                    value.length < 5 &&
                      dispatch({
                        type: ACADEMIC_UPDATE,
                        payload: {
                          index: index,
                          value: event.target.value,
                          property: "end_year",
                        },
                      });
                  }}
                  name="end_year"
                  type="number"
                  style={{ width: "100%" }}
                  value={inputField.end_year}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Academic Score</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "score",
                      },
                    })
                  }
                  name="score"
                  type="number"
                  style={{ width: "100%" }}
                  value={inputField.score}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Score Type</div>
                {/* <input
                  onChange={(event) =>
                    handleChangeInput(inputField.index, event)
                  }
                  name="score_type"
                  type="text"
                  style={{ width: "100%" }}
                  value={inputField.score_type}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                /> */}
                <select
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "score_type",
                      },
                    })
                  }
                  name="score_type"
                  value={inputField.score_type}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md pl-2 mb-2 rounded border border-primary"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="GPA">GPA</option>
                  <option value="PER">PER</option>
                </select>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Institute</div>
                <input
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "institute",
                      },
                    })
                  }
                  name="institute"
                  type="text"
                  style={{ width: "100%" }}
                  value={inputField.institute}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Institute Country</div>
                <input
                  onChange={(event) =>
                    dispatch({
                      type: ACADEMIC_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "institute_country",
                      },
                    })
                  }
                  name="institute_country"
                  type="text"
                  style={{ width: "100%" }}
                  value={inputField.institute_country}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div>
                {index > 0 && (
                  <div className="py-1 cursor-pointer ">
                    <button
                      className="bg-pink4 text-white px-4 py-1 text-xs mt-5 ml-3 rounded-md"
                      onClick={() => removeAcademic(index, inputField.id)}
                    >
                      {saveAD && indexAD === index ? (
                        <div className="lds-ring mb-1.5">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* English proficiency starts here */}
      <div className="flex justify-between mt-10">
        <div className="w-72 shadow-lg">
          <p className="text-blue3 text-lg font-bold pl-3">
            English Proficiency
          </p>
        </div>
        <div>
          <span
            onClick={() =>
              dispatch({
                type: ADD_ENGLISH_PRO,
                payload: {
                  name: "",
                  overall_score: "",
                  reading: "",
                  writing: "",
                  listening: "",
                  speaking: "",
                },
              })
            }
            className="text-sm cursor-pointer bg-blue3 text-white px-3 py-1 rounded hover:bg-blue2"
          >
            Add More
          </span>
        </div>
      </div>
      <div className="mt-4">
        {english_error && <div className="text-pink4">{english_error}</div>}
        {english_proficiency.map((inputField, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2  p-3 ${
                index % 2 === 0 ? "" : "bg-pink-50"
              }`}
            >
              <div className="col-span-1">
                <div className="font-semibold text-sm">English Test</div>
                <select
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "name",
                      },
                    })
                  }
                  name="name"
                  value={inputField.name}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md pl-2 mb-2 rounded border border-primary"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="IELTS">IELTS</option>
                  <option value="PTE">PTE</option>
                </select>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Listening</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "listening",
                      },
                    })
                  }
                  name="listening"
                  type="number"
                  value={inputField.listening}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Speaking</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "speaking",
                      },
                    })
                  }
                  name="speaking"
                  type="number"
                  value={inputField.speaking}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Writing</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "writing",
                      },
                    })
                  }
                  name="writing"
                  type="number"
                  value={inputField.writing}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Reading</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "reading",
                      },
                    })
                  }
                  name="reading"
                  type="number"
                  value={inputField.reading}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-sm">Overall Score</div>
                <input
                  onKeyPress={(event) => {
                    if (!/[0-9||.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) =>
                    dispatch({
                      type: ENGLISH_PRO_UPDATE,
                      payload: {
                        index: index,
                        value: event.target.value,
                        property: "overall_score",
                      },
                    })
                  }
                  name="overall_score"
                  type="number"
                  value={inputField.overall_score}
                  style={{ width: "100%" }}
                  className="h-8 shadow-md p-2 mb-2 rounded border border-primary"
                />
              </div>
              <div>
                {index > 0 && (
                  <div className="py-1 cursor-pointer ">
                    <button
                      className="bg-pink4 text-white px-4 py-1 text-xs mt-5 ml-3 rounded-md"
                      onClick={() => removeEnglish(index, inputField.id)}
                    >
                      {saveEN && indexEN === index ? (
                        <div className="lds-ring mb-1.5">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Education;
