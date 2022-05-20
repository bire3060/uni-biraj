import React, { useRef, useState, useEffect } from "react";
import CourseFilter from "./course-filter/course-filter";
import CoursesResult from "./course-result/courses-result";
import Heading from "../../courses/heading";
import closeIcon from "../../../assets/images/Login/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changingInput,
  handleHeaderInput,
} from "../../../redux/actions/HeaderSearch";
import axiosInstance from "../../../api/axiosInstance";
import { COURSE_COUNT } from "../../../redux/actions/courseFilterTypes";
import { currentButtonReset } from "../../../redux/actions/currentButtonReset";
// import { COURSE_COUNT } from "../../../../redux/actions/courseFilterTypes";

const Popup = ({ closePopup }) => {
  const [courseFilter, setCourseFilter] = useState(
    window.innerWidth > 1279 ? true : false
  );
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const container = useRef();
  const blurBackground = useRef();

  const { currentButtonVal } = useSelector((state) => state.currentButtonValue);

  const animateAndHide = () => {
    const element1 = container.current;
    const element2 = blurBackground.current;
    element1.style.animation = "fade 0.4s ease";
    element2.style.animation = "bgFade 0.4s ease";
    element1.addEventListener("animationend", closePopup);
  };

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 1279 && width < 1280) {
      setWidth(innerWidth);
      setCourseFilter(true);
    } else if (innerWidth < 1280 && width > 1279) {
      setWidth(innerWidth);
      setCourseFilter(false);
    }
  };

  useEffect(() => {
    const element = container.current;
    window.addEventListener("resize", handleResize);

    return () => {
      element.removeEventListener("animationend", closePopup);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSearchData = (e) => {
    e.preventDefault();
    dispatch(currentButtonReset(1));
    setSearchLoader(true);
    axiosInstance
      .get(
        `courses/course-filter/?page=${currentButtonVal}&title__icontains=${searchValue}`
      )
      .then((res) => {
        setCourses(res.data.results);
        setPage(res.data.total_pages);
        dispatch({
          type: COURSE_COUNT,
          payload: res.data.count,
        });
        setSearchLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchLoader(false);
      });
  };

  return (
    <div className="animate-popup-bg fixed min-h-screen h-full w-full left-0 top-0 z-50 grid place-items-center overflow-y-auto">
      <div
        className="animate-popup-height absolute left-0 top-0 h-full w-full bg-gray4 bg-opacity-60 authentication-popup-blur-background"
        onClick={animateAndHide}
        ref={blurBackground}
      ></div>
      <div
        className="authentication-container compare-course-container rounded-xl overflow-hidden bg-white relative"
        ref={container}
      >
        <div className="overflow-y-auto h-full p-4 relative">
          <div
            className="absolute right-5 top-5 cursor-pointer p-3 hover:bg-pink2 rounded-full"
            onClick={animateAndHide}
          >
            <img src={closeIcon} alt="close icon" className="w-2.5" />
          </div>
          <div className="font-bold text-2xl my-4 text-gray-900 text-center">
            Search Course
          </div>
          <form
            onSubmit={getSearchData}
            className="flex items-center flex-col justify-center text-sm relative"
          >
            {/* <SearchField
              value={search}
              handleChange={setSearch}
              handleSearch={getSearchData}
            />
            {searchNoData && (
              <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                <span className="z-10">No search results</span>
                <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
              </div>
            )} */}
            <div className="flex justify-center">
              <div className="relative w-60">
                <input
                  list="courses"
                  type="text"
                  id="courses-choice"
                  name="courses-choice"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="rounded-full border-2 pr-12 py-2 pl-5 w-full focus:border-gray-300 transition-all duration-300"
                  placeholder="Search course name..."
                  // onChange={(e) => handleCountryAdd(e.target.value)}
                />

                {/* <datalist id="courses">
            {Array.isArray(slides) &&
              slides.map((cat, index) => {
                return <option value={cat.title} key={index} />;
              })}
          </datalist> */}

                <div
                  className="absolute bg-pink4 text-white top-1/2 right-0 h-9 w-9 rounded-full cursor-pointer flex items-center justify-center"
                  style={{ transform: "translateY(-50%)" }}
                  onClick={getSearchData}
                >
                  <svg
                    viewBox="0 0 512.005 512.005"
                    fill="currentColor"
                    className="w-5"
                  >
                    <g>
                      <g>
                        <path
                          d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </form>
          <Heading toggleCourseFilter={() => setCourseFilter(!courseFilter)} />
          <div className="xl:flex courses-container p-4">
            <div className={`${courseFilter ? "flex" : "hidden"}`}>
              <CourseFilter
                toggleCourseFilter={setCourseFilter}
                setSearchValue={setSearchValue}
              />
            </div>
            <CoursesResult
              addToCompare={true}
              closePopup={closePopup}
              data={courses}
              courses={courses}
              setCourses={setCourses}
              page={page}
              setPage={setPage}
              searchLoader={searchLoader}
              searchValue={searchValue}
              // isChanging={isChanging}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
