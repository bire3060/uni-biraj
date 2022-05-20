import React from "react";
import { Link } from "react-router-dom";
import dragIcon from "../../assets/images/home/course-category/drag.svg";
import groupIcon from "../../assets/images/home/course-category/Group 657.svg";
import mentalHealthIcon from "../../assets/images/home/course-category/heart.svg";
import microphoneIcon from "../../assets/images/home/course-category/microphone.svg";
import mortarboardIcon from "../../assets/images/home/course-category/mortarboard.svg";
import cameraIcon from "../../assets/images/home/course-category/photo-camera.svg";
import plantIcon from "../../assets/images/home/course-category/plant.svg";
import presentationIcon from "../../assets/images/home/course-category/presentation.svg";
import scaleIcon from "../../assets/images/home/course-category/scale.svg";
import scienceIcon from "../../assets/images/home/course-category/science.svg";
import towerIcon from "../../assets/images/home/course-category/tower.svg";
import webbrowserIcon from "../../assets/images/home/course-category/web-browser.svg";
import studyIcon from "../../assets/images/home/course-category/study.svg";
import heartbeatIcon from "../../assets/images/home/course-category/heart-beat.svg";
import Navbar from "../static/navbar";

const courseCategories = [
  {
    title: "Business & Management",
    icon: presentationIcon,
  },
  {
    title: "Creative Arts & Media",
    icon: cameraIcon,
  },
  {
    title: "Healthcare & Medicine",
    icon: heartbeatIcon,
  },
  {
    title: "History",
    icon: towerIcon,
  },
  {
    title: "It & Computer Science",
    icon: dragIcon,
  },
  {
    title: "Language",
    icon: groupIcon,
  },
  {
    title: "Law",
    icon: scaleIcon,
  },
  {
    title: "Literature",
    icon: webbrowserIcon,
  },
  {
    title: "Nature & Environment",
    icon: plantIcon,
  },
  {
    title: "Politics & Society",
    icon: microphoneIcon,
  },
  {
    title: "Psychology & Mental Health",
    icon: mentalHealthIcon,
  },
  {
    title: "Science & Maths",
    icon: scienceIcon,
  },
  {
    title: "Study Skills",
    icon: studyIcon,
  },
  {
    title: "Teaching",
    icon: mortarboardIcon,
  },
];

const Subject = () => {
  return (
    <>
      <Navbar />
      <div className="bg-blue-100 relative">
        <div className="w-11/12 mx-auto text-center font-semibold text-4xl pt-20">
          Which major do you want to pursue ?
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-11/12 sm:w-1/3 relative">
            <input
              type="text"
              name="search"
              className="border border-gray-400 rounded-full w-full text-center p-1  pl-4 pr-10 font-medium"
              placeholder="Search subject"
            />
            <div className="rounded-full w-6 h-6 bg-red-500 absolute top-1 right-2 cursor-pointer">
              <p className="text-center align-middle">0</p>
            </div>
          </div>
        </div>
        <div className="sm:w-3/4 w-11/12 mx-auto rounded-xl text-center pt-3 lg:pt-6 space-y-5 lg:space-y-8 pb-32">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm gap-4 text-gray7">
            {courseCategories.map((category, index) => {
              const { title, icon } = category;
              return (
                <div
                  key={index}
                  className="p-2 border bg-white border-gray3 rounded-md flex items-center justify-between transition-all duration-500 hover:bg-pink-200 hover:border-pink1 cursor-pointer"
                >
                  <div>{title}</div>
                  <div>
                    <img src={icon} alt="" className="w-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute h-24 bottom-0 w-full text-center">
          <div>
            <Link
              to="/major-subject"
              onClick={() => window.scrollTo(0, 0)}
              style={{
                backgroundColor: "crimson",
                boxShadow: "0 0 8px crimson",
              }}
              className="inline-block h-8 rounded-2xl text-lg text-gray-50 w-36 font-semibold "
            >
              Proceed
            </Link>
          </div>
          <div className="text-sm font-medium mt-2">STEP 5</div>
        </div>
      </div>
    </>
  );
};

export default Subject;
