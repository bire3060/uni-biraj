import React, { useState } from "react";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/logo/icons8-edit-24.png";
import dots from "../../../assets/images/logo/icons8-menu-vertical-30.png";

function RegisterListTr({
  fname,
  lname,
  email,
  user_type,
  id,
  popUpDeleteModal,
  phone,
  created_at,
}) {
  // const [check, setcheck] = useState(false);
  const [dot, setdot] = useState(false);
  return (
    <tr className={` px-3 border-l-8 py-2 text-sm text-gray-700 border-white`}>
      <td className="py-2 ">
        <span>
          {(fname.length > 15 ? fname.substring(0, 15) + "..." : fname) +
            " " +
            (lname.length > 15 ? lname.substring(0, 15) + "..." : lname)}
        </span>
      </td>
      {/* <td className="py-2">{lname}</td> */}
      <td className="py-2">{email}</td>
      <td className="py-2">{phone}</td>
      <td className="py-2">{created_at.split("T")[0]}</td>
      <td className="py-2">
        {user_type === "ST" && "Student"}
        {user_type === "AM" && "Application Manager"}
        {user_type === "IN" && "Instructor"}
        {user_type === "AD" && "Admin"}
        {user_type === "CO" && "Counsler"}
        {user_type === "SA" && "Super Admin"}
        {/* {user_type} */}
      </td>
      <td className="flex  ml-5">
        <Link to={`/dashboard/register/add/${id}`}>
          <img src={edit} alt="" width="20" />
        </Link>
        <div className="relative cursor-pointer">
          <img
            onClick={() => {
              setdot(!dot);
              //   setIndexRemove(index);
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
            onClick={() => popUpDeleteModal(id)}
          >
            remove
          </div>
        </div>
      </td>
    </tr>
  );
}

export default RegisterListTr;
