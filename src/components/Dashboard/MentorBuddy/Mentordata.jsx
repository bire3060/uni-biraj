import React, { useState } from "react";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/logo/icons8-edit-24.png";
// import dots from "../../../assets/images/logo/icons8-menu-vertical-30.png";
import dots from "../../../assets/images/logo/icons8-menu-vertical-30.png";

const Mentordata = ({
  name,
  // address,
  work_industry,
  email,
  // allcheck,
  // study_at,
  id,
  popUpDeleteModal,
}) => {
  // const [check, setcheck] = useState(false);
  const [dot, setdot] = useState(false);
  return (
    <tr className={` px-3 border-l-8 py-2 text-sm text-gray-700 border-white`}>
      <td className="py-2 text-center ">
        <span>{name}</span>
      </td>
      <td className="py-2 text-center">{work_industry}</td>
      <td className="py-2 text-center">{email}</td>
      <td className="flex  ml-5">
        <Link to={`/dashboard/mentor-buddy/add/${id}`}>
          <img src={edit} alt="" width="20" />
        </Link>
        <div className="relative cursor-pointer">
          <div>
            <img
              onClick={() => {
                setdot(!dot);
              }}
              src={dots}
              alt=""
              width="20"
            />
          </div>
          <div
            style={{ fontSize: 10 }}
            className={`crimson absolute self-center  rounded-sm top-0 text-gray-50 -right-10 px-1 ${
              !dot ? "hidden" : ""
            }`}
            onClick={() => {
              popUpDeleteModal(id);
              setdot(false);
            }}
          >
            remove
          </div>
        </div>
      </td>
    </tr>
  );
};
export default Mentordata;
