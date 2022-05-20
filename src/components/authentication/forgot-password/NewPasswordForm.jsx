import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

function NewPasswordForm({ passwordReset }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    errors: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [sucess, setSucess] = useState("");
  //handieling form changes
  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property, value);
    setData({ ...data, [property]: value });
  };
  //handeling error of input
  const handleErrors = (property, value) => {
    const { errors } = data;
    let result;
    if (value.trim() === "") {
      errors[property] = `${property[0].toUpperCase()}${property.slice(
        1,
        property.length
      )} cannot be left empty`;
      result = false;
    } else {
      if (property === "newPassword") {
        // if (
        //   !value.match(
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        //   )
        // ) {
        //   errors.newPassword = "Invalid Password ";
        //   result = false;
        // } else {
        //   errors.newPassword = "";
        //   result = true;
        // }
        // new validations
        if (!value.match(/^(?=.*[A-Z]).*$/)) {
          errors.newPassword =
            "Password must contain at least one upper case character.";
          result = false;
        } else if (!value.match(/^.{7,13}$/)) {
          errors.newPassword =
            "Password must be more than 8 characters and smaller than 15 characters.";
          result = false;
        } else if (!value.match(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/)) {
          errors.newPassword =
            "Password must contain at least one special characters.";
          result = false;
        } else {
          errors.newPassword = "";
          result = true;
        }
      } else if (property === "confirmPassword") {
        if (value !== data.newPassword) {
          errors.confirmPassword = "Passwords do not match";
          result = false;
        } else {
          errors.confirmPassword = "";
          result = true;
        }
      }
    }

    setData({
      ...data,
      errors,
    });
    return result;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword, errors } = data;
    if (newPassword === "" && confirmPassword === "") {
      errors.newPassword = "cannot be left empty";
      errors.confirmPassword = "cannot be left empty";
      setData(data);
    } else if (newPassword === "") {
      errors.newPassword = "cannot be left empty";
      setData(data);
    } else if (confirmPassword === "") {
      errors.confirmPassword = "cannot be left empty";
      setData(data);
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("password", data.newPassword);
      formData.append("uidb64", passwordReset.uid);
      formData.append("token", passwordReset.token);
      axiosInstance
        .patch(`/user/password-reset-complete/`, formData)
        .then((res) => {
          setLoading(false);
          setSucess("Password changed sucessfully!");
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
        });
    }
  };
  const {
    newPassword,
    confirmPassword,
    errors: {
      newPassword: newPasswordErr,
      confirmPassword: confirmPasswordErr,
    },
  } = data;

  return (
    <form className="space-y-3 mt-5" onSubmit={handleSubmit}>
      {/* new password  */}
      <div className="flex-1 flex flex-col ">
        <input
          type="password"
          value={newPassword}
          id="newPassword"
          label="New Password"
          autoComplete="off"
          onChange={(e) => handleChange(e, "newPassword")}
          placeholder="New Password ..."
          className={`${
            newPassword.trim() !== "" ? "bg-pink1" : "bg-gray2"
          } text-sm w-full placeholder-gray-500 p-3 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
        />
        {newPasswordErr && (
          <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
            <span className="z-10">{newPasswordErr}</span>
            <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
          </div>
        )}
      </div>

      {/* confirm password  */}
      <div className="flex-1 flex flex-col">
        <input
          type="password"
          value={confirmPassword}
          id="confirmPassword"
          label="Confirm Password"
          autoComplete="off"
          placeholder="Confirm Password ..."
          onChange={(e) => handleChange(e, "confirmPassword")}
          className={`${
            confirmPassword.trim() !== "" ? "bg-pink1" : "bg-gray2"
          } text-sm w-full placeholder-gray-500 p-3 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
        />
        {confirmPasswordErr && (
          <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
            <span className="z-10">{confirmPasswordErr}</span>
            <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
          </div>
        )}
      </div>
      {sucess && <div className="text-green-600 text-sm mt-1">{sucess}</div>}
      {/* button */}
      <button className="p-2 rounded-full bg-pink4 hover:bg-pink3 transition-all duration-300 text-white w-full mb-2 mt-5 select-none">
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Continue"
        )}
      </button>
      <ul className="flex flex-col text-xs list-none px-2 text-gray-600">
        <li>Must be in between 8-15 character</li>
        <li>Must contain one uppercase character</li>
        <li>Must contain one special character</li>
      </ul>
    </form>
  );
}

export default NewPasswordForm;
