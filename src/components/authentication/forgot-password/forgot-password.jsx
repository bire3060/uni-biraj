import React, { useState } from "react";
import SignInBg from "../../../assets/images/Login/Sign-in-img.jpg";
import deleteIcon from "../../../assets/images/Login/delete.svg";
import backIcon from "../../../assets/images/Login/left-arrow.svg";
import { SimpleInputField } from "../../common/input-field";
import axiosInstance from "../../../api/axiosInstance";

const ForgotPassword = ({ animateAndDispatch, setComponent }) => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (
    //   email === "" ||
    //   !email.match(
    //     /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
    //   )
    // ) {
    //   setEmailErr("Invalid email address.");
    // } else {
    if (emailErr) return;

    setConfirmation("");
    setInvalid("");
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    axiosInstance
      .post(`/user/password-reset/`, formData)
      .then((res) => {
        setLoading(false);
        setConfirmation(res.data.success);
      })
      .catch((err) => {
        setLoading(false);
        setInvalid("wrong email address");
      });
  };
  //for setting state of email
  const handleEmail = (e) => {
    const targetValue = e.target.value;
    setEmail(targetValue);
    const emailValidate =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        targetValue.toLowerCase()
      )
        ? false
        : true;
    setEmailErr(emailValidate);
  };
  return (
    <div className="rounded-xl overflow-hidden my-auto h-full w-full">
      <div className="flex relative h-full">
        <div className="md:block hidden w-72 flex-shrink-0">
          <img src={SignInBg} alt="Students" className="h-full w-full" />
        </div>

        <div className="p-4 bg-gray1 flex-1">
          <div className="flex justify-between items-center">
            <span
              className="font-semibold tracking-wide flex space-x-2 cursor-pointer hover:underline"
              onClick={() => setComponent("login")}
            >
              <img
                src={backIcon}
                alt=""
                className="h-2.5 w-2.5 my-auto select-none cursor-pointer"
              />
              <span>Back</span>
            </span>
            <img
              src={deleteIcon}
              onClick={animateAndDispatch}
              alt=""
              className="h-3 w-3 select-none cursor-pointer"
            />
          </div>

          <div className="mt-10 font-semibold text-xl tracking-wide">
            Forgot Password?
          </div>

          <div className="mt-3 font-medium text-xs text-gray-600 mb-8">
            No Problem. Just enter your email address below - we'll send you a
            link to reset it.
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="flex-1 flex flex-col ">
              <SimpleInputField
                value={email}
                handleChange={handleEmail}
                placeholder="Enter Email Address"
                type="email"
              />
              {emailErr && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">Invalid email address</span>
                  {/* <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span> */}
                </div>
              )}
            </div>

            {confirmation && (
              <div className="text-green-600 text-sm mt-1">{confirmation}</div>
            )}
            {invalid && <div className="text-sm text-pink-600">{invalid}</div>}
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
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-xs absolute bottom-4">
            <div>
              Already have an account?{" "}
              <span
                onClick={() => setComponent("login")}
                className="text-pink4 font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
