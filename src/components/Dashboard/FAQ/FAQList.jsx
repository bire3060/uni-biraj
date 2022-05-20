import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import DataLoader from "../../common/Loader";
import SucessMessage from "../../common/SucessMessage";

const FAQList = () => {
  // const [faqListObj, setfaqListObj] = useState([]);
  const [inputControl, setInputControl] = useState([]);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [Sucessopen, setSucessOpen] = useState(false);
  const [message, setMessage] = useState("Data updated sucessfully!");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [faqLoader, setFaqLoader] = useState(true);

  // delete modal popup
  const popUpDeleteModal = (id) => {
    setDeleteUrl(`/settings/Faq-detail/${id}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    getAllFaqs();
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      setOpenDeleteSucess(true);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  //Close Modal
  const closeModal = () => {
    setSucessOpen(false);
    getAllFaqs();
  };
  const handleInputControl = (data, property, index) => {
    let val = [...inputControl];
    let newVal = val[index];
    newVal[property] = data;
    val[index] = newVal;
    // console.log(val);
    setInputControl(val);
  };
  const handleFaqUpdate = (data) => {
    const { title, description, id } = data;
    let val = {
      title,
      description,
    };
    axiosInstance
      .put(`/settings/Faq-detail/${id}/`, val)
      .then((res) => {
        setSucessOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllFaqs = (signal) => {
    axiosInstance
      .get(`/settings/Faq/`, { signal })
      .then((res) => {
        // console.log(res.data);
        let val = [];
        for (let i = 0; i < res.data.length; i++) {
          val.push({
            title: res.data[i].title,
            description: res.data[i].description,
            id: res.data[i].id,
          });
        }
        setInputControl(val);
        setFaqLoader(false);
      })
      .catch((err) => {
        setFaqLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllFaqs(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage
        open={Sucessopen}
        closeModal={closeModal}
        message={message}
      />
      {/*-------------*/}
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
        deleteUrl={deleteUrl}
        setMessage={setMessage}
      />
      {/*-------------*/}
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > FAQ > List"}</div>
          </div>
        </div>

        <div
          className="mx-auto bg-white p-4 mt-6 border relative border-gray-300 rounded-2xl"
          style={{ width: "98%" }}
        >
          {/* outline border */}
          <div className="realtive border border-gray-400 my-6  rounded-xl p-5 mx-3">
            <div className="absolute bg-blue2 top-6 md:top-5 left-16 font-semibold rounded md:text-md text-sm px-10 uppercase py-2 text-white">
              LIST
            </div>

            {faqLoader && (
              <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
                <span className="text-lg">Loading</span>
                <span>
                  {/* <Loader
                    type="ThreeDots"
                    color="#eb3434"
                    height={40}
                    width={40}
                    timeout={90000}
                  /> */}
                  <DataLoader />
                </span>
              </div>
            )}

            {inputControl.length === 0 && !faqLoader && (
              <div className="text-red-500 pb-12 mt-3 md:mt-5 flex justify-center">
                No Data Available
              </div>
            )}

            {inputControl.length > 0 && (
              <div
                className="flex flex-col mt-6 md:px-3 px-0 overflow-y-scroll sbar"
                style={{ height: 430 }}
              >
                {inputControl.length > 0 &&
                  Array.isArray(inputControl) &&
                  inputControl.map((list, index) => {
                    const { title, description, id } = list;
                    return (
                      <div
                        key={index}
                        className="rounded-xl shadow-lg border md:px-5 mb-5 px-2 p-3  bg-gray-300 lg:w-11/12 w-full"
                      >
                        <div className="flex flex-col md:space-y-6 space-y-4  py-4 px-3">
                          <div className="flex md:space-x-10 md:flex-row flex-col md:space-y-0 space-y-2 items-center ">
                            <div className="font-bold text-gray-600 text-lg md:w-32 w-full">
                              Question
                            </div>
                            <textarea
                              className="border focus:border-gray-500 border-gray-400 w-full rounded-lg px-3 h-20 shadow-xl focus:bg-gray-100 resize-none"
                              name={title}
                              id={title}
                              value={title}
                              onChange={(e) =>
                                handleInputControl(
                                  e.target.value,
                                  "title",
                                  index
                                )
                              }
                            ></textarea>
                          </div>
                          <div className="flex md:space-x-10 md:flex-row flex-col md:space-y-0 space-y-2 items-center">
                            <div className="font-bold text-gray-600 text-lg md:w-32 w-full">
                              Answer
                            </div>
                            <textarea
                              className="border focus:border-gray-500 resize-none border-gray-400 w-full rounded-lg px-3 shadow-xl focus:bg-gray-100 h-36"
                              name={description}
                              id={description}
                              value={description}
                              onChange={(e) =>
                                handleInputControl(
                                  e.target.value,
                                  "description",
                                  index
                                )
                              }
                            ></textarea>
                          </div>
                          {/* button */}
                          <div className="flex justify-center md:flex-row md:space-y-0 space-y-4 flex-col items-center md:space-x-20 space-x-0 text-center">
                            <div className="bg-blue3 py-1 md:w-32  w-full rounded text-white uppercase bold cursor-pointer">
                              <button onClick={() => handleFaqUpdate(list)}>
                                UPDATE
                              </button>
                            </div>
                            <div className="bg-pink3 py-1  md:w-32  w-full rounded text-white uppercase bold cursor-pointer">
                              <button onClick={() => popUpDeleteModal(id)}>
                                DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQList;
