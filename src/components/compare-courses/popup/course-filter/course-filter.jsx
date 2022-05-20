import React, { useState, useEffect } from "react";
import FilterDropdown from "./filter-dropdown";
import StudyMode from "../StudyRadio/StudyMode";
import StudyLoad from "../StudyRadio/StudyLoad";
import * as actions from "../../../../redux/actions/action";
import { REMOVE_HOME_COURSES_FILTER } from "../../../../redux/actions/home_page_course_filter";
import { REMOVE_GET_STARTED_FILTER } from "../../../../redux/actions/getStartedType";
import { REMOVE_CAT_COURSE } from "../../../../redux/actions/cat_course_type";
import { REMOVE_COUNTRY_COURSE } from "../../../../redux/actions/country_course_type";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import ClearStudyMode from "../../../courses/StudyRadio/ClearStudyMode";
import ClearStudyLoad from "../../../courses/StudyRadio/ClearStudyLoad";
import {
  studyLoadValue,
  studyModeValue,
} from "../../../../redux/actions/study";
import { currentButtonReset } from "../../../../redux/actions/currentButtonReset";
import { rangeSliderHandler } from "../../../../redux/actions/rangeSliderHandler";
import ResetRangeSlider from "../../../home/slider/range-slider/ResetRangeSlider";
import RangeSlider from "../../../home/slider/range-slider/range-slider";
import { clearRangeSlider } from "../../../../redux/actions/clearRangeSlider";

