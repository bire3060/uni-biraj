import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import {
  COURSE_BASIC_DETAIL_ADD,
  COURSE_INSTITUTE_ADD,
  COURSE_CATEGORY_ADD,
  ADD_DEGREE_LEVEL_BASIC,
} from "../../../../redux/actions/actionsTypes";
import { basicDetailFields } from "./input-fields";

const CoursesBasicDetails = ({ institute, degreeLevel, category }) => {
  const error = useSelector((state) => state.course.errors);
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [instituteToggle, setInstituteToggle] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [degreeLevelToggle, setdegreeLevelToggle] = useState(false);

  // const [modeToggle, setModeToggle] = useState(false);
  const [instituteList, setInstituteList] = useState([]);
  const [degreeLevelList, setdegreeLevelList] = useState([]);
  const [selectedDegreeLevelList, setselectedDegreeLevelList] = useState(
    course.degree_level !== undefined ? course.degree_level : []
  );
  const [selectedInstitue, setSelecetdInstitue] = useState(
    course.institute !== undefined ? course.institute : []
  );
  const [courseCategoryList, setCourseCategoryList] = useState([]);
  const [selecetdCourseCategoryList, setSelecetdCourseCategoryList] = useState(
    course.category !== undefined ? course.category : []
  );
  // console.log(selectedDegreeLevelList);
  useEffect(() => {
    institute !== "" && setSelecetdInstitue(institute);
    category !== "" && setSelecetdCourseCategoryList(category);
    degreeLevel !== "" && setselectedDegreeLevelList(degreeLevel);
    // if (
    //   course.institute === undefined ||
    //   course.degree_level === undefined ||
    //   course.category === undefined
    // ) {
    axiosInstance
      .get(`/institutes/all-list/`)
      .then((res) => {
        setInstituteList(res.data);
        // setSelecetdInstitue(res.data[0]);
        // dispatch({
        //   type: COURSE_INSTITUTE_ADD,
        //   payload: res.data[0].id,
        // });
      })
      .catch((err) => {
        console.error(err);
      });
    axiosInstance
      .get(`/courses/only-category/list/`)
      .then((res) => {
        setCourseCategoryList(res.data);
        // setSelecetdCourseCategoryList(res.data[0]);
        // dispatch({
        //   type: COURSE_CATEGORY_ADD,
        //   payload: res.data[0].id,
        // });
      })
      .catch((err) => {
        console.error(err);
      });
    axiosInstance
      .get(`/courses/degree-level/list/`)
      .then((res) => {
        setdegreeLevelList(res.data);
        // setselectedDegreeLevelList(res.data[0]);
        // dispatch({
        //   type: ADD_DEGREE_LEVEL_BASIC,
        //   payload: res.data[0].id,
        // });
      })
      .catch((err) => {
        console.error(err);
      });
    // }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   // alert("hey");
  //   dispatch({
  //     type: COURSE_INSTITUTE_ADD,
  //     payload: course.institute,
  //   });
  //   dispatch({
  //     type: COURSE_CATEGORY_ADD,
  //     payload: course.category,
  //   });
  //   dispatch({
  //     type: ADD_DEGREE_LEVEL_BASIC,
  //     payload: course.degree_level,
  //   });
  //   // eslint-disable-next-line
  // }, []);
  return (
    <div className=" mx-auto border border-gray-200 rounded-lg">
      
      {/* institute  */}
      <div className={`sm:flex items-center border-b border-gray-400 sm:pr-4`}>
        <div className="sm:w-40 w-full h-full sm:pl-4 flex items-center bg-gray-200 ">
          Institute
        </div>
        <div className="flex-1 relative">
          <div
            className="flex justify-between  w-full px-3 rounded-full cursor-pointer items-center z-20 "
            onClick={() => {
              setInstituteToggle((instituteToggle) => !instituteToggle);
              setCategoryToggle(false);
              setdegreeLevelToggle(false);
            }}
          >
            <p className="flex-1">
              {selectedInstitue ? selectedInstitue.name : ""}
            </p>
            <div className="">
              <div className="text-white bg-blue-400 rounded-full p-0.5">
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {instituteToggle && (
            <div className="absolute inset-x-0 top-8 w-full flex flex-col bg-white text-black z-10 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer h-64 overflow-auto">
              {Array.isArray(instituteList) &&
                instituteList.map((i, index) => {
                  return (
                    <div
                      className="px-4"
                      key={index}
                      onClick={() => {
                        setSelecetdInstitue(i);
                        dispatch({
                          type: COURSE_INSTITUTE_ADD,
                          payload: i,
                        });
                        setInstituteToggle(false);
                        setdegreeLevelToggle(false);
                      }}
                    >
                      {i.name}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {error.institute && (
          <div className="text-sm text-red-400">{error.institute}</div>
        )}
      </div>
      {/* category  */}
      <div className={`sm:flex items-center border-b border-gray-400 sm:pr-4`}>
        <div className="sm:w-40 w-full h-full sm:pl-4 flex items-center bg-gray-200 ">
          Category
        </div>
        <div className="flex-1 relative">
          <div
            className="flex justify-between  w-full px-3 rounded-full cursor-pointer items-center z-20"
            onClick={() => {
              setCategoryToggle((categoryToggle) => !categoryToggle);
              setInstituteToggle(false);
              setdegreeLevelToggle(false);
            }}
          >
            <p className="flex-1">
              {selecetdCourseCategoryList
                ? selecetdCourseCategoryList.title
                : ""}
            </p>
            <div className="">
              <div className="text-white bg-blue-400 rounded-full p-0.5">
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {categoryToggle && (
            <div className="absolute inset-x-0 top-8 w-full flex flex-col bg-white text-black z-10 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer  h-64 overflow-auto">
              {Array.isArray(courseCategoryList) &&
                courseCategoryList.map((i, index) => {
                  return (
                    <div
                      className="px-4"
                      key={index}
                      onClick={() => {
                        setSelecetdCourseCategoryList(i);
                        dispatch({
                          type: COURSE_CATEGORY_ADD,
                          payload: i,
                        });
                        setCategoryToggle(false);
                        setdegreeLevelToggle(false);
                        setInstituteToggle(false);
                      }}
                    >
                      {i.title}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {error.category && (
          <div className="text-sm text-red-400">{error.category}</div>
        )}
      </div>
      {/* degree level  */}
      <div className={`sm:flex items-center border-b border-gray-400 sm:pr-4`}>
        <div className="sm:w-40 w-full h-full sm:pl-4 flex items-center bg-gray-200 ">
          Degree Level
        </div>
        <div className="flex-1 relative">
          <div
            className="flex justify-between  w-full px-3 rounded-full cursor-pointer items-center z-20"
            onClick={() => {
              setCategoryToggle(false);
              setInstituteToggle(false);
              setdegreeLevelToggle((degreeLevelToggle) => !degreeLevelToggle);
            }}
          >
            <p className="flex-1">
              {selectedDegreeLevelList ? selectedDegreeLevelList.title : ""}
            </p>
            <div className="">
              <div className="text-white bg-blue-400 rounded-full p-0.5">
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {degreeLevelToggle && (
            <div className="absolute inset-x-0 top-8 w-full flex flex-col bg-white text-black z-0 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer ">
              {Array.isArray(degreeLevelList) &&
                degreeLevelList.map((i, index) => {
                  return (
                    <div
                      className="px-4"
                      key={index}
                      onClick={() => {
                        setselectedDegreeLevelList(i);
                        dispatch({
                          type: ADD_DEGREE_LEVEL_BASIC,
                          payload: i,
                        });
                        setdegreeLevelToggle(false);
                        setCategoryToggle(false);
                        setInstituteToggle(false);
                      }}
                    >
                      {i.title}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {error.category && (
          <div className="text-sm text-red-400">{error.category}</div>
        )}
      </div>
      {/* remaining fileds */}
      {basicDetailFields.map((field, index) => {
        const { property, label, type } = field;
        const error = course.errors[property];
        return (
          <div
            key={index}
            className={`sm:flex items-center  sm:pr-4 ${
              basicDetailFields.length - 1 > index && "border-b border-gray-400"
            }`}
          >
            <div className="sm:w-40 w-full h-full sm:pl-4 flex items-center bg-gray-200">
              {label}
            </div>
            <input
              className="flex-1 w-full px-2"
              spellCheck="false"
              type={type}
              name={label}
              value={course[property]}
              onChange={(event) =>
                dispatch({
                  type: COURSE_BASIC_DETAIL_ADD,
                  payload: {
                    property: property,
                    value: event.target.value,
                  },
                })
              }
            />
            {error && <div className="text-sm text-red-400">{error}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default CoursesBasicDetails;
