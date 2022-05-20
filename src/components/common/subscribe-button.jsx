import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const SubscribeButton = () => {
  const [show, setShow] = useState(false);
  const [sub, setSub] = useState("");
  const [subErr, setSubErr] = useState("");

  const handleSub = (e) => {
    e.preventDefault();
    if (sub === "") {
      setSubErr("Provide Email Address");
    } else if (
      !sub.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      setSubErr("Invalid Email Address");
    } else {
      setSubErr("");
      let val = {
        email: sub,
      };
      axiosInstance
        .post(`/user/subscribe/`, val)
        .then((res) => {
          toast.success(`Subscribed Sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(false);
        })
        .catch((error) => {
          toast.error(`Subscripiton with this email already exists.`, {
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
  };

  return (
    <>
      <div className="3xl:max-w-7xl mx-auto relative">
        <div
          className="fixed bottom-5 z-20 right-5 border-2 border-white bg-pink4 cursor-pointer rounded-full flex items-center justify-center w-12 h-12"
          style={{ boxShadow: "0 0 10px gray" }}
          onClick={() => setShow(!show)}
        >
          <svg
            id="chat-speech-bubbles"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="20.73"
            viewBox="0 0 41.655 34.001"
          >
            <g id="Group_411" data-name="Group 411" transform="translate(0 0)">
              <path
                id="Path_7277"
                data-name="Path 7277"
                d="M16.831,3.478C7.535,3.478,0,9.273,0,16.425a11.586,11.586,0,0,0,4.762,9.024c-.171,2.377-.743,5.285-2.4,6.851,3.3,0,6.67-2.066,8.8-3.682a21.392,21.392,0,0,0,5.668.754c9.3,0,16.831-5.792,16.831-12.947S26.127,3.478,16.831,3.478Z"
                transform="translate(0 1.701)"
                fill="#fff"
              />
              <path
                id="Path_7278"
                data-name="Path 7278"
                d="M30.706,20.865a10.689,10.689,0,0,0,2.227-6.44C32.933,7.273,25.4,1.478,16.1,1.478A20.04,20.04,0,0,0,5.346,4.466a23.107,23.107,0,0,1,4.283-.4c10.01,0,18.126,6.378,18.126,14.242a12.235,12.235,0,0,1-3.4,8.3c2.126,1.616,5.5,3.687,8.8,3.687C30.812,28.073,30.644,23.138,30.706,20.865Z"
                transform="translate(8.497 -1.478)"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
        {show && (
          <div
            className="fixed z-20 right-5 bottom-20 bg-blue1 text-gray7 rounded-xl left-5 sm:left-auto sm:bottom-5 sm:right-20"
            style={{ boxShadow: "0 0 10px gray" }}
          >
            <div
              className="absolute top-4 right-5 cursor-pointer"
              onClick={() => setShow(false)}
            >
              <svg viewBox="0 0 311 311.07733" className="w-3">
                <path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                <path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
              </svg>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex space-x-3">
                <div>
                  <svg className="h-10" viewBox="0 0 70.034 58.237">
                    <g id="gift-card" transform="translate(0.001 -43.12)">
                      <g
                        id="Group_3892"
                        data-name="Group 3892"
                        transform="translate(-0.001 43.12)"
                      >
                        <path
                          id="Path_8296"
                          data-name="Path 8296"
                          d="M69.679,65.774a4.422,4.422,0,0,0-2.428-2.39l-1.231-.5v-6.5a4.457,4.457,0,0,0-4.452-4.452H38.974L26.016,46.68a1.028,1.028,0,0,0-.772,1.905L33.5,51.929H12.012l2.129-5.256a2.4,2.4,0,0,1,3.121-1.321l4.173,1.69a1.028,1.028,0,1,0,.772-1.905l-4.173-1.69a4.457,4.457,0,0,0-5.8,2.455L9.793,51.929H8.465a4.457,4.457,0,0,0-4.452,4.452V66.2L.328,75.3a4.452,4.452,0,0,0,2.455,5.8l1.231.5v6.5a4.457,4.457,0,0,0,4.452,4.452h4.386a1.028,1.028,0,0,0,0-2.056H8.465a2.4,2.4,0,0,1-2.4-2.4V69.727H19.577a19.663,19.663,0,0,0-6.874,9.79,1.028,1.028,0,0,0,1.977.565c1.386-4.854,5.135-8.051,7.247-9.526V90.493H16.963a1.028,1.028,0,0,0,0,2.056h14.1l10.213,4.137a1.028,1.028,0,1,0,.772-1.905l-5.51-2.232H58.021l-2.129,5.257a2.4,2.4,0,0,1-3.121,1.321l-6.908-2.8a1.028,1.028,0,0,0-.772,1.905l6.908,2.8a4.452,4.452,0,0,0,5.8-2.455l2.442-6.028h1.328A4.457,4.457,0,0,0,66.02,88.1V78.28l3.686-9.1a4.424,4.424,0,0,0-.027-3.407ZM3.554,79.189a2.4,2.4,0,0,1-1.321-3.12l1.78-4.4v7.7Zm9.228-15.339c-.176-.414-.3-1.076.626-2.04A1.819,1.819,0,0,1,15,61.177c1.243.187,2.884,1.624,4.62,4.045.6.841,1.129,1.676,1.534,2.36C17.217,67.2,13.533,65.618,12.782,63.849Zm9.145,1.073c-1.632-2.451-4.08-5.395-6.618-5.778a3.787,3.787,0,0,0-3.382,1.238,3.883,3.883,0,0,0-1.038,4.27,6.7,6.7,0,0,0,3.158,3.017H6.069V56.381a2.4,2.4,0,0,1,2.4-2.4H21.927V64.923ZM63.964,88.1a2.4,2.4,0,0,1-2.4,2.4H23.982V70.555c2.113,1.476,5.861,4.673,7.247,9.526a1.028,1.028,0,0,0,1.977-.565,19.663,19.663,0,0,0-6.874-9.79H63.964ZM24.753,67.582c.4-.677.921-1.5,1.52-2.339,1.742-2.433,3.388-3.877,4.635-4.065a1.819,1.819,0,0,1,1.595.632c.928.963.8,1.625.626,2.04-.751,1.768-4.436,3.348-8.375,3.733Zm39.211.089h-32.1a6.7,6.7,0,0,0,3.158-3.017,3.883,3.883,0,0,0-1.038-4.27A3.788,3.788,0,0,0,30.6,59.145c-2.537.383-4.986,3.327-6.618,5.778V53.985H61.567a2.4,2.4,0,0,1,2.4,2.4v11.29Zm3.836.739-1.78,4.4V65.1l.459.186A2.4,2.4,0,0,1,67.8,68.41Z"
                          transform="translate(0.001 -43.12)"
                          fill="#ef0f50"
                        />
                        <path
                          id="Path_8297"
                          data-name="Path 8297"
                          d="M366.819,268.343v.934a.974.974,0,0,0,1.948,0v-.908a3.214,3.214,0,0,0,1.56-.793,3.362,3.362,0,0,0,1.015-2.416,3.03,3.03,0,0,0-.674-1.96,4,4,0,0,0-2.761-1.284c-1.156-.128-1.329-.724-1.329-1.067a1.144,1.144,0,0,1,1.215-1.215,1.282,1.282,0,0,1,1.147.577.976.976,0,0,0,.9.605.987.987,0,0,0,.876-1.407,3.127,3.127,0,0,0-1.952-1.589v-.953a.974.974,0,0,0-1.948,0v.95a2.873,2.873,0,0,0-1.6,1.151,3.476,3.476,0,0,0-.585,1.881,3.065,3.065,0,0,0,3.064,3c1.7.188,1.7,1,1.7,1.308a1.411,1.411,0,0,1-.4,1,1.688,1.688,0,0,1-1.3.347,1.555,1.555,0,0,1-1.536-.928h0a.975.975,0,1,0-1.86.576A3.364,3.364,0,0,0,366.819,268.343Z"
                          transform="translate(-314.101 -226.254)"
                          fill="#ef0f50"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-sm font-bold">
                    Claim FREE gift package
                  </div>
                  <div className="text-xs text-gray-700">
                    Yes, please send me exclusive deals & updates.
                  </div>
                </div>
              </div>
              <div className="w-full text-xs">
                <form className="relative" onSubmit={handleSub}>
                  <input
                    type="text"
                    placeholder="Email"
                    className="border bg-white py-3 text-gray7 font-bold pl-4 pr-36 w-full rounded-tl focus:border-gray4"
                    style={{ borderRadius: "6px 20px 20px 6px" }}
                    spellCheck="false"
                    onChange={(e) => setSub(e.target.value)}
                  />
                  <div className="absolute cursor-pointer right-0 top-0 h-full w-32 bg-pink4 flex items-center justify-center text-center rounded-full text-white">
                    <button type="submit">Subscribe</button>
                  </div>
                </form>
                {subErr && (
                  <div className="text-sm text-red-500 flex items-start justify-start">
                    {subErr}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscribeButton;
