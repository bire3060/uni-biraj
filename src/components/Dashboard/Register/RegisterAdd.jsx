import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import SucessMessage from "../../common/SucessMessage";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const RegisterAdd = () => {
  const { id } = useParams();
  const [errors, seterrors] = useState({});
  const [datacheck, setdatacheck] = useState(false);
  const [save, setsave] = useState(false);
  const [inputFields, setInputFields] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    user_type: "",
    country_code: "",
  });
  // Post Or Put
  const [post, setpost] = useState(true);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  // validation error state
  const [error, setError] = useState({});
  const {
    fname,
    lname,
    email,
    username,
    password,
    confirm_password,
    phone,
    address,
    user_type,
    country_code,
  } = inputFields;

  const inputs = [
    {
      label: "First Name",
      name: "fname",
      value: fname,
      vali: error.fname,
      type: "text",
    },
    {
      label: "Last Name",
      name: "lname",
      value: lname,
      vali: error.lname,
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      value: email,
      vali: error.email,
      type: "text",
    },
    {
      label: "Username",
      name: "username",
      value: username,
      vali: error.username,
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      value: password,
      vali: error.password,
      type: "password",
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      value: confirm_password,
      vali: error.confirm_password,
      type: "password",
    },
    {
      label: "User Type",
      name: "user_type",
      value: user_type,
      vali: error.user_type,
      type: "select",
      options: [
        // { optionValue: "user_type" },
        { value: "AD", optionValue: "Admin" },
        { value: "ST", optionValue: "Student" },
        { value: "IN", optionValue: "Online Instructor" },
        { value: "CO", optionValue: "Counsler" },
        { value: "AM", optionValue: "Application Manager" },
      ],
    },
    {
      label: "Country Code",
      name: "country_code",
      value: country_code,
      vali: error.country_code,
      type: "number",
    },
    {
      label: "phone",
      name: "phone",
      value: phone,
      vali: error.phone,
      type: "number",
    },
    {
      label: "Address",
      name: "address",
      value: address,
      vali: error.address,
      type: "text",
    },
  ];
  const token = localStorage.getItem("refresh");
  let decoded;
  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (e) {
      localStorage.clear();
    }
  }
  // const [gdata, setgdata] = useState([]);
  const getdata = () => {
    id
      ? axiosInstance
          .get(`user/user-update/${id}`)
          .then((res) => {
            setInputFields((pre) => {
              return {
                ...pre,
                fname: res.data.fname,
                lname: res.data.lname,
                email: res.data.email,
                username: res.data.username,
                phone: res.data.phone,
                address: res.data.address,
                user_type: res.data.user_type,
                country_code: res.data.country_code,
                password: res.data.password,
                confirm_password: res.data.confirm_password,
              };
            });
            setpost(false);
            // setgdata(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      : axiosInstance
          .get(`user/user-update/${decoded.user_id}`)
          .then((res) => {
            setInputFields((pre) => {
              return {
                ...pre,
                fname: res.data.fname,
                lname: res.data.lname,
                email: res.data.email,
                phone: res.data.phone,
                address: res.data.address,
                user_type: res.data.user_type,
                country_code: res.data.country_code,
                password: res.data.password,
                confirm_password: res.data.confirm_password,
              };
            });
            // setpost(false);
            // setgdata(res.data);
          })
          .catch((err) => {
            setpost(true);
            console.log(err);
          });
  };
  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    seterrors(validate(inputFields));
    setdatacheck(true);
    // const entries = Object.entries(error);
    // let goahead;
    // if (entries[0][1] === "") {
    //   goahead = false;
    // } else {
    //   goahead = true;
    // }
    // if (entries.length > 1) {
    //   goahead = false;
    // } else {
    //   goahead = true;
    // }
    // if (goahead) {
    //   post
    //     ? axiosInstance
    //         .post(`/user/register/`, inputFields)
    //         .then((res) => {
    //           setMessage("User saved sucessfully");
    //           setOpen(true);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //     : axiosInstance
    //         .put(`user/user-update/${id}`, inputFields)
    //         .then((res) => {
    //           setMessage("User update sucessfully");
    //           setOpen(true);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    // }
  };

  const errorHanlder = (error) => {
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && datacheck) {
      setsave(true);
      post
        ? axiosInstance
            .post(`/user/register/`, inputFields)
            .then((res) => {
              setsave(false);
              setMessage("User saved sucessfully");
              setOpen(true);
            })
            .catch((error) => {
              setsave(false);
              if (error.response.data.username) {
                errorHanlder(error.response.data.username);
              }
              if (error.response.data.email) {
                errorHanlder(error.response.data.email);
              }
              if (error.response.data.address) {
                errorHanlder(error.response.data.address);
              }
              if (error.response.data.country_code) {
                errorHanlder(error.response.data.country_code);
              }
              if (error.response.data.fname) {
                errorHanlder(error.response.data.fname);
              }
              if (error.response.data.lname) {
                errorHanlder(error.response.data.lname);
              }
              if (error.response.data.user_type) {
                errorHanlder(error.response.data.user_type);
              }
              if (error.response.data.password) {
                errorHanlder(error.response.data.password);
              }
              if (error.response.data.confirm_password) {
                errorHanlder(error.response.data.confirm_password);
              }
              if (error.response.data.phone) {
                errorHanlder(error.response.data.phone);
              }
            })
        : axiosInstance
            .put(`user/user-update/${id}`, inputFields)
            .then((res) => {
              setsave(false);
              setMessage("User update sucessfully");
              setOpen(true);
            })
            .catch((err) => {
              setsave(false);
              if (error.response.data.username) {
                errorHanlder(error.response.data.username);
              }
              if (error.response.data.email) {
                errorHanlder(error.response.data.email);
              }
              if (error.response.data.address) {
                errorHanlder(error.response.data.address);
              }
              if (error.response.data.country_code) {
                errorHanlder(error.response.data.country_code);
              }
              if (error.response.data.fname) {
                errorHanlder(error.response.data.fname);
              }
              if (error.response.data.lname) {
                errorHanlder(error.response.data.lname);
              }
              if (error.response.data.user_type) {
                errorHanlder(error.response.data.user_type);
              }
              if (error.response.data.password) {
                errorHanlder(error.response.data.password);
              }
              if (error.response.data.confirm_password) {
                errorHanlder(error.response.data.confirm_password);
              }
              if (error.response.data.phone) {
                errorHanlder(error.response.data.phone);
              }
            });
    }
    // eslint-disable-next-line
  }, [errors]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const validate = (data) => {
    const errors = {};
    if (!data.fname) {
      errors.fname = "First Name Field is required";
    }
    if (!data.lname) {
      errors.lname = "Last Name Field is required";
    }
    if (
      !data.email.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      errors.email = "Invalid email address.";
      // error = false;
    }
    if (!data.username) {
      errors.username = "Username Field is required";
    }
    if (!data.password) {
      errors.password = "Password field is required";
    } else if (password.length < 8) {
      errors.password = "Password must be more than 5 characters";
    }
    if (!data.confirm_password) {
      errors.confirm_password = "Confirm password field is required";
    } else if (password !== confirm_password) {
      errors.confirm_password = "Password must be matched";
    }
    if (!data.phone) {
      errors.phone = "phone Field is required";
    } else if (data.phone.charAt(0) === "-") {
      errors.phone = "phone no cannot be negative";
    } else if (data.phone.length < 7) {
      errors.phone = "Phone number must be more thn 7 character";
    } else if (data.phone.length > 15) {
      errors.phone = "Phone number cannot be more than 15 characters";
    }
    if (!data.address) {
      errors.address = "Address field is required";
    }
    if (!data.country_code) {
      errors.country_code = "Country code is required";
    } else if (data.country_code.charAt(0) === "-") {
      errors.country_code = "Country code cannot be negative";
    }
    setError(errors);
    return errors;
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
    setInputFields({
      fname: "",
      lname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      user_type: "AD",
      country_code: "",
    });
  };
  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > Register > Add"}</div>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="mx-auto bg-white p-4 mt-6 border border-gray-300 mb-6 rounded-2xl"
          style={{ width: "98%" }}
        >
          {inputs.map((input, index) => {
            const { label, name, value, type, vali, options } = input;

            return (
              <div key={index} className="md:w-3/4 mx-auto">
                <div className="flex items-center md:flex-row flex-col">
                  <label className="md:w-44 w-full font-semibold text-gray-700">
                    {label}
                  </label>
                  {type !== "select" ? (
                    <input
                      className="border mt-3 border-gray-400 shadow-lg md:w-3/4 w-full rounded-lg focus:bg-gray-100 p-1 px-3"
                      onKeyPress={(event) => {
                        if (
                          !/[0-9 || +]/.test(event.key) &&
                          type === "number"
                        ) {
                          event.preventDefault();
                        }
                      }}
                      onChange={changeHandler}
                      name={name}
                      value={value}
                      type={type}
                    />
                  ) : (
                    <select
                      onChange={changeHandler}
                      name={name}
                      value={value}
                      className="border mt-3 border-gray-400 shadow-lg md:w-3/4 w-full rounded-lg focus:bg-gray-100 p-1 px-3 cursor-pointer"
                    >
                      <option hidden>--- Choose user type ---</option>
                      {options.map((option, index) => {
                        const { optionValue, value } = option;
                        return (
                          <option
                            key={index}
                            value={value}
                            className="bg-gray-100"
                          >
                            {optionValue}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div className="mx-44 mt-1">
                  {vali && <p className="text-red-600 text-sm ">{vali}</p>}
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-end md:w-3/4 mx-auto mt-10">
            {/* <button
              type="submit"
              className="bg-pink4 rounded-md px-8 text-white p-1 uppercase"
            >
              Submit
            </button> */}
            <button
              disabled={save ? true : false}
              type="submit"
              className={` h-10 text-white rounded text-lg flex justify-center items-center w-32 ${
                save ? "bg-pink3 cursor-not-allowed" : "bg-pink5"
              }`}
            >
              {save ? (
                <div className="lds-ring mb-1.5">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterAdd;
