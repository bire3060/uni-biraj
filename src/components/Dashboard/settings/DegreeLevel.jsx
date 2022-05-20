import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import SucessMessage from "../../common/SucessMessage";

const DegreeLevel = () => {
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [type, settype] = useState("post");
  const [save, setsave] = useState(false);

  const [tdata, setTdata] = useState([]);
  const [datacheck, setdatacheck] = useState(false);

  const [redata, setredata] = useState(true);
  const [selectid, setselectid] = useState("");
  const [messages, setmessages] = useState("Save Successfully");
  const [opens, setOpens] = useState(false);

  // input values
  const [name, setName] = useState({
    degreeName: "",
  });

  // errors
  const [error, setError] = useState({});

  const inputs = [
    {
      label: "Name",
      value: name.degreeName,
      name: "degreeName",
      vali: error.degreeName,
      type: "text",
    },
  ];

  const getapi = () => {
    axiosInstance
      .get("courses/degree-level/list/")
      .then((res) => {
        setTdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getapi();
    // eslint-disable-next-line
  }, []);

  const Validation = (data) => {
    let errors = {};
    if (!data.degreeName) {
      errors.degreeName = "Name is required";
    }
    return errors;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setName((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`/courses/degree-level/${slug}/`);
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

  const submitHandler = (e) => {
    e.preventDefault();
    setError(Validation(name));
    setdatacheck(true);
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setsave(true);
      type === "post"
        ? axiosInstance
            .post("courses/degree-level/create/", {
              title: name.degreeName,
            })
            .then((res) => {
              setsave(false);
              getapi();

              setName((pre) => {
                return {
                  ...pre,
                  degreeName: "",
                };
              });
              setmessages("Save Sucessfully");
              openModal();
            })
            .catch((err) => {
              setsave(false);
            })
        : axiosInstance
            .put(`courses/degree-level/${selectid}/`, {
              title: name.degreeName,
            })
            .then((res) => {
              setsave(false);
              setredata(!redata);

              settype("post");

              setName((pre) => {
                return {
                  ...pre,
                  degreeName: "",
                };
              });
              getapi();
              setmessages("Update Sucessfully");
              openModal();
            })
            .catch((error) => {
              console.log(error);
              setsave(false);
            });
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      <div>
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
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">
              {"Dashboard > Setting > Degree Level"}
            </div>
          </div>
        </div>
        <div
          className="mx-auto bg-white p-4 mt-6 border relative border-gray-300 rounded-2xl"
          style={{ width: "98%" }}
        >
          {/* Add */}
          <div className="relative border border-gray-400 my-6  rounded-xl p-5 mx-3">
            <div className="absolute bg-blue2 -top-5 left-16 font-semibold rounded md:text-md text-sm px-10 uppercase py-2 text-white">
              Add
            </div>

            {inputs.map((input, index) => {
              const { label, value, type, name, vali } = input;
              return (
                <form key={index} className="mb-6">
                  <div className="flex flex-col md:flex-row md:space-y-0 space-y-5 md:w-2/3 w-full md:space-x-10 pt-6 ">
                    <div className="w-full flex space-x-4">
                      <div className="font-bold text-gray-600 text-lg my-auto">
                        {label}
                      </div>
                      <input
                        className="border focus:bg-gray-100 border-gray-400 w-full px-2 rounded shadow-xl  p-1 "
                        type={type}
                        onChange={changeHandler}
                        value={value}
                        name={name}
                      />
                    </div>

                    <div className="flex justify-end items-center ">
                      {/* <button
                        type="submit"
                        className="text-white bg-pink3  text-center p-1 px-10 rounded uppercase font-bold cursor-pointer"
                        onClick={submitHandler}
                      >
                        SAVE
                      </button> */}
                      <button
                        disabled={save ? true : false}
                        type="submit"
                        onClick={submitHandler}
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
                  {vali && (
                    <p className="text-red-600 mt-1 text-sm ml-16">{vali}</p>
                  )}
                </form>
              );
            })}
          </div>

          {/* List */}
          <div className="relative md:mt-20 mt-14 mb-2 border border-gray-400 rounded-xl p-5 mx-3 ">
            <div className="absolute bg-blue2 -top-5 left-16 font-semibold rounded md:text-md text-sm px-10 uppercase py-2 text-white">
              List
            </div>
            <table className="table-auto w-full mt-5" style={{ color: "crimson" }}>
              <thead>
                <tr className="border">
                  <th>SN</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tdata.map((list, index) => {
                  const { slug, title } = list;
                  return (
                    <tr className="text-center text-gray-600 font-semibold border">
                      <td className="py-0.5">{index + 1}</td>
                      <td className="py-0.5">{title}</td>
                      <td className="flex space-x-2 justify-center items-center mt-2">
                        <button
                          onClick={() => {
                            settype("put");
                            setselectid(slug);
                            window.scroll(0, 0);
                            setName((pre) => {
                              return {
                                ...pre,
                                degreeName: title,
                              };
                            });
                          }}
                          className="px-2 p-1 rounded uppercase text-xs bg-blue2 text-gray-100"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            popUpDeleteModal(slug);
                          }}
                          className="px-2 p-1 rounded uppercase text-xs bg-pink4 text-gray-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {tdata.map((list, index) => {
              const { slug, title } = list;
              return (
                <div
                  key={index}
                  // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
                  className="overflow-x-auto sm:px-2 lg:px-0 mx-auto mt-4"
                >
                  <div
                    // style={{ width: window.innerWidth < 1260 && 1000 }}
                    className=" bg-white border mt-2 border-gray-300 rounded-2xl p-2"
                  >
                    <table
                      style={{ color: "crimson" }}
                      className=" table-auto w-full"
                    >
                      <thead>
                        <tr>
                          <th>SNO.</th>
                          <th className="">Name</th>
                          <th className="">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="text-center text-gray-600 font-semibold">
                          <td>{index + 1}</td>
                          <td>{title}</td>
                          <td className="flex space-x-2 justify-center items-center mt-2">
                            <button
                              onClick={() => {
                                settype("put");
                                setselectid(slug);
                                setName((pre) => {
                                  return {
                                    ...pre,
                                    degreeName: title,
                                  };
                                });
                              }}
                              className="px-2 p-1 rounded uppercase text-xs bg-blue2 text-gray-100"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                popUpDeleteModal(slug);
                              }}
                              className="px-2 p-1 rounded uppercase text-xs bg-pink4 text-gray-100"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DegreeLevel;
