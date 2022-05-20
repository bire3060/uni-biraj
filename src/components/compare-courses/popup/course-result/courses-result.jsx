import React, { useEffect, useState } from "react";
import CourseCard from "../../../common/course-card";
import axiosInstance from "../../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { COURSE_DATA } from "../../../../redux/actions/actionsTypes";
import { COURSE_COUNT } from "../../../../redux/actions/courseFilterTypes";
// import { toast } from "react-toastify";
// import Loader from "react-loader-spinner";
import PaginationCourses from "../../../../components/common/PaginationCourses";
import DataLoader from "../../../common/Loader";

const CoursesResult = ({
  addToCompare,
  closePopup,
  courses,
  setCourses,
  page,
  setPage,
  searchLoader,
  searchValue,
}) => {
  const dispatch = useDispatch();
  // current button
  const { currentButtonVal } = useSelector((state) => state.currentButtonValue);

  const [handleScrollPagination, setHandleScrollPagination] = useState(true);

  // const [courses, setCourses] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  const [errorLoader, setErrorLoader] = useState(false);

  // getting the search data
  const { headerInput } = useSelector((state) => state.headerFilter);

  const { minRange, maxRange } = useSelector((state) => state.multiRangeSlider);

  const {
    study_mode,
    study_load,
    tryCategory,
    tryCity,
    tryDuration,
    tryDegree,
  } = useSelector((state) => state.courseFilter);

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

        // setCourseCount(res.data.count);

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
    setMainLoader(true);

    let api = `/courses/course-filter/?page=${currentButtonVal}&institution__address__id__in=${tryCity}&degree_level__in=${tryDegree}&category__in=${
      tryCategory || ""
    }&duration__in=${tryDuration}&study_mode__in=${study_mode}&study_load__in=${study_load}&international_fee__range=${magicValue}&title__icontains=${searchValue}`;

    commonApi(api, signal);
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
    // minMaxInputs,
    // headerInput,
    minRange,
    maxRange,
  ]);

  return (
    <div className="courses-result">
      {/* {load && <Preloader />} */}
      {/* {courses.length === 0 && (
        <div className="flex mt-4 h-full w-full justify-center text-gray-700">
          No data is available
        </div>
      )} */}
      {mainLoader || searchLoader ? (
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
                  // setRemoveWishlist={setRemoveWishlist}
                  // removeWishlist={removeWishlist}
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
