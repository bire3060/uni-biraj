import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./settings.css";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import SucessMessage from "../../common/SucessMessage";
// import { sortedLastIndex } from "lodash";

import Pagination from "../../common/Pagination";
const AddCategories = () => {
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [type, settype] = useState("post");
  const [tdata, setTdata] = useState([]);
  const [redata, setredata] = useState(true);
  const [statuss, setstatuss] = useState(false);
  const [error, seterror] = useState({});
  const [save, setsave] = useState(false);
  const [messages, setmessages] = useState("Save Successfully");
  const [opens, setOpens] = useState(false);
  // const [dltid, setdltid] = useState("");
  const [designation, setDesignation] = useState({
    name: "",
  });
  const [selectid, setselectid] = useState("");
  const [datacheck, setdatacheck] = useState(false);
  const selectedImageName = useRef();
  const [countryImage, setcountryImage] = useState("");
  const [images, setimages] = useState("");
  const detailInputFields = [
    {
      value: designation.name,
      name: "name",
      title: "Category: ",
      placeholder: error.name ? error.name : `Enter Category`,
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
  const getapi = (signal) => {
    axiosInstance
      .get(`courses/category/list/?page=${currentButton}`, { signal })
      .then((res) => {
        setTdata(res.data.results);
        setPage(res.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getapi(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, [currentButton]);
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
    setInstituteId(`/courses/category/delete/${slug}/`);
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
      let formdata = new FormData();
      formdata.append("title", designation.name);
      formdata.append("status", statuss ? "PH" : "DF");
      countryImage && formdata.append("image", countryImage);
      type === "post"
        ? axiosInstance
            .post("courses/category/create/", formdata)
            .then((res) => {
              setsave(false);
              getapi();
              setstatuss(false);
              setcountryImage("");
              setimages("");
              setDesignation((pre) => {
                return {
                  ...pre,
                  name: "",
                };
              });
              setmessages("Save Successfully");
              openModal();
            })
            .catch((error) => {
              setsave(false);
              console.log(error);
            })
        : axiosInstance
            .put(`courses/category/update/${selectid}/`, formdata)
            .then((res) => {
              setsave(false);
              setredata(!redata);
              setcountryImage("");
              setimages("");
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
            .catch((error) => {
              setsave(false);
              console.log(error);
            });
    }
    // eslint-disable-next-line
  }, [error]);
  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={opens} closeModal={closeModals} message={messages} />
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
      {/* header */}
      <div className="bg-gray-100 w-full relative">
        {/* top breadcrum  */}
        <div className="h-8 w-full bg-white shadow-lg">
          <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
            <div className="self-center">{"Dashboard > Settings > Add"}</div>
          </div>
        </div>
        <div className="py-5 px-3 md:px-10 space-y-4 bg-white mx-4 rounded-md border border-gray-100 shadow-lg mt-4">
          <div className="md:p-6 bg-white relative">
            <div className="font-bold text-blue3  text-center w-full tracking-wide text-3xl">
              Course Categories
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
                  {/* image  */}
                  <div className="flex flex-col space-y-2 relative ">
                    {images && (
                      <div
                        style={{
                          backgroundImage: `url(${images})`,
                          backgroundSize: "100%",
                        }}
                        className="h-10 w-20  absolute right-0 -bottom-10 "
                      ></div>
                    )}
                    <label className="text-sm font-medium text-gray-700">
                      Select Country Image
                    </label>

                    <label
                      htmlFor="input-file"
                      className="bg-gray-50 p-2.5 w-full  pr-20 h-10  text-gray-500 text-sm overflow-hidden"
                      ref={selectedImageName}
                    >
                      Select Image
                    </label>
                    <input
                      type="file"
                      id="input-file"
                      // className="hidden"
                      hidden
                      onChange={(event) => {
                        const file = event.target.files[0];
                        const fileName = file.name;
                        const image = new Image();

                        image.src = URL.createObjectURL(file);
                        setimages(image.src);
                        image.onload = function () {
                          let arr = fileName.split(".");
                          let extension = arr[arr.length - 1];
                          const extensions = ["png", "jpg", "jpeg", "webp"];
                          let bool = false;
                          for (let i = 0; i < extensions.length; i++) {
                            if (extensions[i] === extension.toLowerCase()) {
                              bool = true;
                              i = extensions.length;
                            }
                          }
                          if (bool) {
                            setcountryImage(file);
                            // setError("");
                          } else {
                            setcountryImage("");
                            // setError("Invalid file");
                          }
                        };

                        image.onerror = function () {
                          setcountryImage("");
                          // setError("Invalid file");
                        };
                        selectedImageName.current.innerHTML = fileName;
                      }}
                    />
                    <label
                      htmlFor="input-file"
                      className={`bg-gray-200 text-gray-600 py-1 px-4 text-md absolute  right-0 cursor-pointer ${
                        countryImage ? "top-7" : "top-5"
                      }`}
                    >
                      Browse...
                    </label>
                  </div>
                  <div className="flex gap-4 sm:gap-0 ">
                    <div className="text-lg sm:w-32 self-center font-medium">
                      Public:
                    </div>
                    <label className="switchc self-center">
                      <input
                        onChange={() => {
                          setstatuss(!statuss);
                        }}
                        name="statuss"
                        value={statuss}
                        type="checkbox"
                        checked={statuss}
                      />
                      <span className="slidersc roundc"></span>
                    </label>
                  </div>
                  <div className="flex justify-center sm:justify-end">
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
                    {/* <button className="submitButton text-sm bg-green-500 uppercase   font-medium text-white px-10 p-2 rounded">
                      Save
                    </button> */}
                  </div>
                </div>
              </form>
            </div>

            <div className="  w-full mx-auto">
              <div className="font-bold text-gray-600 ml-2 mb-4 tracking-wide text-2xl">
                Category List:
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
                      <th>Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tdata) &&
                      tdata.map((tbl, index) => {
                        const { slug, status, title } = tbl;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="secondrow">{title}</td>
                            <td className="secondrow">
                              {status === "PH" ? "Published" : "Drafted"}
                            </td>
                            <td className="lastrow">
                              <span
                                onClick={() => {
                                  settype("put");
                                  window.scrollTo(0, 0);
                                  setselectid(slug);
                                  setstatuss(status === "PH" ? true : false);
                                  // setimages(image);
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
                                  popUpDeleteModal(slug);
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
              <div className="my-10">
                {page > 1 && (
                  <Pagination
                    setCurrentButton={setCurrentButton}
                    currentButton={currentButton}
                    page={page}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
