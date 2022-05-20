import React from "react";

function ClassSettings({
  zoomInputs,
  setZoomInputs,
  setOpenSetting,
  handleRecurring,
  endDate,
  endDateErr,
  setEndDate,
  recurring,
}) {
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
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return (
    <div className="absolute top-0 right-0  w-full min-h-screen flex justify-center pt-5 overflow-auto">
      <div
        className="w-full min-h-screen bg-black opacity-50 absolute top-0 z-0 right-0"
        onClick={() => setOpenSetting(false)}
      ></div>

      <div className="max-w-xl bg-white w-full h-100 overflow-auto mx-auto z-0 flex flex-col p-10">
        {/* <div>Class zoom settings</div> */}
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
                setZoomInputs({ ...zoomInputs, type: e.target.value });
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
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <span className="text-pink4 text-sm">{endDateErr}</span>
            </div>
          </div>
        )}
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
            <div className=" text-xs ml-1">Specify Email Notification</div>
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
  );
}

export default ClassSettings;
