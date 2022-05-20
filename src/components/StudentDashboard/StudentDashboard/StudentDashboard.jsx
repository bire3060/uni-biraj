import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Timeline from "../Application/Timeline";
import EnrolledClasses from "./integrate/EnrolledClasses";
// import DonutCharts from "./integrate/DonutCharts";
import GridCardCount from "./integrate/GridCardCount";

const StudentDashboard = () => {
  const [countData, setCountData] = useState([]);
  // const [popurCourseTitle, setPopularCourseTitle] = useState([]);
  // const [popurCourseCount, setPopularCourseCount] = useState([]);
  const [classes, setClasses] = useState([]);
  const getAllClassSchedual = (signal) => {
    axiosInstance
      .get(`/user/education/enrolled-meet-list/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllClassSchedual(signal);
    axiosInstance
      .get(`/courses/dashboard-data/`, { signal })
      .then((res) => {
        setCountData(res.data);
        let title = [];
        let count = [];
        for (let i = 0; i < res.data.popular_course.length; i++) {
          title.push(res.data.popular_course[i].course__title);
          count.push(res.data.popular_course[i].count);
        }
        // setPopularCourseTitle(title);
        // setPopularCourseCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">Dashboard</div>
          </div>
        </div>

        <div
          className="mx-auto bg-white p-1 sm:p-4 border mt-2 relative border-gray-300 rounded-2xl"
          style={{ width: "98%" }}
        >
          <GridCardCount countData={countData} />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="shadow-md p-5 flex flex-col">
              <div className="font-semibold flex justify-center mb-5">
                Popular Courses
              </div>
              <DonutCharts
                popurCourseTitle={popurCourseTitle}
                popurCourseCount={popurCourseCount}
              />
            </div>
          </div> */}
          <div className="lg:flex mt-5">
            <div className=" bg-white p-3 sm:p-4 relative  flex-1">
              <p className=" text-3xl font-bold text-blue3 w-full">
                MY TIMELINE
              </p>
              <div className="overflow-auto sbar">
                <div className="pb-10 ">
                  <Timeline />
                </div>
              </div>
            </div>
            <EnrolledClasses classes={classes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
