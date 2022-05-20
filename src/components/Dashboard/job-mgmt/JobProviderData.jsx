import React, { useState } from "react";
import edit from "../../../assets/images/logo/icons8-edit-24.png";
import dots from "../../../assets/images/logo/icons8-menu-vertical-30.png";

const JobProviderData = ({ list, popUpDeleteModal, setJobProviderSlug }) => {
  const { company, address, contact, email, slug } = list;
  const [dot, setdot] = useState(false);

  return (
    <>
      <tr
        className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}
      >
        <td className="py-2 ">
          <span>{company}</span>
        </td>
        <td className="py-2">{address}</td>
        <td className="py-2">{contact}</td>
        <td className="py-2">{email}</td>
        <td className="flex mr-5">
          <div
            className="cursor-pointer"
            onClick={() => setJobProviderSlug(list, slug)}
          >
            <img src={edit} alt="" width="20" />
          </div>
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
                !dot ? "opacity-0" : "opacity-100"
              }`}
              onClick={() => popUpDeleteModal(slug)}
            >
              remove
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
export default JobProviderData;
