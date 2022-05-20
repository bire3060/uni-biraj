import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import DeleteAlertModal from "../../../common/DeleteAlertModal";
import DeleteModal from "../../../common/DeleteModal";

function ClassesLists({ classes, getAllClasses }) {
  const [OnlineInstructors, setOnlineInstructors] = useState([]);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [open, setOpen] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState("");
  const [selectedClass, setSelecetdClass] = useState("ielts");
  // delete modal popup
  const popUpDeleteModal = (meetid) => {
    setDeleteUrl(`/user/education/zoom-meet/${meetid}`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    getAllClasses(selectedClass);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      setOpenDeleteSucess(true);
      setOpen(false);
      // getAllClasses("ielts");
    } else {
      setOpen(false);
    }
  };
  const assignInstructor = (meetingId, userId) => {
    axiosInstance
      .post(`/user/education/assign-teacher/${meetingId}/`, { user_id: userId })
      .then((res) => {
        // console.log(res);
        getAllClasses(selectedClass);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    axiosInstance
      .get(`/user/instructor-list/`)
      .then((res) => {
        setOnlineInstructors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* sucess delete page from Modal*/}
      <DeleteModal
        open={openDeleteSucess}
        closeModal={closeModalDeleteMessage}
        message={message}
      />
      {/*-------------*/}
      {/*  delete alert  page from Modal*/}
      <DeleteAlertModal
        open={open}
        closeModal={closeModalDeleteAlert}
        deleteUrl={deleteUrl}
        setMessage={setMessage}
      />
      {/*-------------*/}
      <div className="flex flex-col bg-white py-5 px-3 md:px-10 space-y-4  ">
        <div>
          <div className="text-xl text-gray-500  mb-2">
            Ielts & Pte Class Lists
          </div>
        </div>
        <form
          action=""
          className="flex flex-col space-y-2"
          //   onSubmit={handleSubmit}
        >
          {/* class name  */}
          <div className=" flex  flex-col">
            <label htmlFor="" className="text-gray-800  font-medium mb-2">
              Class type
            </label>
            <div>
              <select
                type="text"
                placeholder="Enter country name"
                className=" placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent "
                value={selectedClass}
                onChange={(e) => {
                  getAllClasses(e.target.value);
                  setSelecetdClass(e.target.value);
                }}
              >
                <option value="Select the class type" disabled>
                  Select class type
                </option>
                <option value="ielts">IELTS</option>
                <option value="pte">PTE</option>
              </select>
            </div>
          </div>
        </form>
        {/* class name  */}
        <div className=" flex  flex-col">
          <div htmlFor="" className="text-gray-800  font-medium mb-2">
            Available Schedule
          </div>
          <div className="w-full">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Instructor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{c.agenda}</td>
                      <td className="text-center">
                        {c.start_time.split("T")[0]}
                      </td>
                      <td className="text-center">
                        {c.start_time.split("T")[1]}
                      </td>
                      <td className="text-center">{c.duration}</td>
                      <td className="text-center">
                        <select
                          className="text-xs py-1 appearance-none px-6"
                          value={
                            c.assigned_teacher === null
                              ? ""
                              : c.assigned_teacher
                          }
                          onChange={(e) =>
                            assignInstructor(c.meet_id, e.target.value)
                          }
                        >
                          <option value=""></option>

                          {OnlineInstructors.map((oc) => {
                            return (
                              <option value={oc.id} key={oc.id}>
                                {oc.fname} {oc.lname}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className="flex justify-center">
                        <span
                          className=" text-pink4 cursor-pointer"
                          onClick={() => {
                            popUpDeleteModal(c.meet_id);
                            setSelecetdClass(c.topic);
                          }}
                        >
                          <svg
                            className="w-6 h-6 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassesLists;
