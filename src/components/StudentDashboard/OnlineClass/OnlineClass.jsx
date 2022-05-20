import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { UploadEditDownloadButton } from "../../common/buttons";
import DataLoader from "../../common/Loader";

const OnlineClass = () => {
  const [noteslist, setNoteslist] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`user/education/create-online-notes/`)
      .then((res) => {
        // console.log(res.data);
        setNoteslist(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  return (
    <>
      <div className="h-8 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">
            {"Dashboard > Online class > Notes"}
          </div>
        </div>
        <div
          className="mx-auto bg-white p-3 sm:p-4  mt-4  rounded-2xl  border-2 shadow-xl relative border-gray-200 "
          style={{ width: "98%" }}
        >
          {loader && (
            <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
              <span className="text-lg">Loading</span>
              <span>
                <DataLoader />
              </span>
            </div>
          )}

          <div className="pt-4">
            {noteslist.length === 0 && !loader && (
              <div className="flex items-center justify-center">
                No data to show
              </div>
            )}
            {noteslist.length > 0 &&
              Array.isArray(noteslist) &&
              noteslist.map((rdata, index) => {
                const { title, file, file_size, created_at } = rdata;
                const date = created_at.split("T")[0];
                return (
                  <div
                    key={index}
                    style={{ width: window.innerWidth > 1019 && "100%" }}
                    className="pb-10 mx-auto overflow-x-auto updiv "
                  >
                    <div className="sm:w-11/12 w-100 rounded-lg bg-pink-50 shadow-xl border border-gray-300 mx-auto p-2">
                      <div className="flex ">
                        <div className="  border-gray-400 w-26 sm:w-2/12 text-center self-center  font-bold">
                          <p className="text-sm">Course Name</p>
                        </div>
                        <div className=" flex-1  px-4">
                          <div className="">
                            <div>
                              <div
                                // onChange={changeHandler}
                                readOnly
                                // value={input.name}
                                className=" w-full  text-gray-700 font-medium px-4"
                              >
                                {title}
                              </div>
                            </div>
                            {/* <div>
                      <input
                        // onChange={changeHandler}
                        name="discription"
                        // value={input.discription}
                        type="text"
                        className="w-full border focus:border-gray-400 font-medium   px-4"
                        placeholder="Add your description here"
                      />
                    </div> */}
                          </div>
                        </div>
                        <div className="self-center">
                          {/* <button className="text-sm font-semibold py-0.5  text-white flex space-x-1 items-center w-20 text-center justify-center rounded-full cursor-pointer bg-pink3 hover:bg-pink4">
                            View
                          </button> */}
                        </div>
                      </div>

                      <div
                        key={index}
                        className="sm:w-full mt-2 w-100 px-1 rounded-lg bg-pink-50 shadow-lg border border-gray-300 mx-auto p-1"
                      >
                        <div className="w-full "></div>
                        <div className="flex ">
                          <div className="py-1  border-r-2 border-gray-400 w-32 text-center  font-bold">
                            <p>File Name</p>

                            {/* <p>Description</p> */}
                          </div>
                          <div className="mx-4 pl-4 w-10/12 flex gap-4 ">
                            <div className="">
                              <p className="font-semibold">{date}</p>
                              <p className="text-xs text-gray-500">
                                {Math.round(file_size / 1000000)}MB
                              </p>
                            </div>
                            <div className="text-sm font-medium mt-2"></div>
                          </div>
                          <div className="py-2 flex gap-2">
                            <a
                              href={file}
                              download
                              target="_blank"
                              rel="noreferrer"
                            >
                              <label htmlFor="inputFile">
                                <UploadEditDownloadButton type="Download" />
                              </label>
                              {/* <input
                                  id="inputFile"
                                  name="file"
                                  type="file"
                                  hidden
                                /> */}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineClass;
