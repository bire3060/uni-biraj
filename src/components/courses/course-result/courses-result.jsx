import React, { useEffect, useState } from "react";
import CourseCard from "../../common/course-card";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { COURSE_DATA } from "../../../redux/actions/actionsTypes";
import { COURSE_COUNT } from "../../../redux/actions/courseFilterTypes";
// import Pagination from "../../common/Pagination";
import PaginationCourses from "../../common/PaginationCourses";
import DataLoader from "../../common/Loader";

const CoursesResult = ({ addToCompare, closePopup, courseSort }) => {
  const dispatch = useDispatch();
  // current button
  const { currentButtonVal } = useSelector((state) => state.currentButtonValue);

  const [firstSearch, setFirstSearch] = useState(null);
  const [secondSearch, setSecondSearch] = useState(null);
  const [thirdSearch, setThirdSearch] = useState(null);
  const [page, setPage] = useState("");

  const [handleScrollPagination, setHandleScrollPagination] = useState(true);

  const [courses, setCourses] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  const [errorLoader, setErrorLoader] = useState(false);
  const { cat_category } = useSelector((state) => state.catCourse);

  const [courseCount, setCourseCount] = useState(null);
  // const [timeOutError, setTimeOutError] = useState(true);
  const { headerInput } = useSelector((state) => state.headerFilter);

  // const { country_city } = useSelector((state) => state.countryCourseFilter);
  const { countryId } = useSelector((state) => state.headerFilter);
  const {
    study_mode,
    study_load,
    tryCategory,
    tryCity,
    tryDuration,
    tryDegree,
  } = useSelector((state) => state.courseFilter);
  const { category_home, city_home, degree_level_home } = useSelector(
    (state) => state.homeCourseFilter
  );
  const { minRange, maxRange } = useSelector((state) => state.multiRangeSlider);

  const {
    degree_level_started,
    category_started,
    city_started,
    study_load_started,
    study_mode_started,
    duration_started,
    // course_data,
  } = useSelector((state) => state.getStarted);

  // console.log("getstarted" + city_started);
  // console.log("course filter page" + tryCity);

  const commonApi = (api, signal) => {
    axiosInstance
      .get(
        api,

        { signal }
      )
      .then((res) => {
        setMainLoader(false);

        setPage(res.data.total_pages);

        dispatch({
          type: COURSE_COUNT,
          payload: res.data.count,
        });

        setCourseCount(res.data.count);

        setCourses(res.data.results);

        setMainLoader(false);

        dispatch({ type: COURSE_DATA, payload: { ...courses } });
      })
      .catch((err) => {
        setMainLoader(false);
        setErrorLoader(true);
        // setTimeOutError(false);
        // toast.error("Something went wrong", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

  // compressing the min and max range values
  let magicValue;
  if (maxRange && minRange >= 0) {
    magicValue = minRange + "," + maxRange;
  } else {
    magicValue = "";
  }

  const getCoursesLists = (signal) => {
    if (category_home !== "" && city_home !== "" && degree_level_home !== "") {
      setFirstSearch(3);

      if (firstSearch === 3) {
        let api = `/courses/course-filter/?page=${currentButtonVal}&institution__address__id__in=${[
          city_home,
        ]}&category__in=${[category_home]}&degree_level__in=${[
          degree_level_home,
        ]}`;
        commonApi(api, signal);
      }
    } else if (
      degree_level_started !== "" &&
      category_started !== "" &&
      city_started !== "" &&
      study_load_started !== "" &&
      study_mode_started !== "" &&
      duration_started !== ""
    ) {
      console.log("hello")
      setSecondSearch(6);

      if (secondSearch === 6) {
        let api = `/courses/course-filter/?page=${currentButtonVal}&category__in=${[
          category_started,
        ]}&degree_level__in=${[
          degree_level_started,
        ]}&duration__in=${duration_started}&study_mode__in=${[
          study_mode_started,
        ]}&study_load__in=${[study_load_started]}&institution__address__id__in=${city_started}`;
        commonApi(api, signal);
      }
    } else if (cat_category !== "") {
      setThirdSearch(1);

      if (thirdSearch === 1) {
        let api = `/courses/course-filter/?page=${currentButtonVal}&category__in=${[
          cat_category,
        ]}
     `;
        commonApi(api, signal);
      }
      // } else if (country_city !== "") {
      //   setFourthSearch(1);
      //   if (fourthSearch === 1) {
      //     let api = `/courses/course-filter/?page=${currentButtonVal}&institution__address__country__id__in=${[
      //       country_city
      //     ]}`
      //     commonApi(api, signal);
      //   }
    } else {
      setMainLoader(true);
      window.scrollTo(0, 0);
      let api = `/courses/course-filter/?page=${currentButtonVal}&institution__address__id__in=${tryCity}&degree_level__in=${tryDegree}&category__in=${
        tryCategory || ""
      }&duration__in=${tryDuration}&study_mode__in=${study_mode}&study_load__in=${study_load}&international_fee__range=${magicValue}&ordering=${courseSort}&title__icontains=${headerInput}`;

      commonApi(api, signal);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getCoursesLists();
    return () => controller.abort();
    // eslint-disable-next-line
  }, [
    tryCategory,
    currentButtonVal,
    tryCity,
    tryDegree,
    study_load,
    study_mode,
    tryDuration,
    headerInput,
    minRange,
    maxRange,
    courseSort,
  ]);

  return (
    <div className="courses-result">
      {/* {load && <Preloader />} */}
      {/* {courses.length === 0 && (
        <div className="flex mt-4 h-full w-full justify-center text-gray-700">
          No Data Is Available
        </div>
      )} */}
      {mainLoader ? (
        <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
          <span className="text-lg">Loading</span>
          <span>
            <DataLoader />
          </span>
        </div>
      ) : (
        <>
          <div className="pt-2 md:pt-4 xl:pt-6 xl:pl-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <CourseCard
                  addToCompare={addToCompare}
                  closePopup={closePopup}
                  key={index}
                  {...course}
                  setCourses={setCourses}
                  courses={courses}
                  index={index}
                />
              ))
            ) : (
              <div
                className={`flex mt-4  w-full justify-center ml-60 text-gray-700 `}
              >
                No Data Is Available
              </div>
            )}
          </div>
          <div className="mt-10">
            {page > 1 && (
              <PaginationCourses
                handleScrollPagination={handleScrollPagination}
                page={page}
                // setMainLoader={setMainLoader}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(CoursesResult);
