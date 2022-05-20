import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { AdvancedSelectField } from "../../common/input-field";
import axiosInstance from "../../../api/axiosInstance";
import {
  ADD_DEGREE_LEVEL_HOME,
  ADD_COURSES,
  ADD_CITIES,
} from "../../../redux/actions/home_page_course_filter";
import { useDispatch, useSelector } from "react-redux";
const headers = ["Courses", "Universities"];
const CoursesAndUniversitiesForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeHeader, setActiveHeader] = useState("Courses");
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [category, setCategory] = useState([]);
  const [cities, setCities] = useState([]);
  const [courseErr, setCourseErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [coursesVal, setCoursesVal] = useState("");
  const [locationVal, setLocationVal] = useState("");

  const { category_home, city_home, degree_level_home } = useSelector(
    (state) => state.homeCourseFilter
  );
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDegreeLevel = (signal) => {
    axiosInstance
      .get(`/courses/degree-level/list/`, { signal })
      .then((res) => {
        let val = [];
        for (let i = 0; i < res.data.length; i++) {
          val.push({
            label: res.data[i].title,
            value: res.data[i].id,
          });
        }
        setDegreeLevels(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        let val = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].cities.length; j++) {
            val.push({
              id: res.data[i].cities[j].id,
              title: res.data[i].cities[j].title,
            });
          }
        }
        setCities(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDegreeSelect = (data) => {
    console.log(data);
    dispatch({
      type: ADD_DEGREE_LEVEL_HOME,
      payload: parseInt(data),
    });
  };

  const handleCoursesChange = (value) => {
    const categories = [...category];
    let newVal = categories.filter((data) => data.title === value);
    if (newVal.length > 0) {
      setCourseErr("");
      dispatch({
        type: ADD_COURSES,
        payload: newVal[0].id,
      });
    }
    //  else {
    //   setCourseErr("Invalid Course");
    // }
    !activeHeader === "courses" && setCoursesVal(value);
  };
  const handleLocationChange = (value) => {
    const location = [...cities];
    console.log(location);
    let newVal = location.filter((data) => data.title === value);
    if (newVal.length > 0) {
      setLocationErr("");
      dispatch({
        type: ADD_CITIES,
        payload: newVal[0].id,
      });
    }
    //  else {
    //   setLocationErr("Invalid Location");
    // }
    !activeHeader === "courses" && setLocationVal(value);
  };
  // searching the courses and universities
  const handleSearch = () => {
    if (category_home === "") {
      setCourseErr("Select The Course");
    } else if (city_home === "") {
      setLocationErr("Select The Location.");
    } else if (courseErr === "" && locationErr === "") {
      activeHeader === "Courses"
        ? history.push("/courses")
        : history.push("/universities");
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCategoryList(signal);
    getDegreeLevel(signal);
    getCountryList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl space-y-5">
      <div className="flex space-x-4 font-semibold">
        {headers.map((header, index) => {
          return (
            <div
              key={index}
              className={` transition-all duration-500
                ${
                  activeHeader === header
                    ? "text-pink4 cursor-default"
                    : "text-gray-500 cursor-pointer"
                }`}
              onClick={() => {
                if (activeHeader !== header) {
                  setActiveHeader(header);
                }
              }}
            >
              <div>{header}</div>
              <div
                className={`w-7 h-0.5 mx-auto transition-all duration-500 ${
                  activeHeader === header ? "bg-pink4" : "bg-transparent"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className=" text-xs space-y-2">
        {/* <AdvancedSelectField
          label="Degree Level"
          options={degreeLevels}
          handleChange={handleDegreeSelect}
        /> */}
        {activeHeader === "Courses" && (
          <div className="advanced-select relative bg-gray2 py-2.5 rounded-xl border border-gray4">
            <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
              Degree Level
            </label>
            <select
              className="w-full rounded-xl appearance-none px-3 text-sm bg-gray2 pt-5"
              onChange={(e) => handleDegreeSelect(e.target.value)}
            >
              <option className="bg-gray2 hover:bg-red-400 py-2" hidden>
                Select the degree level
              </option>
              {degreeLevels.map((option, index) => {
                const { value, label } = option;
                return (
                  <option
                    key={index}
                    value={value}
                    className="bg-gray2 hover:bg-red-400 py-2"
                  >
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {/* courses */}
        {/* <div className="relative rounded-2xl border border-gray4 bg-gray2 py-2.5 px-2 flex flex-col w-auto">
          <div className="absolute w-auto flex items-center space-x-2">
            <label
              htmlFor="courses"
              className=" px-3 font-bold tracking-wide pointer-events-none"
            >
              Courses
            </label>
          </div>
          <input
            list="courses"
            id="courses-choice"
            name="courses-choice"
            className="w-auto placeholder-gray-500 bg-gray2 px-3 p-2 text-sm mt-2"
            placeholder="Select Courses"
            onChange={(e) => handleCoursesChange(e.target.value)}
          />
          <datalist id="courses">
            {Array.isArray(category) &&
              category.map((cat, index) => {
                return (
                  <option value={cat.title} key={index} className="w-auto" />
                );
              })}
          </datalist>
          {courseErr && (
            <span className="text-red-600 text-xs absolute top-2 right-2">
              {courseErr}
            </span>
          )}
        </div> */}

        <div className="advanced-select relative bg-gray2 py-2.5 rounded-xl border border-gray4">
          <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
            Courses
          </label>
          <select
            className="w-full rounded-xl appearance-none px-3 text-sm bg-gray2 pt-5"
            onChange={(e) => handleCoursesChange(e.target.value)}
          >
            <option className="bg-gray2 hover:bg-red-400 py-2" hidden>
              Select Courses
            </option>
            {category.map((cat, index) => {
              return (
                <option
                  key={index}
                  value={cat.title}
                  className="bg-gray2 hover:bg-red-400 py-2"
                >
                  {cat.title}
                </option>
              );
            })}
          </select>
          {courseErr && (
            <span className="text-red-600 text-xs absolute top-2 right-2">
              {courseErr}
            </span>
          )}
        </div>
        {/* Locations */}
        {/* <div className="relative rounded-2xl border border-gray4 bg-gray2 py-2.5 px-2 flex flex-col">
          <div className="absolute flex items-center space-x-2">
            <label
              htmlFor="locations"
              className=" px-3 font-bold tracking-wide pointer-events-none"
            >
              Location
            </label>
          </div>
          <input
            list="locations"
            id="locations-choice"
            name="locations-choice"
            className="w-full placeholder-gray-500 bg-gray2 px-3 p-2 text-sm mt-2"
            placeholder="Country or City"
            onChange={(e) => handleLocationChange(e.target.value)}
          />
          <datalist id="locations">
            {Array.isArray(cities) &&
              cities.map((city, index) => {
                const { title } = city;
                return <option value={title} key={index} />;
              })}
          </datalist>
          {locationErr && (
            <span className="text-red-600 absolute top-2 right-2">
              {locationErr}
            </span>
          )}
        </div> */}

        <div className="advanced-select relative bg-gray2 py-2.5 rounded-xl border border-gray4">
          <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
            Location
          </label>
          <select
            className="w-full rounded-xl appearance-none px-3 text-sm bg-gray2 pt-5"
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <option className="bg-gray2 hover:bg-red-400 py-2" hidden>
              Location or City
            </option>
            {cities.map((city, index) => {
              const { title } = city;

              return (
                <option
                  key={index}
                  value={title}
                  className="bg-gray2 hover:bg-red-400 py-2"
                >
                  {title}
                </option>
              );
            })}
          </select>
          {locationErr && (
            <span className="text-red-600 absolute top-2 right-2">
              {locationErr}
            </span>
          )}
        </div>
      </div>
      <div
        onClick={handleSearch}
        className="block bg-pink4 p-2 text-white font-semibold text-center rounded-full cursor-pointer hover:bg-pink5 transition-all duration-300"
      >
        Search
      </div>
    </div>
  );
};

export default CoursesAndUniversitiesForm;
