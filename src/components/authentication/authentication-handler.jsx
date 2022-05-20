import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AUTHENTICATION_POPUP_HIDE } from "../../redux/actions/actionsTypes";
import Login from "./login/login";
import Register from "./register/register";
import ForgotPassword from "./forgot-password/forgot-password";
import "../../assets/css/authentication/authentication.css";
import { useEffect } from "react";
// import EmailVerification from "./email-verification/new-email-verification";
import PasswordVerification from "./forgot-password/password-verification";

const AuthenticationHandler = ({ passwordReset }) => {
  const container = useRef();
  const blurBackground = useRef();
  const dispatch = useDispatch();
  const [component, setComponent] = useState(
    passwordReset ? "passwordReset" : "login"
  );
  const func = () => null;

  const dispatchFunction = () =>
    dispatch({
      type: AUTHENTICATION_POPUP_HIDE,
    });

  const animateAndDispatch = () => {
    const element1 = container.current;
    const element2 = blurBackground.current;
    element1.style.animation = "fade 0.4s ease";
    element2.style.animation = "bgFade 0.4s ease";
    element1.addEventListener("animationend", dispatchFunction);
    element2.addEventListener("animationend", func);
  };

  useEffect(() => {
    const element1 = container.current;
    const element2 = blurBackground.current;
    return () => {
      element1.removeEventListener("animationend", dispatchFunction);
      element2.removeEventListener("animationend", func);
    };
  });

  return (
    <div className="animate-popup-bg fixed min-h-screen w-full left-0 top-0 z-50 grid place-items-center overflow-y-auto ">
      <div
        className="animate-popup-height absolute left-0 top-0 h-full w-full bg-gray4 bg-opacity-60 authentication-popup-blur-background"
        onClick={animateAndDispatch}
        ref={blurBackground}
      ></div>
      <div
        className=" rounded-xl overflow-hidden authentication-container"
        ref={container}
      >
        {component === "login" && (
          <Login
            animateAndDispatch={animateAndDispatch}
            setComponent={setComponent}
          />
        )}
        {component === "register" && (
          <Register
            animateAndDispatch={animateAndDispatch}
            setComponent={setComponent}
          />
        )}
        {component === "forgot-password" && (
          <ForgotPassword
            animateAndDispatch={animateAndDispatch}
            setComponent={setComponent}
          />
        )}
        {component === "passwordReset" && (
          <PasswordVerification
            animateAndDispatch={() => {
              animateAndDispatch();
            }}
            passwordReset={passwordReset}
            setComponent={setComponent}
          />
        )}
      </div>
    </div>
  );
};

export default AuthenticationHandler;
