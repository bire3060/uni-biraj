import React, { useEffect, useState } from "react";
import Navbar from "../static/navbar";
import axiosInstance from "../../api/axiosInstance";
import SucessMessage from "./SucessMessage";
// import SaveButton from "./SaveButton";
import contactImage from "../../assets/images/home/mainpage/contact-us2.webp";

const ContactUs = ({ loggedIn, role }) => {
  const countryCodes = require("country-codes-list");

  // category value
  const [contactFormInputs, setContactFormInputs] = useState({
    name: "",
    email: "",
    phone_code: "",
    phone: "",
    country: "",
  });

  const [contactMessage, setContactMessage] = useState("");
  const { name, email, country, phone, phone_code } = contactFormInputs;

  const [error, setError] = useState({});
  // save loader
  const [buttonLoader, setButtonLoader] = useState(false);
  // data check
  const [dataCheck, setDataCheck] = useState(false);
  // success modal
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // input values
  const inputs = [
    {
      label: "Name",
      name: "name",
      value: name,
      type: "text",
      validation: error.name,
      placeholder: "Enter name",
    },
    {
      label: "Email",
      name: "email",
      value: email,
      type: "text",
      validation: error.email,
      placeholder: "Enter email",
    },
    // {
    //   label: "Phone Code",
    //   name: "phone_code",
    //   value: phone_code,
    //   type: "text",
    //   validation: error.phone_code,
    //   placeholder: "Enter phone code",
    // },
    // {
    //   label: "Phone",
    //   name: "phone",
    //   value: phone,
    //   type: "text",
    //   validation: error.phone,
    //   placeholder: "Enter phone",
    // },
    {
      label: "Country",
      name: "country",
      value: country,
      type: "text",
      validation: error.country,
      placeholder: "Enter country",
    },

    // {
    //   label: "Remarks",
    //   name: "remarks",
    //   value: remarks,
    //   type: "textarea",
    //   validation: error.remarks,
    //   placeholder: "Enter messge",
    // },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setDataCheck(true);
    setError(validate(contactFormInputs));
  };

  // change handler for inputs
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setContactFormInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // validation
  const validate = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name field is required";
    }
    if (!data.email) {
      errors.email = "Email field is required";
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
      )
    ) {
      errors.email = "Invalid email address";
    }
    // if (!phone_code) {
    //   errors.phone_code = "Phone code field is required";
    // } else if (phone_code.length > 5) {
    //   errors.phone_code = "Phone code cannot be more than 5 characters";
    // }
    if (!phone) {
      errors.phone = "Phone field is required";
    } else if (phone.length > 15) {
      errors.phone = "Phone cannot be more than 15 characters";
    }
    if (!data.country) {
      errors.country = "Country field is required";
    }
    if (!contactMessage) {
      errors.contactMessage = "Message field is required";
    }

    return errors;
  };

  // post the category
  useEffect(() => {
    // const newJoinDate = moment(joinDate).format("YYYY-MM-DD");
    if (dataCheck === true && Object.keys(error).length === 0) {
      const postData = {
        f_name: name,
        phone_code,
        phone,
        email,
        country,
        message: contactMessage,
      };

      setButtonLoader(true);
      axiosInstance
        .post("/settings/contact-us/create/", postData)
        .then((res) => {
          setButtonLoader(false);
          setContactFormInputs({
            name: "",
            email: "",
            country: "",
            phone: "",
            phone_code: "",
          });
          setContactMessage("");
          setSuccessOpen(true);
          setSuccessMessage("Contact Sent Successfully!");
        })
        .catch((err) => {
          setButtonLoader(false);
        });
    }
  }, [error]);

  //Close Modal
  const closeSuccessModal = () => {
    setSuccessOpen(false);
    // window.location.reload();
    window.scrollTo(0, 0);
  };

  // getting all the countries codes
  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "+{countryCallingCode}"
  );

  return (
    <>
      <SucessMessage
        open={successOpen}
        closeModal={closeSuccessModal}
        message={successMessage}
      />
      <div>
        <div>
          <Navbar loggedIn={loggedIn} role={role} />
        </div>

        <div
          className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
          style={{
            backgroundImage: `url(${contactImage})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
          <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-10">
            Contact Us
          </span>
        </div>

        <div className="px-4 py-10 md:px-10 lg:px-24">
          <div className="max-w-4xl w-full mx-auto">
            <div className="mt-4 text-gray-800 h-full tracking-wide lg:text-xl text-lg">
              See something wrong in the data ? Or got any feedback suggestions
              to help make this platform better ? Use the form below to reach
              out to us.
            </div>
            {/* contact form */}
            <div className="mt-8">
              {/* form  */}
              <form
                className="flex flex-col py-4 space-y-4"
                onSubmit={submitHandler}
              >
                <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
                  {inputs.map((input, index) => {
                    const {
                      name,
                      value,
                      label,
                      placeholder,
                      type,
                      validation,
                    } = input;
                    return (
                      <div key={index}>
                        <div className="flex justify-center flex-col">
                          <label className="text-md text-gray-500 font-semibold">
                            {label}
                          </label>
                          <input
                            className="rounded-md border shadow-md py-2 pl-5 pr-16 mt-1 w-full focus:border-gray-300 transition-all duration-300"
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            value={value}
                            onChange={(e) => inputChangeHandler(e)}
                          />
                          {validation && (
                            <p className="mt-1 text-red-500 text-sm">
                              {validation}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <div className="flex justify-center flex-col">
                      <label className="text-md text-gray-500 font-semibold">
                        Phone
                      </label>
                      <div className="flex space-x-2 relative items-center">
                        <div className="z-10">
                          <input
                            type="text"
                            list="data"
                            value={phone_code}
                            className="rounded-l-md w-20 shadow-md border py-2 pl-2 mt-1 focus:border-gray-300 transition-all duration-300"
                            onChange={(e) =>
                              setContactFormInputs((prev) => {
                                return {
                                  ...prev,
                                  phone_code: e.target.value,
                                };
                              })
                            }
                          />

                          <datalist id="data">
                            {Object.keys(myCountryCodesObject).map(
                              (code, i) => {
                                return (
                                  <option key={i}>
                                    {myCountryCodesObject[code]}
                                  </option>
                                );
                              }
                            )}
                          </datalist>
                        </div>
                        <div className="absolute -left-2 w-full">
                          <input
                            className="rounded-md border shadow-md py-2 pl-24 mt-1 w-full focus:border-gray-300 transition-all duration-300"
                            placeholder="Enter phone number"
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) =>
                              setContactFormInputs((prev) => {
                                return {
                                  ...prev,
                                  phone: e.target.value,
                                };
                              })
                            }
                          />
                        </div>
                      </div>
                      {error.phone && (
                        <p className="mt-1 text-red-500 text-sm">
                          {error.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-md text-gray-500 font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols="3"
                    rows="5"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="rounded-md border shadow-md py-2 pl-5 pr-16 mt-1 w-full focus:border-gray-300 transition-all duration-300 resize-none"
                    placeholder="Enter message..."
                  ></textarea>
                  {error.contactMessage && (
                    <p className="mt-1 text-red-500 text-sm">
                      {error.contactMessage}
                    </p>
                  )}
                </div>
                {/* save button */}
                <div>
                  {/* button */}
                  <button className="p-2 rounded-full bg-pink4 hover:bg-pink3 transition-all duration-300 text-white w-full mb-2 mt-5 select-none">
                    {buttonLoader ? (
                      <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
