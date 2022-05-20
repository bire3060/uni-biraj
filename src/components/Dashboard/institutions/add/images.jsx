import React from "react";
import ImgSlider from "./img-slider";
import "../../../../assets/css/images.css";
import { useState } from "react";
import { UploadEditDownloadButton } from "../../../common/buttons";
import { IMAGE_ADD } from "../../../../redux/actions/actionsTypes";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { isImageValid } from "../../../common/filechecker";

const Images = ({ setActive, slug }) => {
  const [thumbnail, setThumbnail] = useState({
    open: false,
    name: "",
    size: "",
    image: "",
    title: "",
    file: "",
  });
  const dispatch = useDispatch();

  const { open, name, size, image, title, file } = thumbnail;

  const fileDrop = (e) => {
    e.preventDefault();
    const inputElement = document.getElementById("inputFile");

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
    }
    updateThumbnail(e.dataTransfer.files[0]);
  };
  const handleImageUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    const forward = await isImageValid(uploadedFile);
    if (forward) {
      updateThumbnail(e.target.files[0]);
    }
  };
  const updateThumbnail = (file) => {
    setThumbnail((prevalue) => {
      return {
        ...prevalue,
        name: file.name,
        open: true,
        size: file.size,
      };
    });
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnail((prevalue) => {
          return {
            ...prevalue,
            file: file,
            image: reader.result,
          };
        });
      };
    }
  };
  const handleImageAdd = async () => {
    if (file && title) {
      // alert(file);
      let instId = localStorage.getItem("id");
      let formData = new FormData();
      formData.append("institute", instId);
      formData.append("title", title);
      formData.append("file", file);
      axiosInstance
        .post(`/institutes/gallery/create/`, formData)
        .then((res) => {
          toast.success("Image added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: IMAGE_ADD,
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
      // const base64 = await convertToBase64(file);

      setThumbnail({
        open: false,
        name: "",
        size: "",
        image: "",
        title: "",
        file: "",
      });
    }
  };

  return (
    <div className=" mx-auto">
      <div className="flex space-x-4 mb-4">
        {!slug && (
          <button
            className="bg-blue3 text-white px-6 rounded-md"
            onClick={() => setActive("Document")}
          >
            Previous
          </button>
        )}
        {!slug && (
          <button
            className="bg-green-500 text-white px-6 rounded-md"
            onClick={() => {
              localStorage.removeItem("id");
              window.location.reload();
            }}
          >
            Next Entry
          </button>
        )}
      </div>
      <div className="w-full md:w-8/12 py-4 mx-auto ">
        <div className="w-11/12 rounded-lg bg-pink-50 shadow-xl border border-gray-400 mx-auto p-2">
          <div className="w-full ">
            <div
              onDrop={fileDrop}
              // onDragOver={dragover}
              onClick={() => {
                document.getElementById("inputFile").click();
              }}
              className="drop w-10/12 sm:w-7/12 h-40 mb-4 border border-gray-300 text-xl font-medium items-center flex justify-center  mx-auto bg-white mt-8"
            >
              {open ? (
                <div
                  className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ) : (
                <p className="text-center">Drop your Image here</p>
              )}
            </div>
          </div>
          <div className="flex ">
            <div className="py-2 space-y-4 border-r-2 border-gray-400 w-32 text-center  font-bold">
              <p>File Name</p>
              <p>Title</p>
            </div>
            <div className="mx-4 py-2 w-10/12 space-y-4">
              <div className="flex justify-between">
                <div className="text-gray-400 font-semibold w-64 overflow-hidden">
                  {name}
                  {size && (
                    <span className="pl-10 text-xs">
                      {(size / 1024000).toFixed(2)}
                      {" MB"}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="inputFile">
                    <UploadEditDownloadButton type="Upload" />
                  </label>
                  <input
                    onChange={handleImageUpload}
                    id="inputFile"
                    name="file"
                    type="file"
                    hidden
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border border-gray-400 font-bold text-center p-1"
                  placeholder="Add title here"
                  value={title}
                  onChange={(event) => {
                    setThumbnail({
                      ...thumbnail,
                      title: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pr-12 mt-4">
          <button
            className="text-sm bg-blue3 text-white px-6 py-1 rounded-full hover:bg-blue2"
            onClick={handleImageAdd}
          >
            Save
          </button>
        </div>
      </div>
      <div className="border-t-4  py-5  border-gray-500">
        <ImgSlider />
      </div>
    </div>
  );
};
export default Images;
