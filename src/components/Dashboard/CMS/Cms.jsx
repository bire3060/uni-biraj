import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
import SucessMessage from "../../common/SucessMessage";
import TextEditor from "../../common/text-editor/TextEditor";
import { AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion/dist/framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cms = () => {
  // for popup
  const [editCms, setEditCms] = useState(false);
  const [cmsList, setCmsList] = useState([]);
  const [cmsLoader, setCmsLoader] = useState(true);
  const [slug, setSlug] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [dataCheck, setDataCheck] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  // const [error, setError] = useState({});

  // inputs values
  const [input, setInput] = useState({
    // title: "",
    m_title: "",
    m_keyword: "",
    editorText: "",
    m_description: "",
  });

  // for image
  const [imgfile, setimgfile] = useState(null);
  const [thumbnail, setThumbnail] = useState({
    open: false,
    image: "",
  });

  const { m_title, m_keyword, editorText, m_description } = input;

  // getting all the cms list
  const getAllCmsList = (signal) => {
    axiosInstance
      .get("/settings/list-cms/", signal)
      .then((res) => {
        setCmsList(res.data);
        setCmsLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setCmsLoader(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCmsList(signal);
    return () => controller.abort();
  }, []);

  // update success message
  const closeSuccessModal = () => {
    setSuccessOpen(false);
    setimgfile(null);
    setThumbnail({
      open: false,
      image: "",
    });
    setSlug("");
    getAllCmsList();
  };

  const { open, image } = thumbnail;
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

  // input datas
  const inputs = [
    // {
    //   id: 1,
    //   label: "Title",
    //   name: "title",
    //   value: title,
    //   placeholder: "Title",
    //   type: "text",
    //   vali: error.title,
    //   title: "title",
    // },
    {
      id: 2,
      label: "Meta Title",
      name: "m_title",
      value: m_title,
      placeholder: "Meta Title",
      type: "text",
      // vali: error.m_title,
    },
    {
      id: 3,
      label: "Meta Keyword",
      name: "m_keyword",
      value: m_keyword,
      placeholder: "Meta Keyword",
      type: "text",
      // vali: error.m_keyword,
    },
  ];

  //   change event
  const handleChange = (e) => {
    setInput((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // validating the form
  // const validation = (input) => {
  //   let errors = {};
  //   if (!input.m_title) {
  //     errors.m_title = "Please insert new value";
  //   }
  //   if (!input.m_keyword) {
  //     errors.m_keyword = "Please insert new value";
  //   }
  //   if (!input.editorText) {
  //     errors.editorText = "Please insert new value";
  //   }
  //   if (!input.m_description) {
  //     errors.m_description = "Please insert new value";
  //   }
  //   return errors;
  // };

  // edit the cms
  const editCMSHandler = (e) => {
    e.preventDefault();
    setButtonLoader(true);
    let formdata = new FormData();
    formdata.append("description", editorText);
    formdata.append("m_title", m_title);
    formdata.append("m_keyword", m_keyword);
    formdata.append("m_description", m_description);
    imgfile && formdata.append("image", imgfile);
    axiosInstance
      .put(`/settings/update-cms/${slug}`, formdata)
      .then((res) => {
        setSuccessMessage("Data Updated sucessfully!");
        setSuccessOpen(true);
        setEditCms(false);
        setButtonLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setButtonLoader(false);
      });
  };

  //   for text editor
  const handleEditorText = (value) => {
    // setEditorText(value);
    setInput({
      editorText: value,
    });
  };

  // getting all the previous values
  const getAllPreviousValues = (slug) => {
    axiosInstance
      .get(`/settings/detail-cms/${slug}`)
      .then((res) => {
        setSlug(res.data.slug);
        let val = {
          // title: res.data.title,
          m_title: res.data.m_title,
          m_keyword: res.data.m_keyword,
          editorText: res.data.description,
          m_description: res.data.m_description,
        };
        setInput(val);
        setThumbnail({
          open: true,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="bg-gray-100 z-0 w-full h-full relative overflow-hidden">
      {/* sucesspage from Modal*/}
      <SucessMessage
        open={successOpen}
        closeModal={closeSuccessModal}
        message={successMessage}
      />

      {/*-------------*/}
      <div className="h-8 w-full bg-white shadow-lg">
        <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
          <div className="self-center">{"Dashboard > CMS"}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="mr-2 text-3xl hidden sm:block text-gray-500 ">
          CMS List
        </div>
      </div>

      {/* cms loader */}
      {cmsLoader && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {cmsList.length === 0 && !cmsLoader && (
        <div className="w-full flex justify-center text-primary text-lg">
          No data to show
        </div>
      )}

      {cmsList.length > 0 && (
        <div className="p-4">
          <div
            className="border border-gray-300 shadow-lg bg-white rounded-xl p-4 overflow-hidden overflow-y-scroll"
            style={{ height: 600 }}
          >
            {cmsList.map((cms, index) => {
              const { title, slug, image } = cms;
              return (
                <div className="flex" key={index}>
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="h-full w-full flex mb-4 items-center flex-row justify-between bg-white shadow-lg border rounded-xl p-3">
                      {/* image, title and slug */}
                      <div className="flex flex-row space-x-3">
                        <div>
                          <img
                            src={image === null ? "" : image}
                            alt="bannerImage"
                            className="h-20 w-44 rounded-xl bg-cover object-cover shadow-lg border"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-gray-600 text-xl font-semibold">
                            {title === null ? "N/A" : title}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {slug === null ? "N/A" : slug}
                          </div>
                        </div>
                      </div>
                      {/* edit button */}
                      <div
                        className="crimson px-3 z-10 text-gray-50  rounded-md"
                        onClick={() => {
                          setEditCms(!editCms);
                          getAllPreviousValues(slug);
                        }}
                      >
                        <button className="w-full flex items-center justify-center space-x-2">
                          <div>
                            <AiOutlineEdit className="text-xl" />
                          </div>
                          <div className="font-semibold">Edit</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* popup */}
      {editCms && (
        <div>
          <div className="w-full absolute top-0 right-0 flex justify-center items-center z-50">
            <div
              onClick={() => {
                setEditCms(!editCms);
              }}
              className="absolute top-0 left-0 w-full z-0 h-screen bg-black bg-opacity-25"
            ></div>
            <div className="mx-5">
              <motion.div
                animate={{ y: 100 }}
                className="max-w-4xl mx-auto w-full z-50 relative overflow-y-auto overflow-x-hidden  bg-white shadow-lg rounded-lg mb-10"
                style={{ height: 400 }}
              >
                <div className="font-semibold text-xl px-4 border-b border-gray-300 py-3">
                  Edit CMS
                </div>

                <div>
                  <form
                    className="px-4 mt-3"
                    onSubmit={(e) => editCMSHandler(e)}
                  >
                    <div className="flex justify-center flex-col mb-4">
                      <div className="grid grid-cols-1 gap-4">
                        {/* for text editor */}
                        <div>
                          <div className="font-semibold ml-1 text-md mb-1 mt-2">
                            Description
                          </div>
                          <TextEditor
                            handleEditorText={handleEditorText}
                            des={editorText}
                          />
                          {/* {error.editorText && (
                            <p className="text-red-500 mt-2 text-xs">
                              {error.editorText}
                            </p>
                          )}
                          <div className="text-sm text-red-500">
                            {error.editorText}
                          </div> */}
                        </div>

                        {/* for image upload */}
                        <label
                          htmlFor="image"
                          className="w-32 text-gray-600 font-semibold"
                        >
                          Upload Image
                        </label>
                        <div className="w-full sm:w-5/12">
                          <input
                            onChange={(e) => {
                              const inputElement =
                                document.getElementById("inputFile");
                              inputElement.files = e.target.files;
                              if (inputElement.files.length) {
                                updateThumbnail(inputElement.files[0]);
                                setimgfile(inputElement.files[0]);
                              }
                            }}
                            id="inputFile"
                            name="file"
                            type="file"
                            hidden
                          />
                          <div
                            onDrop={fileDrop}
                            onDragOver={dragover}
                            onClick={() => {
                              document.getElementById("inputFile").click();
                            }}
                            className="h-60 shadow-lg border-gray-300 border w-full mx-auto relative overflow-hidden bg-gray-100 rounded-2xl"
                          >
                            {open ? (
                              <div
                                className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                                style={{ backgroundImage: `url(${image})` }}
                              ></div>
                            ) : (
                              <div className="absolute bottom-0 objcomp h-10 flex justify-center items-center text-lg text-gray-50 font-medium bg-blue3 w-full">
                                Uplode Image
                              </div>
                            )}
                          </div>
                          {/* {error.image && (
                            <p className="text-red-500 mt-3 text-xs">
                              {error.image}
                            </p>
                          )} */}
                        </div>

                        {inputs.map((input, index) => {
                          const {
                            name,
                            value,
                            type,
                            label,
                            placeholder,
                            title,
                            vali,
                          } = input;
                          return (
                            <div key={index} className="w-full">
                              <span className="w-32 text-gray-600 font-semibold">
                                {label}
                              </span>
                              <input
                                name={name}
                                value={value}
                                type={type}
                                placeholder={placeholder}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                className="focus:bg-green-50 focus:outline-none py-1.5 mt-2 px-2 w-full border rounded"
                              />
                              {vali && (
                                <p className="text-red-500 mt-1 text-xs">
                                  {vali}
                                </p>
                              )}
                            </div>
                          );
                        })}

                        {/* meta description */}
                        <div>
                          <span className="w-32 text-gray-600 font-semibold">
                            Meta Description
                          </span>
                          <textarea
                            cols="5"
                            rows="4"
                            className="resize-none focus:bg-green-50 focus:outline-none py-1.5 mt-2 px-2 w-full border rounded"
                            value={m_description}
                            name="m_description"
                            placeholder="Meta Description"
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                          {/* {error.m_description && (
                            <p className="text-red-500 mt-1 text-xs">
                              {error.m_description}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <button
                        type="submit"
                        className="bg-pink4 flex items-center py-1 space-x-3 justify-center px-3 z-10 text-gray-50  rounded-md "
                      >
                        <div className="font-semibold">UPDATE</div>
                        {buttonLoader && (
                          <div>
                            <div className="lds-ring m-auto">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </div>
  );
};
export default Cms;
