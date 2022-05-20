import React from "react";
import PersonalizedMatchMaker from "./personalized-matchmaker";
import CourseCategory from "./course-category";

const CourseCategoryAndMatchMaker = () => {
  return (
    <div className=" px-4 py-10 md:px-10 lg:px-24 space-y-10 bg-gray1">
      <PersonalizedMatchMaker />
      <CourseCategory />
    </div>
  );
};

export default CourseCategoryAndMatchMaker;
