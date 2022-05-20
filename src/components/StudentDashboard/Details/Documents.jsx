import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import { UploadEditDownloadButton } from "../../common/buttons";
import { isDocValid } from "../../common/filechecker";
import IconManager from "../../common/IconManager";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_STD_DOCS,
  REMOVE_STD_DOCS,
} from "../../../redux/actions/student_details_types";
import DeleteModal from "../../common/DeleteModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import { FiHelpCircle } from "react-icons/fi";

const Documents = () => {
  const [document, setDocument] = useState({
    file: "",
    name: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const { documents } = useSelector((state) => state.studentDetails);
  const dispatch = useDispatch();
  const { file, name } = document;
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [dovDelete, setDocDelete] = useState({
    url: "",
    index: "",
  });
  const handleDocumentImageChange = async (event) => {
    const uploadedFile = event.target.files[0];
    const forward = await isDocValid(uploadedFile);
    if (forward) {
      setDocument({
        ...document,
        file: uploadedFile,
      });
    }
  };
  const handleDocumentAdd = () => {
    if (file && name) {
      let pid = localStorage.getItem("pid");
      let formData = new FormData();
      formData.append("student", pid);
      formData.append("name", name);
      formData.append("file", file);
      axiosInstance
        .post(`/user/education/document-create/`, formData)
        .then((res) => {
          // console.log(res.data);
          dispatch({
            type: ADD_STD_DOCS,
            payload: {
              id: res.data.id,
              file: res.data.file,
              name: res.data.name,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      setDocument({
        file: "",
        name: "",
      });
    }
  };
  // const handleDelete = (id, index) => {
  //   axiosInstance
  //     .delete(`/user/education/document-update/${id}`)
  //     .then((res) => {
  //       //tostify delete
  //       toast.error("Delete Successfully", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       dispatch({
  //         type: REMOVE_STD_DOCS,
  //         payload: {
  //           index: index,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // delete modal popup
  const popUpDeleteModal = (id, index) => {
    setDocDelete({
      url: `/user/education/document-update/${id}`,
      index: index,
    });
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      dispatch({
        type: REMOVE_STD_DOCS,
        payload: {
          index: dovDelete.index,
        },
      });
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
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
        deleteUrl={dovDelete.url}
        setMessage={setMessage}
      />
      {/*-------------*/}

      <div
        style={{ width: window.innerWidth > 1019 && "100%" }}
        className="py-6 mx-auto overflow-x-auto updiv border-t-4 border-b-4"
      >
        <div className="sm:w-11/12 w-100  mx-auto p-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">
              <FiHelpCircle size={23} />
            </span>
            <span className="text-sm tracking-wide">
              Only PDF and Document file can be supported.
            </span>
          </div>
        </div>

        <div className="sm:w-11/12 w-100 rounded-lg bg-pink-50 shadow-xl border border-gray-400 mx-auto p-2">
          <div className="flex ">
            <div className="py-2 space-y-4 border-r-2 border-gray-400 w-26 sm:w-2/12 text-center  font-bold">
              <p>File Name</p>
              <p>Title</p>
            </div>
            <div className="py-2 flex-1 space-y-4 px-4">
              <div className="flex justify-between">
                <div className="text-gray-400 font-semibold">
                  {file.name ? file.name : "No file uploaded"}
                  {file.size && (
                    <span className="pl-10 text-xs">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="institute-document">
                    <UploadEditDownloadButton type="Upload" />
                  </label>
                  <input
                    id="institute-document"
                    name="document"
                    type="file"
                    hidden
                    onChange={handleDocumentImageChange}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border focus:border-gray-400 font-bold text-center p-1"
                  placeholder="Add title here"
                  value={name}
                  onChange={(event) =>
                    setDocument({
                      ...document,
                      name: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-12 mt-4">
        <button
          className="text-sm bg-blue3 text-white px-6 py-1 rounded-full hover:bg-blue2"
          onClick={handleDocumentAdd}
        >
          Save
        </button>
      </div>

      {/* All uploaded files */}
      <div className="space-y-4 py-6">
        {documents.map((document, index) => {
          const { name, id, file } = document;
          return (
            <div
              className="sm:w-11/12 mx-auto flex rounded-lg py-2 border shadow-lg"
              key={index}
            >
              <div className="flex border-r-2 border-gray-400 space-x-8 items-center px-8">
                <IconManager
                  icon="Delete"
                  className="w-6 h-6 text-pink4 cursor-pointer"
                  onClick={() => {
                    popUpDeleteModal(id, index);
                  }}
                />
                <IconManager icon="Folder" className="w-7 h-7 " />
              </div>
              <div className="flex gap-5 px-4 items-center justify-between flex-1">
                <div className="flex-1">
                  <div className="font-bold pl-8">{name}</div>
                  <div className={`text-xs text-gray5 pl-8`}>
                    {/* {(file.size / (1024 * 1024)).toFixed(2)} MB */}
                  </div>
                </div>
                <a
                  href={file}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="space-x-2 flex"
                >
                  {/* <UploadEditDownloadButton type="Edit" /> */}
                  <UploadEditDownloadButton type="Download" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
