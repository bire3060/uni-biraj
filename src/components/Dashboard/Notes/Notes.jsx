import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import IconManager from "../../common/IconManager";
import { isDocValid } from "../../common/filechecker";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notes = () => {
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [instituteId, setInstituteId] = useState("");
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [zoomlist, setzoomlist] = useState([]);
  const [selected, setselected] = useState("");
  // const selectedImageName = useRef();
  const [input, setinput] = useState({
    title: "",
    email_host_user: "",
    zoom: "",
  });
  const [document, setDocument] = useState({
    file: "",
    name: "",
  });
  const [error, seterror] = useState({});
  const [save, setsave] = useState(false);
  const [datacheck, setdatacheck] = useState(false);
  const { title, zoom } = input;
  const Handelchange = (e) => {
    const { name, value } = e.target;
    setinput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const validation = (input, file) => {
    let error = {};
    if (!input.title) {
      error.title = "Enter File name";
    }
    if (!file) {
      error.file = "Select your document";
    }
    if (!input.zoom) {
      error.zoom = "select zoom";
    }
    return error;
  };
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`/user/education/update-online-notes/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    setchange(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getdata();
      setOpen(false);
      sltsearch();
    } else {
      setOpen(false);
    }
  };
  const handleDocumentImageChange = async (event) => {
    const uploadedFile = event.target.files[0];
    const forward = await isDocValid(uploadedFile);
    // console.log("me", uploadedFile);
    if (forward) {
      setDocument({
        ...document,
        file: uploadedFile,
      });
    }
  };
  const HandelSubmit = (e) => {
    e.preventDefault();
    seterror(validation(input, document.file));
    console.log(error);
    setdatacheck(true);
  };
  const [notedata, setnotedata] = useState([]);
  const getdata = () => {
    axiosInstance
      .get(`user/education/create-online-notes/`)
      .then((res) => {
        // console.log(res.data);
        setnotedata(res.data);
      })
      .catch((err) => {});
  };
  const [search, setsearch] = useState([]);
  const [change, setchange] = useState(false);
  const sltsearch = () => {
    axiosInstance
      .get(`user/education/zoom-online-notes/${selected}`)
      .then((res) => {
        setsearch(res.data);
        setchange(true);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (selected === "all") {
      setchange(false);
    } else if (selected !== "") {
      sltsearch();
    }
    // eslint-disable-next-line
  }, [selected]);
  useEffect(() => {
    getdata();
    axiosInstance
      .get(`user/education/zoom-start/`)
      .then((res) => {
        setzoomlist(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setsave(true);
      // console.log(document.file);
      let formData = new FormData();
      formData.append("zoom", zoom);
      formData.append("title", title);
      document.file && formData.append("file", document.file);
      axiosInstance
        .post("user/education/create-online-notes/", formData)
        .then((res) => {
          setsave(false);
          getdata();
          setinput((pre) => {
            return {
              ...pre,
              title: "",
              email_host_user: "",
              zoom: "",
            };
          });
          setDocument((pre) => {
            return {
              ...pre,
              file: "",
              name: "",
            };
          });
          sltsearch();
          toast.success("Saved Successfully", {
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
          setsave(false);
          //   err.response.data && toast.error(`${err.response.data.Error}`, {
          //     position: "top-right",
          //     autoClose: 2000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   });
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [error]);
  return (
    <div>
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
      />{" "}
      <div className="h-8 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > Notes"}</div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="flex lg:flex-row flex-col gap-10 w-full justify-center mt-20">
          <form
            onSubmit={HandelSubmit}
            className="py-5 px-3 relative md:px-10  bg-white lg:w-1/3 w-full border border-gray-300 shadow-lg rounded-md"
          >
            {/* <button
          type="submit"
          className="bg-pink3 absolute top-1 right-2 font-semibold mt-1  text-white flex space-x-1 items-center px-3 rounded-md cursor-pointer hover:bg-pink4"
        >
          <div>
            <IconManager icon="Save" className="w-4 h-4" />
          </div>
          <div>{"SAVE"}</div>
        </button> */}
            <div className="flex justify-between w-11/12">
              <div className="text-base font-medium text-gray-700 self-end">
                File name:
              </div>
            </div>
            <input
              onChange={Handelchange}
              name="title"
              value={title}
              className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-11/12"
            />
            {error.title && (
              <p className="text-sm pl-2 text-red-500">{error.title}</p>
            )}
            <div className="text-base font-medium text-gray-700 self-end">
              Select file:
            </div>
            <div className="flex flex-col  relative w-11/12 ">
              <label
                htmlFor="institute-document"
                className="bg-gray-100 p-2.5 w-full  shadow-lg rounded-md pr-20 h-10  text-gray-500 text-sm overflow-hidden"
                // ref={selectedImageName}
              >
                {document.file.name ? document.file.name : "Select file"}
              </label>
              <input
                id="institute-document"
                name="document"
                type="file"
                hidden
                onChange={handleDocumentImageChange}
              />
              <label
                htmlFor="institute-document"
                className={`bg-gray-200 text-gray-600 rounded-r-md  top-0 py-1 px-4 text-md absolute  right-0 cursor-pointer ${
                  document.name ? "" : ""
                }`}
              >
                Browse...
              </label>
            </div>
            {error.file && (
              <p className="text-sm pl-2 text-red-500">{error.file}</p>
            )}
            <div className="text-base mt-1 font-medium text-gray-700">
              zoom:
            </div>
            {/* <input
            onChange={Handelchange}
            name="zoom"
            value={zoom}
            type="text"
            className="border border-gray-300 mt-1 px-2 shadow-lg h-10 rounded-md  w-11/12"
          /> */}
            <select
              className="appearance-none bg-transparent border h-10 border-gray-300 bg-gray2 rounded-md px-6 w-11/12"
              onChange={Handelchange}
              name="zoom"
              value={zoom}
            >
              <option>select here</option>

              {zoomlist.map((slt, index) => {
                return (
                  <option key={index} value={slt.id}>
                    {slt.agenda}
                  </option>
                );
              })}
            </select>
            {error.zoom && (
              <p className="text-sm pl-2 text-red-500">{error.zoom}</p>
            )}
            <div className="w-11/12 mt-2 flex justify-end ">
              {/* <button
            type="submit"
            className="bg-pink3  font-semibold mt-1  text-white flex space-x-1 items-center px-3 rounded-md cursor-pointer hover:bg-pink4"
          >
            <div>
              <IconManager icon="Save" className="w-4 h-4" />
            </div>
            <div>{"SAVE"}</div>
          </button> */}
              <button
                type="submit"
                disabled={save ? true : false}
                className={` font-semibold mt-1  text-white flex space-x-1 items-center h-7 w-20 rounded-md cursor-pointer ${
                  save ? "bg-pink3 cursor-not-allowed" : "bg-pink4"
                }`}
              >
                {save ? (
                  <div className="lds-ring m-auto mb-2">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <IconManager icon="Save" className="w-6 h-4 self-center" />
                    <div>{"SAVE"}</div>
                  </div>
                )}
              </button>
            </div>
          </form>
          <div className="py-5 flex-1 px-3 relative md:px-10 lg:mb-0 mb-6  bg-white border border-gray-300 shadow-lg rounded-md">
            <div>
              <div className="flex justify-end my-2">
                <select
                  className="appearance-none bg-transparent border border-gray-300 bg-gray2 rounded-md px-6 w-36"
                  onChange={(e) => {
                    setselected(e.target.value);
                  }}
                >
                  <option>select here</option>
                  <option value="all">All</option>
                  {zoomlist.map((slt, index) => {
                    return (
                      <option key={index} value={slt.id}>
                        {slt.agenda}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <table className="table-auto overflow-auto w-full text-white">
              <thead>
                <tr className="bg-blue2">
                  <th>Name</th>
                  <th>Zoom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(change ? search : Array.isArray(notedata) && notedata).map(
                  (country, index) => {
                    const { zoom, title, id, file } = country;

                    return (
                      <tr className="text-gray-600  ack" key={index}>
                        <td className="text-center py-1">{title}</td>
                        <td className="text-center py-1">{zoom}</td>
                        <td className=" py-1 flex items-center justify-center">
                          <span
                            // onClick={() => {
                            //   // handelDelete(id);
                            //   setdltid(id);
                            // }}
                            // onClick={() => setalertModal(id)}
                            onClick={() => {
                              popUpDeleteModal(id);
                            }}
                            className="bg-red-500 ml-2 text-xs cursor-pointer text-gray-100 hover:bg-red-600 px-2 p-0.5 rounded focus:outline-none"
                          >
                            Delete
                          </span>
                          <a
                            href={file}
                            download
                            rel="noreferrer"
                            target="_blank"
                            className="bg-blue3 ml-2 text-xs cursor-pointer text-gray-100 hover:bg-blue3 px-2 p-0.5 rounded focus:outline-none"
                          >
                            Preview
                          </a>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notes;
