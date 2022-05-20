import React, { useState } from "react";
// import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import jwt_decode from "jwt-decode";
function MaintainLogin() {
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
  const handleChange = (property, value) => {
    setInvalid("");
    errorHandler(property, value);
    setData({
      ...data,
      [property]: value,
    });
  };
  const errorHandler = (property, value) => {
    const { errors } = data;
    value = value === undefined ? data[property] : value;
    errors.login = errors.login && "";
    let result;
    if (value.trim() === "") {
      errors[property] = `${property[0].toUpperCase()}${property.slice(
        1,
        property.length
      )} cannot be left empty`;
      result = false;
    } else {
      if (property === "email") {
        if (
          !value.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
          )
        ) {
          errors.email = "Invalid email";
          result = false;
        } else {
          errors.email = "";
          result = true;
        }
      } else {
        if (value.length < 8) {
          errors.password = "Password must be atleast 8 characters long";
          result = false;
        } else {
          errors.password = "";
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
    const { email, password } = data;
    const credentials = ["email", "password"];
    let goAhead;
    for (let i = 0; i < credentials.length; i++) {
      const result = errorHandler(credentials[i], data[credentials[i]]);
      if (goAhead !== false) {
        goAhead = result;
      }
    }
    if (goAhead) {
      // submitting the form if all input fields are validated
      let values = {
        email: email,
        password: password,
      };
      setLoading(true);
      axiosInstance
        .post(`/user/login/`, values)
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
            window.location = "/dashboard";
          }
        })
        .catch((err) => {
          // console.log(err.response);
          setInvalid(err.response.data.detail);
          setLoading(false);
        });
    }
  };
  const {
    email,
    password,
    errors: { email: emailError, password: passwordError },
  } = data;
  return (
    <div>
      <div className="w-full h-screen  bg-cover bg-landscape">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <form
                className="max-w-sm p-10 m-auto bg-gray-100 bg-opacity-25 rounded shadow-xl"
                onSubmit={handleSubmit}
              >
                <p className="mb-8 text-2xl font-light text-center">Login</p>
                <div className="mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      id="login-with-bg-email"
                      className="rounded-xl border-transparent flex-1 appearance-none border border-gray-300 w-full px-5 py-3 bg-white text-gray-700  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600  focus:ring-offset-1 placeholder-gray-dark focus:border-form"
                      placeholder="email"
                    />
                    {emailError && (
                      <div className="error text-red-600 text-xs mt-1">
                        {emailError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <div className=" relative ">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      id="login-with-bg-password"
                      className="rounded-xl border-transparent flex-1 appearance-none border border-gray-300 w-full px-5 py-3 bg-white text-gray-700  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600  focus:ring-offset-1 placeholder-gray-dark focus:border-form"
                      placeholder="password"
                    />
                    {passwordError && (
                      <div className="error text-red-600 text-xs mt-1">
                        {passwordError}
                      </div>
                    )}
                    {invalid && (
                      <div className="error text-red-600 text-xs mt-1">
                        {invalid}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    {loading ? (
                      <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      "Login "
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintainLogin;
