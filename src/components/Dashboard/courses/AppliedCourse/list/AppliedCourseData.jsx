import React from "react";
// import edit from "../../../../../assets/images/logo/icons8-edit-24.png";
// import dots from "../../../../../assets/images/logo/icons8-menu-vertical-30.png";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";
const AppliedCourseData = ({
  id,
  user,
  course,
  // status,
  follow_up,
  follow_on,
  follow_by,
  getCourseList,
}) => {
  const handleFollowUp = (val, id) => {
    if (val === "false") {
      let formData = {
        follow_up: val === "false" ? true : false,
        applied_course_id: id,
      };
      axiosInstance
        .post(`/courses/follow-up-course/`, formData)
        .then((res) => {
          getCourseList();
          // console.log(res.data);
          toast.success("Added to follow up", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Cant't undo follow up", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <tr className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}>
      <td className="py-2 text-left ">{course}</td>
      <td className="py-2 text-left">{user}</td>
      <td className="py-2 text-left">{follow_on.split("T")[0]}</td>
      <td className="py-2 text-left">{follow_by}</td>
      <td className="py-2 text-left">
        <label className="switchc self-center">
          <input
            name="statuss"
            value={follow_up}
            type="checkbox"
            checked={follow_up}
            onChange={(e) => handleFollowUp(e.target.value, id)}
          />
          <span className="slidersc roundc"></span>
        </label>
      </td>

      <td className="">
        <Link
          to={`/dashboard/appliedcoursedetails/${id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="cursor-pointer px-2 bg-pink4 rounded text-gray-50"
        >
          Details
        </Link>
      </td>
    </tr>
  );
};
export default AppliedCourseData;
