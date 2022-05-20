import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInBg from "../../../assets/images/Login/Sign-in-img.jpg";
import deleteIcon from "../../../assets/images/Login/delete.svg";
// import googleIcon from "../../../assets/images/Login/google.svg";
// import facebookIcon from "../../../assets/images/Login/facebook.svg";
import { SimpleInputField } from "../../common/input-field";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

const inputFields1 = [
  {
    type: "text",
    placeholder: "First Name",
    id: "fname",
  },
  {
    type: "text",
    placeholder: "Last Name",
    id: "lname",
  },
  {
    type: "text",
    placeholder: "Username",
    id: "username",
  },
  // {
  //   type: "text",
  //   placeholder: "Address",
  //   id: "address",
  // },
  // {
  //   type: "number",
  //   placeholder: "Country Code",
  //   id: "country_code",
  // },
  {
    type: "number",
    placeholder: "Phone",
    id: "phone",
  },
];

const inputFields2 = [
  {
    type: "email",
    placeholder: "Email",
  },
  {
    type: "password",
    placeholder: "Create Password",
  },
];

const Register = ({ animateAndDispatch, setComponent }) => {
  const [invalid, setInvalid] = useState("");
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    // address: "",
    // country_code: "",
    errors: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      username: "",
      phone: "",
      // address: "",
      // country_code: "",
    },
  });
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  // const [invalid, setInvalid] = useState("");
  //handieling form changes
  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property);
    setData((data) => ({
      ...data,
      [property]: value,
    }));
  };
  //handeling error of input
  const handleErrors = (property) => {
    setConfirmation("");
    const {
      fname,
      lname,
      email,
      password,
      errors,
      username,
      phone,
      // country_code,
      // address,
    } = data;
    let result;
    if (property === "fname") {
      if (fname === "") {
        errors.fname = "First name cannot be left empty.";
        result = false;
      } else {
        errors.fname = "";
        result = true;
      }
    } else if (property === "lname") {
      if (lname === "") {
        errors.lname = "Last name cannot be left empty.";
        result = false;
      } else {
        errors.lname = "";
        result = true;
      }
    } else if (property === "username") {
      if (username === "") {
        errors.username = "Username cannot be left empty.";
        result = false;
      } else {
        errors.username = "";
        result = true;
      }
    } else if (property === "phone") {
      if (phone === "") {
        errors.phone = "Phone cannot be left empty.";
        result = false;
      } else if (phone.length < 7) {
        errors.phone = "Phone must be more than 7 characters.";
        result = false;
      } else {
        errors.phone = "";
        result = true;
      }
    } else if (property === "email") {
      if (
        !email.match(
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
      if (!password) {
        errors.password = "Password cannot be left empty.";
        result = false;
      } else if (!password.match(/^(?=.*[A-Z]).*$/)) {
        errors.password =
          "Password must contain at least one upper case character.";
        result = false;
      } else if (!password.match(/^.{7,13}$/)) {
        errors.password =
          "Password must be more than 8 characters and smaller than 15 characters.";
        result = false;
      } else if (!password.match(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/)) {
        errors.password =
          "Password must contain at least one special characters.";
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
    const {
      fname,
      lname,
      email,
      password,
      username,
      phone,
      // address,
      // country_code,
      errors,
    } = data;
    const credentials = [
      "fname",
      "lname",
      "email",
      "password",
      "username",
      "phone",
      // "address",
      // "country_code",
    ];
    let goAhead;
    for (let i = 0; i < credentials.length; i++) {
      const result = handleErrors(credentials[i]);
      if (goAhead !== false) {
        goAhead = result;
      }
    }
    if (goAhead) {
      setLoading(true);
      let formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("phone", phone);
      // formData.append("address", address);
      // formData.append("country_code", country_code);
      formData.append("user_type", "ST");
      axiosInstance
        .post(`/user/register/`, formData)
        .then((res) => {
          setData({
            fname: "",
            lname: "",
            username: "",
            // address: "",
            // country_code: "",
            phone: "",
            email: "",
            password: "",
            errors: {
              fname: "",
              lname: "",
              username: "",
              email: "",
              password: "",
            },
          });
          setLoading(false);
          setConfirmation(
            "Confirmation link has been sent to your email address."
          );
          toast.success(`Registered successfully please confirm to proceed`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          const { email, username } = err.response.data;
          if (email) {
            errors.email = "Email already exist";
          }
          if (username) {
            errors.username = "Username already exist";
          }

          setData({
            ...data,
            errors,
          });
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

  const {
    fname,
    lname,
    email,
    password,
    username,
    phone,
    // address,
    // country_code,
  } = data.errors;
  return (
    <div className="rounded-xl my-auto h-full w-full">
      <div className="flex relative h-full">
        <div className="md:block hidden w-72 flex-shrink-0">
          <img src={SignInBg} alt="Students" className="h-full w-full" />
        </div>

        <div className="p-4 bg-gray1 flex-1  overflow-auto">
          <div className="flex justify-between items-center">
            <span className="font-semibold tracking-wide text-xl">Sign Up</span>
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
              <Link to="/user-agreement" className="underline">
                User Agreement
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          {/* google and facebook authentication */}
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

          {/* facebook signup */}
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

          {/* <div className="py-2 mt-2 text-gray-800 tracking-wide">OR</div> */}
          <form onSubmit={handleSubmit}>
            {/* input fields */}
            <div className="grid grid-cols-2 gap-6 mb-3">
              {inputFields1.map((inputField, index) => {
                return (
                  <div className="flex-1 flex flex-col " key={index}>
                    <SimpleInputField
                      value={data[inputField.id]}
                      handleChange={(event) =>
                        handleChange(event, inputField.id)
                      }
                      {...inputField}
                    />
                    {inputField.id === "fname" && fname && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{fname}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )}
                    {inputField.id === "lname" && lname && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{lname}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )}
                    {inputField.id === "username" && username && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{username}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )}
                    {inputField.id === "phone" && phone && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{phone}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )}

                    {/*
                    {inputField.id === "address" && address && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{address}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )}
                    {inputField.id === "country_code" && country_code && (
                      <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                        <span className="z-10">{country_code}</span>
                        <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
              {inputFields2.map((inputField, index) => {
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
                    <ul className="flex flex-col mt-4 text-xs list-none px-2 text-gray-600">
                      <li>Must be in between 8-15 character</li>
                      <li>Must contain one uppercase character</li>
                      <li>Must contain one special character</li>
                    </ul>
                  </div>
                );
              })}
            </div>
            {confirmation && (
              <div className="text-green-600 text-sm mt-1">{confirmation}</div>
            )}
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
                " Sign Up "
              )}
            </button>
          </form>

          <div className="text-xs mt-16">
            <div>
              Already have an account?{" "}
              <span
                onClick={() => setComponent("login")}
                className="text-pink4 font-semibold text-xs hover:underline cursor-pointer"
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

export default Register;
