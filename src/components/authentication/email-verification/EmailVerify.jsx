import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Navbar from "../../home/static/navbar";

function EmailVerify({ loggedIn, role }) {
  const { token } = useParams();

  // let token = window.location.pathname.split("/")[3];
  const [verified, setVerified] = useState(false);
  let stop = "stop";
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setInterval(() => {
      const verifyEmail = async () => {
        axiosInstance
          .get(`user/email-verify/?${token}`, {
            signal,
          })
          .then(() => {
            setVerified(true);
            setTimeout(() => {
              window.location = "/";
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      verifyEmail();
    }, 2000);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [stop]);
  return (
    <div className="uni-homepage min-h-screen relative z-10 bg-gray1">
      <Navbar loggedIn={loggedIn} role={role} />
      <div className="flex justify-center items-center px-4 py-10 md:py-16 lg:py-20 md:px-8 lg:px-16 2xl:px-24 lg:space-x-10">
        <div
          className={`${
            verified ? "bg-green-600" : "bg-red-600"
          } text-white py-3 flex justify-center w-full max-w-lg  rounded-lg transition-all duration-300 ease-linear`}
        >
          <div className="flex space-x-4">
            <div> {verified ? "verified" : "Verifying"}</div>
            {verified ? (
              <div>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ) : (
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
