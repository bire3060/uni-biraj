import React from "react";
import { useDispatch } from "react-redux";
import deleteIcon from "../../assets/images/Login/delete.svg";
import { COMPARE_COURSE_REMOVE } from "../../redux/actions/actionsTypes";
import whiteLogo from "../../assets/images/logo/logo-white.svg";

const Coursescard = ({ course }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="border mx-4 bg-white w-60 h-full rounded-md relative overflow-hidden">
        <div
          className="p-2 absolute right-1 top-1 cursor-pointer hover:bg-pink2 rounded-full group"
          onClick={() =>
            dispatch({
              type: COMPARE_COURSE_REMOVE,
              payload: {
                slug: course.slug,
              },
            })
          }
        >
          <img src={deleteIcon} alt="" className="w-2.5 h-2.5" />
        </div>
        <div className="p-2">
          <div className="texy-lg text-gray-900 font-semibold line-clamp-2">
            {course.title}
          </div>
          <div className="text-2xl my-2 font-semibold">
            {course.institution.logo ? (
              <img
                src={course.institution.logo}
                className="h-10"
                alt={course.images}
              />
            ) : (
              <img src={whiteLogo} className="h-10 gradient" />
            )}
          </div>
          <div className="text-sm text-gray-500">{course.institution.name}</div>
        </div>
      </div>
    </div>
  );
};
export default Coursescard;
