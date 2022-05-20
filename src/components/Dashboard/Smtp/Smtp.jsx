import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import IconManager from "../../common/IconManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Smtp = () => {
  const [input, setinput] = useState({
    emali_port: "",
    email_host_user: "",
    email_host_password: "",
  });
  const [error, seterror] = useState({});
  const [save, setsave] = useState(false);
  const [datacheck, setdatacheck] = useState(false);
  const [smtpId, setSmtpId] = useState("");
  const { emali_port, email_host_user, email_host_password } = input;
  const Handelchange = (e) => {
    const { name, value } = e.target;
    setinput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const validation = (input) => {
    let error = {};
    if (!input.emali_port) {
      error.emali_port = "Enter your Email port";
    }
    if (!input.email_host_user) {
      error.email_host_user = "Enter your Email host user";
    }
    if (
      !input.email_host_user.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      error.email_host_user = "Invalid email address.";
    }
    if (!input.email_host_password) {
      error.email_host_password = "Enter your Email host password";
    }
    return error;
  };
  const HandelSubmit = (e) => {
    e.preventDefault();
    seterror(validation(input));
    setdatacheck(true);
  };

  // getting all the previous smpt input values
  const getAllPreviousSmtpInputs = (signal) => {
    axiosInstance
      .get(`/settings/Smtp/`, { signal })
      .then((res) => {
        setinput({
          emali_port: res.data[0].email_port,
          email_host_user: res.data[0].email_host_user,
          email_host_password: res.data[0].email_host_password,
        });
        setSmtpId(res.data[0].id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllPreviousSmtpInputs(signal);
    return () => controller.abort();
  }, []);

  // updading the smtp
  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setsave(true);
      axiosInstance
        .put(`settings/Smtp-detail/${smtpId}/`, {
          emali_port,
          email_host_user,
          email_host_password,
        })
        .then((res) => {
          setsave(false);
          toast.success("Saved Successfully", {
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
          setsave(false);
          //   err.response.data && toast.error(`${err.response.data.Error}`, {
          //     position: "top-right",
          //     autoClose: 2000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   });
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <div>
      <div className="h-8 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Smtp"}</div>
        </div>
      </div>
      <form
        onSubmit={HandelSubmit}
        className="py-5 px-3 relative md:px-10  bg-white max-w-md mx-auto mt-20 border border-gray-300 shadow-lg rounded-md"
      >
        {/* <button
          type="submit"
          className="bg-pink3 absolute top-1 right-2 font-semibold mt-1  text-white flex space-x-1 items-center px-3 rounded-md cursor-pointer hover:bg-pink4"
        >
          <div>
            <IconManager icon="Save" className="w-4 h-4" />
          </div>
          <div>{"SAVE"}</div>
        </button> */}
        <div className="flex justify-between w-11/12">
          <div className="text-base font-medium text-gray-700 self-end">
            Email port:
          </div>
        </div>
        <input
          onChange={Handelchange}
          name="emali_port"
          value={emali_port}
          className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-11/12"
        />
        {error.emali_port && (
          <p className="text-sm pl-2 text-red-500">{error.emali_port}</p>
        )}
        <div className="text-base mt-1 font-medium text-gray-700">
          Email host user:
        </div>
        <input
          type="email"
          onChange={Handelchange}
          name="email_host_user"
          value={email_host_user}
          className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-11/12"
        />
        {error.email_host_user && (
          <p className="text-sm pl-2 text-red-500">{error.email_host_user}</p>
        )}
        <div className="text-base mt-1 font-medium text-gray-700">
          Email host password:
        </div>
        <input
          onChange={Handelchange}
          name="email_host_password"
          value={email_host_password}
          type="password"
          className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-11/12"
        />
        {error.email_host_password && (
          <p className="text-sm pl-2 text-red-500">
            {error.email_host_password}
          </p>
        )}
        <div className="w-11/12 mt-2 flex justify-end ">
          {/* <button
            type="submit"
            className="bg-pink3  font-semibold mt-1  text-white flex space-x-1 items-center px-3 rounded-md cursor-pointer hover:bg-pink4"
          >
            <div>
              <IconManager icon="Save" className="w-4 h-4" />
            </div>
            <div>{"SAVE"}</div>
          </button> */}
          <button
            type="submit"
            disabled={save ? true : false}
            className={` font-semibold mt-1  text-white flex space-x-1 items-center h-7 w-20 rounded-md cursor-pointer ${
              save ? "bg-pink3 cursor-not-allowed" : "bg-pink4"
            }`}
          >
            {save ? (
              <div className="lds-ring m-auto mb-2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <div className="flex gap-1">
                <IconManager icon="Save" className="w-6 h-4 self-center" />
                <div>{"SAVE"}</div>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Smtp;
