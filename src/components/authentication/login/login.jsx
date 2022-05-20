import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInBg from "../../../assets/images/Login/Sign-in-img.jpg";
import deleteIcon from "../../../assets/images/Login/delete.svg";
// import googleIcon from "../../../assets/images/Login/google.svg";
// import facebookIcon from "../../../assets/images/Login/facebook.svg";
// import { SimpleInputField } from "../../common/input-field";
import axiosInstance from "../../../api/axiosInstance";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import jwt_decode from "jwt-decode";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// import googleIcon from "../../../assets/images/Login/facebook.png";

// const inputFields = [
//   {
//     placeholder: "Email",
//     type: "email",
//   },
//   {
//     placeholder: "Password",
//     type: "password",
//   },
// ];

const Login = ({ animateAndDispatch, setComponent }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState("");
  //handieling form changes
  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property, value);
    setData((data) => ({
      ...data,
      [property]: value,
    }));
  };
  //handeling error of input
  const handleErrors = (property, value) => {
    setInvalid("");
    const { errors } = data;
    let result;
    if (property === "email") {
      if (
        !value.match(
          /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
        )
      ) {
        errors.email = "Invalid email address.";
        result = false;
      } else {
        errors.email = "";
        result = true;
      }
    } else if (property === "password") {
      if (value.length < 7) {
        errors.password = "Invalid password length";
        result = false;
      } else {
        errors.password = "";
        result = true;
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
    const { email, password } = data;
    const credentials = ["email", "password"];
    let goAhead;
    for (let i = 0; i < credentials.length; i++) {
      const result = handleErrors(credentials[i], data[credentials[i]]);
      if (goAhead !== false) {
        goAhead = result;
      }
    }
    if (goAhead) {
      setLoading(true);
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      axiosInstance
        .post(`/user/login/`, formData)
        .then((res) => {
          setLoading(false);

          const { access, refresh } = res.data;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);
          // const token = localStorage.getItem("refresh");
          let { user_type } = jwt_decode(access);
          if (user_type === "ST") {
            window.location = "/courses";
          } else {
            window.location = "/";
          }
        })
        .catch((err) => {
          // console.log(err.response);
          setInvalid(err.response.data.detail);
          setLoading(false);
        });
    }
  };

  const responseGoogle = (response) => {
    // console.log(response);
    const google = {
      auth_token: response.tokenId,
    };

    axiosInstance
      .post("user/login/google/", google)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        const { access, refresh } = res.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        // const token = localStorage.getItem("refresh");
        let { user_type } = jwt_decode(access);
        if (user_type === "ST") {
          window.location = "/courses";
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        err.response && setInvalid(err.response.data.detail);
        if (err.response.data.auth_token.join("")) {
          toast.error(err.response.data.auth_token.join(""), {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setLoading(false);
      });
  };
  const responseFacebook = (response) => {
    // console.log("my", response);
    const facebook = {
      auth_token: response.accessToken,
    };

    axiosInstance
      .post("user/login/facebook/", facebook)
      .then((res) => {
        // console.log(res);

        setLoading(false);

        const { access, refresh } = res.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        // const token = localStorage.getItem("refresh");
        let { user_type } = jwt_decode(access);
        if (user_type === "ST") {
          window.location = "/courses";
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        err.response && setInvalid(err.response.data.detail);
        setLoading(false);
      });
  };

  // const { email, password } = data;
  const { email, password } = data.errors;
  return (
    <div className="rounded-xl overflow-hidden my-auto h-full w-full bg-transparent">
      <div className="flex relative h-full">
        <div className="md:block hidden w-72 flex-shrink-0">
          <img src={SignInBg} alt="Students" className="h-full w-full" />
        </div>

        <div className="p-4 bg-gray1 flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold tracking-wide text-xl">Sign In</span>
            <img
              src={deleteIcon}
              onClick={animateAndDispatch}
              alt=""
              className="h-3 w-3 select-none cursor-pointer"
            />
          </div>
          <div className="mt-2 text-gray-600 mb-8 text-xs">
            By Continuing you agree to our{" "}
            <span className="font-semibold">
              <span
                className="underline cursor-pointer"
                onClick={() => (window.location = "/user-agreement")}
              >
                User Agreement
              </span>{" "}
              and{" "}
              <div
                onClick={() => (window.location = "/privacy-policy")}
                className="underline cursor-pointer"
              >
                Privacy Policy
              </div>
            </span>
          </div>
          {/* google login */}
          <div className="py-1  w-64">
            <GoogleLogin
              clientId="484334328735-4vo3rlgu3gat41214s6obh3g17udvaaf.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  className="btnFacebook flex space-x-2"
                  onClick={renderProps.onClick}
                >
                  <span>
                    <FcGoogle className="text-lg" />
                  </span>
                  <span>Continue with Google</span>
                </button>
              )}
              className="w-full shadow-sm "
            />
          </div>
          {/* facebook login */}
          <div className="py-1 w-64">
            <FacebookLogin
              appId="252008790112161"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btnFacebook"
              icon={
                <FaFacebookSquare
                  className="text-lg"
                  style={{ color: "#3B559E" }}
                />
              }
              textButton="&nbsp;&nbsp;Continue with Facebook"
            />
          </div>

          <div className="py-3 mt-3 text-gray-800 tracking-wide">OR</div>
          {/* input fields */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* email  */}
            <div className="flex-1 flex flex-col ">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={data.email}
                  onChange={(e) => handleChange(e, "email")}
                  spellCheck="false"
                  className={`${
                    data.email && data.email.trim() !== ""
                      ? "bg-pink1"
                      : "bg-gray2"
                  } text-sm w-full placeholder-gray-500 p-3 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
                />
              </div>
              {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )}
            </div>
            {/* password  */}
            <div className="flex-1 flex flex-col ">
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => handleChange(e, "password")}
                  spellCheck="false"
                  className={`${
                    data.password && data.password.trim() !== ""
                      ? "bg-pink1"
                      : "bg-gray2"
                  } text-sm w-full placeholder-gray-500 p-3 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
                />
              </div>
              {password && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{password}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )}
            </div>
            {/* {inputFields.map((inputField, index) => {
              return (
                <div className="flex-1 flex flex-col " key={index}>
                  <SimpleInputField
                    value={data[inputField.type]}
                    handleChange={(event) =>
                      handleChange(event, inputField.type)
                    }
                    {...inputField}
                  />
                  {inputField.type === "email" && email && (
                    <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                      <span className="z-10">{email}</span>
                      <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                    </div>
                  )}
                  {inputField.type === "password" && password && (
                    <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                      <span className="z-10">{password}</span>
                      <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                    </div>
                  )}
                </div>
              );
            })} */}
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
                "Sign In"
              )}
            </button>
          </form>

          <span
            onClick={() => setComponent("forgot-password")}
            className="text-pink4 font-semibold text-xs hover:underline cursor-pointer"
          >
            Forgot Password?
          </span>

          <div className="text-xs absolute bottom-4">
            <div>
              New to Uni & College?{" "}
              <span
                onClick={() => setComponent("register")}
                className="text-pink4 font-semibold text-xs hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
