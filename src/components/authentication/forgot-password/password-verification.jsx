import React from "react";
import SignInBg from "../../../assets/images/Login/Sign-in-img.jpg";
import deleteIcon from "../../../assets/images/Login/delete.svg";
import backIcon from "../../../assets/images/Login/left-arrow.svg";
import NewPasswordForm from "./NewPasswordForm";

const PasswordVerification = ({
  passwordReset,
  animateAndDispatch,
  setComponent,
}) => {
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
            Reset Password
          </div>
          <div>
            <NewPasswordForm passwordReset={passwordReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerification;
