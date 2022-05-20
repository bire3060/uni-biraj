import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./settings.css";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import SucessMessage from "../../common/SucessMessage";
// import { sortedLastIndex } from "lodash";

const ApplicationStatus = () => {
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [type, settype] = useState("post");
  const [save, setsave] = useState(false);
  const [tdata, setTdata] = useState([]);
  const [redata, setredata] = useState(true);
  const [reserror, setresError] = useState("");
  const [error, seterror] = useState({});
  const [messages, setmessages] = useState("Save Successfully");
  const [opens, setOpens] = useState(false);
  const [designation, setDesignation] = useState({
    name: "",
  });
  const [selectid, setselectid] = useState("");
  const [datacheck, setdatacheck] = useState(false);
  const detailInputFields = [
    {
      value: designation.name,
      name: "name",
      title: "Status: ",
      placeholder: error.name ? error.name : `Enter Status`,
      type: "text",
    },
  ];

  const desginationHanldeChange = (e) => {
    const { name, value } = e.target;
    setDesignation((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const getapi = () => {
    axiosInstance
      .get("/courses/course-process-status/")
      .then((res) => {
        setTdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getapi();
  }, []);

  const validation = (designation) => {
    let error = {};
    if (!designation.name) {
      error.name = "Enter Category";
    }
    return error;
  };

  const handleDesignation = (e) => {
    e.preventDefault();
    seterror(validation(designation));
    setdatacheck(true);
  };
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`courses/course-process-status-update/${slug}`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getapi();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  const openModal = () => {
    setOpens(true);
  };
  //Close Modal
  const closeModals = () => {
    setOpens(false);
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setsave(true);
      setresError("");
      type === "post"
        ? axiosInstance
            .post("courses/course-process-status/", {
              title: designation.name,
            })
            .then((res) => {
              setsave(false);
              getapi();
              // setstatuss(false);

              setDesignation((pre) => {
                return {
                  ...pre,
                  name: "",
                };
              });
              setmessages("Save Successfully");
              openModal();
            })
            .catch((err) => {
              setresError(err.response.data.title[0]);
              setsave(false);
            })
        : axiosInstance
            .put(`courses/course-process-status-update/${selectid}/`, {
              title: designation.name,
            })
            .then((res) => {
              setredata(!redata);
              setsave(false);

              settype("post");

              setDesignation((pre) => {
                return {
                  ...pre,
                  name: "",
                };
              });
              getapi();
              setmessages("Update Sucessfully");
              openModal();
            })
            .catch((err) => {
              setsave(false);
              setresError(err.response.data.title[0]);
            });
    }
    // eslint-disable-next-line
  }, [error]);
  return (
    <>
      {/* header */}
      <div className="bg-gray-100 w-full relative">
        {/* sucesspage from Modal*/}
        <SucessMessage
          open={opens}
          closeModal={closeModals}
          message={messages}
        />
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
          deleteUrl={instituteId}
          setMessage={setMessage}
        />
        {/* top breadcrum  */}
        <div className="h-8 w-full bg-white shadow-lg">
          <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
            <div className="self-center">
              {"Dashboard > Settings > Application Status"}
            </div>
          </div>
        </div>
        <div className="py-5 px-3 md:px-10 space-y-4 bg-white mx-4 rounded-md border border-gray-100 shadow-lg mt-4">
          <div className="md:p-6 bg-white relative">
            <div className="font-bold text-blue3  text-center w-full tracking-wide text-3xl">
              Status
            </div>
            <div className="flex  justify-center">
              <form className="" onSubmit={handleDesignation}>
                <div className="flex  flex-col gap-4 sm:gap-4 p-0 py-6 md:mt-4 mt-4">
                  {Array.isArray(detailInputFields) &&
                    detailInputFields.map((detailInputField, index) => {
                      const { value, title, name, placeholder, type } =
                        detailInputField;
                      return (
                        <div key={index} className="flex sm:flex-row flex-col ">
                          <label className="text-gray-600 sm:self-center w-32 sm:mb-0 mb-2 block text-lg font-semibold ">
                            {title}
                          </label>
                          <input
                            required
                            onChange={desginationHanldeChange}
                            className="border w-64 sm:w-96  border-blue-200 text-gray-500 px-3 focus:bg-secondary p-2 text-sm rounded focus:outline-none"
                            name={name}
                            type={type}
                            value={value}
                            placeholder={placeholder}
                          />
                        </div>
                      );
                    })}
                  <span className="text-pink4 mx-auto">{reserror}</span>
                  <div className="flex justify-center sm:justify-end">
                    {/* <button className="submitButton text-sm bg-green-500 uppercase   font-medium text-white px-10 p-2 rounded">
                      Save
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
                </div>
              </form>
            </div>

            <div className="  w-full mx-auto">
              <div className="font-bold text-gray-600 ml-2 mb-4 tracking-wide text-2xl">
                Status List:
              </div>
              <div
                style={{ width: window.innerWidth < 686 ? "80vw" : "100%" }}
                className=" sm:w-full overflow-auto"
              >
                <table
                  style={{ width: window.innerWidth < 686 ? "500px" : "100%" }}
                  className="mt-4 sm:w-full text-gray-600 "
                  id="customer"
                >
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tdata) &&
                      tdata.map((tbl, index) => {
                        const { id, title } = tbl;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="secondrow">{title}</td>
                            <td className="lastrow">
                              <span
                                onClick={() => {
                                  settype("put");
                                  setselectid(id);
                                  window.scroll(0, 0);
                                  // setstatuss(status === "PH" ? true : false);
                                  setDesignation((pre) => {
                                    return {
                                      ...pre,
                                      name: title,
                                    };
                                  });
                                }}
                                className="bg-green-500 text-xs cursor-pointer text-gray-100 hover:bg-green-600 px-3 p-1 rounded focus:outline-none"
                              >
                                Update
                              </span>
                              <span
                                // onClick={() => {
                                //   // handelDelete(id);
                                //   setdltid(id);
                                // }}
                                // onClick={() => setalertModal(id)}
                                onClick={() => {
                                  popUpDeleteModal(id);
                                }}
                                className="bg-red-500 ml-2 text-xs cursor-pointer text-gray-100 hover:bg-red-600 px-3 p-1 rounded focus:outline-none"
                              >
                                Delete
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
        </div>
      </div>
    </>
  );
};

export default ApplicationStatus;
