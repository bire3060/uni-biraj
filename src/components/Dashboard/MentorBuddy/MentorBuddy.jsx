import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import IconManager from "../../common/IconManager";
import "./mentor.css";
import { useParams } from "react-router-dom";
import SucessMessage from "../../common/SucessMessage";

const MentorBuddyAdd = () => {
  const { id } = useParams();
  const [Sucessopen, setSucessOpen] = useState(false);
  const [save, setsave] = useState(false);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    details: "",
    work: "",
    study: "",
  });
  const [error, seterror] = useState({});
  const [reserr, setResErr] = useState("");
  const [datacheck, setdatacheck] = useState(false);
  const { name, email, details, work, study } = input;
  const Handelchange = (e) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const inputdata = [
    {
      name: "name",
      title: "Name",
      value: name,
      validation: error.name,
      type: "text",
    },
    {
      name: "email",
      title: "Email",
      value: email,
      validation: error.email,
      type: "email",
    },

    {
      name: "work",
      title: "Work Industry",
      value: work,
      validation: error.work,
      type: "text",
    },
    {
      name: "study",
      title: "Study at",
      value: study,
      validation: error.study,
      type: "text",
    },
    {
      name: "details",
      title: "Details",
      value: details,
      validation: error.details,
      type: "textarea",
    },
  ];
  const validation = (input) => {
    let error = {};
    if (!input.name) {
      error.name = "Enter your name";
    }
    if (!input.email) {
      error.email = "Enter your email";
    }
    if (!input.work) {
      error.work = "Enter your work";
    }
    if (!input.study) {
      error.study = "Enter this field";
    }
    if (!input.details) {
      error.details = "Enter your details";
    }
    return error;
  };
  const [imgfile, setimgfile] = useState(null);
  const [thumbnail, setThumbnail] = useState({
    open: false,
    image: "",
  });
  //Close Modal
  const closeModal = () => {
    setSucessOpen(false);
    setInput({
      name: "",
      email: "",
      details: "",
      work: "",
      study: "",
    });
    setimgfile(null);
    setThumbnail({
      open: false,
      image: "",
    });
  };
  const HandelSubmit = (e) => {
    e.preventDefault();
    seterror(validation(input));
    setdatacheck(true);
  };
  // const storeImage = useSelector((state) => state.course.image);
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

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/buddy-mentor-update/${id}`)
        .then((res) => {
          let val = {
            name: res.data.name,
            email: res.data.email,
            details: res.data.details,
            work: res.data.work_industry,
            study: res.data.study_at,
          };
          setInput(val);
          setThumbnail({
            open: true,
            image: res.data.image,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setsave(true);
      setResErr("");
      const { name, email, details, work, study } = input;
      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("details", details);
      formdata.append("work_industry", work);
      formdata.append("study_at", study);
      imgfile && formdata.append("image", imgfile);
      !id
        ? axiosInstance
            .post("buddy-mentor-create/", formdata)
            .then((res) => {
              setsave(false);
              setMessage("Data added sucessfully!");
              setSucessOpen(true);
            })
            .catch((err) => {
              setsave(false);
              setResErr(err.response.data.email[0]);
            })
        : axiosInstance
            .patch(`buddy-mentor-update/${id}`, formdata)
            .then((res) => {
              setsave(false);
              setMessage("Data updated sucessfully!");
              setSucessOpen(true);
            })
            .catch((err) => {
              setsave(false);
              setResErr(err.response.data.email[0]);
            });
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage
        open={Sucessopen}
        closeModal={closeModal}
        message={message}
      />
      {/*-------------*/}
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">
              {"Dashboard > Mentor Buddy > Add"}
            </div>
          </div>
        </div>
        <div>
          <button
            className={
              `bg-blue3 md:px-14 px-5 mx-2 sm:mx-4 mt-3 block rounded-tr-2xl p-2 text-gray-100 text-sm transition-all duration-500`
              //    `bg-white text-blue3 md:px-14 px-5 block rounded-tr-2xl p-2 text-sm transition-all duration-500`
            }
          >
            <span></span>
            <span className="font-medium flex gap-2 tracking-wide">
              <IconManager className="w-4 h-4 self-center" icon="Add" />
              Add
            </span>
          </button>
        </div>
        <div className=" bg-white p-1 sm:p-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl  border relative border-gray-300 mx-2 sm:mx-4">
          {/* <div className="absolute bg-blue2 z-10 top-2 sm:top-6 md:top-5 left-16 font-semibold rounded md:text-md text-sm px-10 uppercase py-2 text-white">
            Add
          </div> */}
          {/* outline border */}
          <form
            onSubmit={HandelSubmit}
            className="relative   mt-5  rounded-xl pb-5 sm:mx-3"
          >
            <div className="absolute z-10 bottom-1 right-4">
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

            <div className="flex relative flex-col space-y-6 pb-8 px-3">
              <div className="rounded  flex sm:flex-row flex-col gap-2 lg:gap-2  p-3 bg-white ">
                <div className="w-full sm:w-7/12">
                  {inputdata.map((input, index) => {
                    const { name, value, title, validation, type } = input;
                    return (
                      <div
                        key={index}
                        className="flex sm:flex-row flex-col my-4"
                      >
                        <div className="w-48  font-medium">{title}:</div>
                        <div className="w-full">
                          {type === "textarea" ? (
                            <textarea
                              onChange={Handelchange}
                              name={name}
                              placeholder={validation}
                              value={value}
                              className="h-26 px-2 text-gray-700 placeholder-red-400 resize-none rounded bg-white border shadow-lg border-gray-400 focus:bg-gray-50 w-full"
                            />
                          ) : (
                            <input
                              onChange={Handelchange}
                              name={name}
                              value={value}
                              className="h-10 px-2 text-gray-700 placeholder-red-400 rounded bg-white border shadow-lg w-full border-gray-400 focus:bg-gray-50"
                            />
                          )}
                          {validation && (
                            <p className="text-sm pl-2 text-red-500">
                              {validation}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <span className="text-pink4">{reserr}</span>
                </div>
                <div className="w-full hovcomp sm:w-5/12 sm:m-5">
                  <input
                    onChange={(e) => {
                      const inputElement = document.getElementById("inputFile");
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
                    className="h-60 shadow-lg border-gray-300 border w-full sm:w-10/12 mx-auto relative overflow-hidden bg-gray-100 rounded-2xl"
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MentorBuddyAdd;
