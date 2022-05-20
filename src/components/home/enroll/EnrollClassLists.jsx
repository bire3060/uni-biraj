import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import ApplyModal from "../../common/ApplyModal";
import DataLoader from "../../common/Loader";
function EnrollClassLists() {
  const [classes, setClasses] = React.useState([]);
  const [save, setSave] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [eId, setEId] = React.useState("");
  const [selectedClass, setSelecetedClass] = React.useState("ielts");
  const [loader, setLoader] = useState(true);

  const getAllClasses = (signal) => {
    axiosInstance
      .get(`/user/education/zoom-start/?search=${selectedClass}`, { signal })
      .then((res) => {
        // console.log(res.data);
        setClasses(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const applyClass = () => {
    setSave(true);
    axiosInstance
      .post(`/user/education/enroll-class/${eId}/`)
      .then((res) => {
        // console.log(res);
        setSave(false);
        setOpen(false);
        getAllClasses("ielts");
        toast.success("Class applied sucessfully", {
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
        // console.log(err.response.data.error);
        setSave(false);
        setOpen(false);
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const openApplyModal = (id) => {
    setEId(id);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllClasses(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [selectedClass]);

  return (
    <>
      <ApplyModal
        applyClass={applyClass}
        open={open}
        closeModal={closeModal}
        save={save}
      />

      <div className="flex flex-col bg-white py-5 px-3 md:px-10 space-y-4 w-full ">
        <form
          action=""
          className="flex flex-col space-y-2"
          //   onSubmit={handleSubmit}
        >
          {/* class name  */}
          <div className=" flex  flex-col">
            <label htmlFor="" className="text-gray-800  font-medium mb-2">
              Class Type
            </label>
            <div>
              <select
                type="text"
                placeholder="Enter country name"
                className=" placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent "
                onChange={(e) => {
                  setSelecetedClass(e.target.value);
                  // getAllClasses(e.target.value);
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
        <div className="flex  flex-col overflow-x-auto">
          <div htmlFor="" className="text-gray-800  font-medium mb-2">
            {classes.length === 0
              ? "No classes available"
              : " Available Schedule"}
          </div>

          {/* loading... */}
          {loader && (
            <div className="flex items-center justify-center py-6 space-x-3">
              <div className="text-xl">Loading</div>
              <div>
                <DataLoader />
              </div>
            </div>
          )}

          {classes.length > 0 && !loader && (
            <div
              className="w-full  "
              style={{
                width: "700px",
              }}
            >
              <table className="table-fixed w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-1">Title</th>
                    <th className="py-1">Start Date</th>
                    <th className="py-1">End Date</th>
                    <th className="py-1">Start Time</th>
                    <th className="py-1">Duration</th>
                    <th className="py-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c, index) => {
                    return (
                      <tr key={index} className="text-gray-600">
                        <td className="text-center py-1">{c.agenda}</td>
                        <td className="text-center py-1">
                          {c.start_time.split("T")[0]}
                        </td>
                        <td className="text-center py-1">
                          {c.end_date_time !== null ? (
                            <span>{c.end_date_time.split("T")[0]}</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="text-center py-1">
                          {c.start_time.split("T")[1].split(":")[0]} {":"}
                          {c.start_time.split("T")[1].split(":")[1]}
                          {c.start_time.split("T")[1].split(":")[0] > 11
                            ? " PM"
                            : " AM"}
                        </td>

                        <td className="text-center py-1">{c.duration} mins</td>
                        <td className="flex justify-center py-1">
                          <span
                            className="bg-pink4 text-white text-sm rounded-md px-4 cursor-pointer hover:bg-pink5"
                            onClick={() => {
                              openApplyModal(c.meet_id);
                            }}
                          >
                            Apply
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EnrollClassLists;
