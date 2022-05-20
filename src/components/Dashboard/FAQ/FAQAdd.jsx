import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import SucessMessage from "../../common/SucessMessage";

const FAQAdd = () => {
  const [inputValues, setInputValues] = useState({
    question: "",
    answers: "",
  });

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const { question, answers } = inputValues;
  const inputs = [
    {
      label: "Questions",
      name: "question",
      vali: error.question,
      value: question,
      type: "text",
    },
    {
      label: "Answers",
      name: "answers",
      vali: error.answers,
      value: answers,
      type: "text",
    },
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    let val = {
      title: inputValues.question,
      description: inputValues.answers,
    };
    axiosInstance
      .post(`/settings/Faq/`, val)
      .then((res) => {
        setMessage("FAQs saved sucessfully");
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setError(Validation(inputValues));
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    setInputValues({
      question: "",
      answers: "",
    });
  };
  // const [error, seterror] = useState({});

  const Validation = (data) => {
    let errors = {};
    if (!data.question) {
      errors.question = "Question field is required";
    }
    if (!data.answers) {
      errors.answers = "Answer field is required";
    }
    return errors;
  };

  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div>
        <div className="h-8 w-full bg-white shadow-md">
          <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
            <div className="self-center">{"Dashboard > FAQ > Add"}</div>
          </div>
        </div>

        <div
          className="mx-auto bg-white p-4 mt-6 border relative border-gray-300 rounded-2xl"
          style={{ width: "98%" }}
        >
          <div className="realtive border border-gray-400 my-6  rounded-xl p-5 mx-3">
            <div className="absolute bg-blue2 top-6 md:top-5 left-16 font-semibold rounded md:text-md text-sm px-10 uppercase py-2 text-white">
              Add
            </div>
            {/* outline border */}
            {inputs.map((input, index) => {
              const { label, name, value, type, vali } = input;
              return (
                <form
                  key={index}
                  className="flex flex-col space-y-6 py-8 px-3"
                  autoComplete="off"
                >
                  <div className="flex md:space-x-10 md:flex-row flex-col md:space-y-0 space-y-2 items-center ">
                    <div className="font-bold text-gray-600 text-lg md:w-24 w-full">
                      {label}
                    </div>
                    <div className="w-full">
                      <textarea
                        onChange={changeHandler}
                        name={name}
                        value={value}
                        type={type}
                        className={`border focus:bg-gray-50 border-gray-400 lg:w-1/2 w-full rounded-lg px-3 shadow-xl resize-none ${
                          name === "answers" ? "h-36" : "h-20"
                        }`}
                      ></textarea>
                      {vali && <p className="text-red-600 text-sm ">{vali}</p>}
                    </div>
                  </div>
                </form>
              );
            })}

            <div
              onClick={submitHandler}
              className="flex mr-3 flex-col justify-end items-end w-32 mx-auto text-center"
            >
              <div className="bg-pink3 px-10 py-1 w-full rounded text-white uppercase bold cursor-pointer">
                SAVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQAdd;
