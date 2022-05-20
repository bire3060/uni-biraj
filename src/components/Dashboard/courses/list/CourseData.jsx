import React, { useState } from "react";
import edit from "../../../../assets/images/logo/icons8-edit-24.png";
import dots from "../../../../assets/images/logo/icons8-menu-vertical-30.png";
import { Link } from "react-router-dom";
const CourseData = ({
  title,
  slug,
  category,
  institution,
  degree_level,
  popUpDeleteModal,
  images,
}) => {
  const [dot, setdot] = useState(false);
  return (
    <tr className={` px-3 border-l-8 py-2 text-sm text-gray-700 border-white`}>
      <td className="py-2 px-2 flex items-center">
        <span>
          <img src={images} className="w-6 mr-2" alt="" />
        </span>
        <span>{title === null ? "" : title}</span>
      </td>
      <td className="py-2 text-left px-2">
        {category === null ? "" : category.title}
      </td>
      <td className="py-2 text-left px-2">
        {institution === null ? "" : institution.name}
      </td>
      <td className="py-2 text-left px-2">
        {degree_level === null ? "" : degree_level.title}
      </td>

      <td className="flex w-20">
        <Link to={`/dashboard/course/add/${slug}`} className="cursor-pointer">
          <img src={edit} alt="" width="20" />
        </Link>
        <div className="relative cursor-pointer">
          <img
            onClick={() => {
              setdot(!dot);
            }}
            src={dots}
            alt=""
            width="20"
          />
          <div
            style={{ fontSize: 10 }}
            className={`crimson absolute self-center  rounded-sm top-0 text-gray-50 -right-10 px-1 ${
              !dot ? "hidden" : ""
            }`}
            onClick={() => {
              setdot(false);
              popUpDeleteModal(slug);
            }}
          >
            remove
          </div>
        </div>
      </td>
    </tr>
  );
};
export default CourseData;
