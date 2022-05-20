import React, { useEffect, useState } from "react";
// import edit from "../../../../../assets/images/logo/icons8-edit-24.png";
// import dots from "../../../../../assets/images/logo/icons8-menu-vertical-30.png";
import { Link } from "react-router-dom";
import IconManager from "../../../../common/IconManager";

import axiosInstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppliedCourseData = ({
  id,
  user,
  course,
  course_status,
  getCourseList,
}) => {
  // const [statuss, setstatuss] = useState(true);
  // const [check, setcheck] = useState(false);
  const [dot, setdot] = useState(false);
  const [input, setinput] = useState("");
  const [getdata, setgetdata] = useState([]);
  useEffect(() => {
    axiosInstance.get(`courses/course-process-status/`).then((res) => {
      setgetdata(res.data);
    }, []);
  }, []);

  const [selected, setselect] = useState("");

  const Handlesubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`courses/course-process/`, {
        course: id,
        description: input,
        status: selected,
      })
      .then((res) => {
        toast.success("Saved Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getCourseList();
      });
  };
  return (
    <tr className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}>
      <td className="py-2 text-center ">{id}</td>
      <td className="py-2 text-center">{course}</td>
      <td className="py-2 text-center">{user}</td>
      <td className="py-2 text-center">{course_status}</td>
      <td className="flex gap-2 ml-5 justify-center">
        <Link
          to={`/dashboard/applicationmanagerdetails/${id}`}
          className="cursor-pointer px-2 bg-pink4 rounded text-gray-50"
        >
          Details
        </Link>
        <div className=" cursor-pointer relative">
          <div
            onClick={() => {
              setdot(!dot);
            }}
            className="cursor-pointer px-2 bg-blue3 rounded text-gray-50"
          >
            Update
          </div>
          <form
            onSubmit={Handlesubmit}
            className={` absolute self-center py-5 px-3  md:px-10 bg-white w-72 mx-auto right-0 buttom-full mt-2  z-30  border border-gray-300 shadow-lg rounded-md  text-gray-800   ${
              !dot ? "hidden" : ""
            }`}
            onClick={() => {
              // popUpDeleteModal(slug);
            }}
          >
            <div className="text-base mt-1 font-medium text-gray-700">
              Status:
            </div>
            <select
              onChange={(e) => {
                setselect(e.target.value);
              }}
              className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-full "
            >
              <option>Select status</option>
              {getdata.map((sdata, index) => {
                const { title, id } = sdata;
                return (
                  <option key={index} value={id}>
                    {title}
                  </option>
                );
              })}
            </select>
            <div className="text-base mt-1 font-medium text-gray-700">
              Description:
            </div>
            <textarea
              onChange={(e) => {
                setinput(e.target.value);
              }}
              type="text"
              className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-full"
            />
            <div className="w-full mt-2 flex gap-2 justify-end ">
              <div
                onClick={() => {
                  setdot(false);
                }}
                className="bg-red-500  font-semibold mt-1 rounded text-white text-lg flex space-x-1 items-center px-3  cursor-pointer hover:bg-red-600"
              >
                Cancel
              </div>
              <button
                type="submit"
                onClick={() => {
                  setdot(false);
                }}
                className="bg-pink3  font-semibold mt-1  text-white text-lg flex space-x-1 items-center px-3 rounded cursor-pointer hover:bg-pink4"
              >
                <div>
                  <IconManager icon="Save" className="w-4 h-4" />
                </div>
                <div>{"SAVE"}</div>
              </button>
            </div>
          </form>
        </div>
      </td>
    </tr>
  );
};
export default AppliedCourseData;
