import React, { useState } from "react";
import ZoomExclamation from "../../../assets/images/Zoom/exclamation-mark.svg";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
const ZoomSettings = () => {
  const [zoomInputs, setZoomInputs] = React.useState({
    registrants_email_notification: false,
    registrants_email_confirm: false,
    meeting_authentication: false,
    close_registration: false,
    host_video: false,
    participant_video: false,
    join_before_host: false,
    mute_upon_entry: false,
    watermark: false,
    approval_type: 0,
    registration_type: 1,
  });
  const [zoomBasic, setZoomBasic] = React.useState({
    topic: "",
    type: 1,
    duration: "",
    schedule_for: "",
    password: "",
    agenda: "",
  });
  const [save, setsave] = useState(false);
  const [timeErr, settimeErr] = React.useState("");
  const [time, setTime] = React.useState("");
  const [pwdError, setPwdError] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [endDateErr, setEndDateErr] = React.useState("");
  const [recurring, setRecurring] = useState(false);
  const handleRecurring = (data) => {
    if (data === "8") {
      setRecurring(true);
    } else {
      setRecurring(false);
    }
  };
  const Type = [
    {
      value: 1,
      name: "An instant meeting.",
    },
    {
      value: 2,
      name: "A scheduled meeting.",
    },
    {
      value: 8,
      name: "A recurring meeting with fixed time.",
    },
  ];
  const approvedType = [
    {
      value: 0,
      name: "Automatically Approved",
    },
    {
      value: 1,
      name: "Manually Approved",
    },
    {
      value: 2,
      name: "No registeration Required",
    },
  ];
  const registerType = [
    {
      value: 1,
      name: "Attendees register once",
    },
    {
      value: 2,
      name: "Register for each meeting",
    },
    {
      value: 3,
      name: "Register once and selete more",
    },
  ];
  const createZoom = (e) => {
    e.preventDefault();
    const {
      registrants_email_notification,
      registrants_email_confirm,
      meeting_authentication,
      close_registration,
      host_video,
      participant_video,
      join_before_host,
      mute_upon_entry,
      watermark,
      approval_type,
      registration_type,
    } = zoomInputs;
    const { topic, type, duration, password } = zoomBasic;
    let zoomVal;
    if (recurring) {
      zoomVal = {
        topic,
        type: parseInt(type),
        duration,
        // schedule_for,
        password,
        agenda,
        start_time: `${time}:00Z`,
        recurrence: {
          type: 1,
          repeat_interval: 90,
          end_date_time: `${endDate}:00Z`,
        },
        settings: {
          registrants_email_notification,
          registrants_email_confirm,
          meeting_authentication,
          close_registration,
          host_video,
          participant_video,
          join_before_host,
          mute_upon_entry,
          watermark,
          approval_type: parseInt(approval_type),
          registration_type: parseInt(registration_type),
        },
      };
    } else {
      zoomVal = {
        topic,
        type: parseInt(type),
        duration,
        // schedule_for,
        password,
        agenda,
        start_time: `${time}:00Z`,
        settings: {
          registrants_email_notification,
          registrants_email_confirm,
          meeting_authentication,
          close_registration,
          host_video,
          participant_video,
          join_before_host,
          mute_upon_entry,
          watermark,
          approval_type: parseInt(approval_type),
          registration_type: parseInt(registration_type),
        },
      };
    }

    // let dateChecker = new Date();
    // let year = dateChecker.getFullYear();
    // let month = dateChecker.getMonth();
    // let day = dateChecker.getDate();
    // console.log(zoomVal);
    if (!time) {
      settimeErr("Select the date & time ");
    } else if (!endDate && recurring === true) {
      setEndDateErr("Select the end date & time");
    } else if (!password) {
      setPwdError("Enter the password for meeting.");
    } else if (password.length > 10) {
      setPwdError("Password length cannot be more than 10.");
    } else {
      setPwdError("");
      setEndDateErr("");
      settimeErr("");
      // console.log(zoomVal);
      setsave(true);
      axiosInstance
        .post(`/user/education/zoom-start/`, zoomVal)
        .then((res) => {
          setRecurring(false);
          setsave(false);
          // console.log(res.data);
          toast.success("New meeting has been created", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setZoomInputs({
            registrants_email_notification: false,
            registrants_email_confirm: false,
            meeting_authentication: false,
            close_registration: false,
            host_video: false,
            participant_video: false,
            join_before_host: false,
            mute_upon_entry: false,
            watermark: false,
            approval_type: "",
            registration_type: "",
          });
          setZoomBasic({
            topic: "",
            type: "",
            duration: "",
            schedule_for: "",
            password: "",
            agenda: "",
          });
        })
        .catch((err) => {
          setsave(false);
          console.log(err);
        });
    }
  };

  const {
    registrants_email_notification,
    registrants_email_confirm,
    meeting_authentication,
    close_registration,
    host_video,
    participant_video,
    join_before_host,
    mute_upon_entry,
    watermark,
    approval_type,
    registration_type,
  } = zoomInputs;
  const { topic, type, duration, password, agenda } = zoomBasic;
  // console.log(zoomBasic);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return (
    <div className="bg-gray-100  w-full relative">
      <div className="h-8 w-full bg-white shadow-lg">
        <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
          <div className="self-center">{"Dashboard > Zoom Settings"}</div>
        </div>
      </div>
      <div
        style={{ width: "98%" }}
        className="mx-auto bg-white mb-4  border mt-2 relative border-gray-300 rounded-2xl"
      >
        <div className="px-3 pt-2 font-semibold text-gray-700 text-xl">
          Settings
        </div>
        <div className="text-xs tracking-wide pb-2 text-gray-500 border-b border-gray-300">
          <div className="md:w-4/5 w-full px-3 pt-1">
            Set up how you want to handle Zoom meetings real-time media traffic
            (audio, video and screen sharing) that flows across your network.
            <img
              src={ZoomExclamation}
              alt="zoomExclamation"
              className="h-4 w-4 inline ml-1 -mt-1"
            />
          </div>
        </div>
        <form className="px-3 pt-1 mb-4" onSubmit={createZoom}>
          <div className="bg-white mt-4 border shadow-xl rounded-md ">
            <div className="divide-y flex flex-col divide-gray-200">
              {/* topic */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Topic
                </div>

                <div className="w-72">
                  <input
                    name=""
                    id=""
                    type="text"
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={topic}
                    onChange={(e) =>
                      setZoomBasic({ ...zoomBasic, topic: e.target.value })
                    }
                  />
                </div>
              </div>
              {/*  Type */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Type
                </div>

                <div className="w-72">
                  <select
                    name=""
                    id=""
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={type}
                    onChange={(e) => {
                      setZoomBasic({ ...zoomBasic, type: e.target.value });
                      handleRecurring(e.target.value);
                    }}
                  >
                    <option disabled={true}>---Select type---</option>
                    {Type.map((time, index) => {
                      const { value, name } = time;
                      return (
                        <option key={index} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* Start time */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Start Time
                </div>

                <div className="flex flex-col">
                  <div className="flex space-x-2">
                    <input
                      name=""
                      id=""
                      type="datetime-local"
                      min={`${today}T00:00`}
                      className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  {/* <span className="text-pink4 text-sm">{dateErr}</span> */}
                  <span className="text-pink4 text-sm">{timeErr}</span>
                </div>
              </div>
              {/* End time */}
              {recurring && (
                <div className="p-2 flex items-center">
                  <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                    End Time
                  </div>

                  <div className="flex flex-col">
                    <div className="flex space-x-2">
                      <input
                        name=""
                        id=""
                        type="datetime-local"
                        min={`${today}T00:00`}
                        className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6"
                        value={time}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <span className="text-pink4 text-sm">{endDateErr}</span>
                  </div>
                </div>
              )}
              {/* Duration */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Duration
                </div>

                <div className="w-72">
                  <input
                    name=""
                    id=""
                    type="number"
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    placeholder="In minutes ..."
                    value={duration}
                    onChange={(e) =>
                      setZoomBasic({ ...zoomBasic, duration: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password  */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Password
                </div>

                <div className="w-72 flex flex-col">
                  <input
                    name=""
                    id=""
                    type="text"
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={password}
                    onChange={(e) =>
                      setZoomBasic({
                        ...zoomBasic,
                        password: e.target.value,
                      })
                    }
                  />
                  <span className="text-pink4 text-sm">{pwdError}</span>
                </div>
              </div>
              {/* topic */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Agenda
                </div>

                <div className="w-72">
                  <input
                    name=""
                    id=""
                    type="text"
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={agenda}
                    onChange={(e) =>
                      setZoomBasic({ ...zoomBasic, agenda: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* host video   */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Host Video
                </div>

                <label className="switchc">
                  <input
                    type="checkbox"
                    checked={host_video}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        host_video: !host_video,
                      })
                    }
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
              {/* Participants Video */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Participants Video
                </div>

                <label className="switchc">
                  <input
                    type="checkbox"
                    checked={participant_video}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        participant_video: !participant_video,
                      })
                    }
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
              {/* Join Before Host  */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Join Before Host
                </div>

                <label className="switchc">
                  <input
                    type="checkbox"
                    checked={join_before_host}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        join_before_host: !join_before_host,
                      })
                    }
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
              {/* Approval Type */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Approval Type
                </div>

                <div className="w-72">
                  <select
                    name=""
                    id=""
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={approval_type}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        approval_type: e.target.value,
                      })
                    }
                  >
                    {approvedType.map((time, index) => {
                      const { value, name } = time;
                      return (
                        <option key={index} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* Mute Upon Entry */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Mute Upon Entry
                </div>

                <label className="switchc">
                  <input
                    type="checkbox"
                    checked={mute_upon_entry}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        mute_upon_entry: !mute_upon_entry,
                      })
                    }
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
              {/* Watermark */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Watermark
                </div>

                <label className="switchc">
                  <input
                    type="checkbox"
                    checked={watermark}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        watermark: !watermark,
                      })
                    }
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
              {/* Register Type */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-2/3 font-semibold  md:text-base text-sm">
                  Register Type
                </div>

                <div className="w-72">
                  <select
                    name=""
                    id=""
                    className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-full"
                    value={registration_type}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        registration_type: e.target.value,
                      })
                    }
                  >
                    {registerType.map((time, index) => {
                      const { value, name } = time;
                      return (
                        <option key={index} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* Close Registration */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Close Registration
                </div>

                <div className="flex items-center md:w-auto w-1/2 md:justify-start justify-end">
                  <input
                    type="checkbox"
                    className="customized-checkbox cursor-pointer"
                    checked={close_registration}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        close_registration: !close_registration,
                      })
                    }
                  />
                  <div className=" text-xs ml-1">Specify Registration</div>
                </div>
              </div>
              {/* Registrant Email Notification */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Registrant Email Notification
                </div>

                <div className="flex items-center md:w-auto w-2/3 md:justify-start justify-end">
                  <input
                    type="checkbox"
                    className="customized-checkbox cursor-pointer"
                    checked={registrants_email_notification}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        registrants_email_notification:
                          !registrants_email_notification,
                      })
                    }
                  />
                  <div className=" text-xs ml-1">
                    Specify Email Notification
                  </div>
                </div>
              </div>
              {/* Registrant Confirm Email */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Registrant Confirm Email
                </div>

                <div className="flex items-center md:w-auto w-2/3 md:justify-start justify-end">
                  <input
                    type="checkbox"
                    className="customized-checkbox cursor-pointer"
                    checked={registrants_email_confirm}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        registrants_email_confirm: !registrants_email_confirm,
                      })
                    }
                  />
                  <div className=" text-xs ml-1">Specify Confirm Email</div>
                </div>
              </div>
              {/* Meeting Authentication */}
              <div className="p-2 flex items-center">
                <div className="md:w-3/5 w-full font-semibold  text-gray-600 md:text-base text-sm">
                  Meeting Authentication
                </div>

                <div className="flex items-center md:w-auto w-2/3 md:justify-start justify-end">
                  <input
                    type="checkbox"
                    className="customized-checkbox cursor-pointer"
                    checked={meeting_authentication}
                    onChange={(e) =>
                      setZoomInputs({
                        ...zoomInputs,
                        meeting_authentication: !meeting_authentication,
                      })
                    }
                  />
                  <div className=" text-xs ml-1">Specify Authentication</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {/* <button
              type="submit"
              className="bg-pink4 md:w-auto w-full px-6 mt-4 p-2 rounded-md text-white uppercase text-sm"
            >
              Create Meeting
            </button> */}
            <button
              disabled={save ? true : false}
              type="submit"
              className={` h-10 text-white rounded my-1 flex justify-center items-center w-36 ${
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
                "Create Meeting"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZoomSettings;
