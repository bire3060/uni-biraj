import React from "react";
import IconManager from "../../../common/IconManager";

function GridCardCount({ countData }) {
  const { applied_course, my_course, wish_course, enroll_class } = countData;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* applied courses  */}
        <div
          className="flex flex-col justify-center items-center text-white rounded-md shadow-md p-5 text-center"
          style={{
            backgroundColor: "#1DC1D9",
          }}
        >
          <div className="mb-2">
            <IconManager icon="Book" className="w-8 h-8" />
          </div>
          <div className="text-xl font-semibold">Applied Courses</div>
          <div className="font-semibold">{applied_course}</div>
        </div>
        {/* My courses  */}
        <div
          className="flex flex-col justify-center items-center text-white rounded-md shadow-md p-5 text-center"
          style={{
            backgroundColor: "#0FC45C",
          }}
        >
          <div className="mb-2">
            <IconManager icon="GraduationCap" className="w-8 h-8" />
          </div>
          <div className="text-xl font-semibold">My Courses</div>
          <div className="font-semibold">{my_course}</div>
        </div>
        {/* My Whishlists  */}
        <div
          className="flex flex-col justify-center items-center text-white rounded-md shadow-md p-5 text-center"
          style={{
            backgroundColor: "#E948AE",
          }}
        >
          <div className="mb-2">
            <IconManager icon="Applied" className="w-8 h-8" />
          </div>
          <div className="text-xl font-semibold">My Wishlist</div>
          <div className="font-semibold">{wish_course}</div>
        </div>
        {/* Enrolled Classes  */}
        <div
          className="flex flex-col justify-center items-center text-white rounded-md shadow-md p-5 text-center"
          style={{
            backgroundColor: "#F9BD44",
          }}
        >
          <div className="mb-2">
            <IconManager icon="Online" className="w-8 h-8" />
          </div>
          <div className="text-xl font-semibold">Enrolled Classes</div>
          <div className="font-semibold">{enroll_class}</div>
        </div>
      </div>
    </div>
  );
}

export default GridCardCount;
