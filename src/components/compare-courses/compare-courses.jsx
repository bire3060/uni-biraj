import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../static/navbar";
import ClaimFreeGift from "../common/claim-free-gift";
import Comparecard from "./Compare-card";
import Comparedetails from "./Compare-details";
import Popup from "./popup/popup";

const CompareCourses = ({ loggedIn, role }) => {
  // const LoginPopUp = useSelector((state) => state.authPopup.auth_popup);
  const [coursesPopup, setCoursesPopup] = useState(false);
  const courses = useSelector((state) => state.comparingCourses.courses);
  useEffect(() => {
    coursesPopup
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  });

  return (
    <div className="bg-gray-50">
      {coursesPopup && <Popup closePopup={() => setCoursesPopup(false)} />}
      <Navbar loggedIn={loggedIn} role={role} />
      <div className="px-4 py-10 md:py-14 md:px-10 lg:px-24 space-y-10">
        <div className="max-w-7xl mx-auto rounded-xl space-y-4">
          <div className="font-bold text-2xl text-gray-900">
            Compare Courses
          </div>
          <div className="w-full overflow-x-auto space-y-4">
            <Comparecard
              showPopup={() => setCoursesPopup(true)}
              courses={courses}
            />
            <Comparedetails courses={courses} />
          </div>
        </div>
        <div className="mx-auto">
          <ClaimFreeGift />
        </div>
      </div>
    </div>
  );
};

export default CompareCourses;
