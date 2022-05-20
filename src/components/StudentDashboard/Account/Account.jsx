import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closed from "../../../assets/icons/closed.png";
import open from "../../../assets/icons/open.png";
// import { show } from "dom7";
// import IconManager from "../../common/IconManager";
const Account = () => {
  const [save, setsave] = useState(false);
  const [input, setInput] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  // const [show, setshow] = useState(true);

  const [dataCheck, setDataCheck] = useState(false);
  const { currentPass, newPass, confirmPass } = input;

  const [error, setError] = useState({});
  const passwords = [
    {
      label: "Current Password",
      name: "currentPass",
      type: "password",
      id: 0,
      value: currentPass,
      vali: error.currentPass,
    },
    {
      label: "New Password",
      name: "newPass",
      type: "password",
      id: 1,
      value: newPass,
      vali: error.newPass,
    },
    {
      label: "Confirm Password",
      name: "confirmPass",
      type: "password",
      id: 2,
      value: confirmPass,
      vali: error.confirmPass,
    },
  ];

  const submitForm = (e) => {
    e.preventDefault();
    setError(validate(input));
    // changePasword();
    setDataCheck(true);
  };

  // const changePasword = () => {
  //   const postData = {
  //     old_password: currentPass,
  //     password: newPass,
  //     password2: confirmPass,
  //   };
  //   axios
  //     .put(`user/password-change/`, postData)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (dataCheck === true && Object.keys(error).length === 0) {
      setsave(true);
      const decoded = jwt_decode(localStorage.getItem("access"));
      const patchdata = {
        old_password: currentPass,
        password: newPass,
        password2: confirmPass,
      };
      axiosInstance
        .put(`user/password-change/${decoded.user_id}/`, patchdata)
        .then((res) => {
          //sucess tostify here nabin
          setsave(false);
          toast.success("Save Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(res);
        })
        .catch((err) => {
          // tostify here nabin
          setsave(false);
          toast.error(`${err.response.data.old_password.old_password}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
    // eslint-disable-next-line
  }, [error]);

  const validate = (data) => {
    let errors = {};
    if (!data.currentPass) {
      errors.currentPass = "Current password is required";
    }
    if (!data.newPass) {
      errors.newPass = "New password is required";
    }
    if (!data.confirmPass) {
      errors.confirmPass = "Confirm password is required";
    } else if (confirmPass !== newPass) {
      errors.confirmPass = "Password do not match";
    }
    return errors;
  };
  const [active, setactive] = useState("");

  return (
    <>
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > My Account"}</div>
          </div>
        </div>

        <div
          className="mx-auto bg-white p-1 sm:p-4 border mt-2 relative border-gray-300 rounded-2xl"
          style={{ width: "98%", height: 604 }}
        >
          <div className="pt-4">
            <div className="md:w-96  tracking-wide mx-4 p-1 px-4  font-bold text-gray-600 shadow-lg">
              Change Password
            </div>
            <form
              onSubmit={submitForm}
              className="px-4"
              autoComplete={false}
              autoSave={false}
            >
              {passwords.map((password, index) => {
                const { label, name, type, value, vali } = password;
                return (
                  <div key={index}>
                    <div className="mt-3">
                      <div>
                        <label htmlFor="password" className="font-semibold">
                          {label}
                          <span className="text-red-600 text-xl">*</span>
                        </label>
                      </div>
                      <div className="relative md:w-96 w-full">
                        <input
                          className="border border-gray-400 focus:bg-gray-50 md:w-96 w-full shadow pl-2 rounded-md p-1"
                          name={name}
                          onCopy={(e) => {
                            e.preventDefault();
                          }}
                          onCut={(e) => {
                            e.preventDefault();
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                          }}
                          value={value}
                          type={active === index ? "text" : type}
                          onChange={changeHandler}
                        />
                        <div className="absolute h-full flex items-center top-0 right-1.5">
                          {/* <IconManager
                            onClick={() => {
                              active === index
                                ? setactive(-1)
                                : setactive(index);
                            }}
                            icon="Settings"
                            style={{ cursor: "pointer" }}
                          /> */}
                          {
                            <img
                              onClick={() => {
                                active === index
                                  ? setactive(-1)
                                  : setactive(index);
                              }}
                              src={active === index ? closed : open}
                              alt=""
                              className="w-5 cursor-pointer"
                            />
                          }
                        </div>
                      </div>

                      {vali && (
                        <p className="text-red-600 mt-1 text-sm  ">{vali}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div>
                {/* <button
                  className="bg-gray-800 text-white mt-6  rounded py-0.5 md:w-24 w-full"
                  type="submit"
                >
                  Change
                </button> */}
                <button
                  disabled={save ? true : false}
                  type="submit"
                  className={` h-10 my-4 text-white rounded text-lg flex justify-center items-center w-26 ${
                    save ? "bg-blue3 cursor-not-allowed" : "bg-blue2"
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
        </div>
      </div>
    </>
  );
};

export default Account;
