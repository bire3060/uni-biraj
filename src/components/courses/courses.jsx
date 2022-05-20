import React, { useState, useEffect } from "react";
import Navbar from "../static/navbar";
import CourseFilter from "./course-filter/course-filter";
import CoursesResult from "./course-result/courses-result";
import Heading from "./heading";
import "../../assets/css/courses.css";

const Courses = ({ loggedIn, role }) => {
  const [courseFilter, setCourseFilter] = useState(
    window.innerWidth > 1279 ? true : false
  );
  const [width, setWidth] = useState(window.innerWidth);
  const [courseSort, setCourseSort] = useState("title");

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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      <Navbar loggedIn={loggedIn} role={role} />
      <div className="px-4 py-6 md:px-10 lg:px-24 bg-gray2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between border-b border-gray3 pb-4">
            <Heading
              toggleCourseFilter={() => setCourseFilter(!courseFilter)}
            />
            {/* sorting */}
            <div className="flex space-x-2 items-center justify-center">
              <span className="text-gray-400 font-medium text-xs">Sort By</span>
              <select
                name="courseSort"
                id="courseSort"
                value={courseSort}
                onChange={(e) => setCourseSort(e.target.value)}
                className="rounded-md border cursor-pointer border-gray-200 px-6 appearance-none p-1.5 text-gray-800 text-sm"
              >
                <option value="title">A To Z</option>
                <option value="-title">Z To A</option>
              </select>
            </div>
          </div>

          <div className="xl:flex courses-container">
            <div className={`${courseFilter ? "flex" : "hidden"}`}>
              <CourseFilter toggleCourseFilter={setCourseFilter} />
            </div>

            <CoursesResult courseSort={courseSort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Courses);
