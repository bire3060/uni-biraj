import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
// import userImage from "../../../assets/images/student-dashboard/userImage.jpg";

import jwt_decode from "jwt-decode";
const InquiryChat = ({ userId, getAllMessages, setPopUp }) => {
  const [inputFields, setInputFields] = useState({
    preferredCountry: "",
    preferredDate: "",
    message: "",
  });
  const { preferredCountry, preferredDate, message } = inputFields;
  const inputFieldsList = [
    {
      name: "preferredCountry",
      value: preferredCountry,
      type: "text",
      label: "Preferred Country",
    },
    {
      name: "preferredDate",
      value: preferredDate,
      type: "date",
      label: "Preferred Date",
    },
    { name: "message", value: message, type: "textarea", label: "Message" },
  ];
  const handleChange = (e) => {
    setInputFields((preval) => {
      return {
        ...preval,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { preferredCountry, preferredDate, message } = inputFields;
    const val = {
      user: userId,
      preferred_country: preferredCountry,
      preferred_intake: preferredDate,
      title: message,
    };
    axiosInstance
      .post(`/inquery/create-topic/`, val)
      .then((res) => {
        setInputFields({
          preferredCountry: "",
          preferredDate: "",
          message: "",
        });
        getAllMessages();
        setPopUp(() => {
          return {
            add: false,
            edit: false,
            value: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("refresh");
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
        setUsername(decoded.username);
      } catch (e) {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <div className="p-2 bg-white  rounded-3xl  ">
      <div className="cursor-pointer flex space-x-2 items-center text-blue3 ">
        <div className="h-10 w-10 bg-pink3 rounded-full uppercase grid place-content-center text-white">
          {username.charAt(0)}
        </div>
        <div className="text-xl font-bold ">{username}</div>
      </div>
      <div className="mt-5 ">
        <form onSubmit={handleSubmit}>
          {inputFieldsList.map((item, index) => {
            const { name, value, type, label } = item;
            return type === "textarea" ? (
              <div key={index} className="sm:flex justify-between mb-2">
                <div className="text-sm font-semibold">{label}</div>
                <div className=" w-full sm:w-3/5 mr-5">
                  <textarea
                    value={value}
                    name={name}
                    onChange={handleChange}
                    className="border px-3 border-gray-400 rounded-md shadow-md w-full h-30 sm:h-44"
                    maxLength="200"
                  />
                </div>
              </div>
            ) : (
              <div key={index} className="sm:flex justify-between mb-2 ">
                <div className="text-sm font-semibold">{label}</div>
                <div className="w-full sm:w-3/5 mr-5">
                  <input
                    name={name}
                    value={value}
                    type={type}
                    max={type === "date" ? "2999-12-31" : false}
                    onChange={handleChange}
                    className="border w-full rounded-md shadow-md px-3 border-gray-400"
                  />
                </div>
              </div>
            );
          })}
          <button
            type="submit"
            className="w-full rounded-full bg-blue3 flex justify-center md:my-2 font-bold text-lg py-1 text-white"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryChat;
