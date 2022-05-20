import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDocValid } from "../../../common/filechecker";
import { UploadEditDownloadButton } from "../../../common/buttons";
import IconManager from "../../../common/IconManager";
import {
  DOCUMENT_ADD,
  DOCUMENT_REMOVE,
} from "../../../../redux/actions/actionsTypes";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Document = ({ setActive, slug }) => {
  const [document, setDocument] = useState({
    file: "",
    title: "",
  });

  const { documents } = useSelector((state) => state.institute);
  const dispatch = useDispatch();
  const { file, title } = document;

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
    if (file && title) {
      // alert(file);
      let instId = localStorage.getItem("id");
      let formData = new FormData();
      formData.append("institute", instId);
      formData.append("title", title);
      formData.append("file", file);
      axiosInstance
        .post(`/institutes/document/create/`, formData)
        .then((res) => {
          toast.success("Document added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: DOCUMENT_ADD,
            payload: {
              id: res.data.id,
              file: res.data.file,
              title: res.data.title,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      setDocument({
        file: "",
        title: "",
      });
    }
  };
  const handleDelete = (id, index) => {
    axiosInstance
      .delete(`/institutes/document/update/${id}`)
      .then((res) => {
        //tostify delete
        toast.error("Delete Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: DOCUMENT_REMOVE,
          payload: {
            index: index,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(documents);
  return (
    <div>
      <div className="flex ">
        <div className="flex space-x-4 mb-4">
          {!slug && (
            <button
              className="bg-blue3 text-white px-6 rounded-md"
              onClick={() => setActive("Award")}
            >
              Previous
            </button>
          )}
          {!slug && (
            <button
              className="bg-green-500 text-white px-6 rounded-md"
              onClick={() => setActive("Images")}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div
        style={{ width: window.innerWidth > 1019 && "100%" }}
        className="py-6 mx-auto overflow-x-auto updiv border-t-4 border-b-4"
      >
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
                  value={title}
                  onChange={(event) =>
                    setDocument({
                      ...document,
                      title: event.target.value,
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
          const { title, id, file } = document;
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
                    handleDelete(id, index);
                  }}
                />
                <IconManager icon="Folder" className="w-7 h-7 cursor-pointer" />
              </div>
              <div className="flex gap-5 px-4 items-center justify-between flex-1">
                <div className="flex-1">
                  <div className="font-bold pl-8">{title}</div>
                  <div className={`text-xs text-gray5 pl-8`}>
                    {/* {(file.size / (1024 * 1024)).toFixed(2)} MB */}
                  </div>
                </div>
                <a
                  href={file}
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

export default Document;
