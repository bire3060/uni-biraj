import React, { useState, useEffect } from "react";
import "../../../../../assets/css/images.css";
import "../../../../../assets/css/Dashboard.css";
import { UploadEditDownloadButton } from "../../../../common/buttons";
import { COURSE_IMAGE_ADD } from "../../../../../redux/actions/actionsTypes";
import { useDispatch, useSelector } from "react-redux";

const CoursesImg = ({ backImg }) => {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState({
    open: backImg ? true : false,
    name: "",
    size: "",
    image: "",
  });
  const storeImage = useSelector((state) => state.course.image);
  const { open, name, size, image } = thumbnail;
  const dragover = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const inputElement = document.getElementById("inputFile");

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
    }
    updateThumbnail(e.dataTransfer.files[0]);
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
            image: reader.result,
          };
        });
      };
    }
  };
  useEffect(() => {
    if (storeImage) {
      updateThumbnail(storeImage);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" mx-auto">
      <div
        style={{ width: window.innerWidth > 1019 && "100%" }}
        className="updiv overflow-x-auto md:w-8/12 py-4 mx-auto "
      >
        <div className="sm:w-11/12 w-100  rounded-lg bg-pink-50 shadow-xl border border-gray-400 mx-auto p-2">
          <div className="w-full ">
            <div
              onDrop={fileDrop}
              onDragOver={dragover}
              onClick={() => {
                document.getElementById("inputFile").click();
              }}
              className="drop w-10/12 sm:w-7/12 h-40 mb-4 border border-gray-300 text-xl font-medium items-center flex justify-center  mx-auto bg-white mt-8"
            >
              {open ? (
                <div
                  className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                  style={{
                    backgroundImage: `url(${
                      backImg && image === "" ? backImg : image
                    })`,
                  }}
                ></div>
              ) : (
                <p className="text-center">Drop your Image here</p>
              )}
            </div>
          </div>
          <div className="flex ">
            <div className="py-2 space-y-4 border-r-2 border-gray-400 w-32 text-center  font-bold">
              <p>File Name</p>
              {/* <p>Description</p> */}
            </div>
            <div className="mx-4 py-2 w-10/12 space-y-4">
              <div className="flex justify-between">
                <div className="text-gray-400 font-semibold">
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
                    onChange={(e) => {
                      const inputElement = document.getElementById("inputFile");
                      inputElement.files = e.target.files;
                      dispatch({
                        type: COURSE_IMAGE_ADD,
                        payload: inputElement.files[0],
                      });
                      if (inputElement.files.length) {
                        updateThumbnail(inputElement.files[0]);
                      }
                    }}
                    id="inputFile"
                    name="file"
                    type="file"
                    hidden
                  />
                </div>
              </div>
              {/* <div>
                <input
                  type="text"
                  className="w-full border border-gray-400 font-bold text-center p-1"
                  placeholder="Add your description here"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-4 w-full py-5  border-gray-500"></div>
    </div>
  );
};
export default CoursesImg;
