import React, { useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import ClassSettings from "./ClassSettings";
import { toast } from "react-toastify";
function IeltsAndPte({ getAllClasses }) {
  const [classInput, setClassesInput] = useState({
    topic: "ielts",
    agenda: "",
    start_date: "",
    start_time: "",
    password: "",
    duration: "60",
  });
  const [agendaErr, setAgendaErr] = useState("");
  const [openSetting, setOpenSetting] = useState(false);
  const [save, setsave] = useState(false);
  const [XMLErrorMessage, setXMLErrorMessage] = useState("");
  const [zoomInputs, setZoomInputs] = useState({
    type: 1,
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
  // const [dateErr, setDateErr] = React.useState("");
  const [starttimeErr, setStarttimeErr] = React.useState("");
  const [durationErr, setdurationErr] = React.useState("");
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

  // error handler
  const errorHandler = () => {
    toast.error(
      `Something went wrong.Please contact to admin for further information.`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(classInput);
    const { start_time, password, topic, agenda } = classInput;
    if (agenda === "") {
      setAgendaErr("Agenda required");
    } else if (!start_time) {
      setStarttimeErr("Select the start time");
    } else if (!duration || isNaN(duration)) {
      setdurationErr("Invalid duration");
    } else if (!endDate && recurring === true) {
      setEndDateErr("Select the end date & time");
      setOpenSetting(true);
    } else {
      setsave(true);
      setAgendaErr("");
      // setDateErr("");
      setStarttimeErr("");
      setdurationErr("");
      // const { topic, start_date, start_time, password, duration } = classInput;
      const {
        type,
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
      let zoomVal;
      if (recurring) {
        zoomVal = {
          topic,
          type: parseInt(type),
          duration,
          agenda,
          password,
          start_time: `${start_time}:00Z`,
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
          password,
          agenda,
          start_time: `${start_time}:00Z`,
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
      axiosInstance
        .post(`/user/education/zoom-start/`, zoomVal)
        .then((res) => {
          // console.log(res.data);
          getAllClasses("ielts");
          setRecurring(false);
          setsave(false);
          toast.success("New meeting has been created", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setClassesInput({
            topic: "ielts",
            start_date: "",
            start_time: "",
            password: "",
            duration: "60",
          });
          setEndDate("");
          setZoomInputs({
            type: 1,
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
          // if (res.status === 404 || res.status === 500) {
          //   toast.error(
          //     `Something went wrong. Please contact to admin for further information.`,
          //     {
          //       position: "top-right",
          //       autoClose: 2000,
          //       hideProgressBar: false,
          //       closeOnClick: true,
          //       pauseOnHover: true,
          //       draggable: true,
          //       progress: undefined,
          //     }
          //   );
          // }
          window.location.reload();
        })
        .catch((err) => {
          setsave(false);
          if (err.response.status === 500) {
            errorHandler();
          }
          if (err.response.status === 400) {
            errorHandler();
          }
        });
    }
  };
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const { topic, start_time, duration, password, agenda } = classInput;
  return (
    <>
      {/* sucesspage from Modal*/}
      {/* <SucessMessage open={open} closeModal={closeModal} message={message} /> */}
      {/*-------------*/}
      <div className="w-full max-w-xl mx-auto flex flex-col bg-white py-5 px-3 md:px-10 space-y-4  ">
        {openSetting && (
          <ClassSettings
            zoomInputs={zoomInputs}
            setZoomInputs={setZoomInputs}
            setOpenSetting={setOpenSetting}
            setRecurring={setRecurring}
            endDateErr={endDateErr}
            setEndDate={setEndDate}
            endDate={endDate}
            recurring={recurring}
            handleRecurring={handleRecurring}
          />
        )}
        <div>
          <div className="text-xl text-gray-500  mb-2">
            Ielts & Pte Class Entry
          </div>
          <form
            action=""
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit}
          >
            {/* class name start date  */}
            <div className="flex justify-between items-center space-x-4">
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Class type
                </label>
                <div>
                  <select
                    type="text"
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    value={topic}
                    onChange={(e) =>
                      setClassesInput({ ...classInput, topic: e.target.value })
                    }
                  >
                    <option value="Select the class type" disabled>
                      Select class type
                    </option>
                    <option value="ielts">IELTS</option>
                    <option value="pte">PTE</option>
                  </select>
                </div>
              </div>

              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Agenda
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter class agenda"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                    value={agenda}
                    onChange={(e) =>
                      setClassesInput({
                        ...classInput,
                        agenda: e.target.value,
                      })
                    }
                  />
                </div>
                <span className="text-pink4 text-sm">{agendaErr}</span>
              </div>
            </div>
            {/* start time and duration  */}
            <div className="flex justify-between items-center mt-2 space-x-4">
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Start Date & Time
                </label>
                <div>
                  <input
                    type="datetime-local"
                    min={`${today}T00:00`}
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                    value={start_time}
                    onChange={(e) =>
                      setClassesInput({
                        ...classInput,
                        start_time: e.target.value,
                      })
                    }
                  />
                </div>
                <span className="text-pink4 text-sm">{starttimeErr}</span>
              </div>
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Duration
                </label>
                <div>
                  <select
                    type="text"
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    value={duration}
                    onChange={(e) =>
                      setClassesInput({
                        ...classInput,
                        duration: e.target.value,
                      })
                    }
                  >
                    <option value="Select the class type" disabled>
                      Select class type
                    </option>
                    <option value="60">60 mins</option>
                    <option value="90">90 mins</option>
                    <option value="120">120 mins</option>
                  </select>
                </div>{" "}
                <span className="text-pink4 text-sm">{durationErr}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 space-x-4">
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Password
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter plain password.."
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                    value={password}
                    onChange={(e) =>
                      setClassesInput({
                        ...classInput,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <span className="text-pink4 text-sm">{durationErr}</span>
              </div>
              {/* settings  */}
              <div className="flex items-center space-x-4">
                <div
                  className="bg-pink-100 text-gray-500 text-sm py-2 px-4 rounded-lg shadow cursor-pointer mt-6"
                  onClick={() => {
                    setOpenSetting(true);
                    document.body.style.overflow = "hidden";
                    window.scrollTo(0, 0);
                  }}
                >
                  Open class settings
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3">
              <button
                type="submit"
                disabled={save ? true : false}
                className={`  bg-pink3 text-sm font-semibold py-1 text-white 
      px-6 rounded-md ${
        save ? " disbled cursor-not-allowed" : "cursor-pointer hover:bg-pink4"
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
    </>
  );
}

export default IeltsAndPte;