const CourseFilter = ({ setSearchValue }) => {
  const dispatch = useDispatch();

  // duration first
  let duration1 = [];

  for (let i = 0; i <= 12; i++) {
    duration1.push(i);
  }

  // duration first
  let duration2 = [];

  for (let i = 13; i <= 24; i++) {
    duration2.push(i);
  }

  // duration first
  let duration3 = [];

  for (let i = 25; i <= 36; i++) {
    duration3.push(i);
  }

  // duration first
  let duration4 = [];

  for (let i = 37; i <= 48; i++) {
    duration4.push(i);
  }

  // duration first
  let duration4Plus = [];

  for (let i = 49; i <= 96; i++) {
    duration4Plus.push(i);
  }

  const initialSingleHeaderFilterOptions = [
    {
      header: "Categories",
      expand: true,
      options: [],
    },
    {
      header: "Degree Level",
      expand: true,
      options: [],
    },
    {
      header: "Duration",
      expand: true,
      options: [
        {
          checked: false,
          label: "1 Year",
          level: duration1.join(),
        },
        {
          checked: false,
          label: "2 Years",
          level: duration2.join(),
        },
        {
          checked: false,
          label: "3 Years",
          level: duration3.join(),
        },
        {
          checked: false,
          label: "4 Years",
          level: duration4.join(),
        },
        {
          checked: false,
          label: "4+ Years",
          level: duration4Plus.join(),
        },
      ],
    },
  ];
  const { degree_level_home, category_home, city_home } = useSelector(
    (state) => state.homeCourseFilter
  );
  const {
    degree_level_started,
    category_started,
    city_started,
    country_started,
    duration_started,
  } = useSelector((state) => state.getStarted);

  const { isClearingRange } = useSelector((state) => state.isClearingRange);

  const { clearStudyLoad, clearStudyMode } = useSelector(
    (state) => state.studyType
  );

  const [countries, setCountries] = useState([]);
  const [singleHeaderFilterOptions, setSingleHeaderFilterOptions] = useState([
    ...initialSingleHeaderFilterOptions,
  ]);

  // // range slider state
  // const [rangeValues, setRangeValues] = useState({
  //   minRangeValue: 0,
  //   maxRangeValue: 0,
  // });
  // const { minRangeValue, maxRangeValue } = rangeValues;

  const handleReset = () => {
    setSearchValue("");
    // resetting the range slider
    dispatch(clearRangeSlider(!isClearingRange));
    // resetting the range slider
    dispatch(
      rangeSliderHandler({
        rangeFilter: { minValue: 0, maxValue: 200000 },
      })
    );

    // clearing the study mode and study load
    dispatch(studyLoadValue(!clearStudyLoad));
    dispatch(studyModeValue(!clearStudyMode));

    // courses filter front side
    dispatch({ type: REMOVE_HOME_COURSES_FILTER });
    dispatch({ type: REMOVE_GET_STARTED_FILTER });
    dispatch(actions.reset_course_data());
    let newCont = [...countries];
    let newSingleHeaderFilterOptions = [...singleHeaderFilterOptions];
    for (let i = 0; i < newCont.length; i++) {
      for (let j = 0; j < newCont[i].options.length; j++) {
        newCont[i].options[j].checked = false;
      }
    }
    for (let i = 0; i < newSingleHeaderFilterOptions.length; i++) {
      for (let j = 0; j < newSingleHeaderFilterOptions[i].options.length; j++) {
        newSingleHeaderFilterOptions[i].options[j].checked = false;
      }
    }
    setCountries(newCont);
    setSingleHeaderFilterOptions(newSingleHeaderFilterOptions);
  };
  const handleExpandOrChange = (index, i, filter, property) => {
    dispatch(currentButtonReset(1));
    const newArray =
      filter === "countries" ? [...countries] : [...singleHeaderFilterOptions];
    if (property === "checked") {
      newArray[index].options[i].checked = !newArray[index].options[i].checked;
      // filter toggle
      if (newArray[index].header === "Categories") {
        if (newArray[index].options[i].checked === true) {
          dispatch(actions.add_categories(newArray[index].options[i].id));
        } else {
          dispatch(actions.remove_categories(newArray[index].options[i].id));
        }
      } else if (newArray[index].header === "Degree Level") {
        if (newArray[index].options[i].checked === true) {
          dispatch(actions.add_degree_level(newArray[index].options[i].id));
        } else {
          dispatch(actions.remove_degree_level(newArray[index].options[i].id));
        }
      } else if (newArray[index].header === "Duration") {
        if (newArray[index].options[i].checked === true) {
          dispatch(actions.add_duration(newArray[index].options[i].level));
        } else {
          dispatch(actions.remove_duration(newArray[index].options[i].level));
          // dispatch(actions.remove_duration(newArray[index].options[i].label));
        }
      } else {
        if (newArray[index].options[i].checked === true) {
          dispatch(actions.add_country(newArray[index].options[i].id));
        } else {
          dispatch(actions.remove_country(newArray[index].options[i].id));
        }
      }
    } else {
      newArray[index][property] = !newArray[index][property];
    }

    filter === "countries"
      ? setCountries(newArray)
      : setSingleHeaderFilterOptions(newArray);
  };
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        let dataArray = [];
        let header = "";
        let cities = [];
        let count = 0;
        let totalCities = [];
        let cityStore = [];
        for (let i = 0; i < res.data.length; i++) {
          cities = [];
          header = "";
          header = res.data[i].title;
          totalCities = res.data[i].cities;
          for (let j = 0; j < totalCities.length; j++) {
            count = count + 1;
            cityStore = [...cityStore, res.data[i].cities[j].id];
            cities = [
              ...cities,
              {
                checked: false,
                label: res.data[i].cities[j].title,
                id: res.data[i].cities[j].id,
              },
            ];
          }
          cities.forEach((data) => {
            if (city_home === data.id) {
              data.checked = true;
            }
          });
          dataArray = [
            ...dataArray,
            {
              header: header,
              expand: false,
              options: cities,
            },
          ];
        }
        dataArray.forEach((arr) => {
          if (arr.header === country_started) {
            arr.options.forEach((data) => {
              data.checked = true;
            });
          }
        });
        dispatch(actions.add_country(cityStore));
        dispatch(actions.add_count("city_count", count));
        setCountries(dataArray);
        if (city_home !== "") {
          dispatch(actions.add_country(city_home));
          dispatch(actions.add_count("city_count", count + 1));
        }
        if (country_started !== "") {
          for (let i = 0; i < city_started.length; i++) {
            dispatch(actions.add_country(city_started[i]));
          }
          dispatch(actions.add_count("city_count", count + 1));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        let newval = [...singleHeaderFilterOptions];
        let categories = [];
        let catStore = [];
        for (let i = 0; i < res.data.length; i++) {
          catStore = [...catStore, res.data[i].id];
          categories = [
            ...categories,
            {
              checked: false,
              label: res.data[i].title,
              id: res.data[i].id,
            },
          ];
        }
        categories.forEach((data) => {
          if (data.id === category_home) {
            data.checked = true;
          } else if (data.id === category_started) {
            data.checked = true;
          }
        });
        newval[0].options = categories;
        setSingleHeaderFilterOptions(newval);

        dispatch(actions.add_categories(catStore));
        dispatch(actions.add_count("categories_count", res.data.length));
        if (category_home !== "") {
          dispatch(actions.add_categories(category_home));
          dispatch(actions.add_count("categories_count", res.data.length + 1));
        }
        if (category_started !== "") {
          dispatch(actions.add_categories(category_started));
          dispatch(actions.add_count("categories_count", res.data.length + 1));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setDurationStore = () => {
    let duration = initialSingleHeaderFilterOptions[2].options;
    let newVal = [...initialSingleHeaderFilterOptions];
    let durationStore = [];
    for (let i = 0; i < duration.length; i++) {
      durationStore = [...durationStore, duration[i].level];
    }
    duration.forEach((data) => {
      if (data.level === duration_started) {
        data.checked = true;
      }
    });
    // console.log(duration);
    newVal[1].options = duration;
    setSingleHeaderFilterOptions(newVal);
    dispatch(actions.add_duration(durationStore));
    dispatch(actions.add_count("duration_count", duration.length));
    if (duration_started !== "") {
      dispatch(actions.add_duration(duration_started));
      dispatch(actions.add_count("duration_count", duration.length + 1));
    }
  };
  const getDegreeLevel = (signal) => {
    axiosInstance
      .get(`/courses/degree-level/list/`, { signal })
      .then((res) => {
        let newval = [...singleHeaderFilterOptions];
        let degree_level = [];
        let degree_level_store = [];
        for (let i = 0; i < res.data.length; i++) {
          degree_level_store = [...degree_level_store, res.data[i].id];
          degree_level = [
            ...degree_level,
            {
              checked: false,
              label: res.data[i].title,
              id: res.data[i].id,
            },
          ];
        }
        degree_level.forEach((data) => {
          if (data.id === degree_level_home) {
            data.checked = true;
          } else if (data.id === degree_level_started) {
            data.checked = true;
          }
        });
        newval[1].options = degree_level;
        setSingleHeaderFilterOptions(newval);
        dispatch(actions.add_degree_level(degree_level_store));
        dispatch(actions.add_count("degree_level_count", res.data.length));
        if (category_home !== "") {
          dispatch(actions.add_degree_level(degree_level_home));
          dispatch(
            actions.add_count("degree_level_count", res.data.length + 1)
          );
        }
        if (degree_level_started !== "") {
          dispatch(actions.add_degree_level(degree_level_started));
          dispatch(
            actions.add_count("degree_level_count", res.data.length + 1)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    getCategoryList(signal);
    setDurationStore();
    getDegreeLevel(signal);
    return function cleanup() {
      controller.abort();
      dispatch(actions.remove_store_field());
      dispatch({ type: REMOVE_HOME_COURSES_FILTER });
      dispatch({ type: REMOVE_GET_STARTED_FILTER });
      dispatch({ type: REMOVE_CAT_COURSE });
      dispatch({ type: REMOVE_COUNTRY_COURSE });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="courses-filter overflow-hidden text-gray7">
      <div className="flex justify-between items-center pt-6 pb-3 border-b border-gray3">
        <div className="text-lg">Filters</div>
        <div
          className="text-pink4 flex items-center space-x-2 cursor-pointer text-sm font-bold"
          onClick={handleReset}
        >
          <div>
            <svg viewBox="0 0 512 512" className="w-4 h-4" fill="currentColor">
              <g>
                <path d="m464.022 232h-.022a24 24 0 0 0 -23.98 24.021 184.063 184.063 0 0 1 -289.527 150.688c-83.1-58.188-103.369-173.136-45.181-256.237s173.137-103.372 256.237-45.182a184.078 184.078 0 0 1 34.012 30.71h-67.54a24 24 0 0 0 0 48h112a24 24 0 0 0 24-24v-112a24 24 0 0 0 -48 0v39.967a234.175 234.175 0 0 0 -26.94-22 231.982 231.982 0 1 0 -266.119 380.061 230.285 230.285 0 0 0 132.567 42.015 234.971 234.971 0 0 0 40.776-3.585 232.025 232.025 0 0 0 191.716-228.479 24 24 0 0 0 -23.999-23.979z" />
              </g>
            </svg>
          </div>
          <div>Reset</div>
        </div>
      </div>
      <div className="space-y-5 py-5 text-sm">
        <div>
          <div className="mb-3 font-bold uppercase">Countries</div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3">
            {countries.map((country, index) => (
              <FilterDropdown
                key={index}
                index={index}
                {...country}
                handleExpand={() =>
                  handleExpandOrChange(index, null, "countries", "expand")
                }
                handleChange={(i) =>
                  handleExpandOrChange(index, i, "countries", "checked")
                }
              />
            ))}
          </div>
        </div>
        {singleHeaderFilterOptions.map((filterOption, index) => (
          <FilterDropdown
            key={index}
            index={index}
            {...filterOption}
            handleExpand={() =>
              handleExpandOrChange(index, null, null, "expand")
            }
            handleChange={(i) =>
              handleExpandOrChange(index, i, null, "checked")
            }
            noSubHeaders={true}
          />
        ))}
        <div>{isClearingRange ? <ResetRangeSlider /> : <RangeSlider />}</div>
        {/* <div>
          <MinMaxInput />
        </div> */}
        <div>
          <div>{clearStudyMode ? <ClearStudyMode /> : <StudyMode />}</div>
        </div>
        <div>{clearStudyLoad ? <ClearStudyLoad /> : <StudyLoad />}</div>
      </div>
    </div>
  );
};

export default React.memo(CourseFilter);
