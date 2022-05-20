import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SimpleInputField, SimpleSelectField } from "./input-field";
import giftPackageImage from "../../assets/images/home/gift-package.png";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
// const countryLists = [
//   {
//     label: "Australia",
//     value: "australia",
//   },
//   {
//     label: "Canada",
//     value: "canada",
//   },
//   {
//     label: "America",
//     value: "america",
//   },
// ];

const inputFields = [
  {
    type: "text",
    property: "f_name",
    placeholder: "Full Name",
  },
  {
    type: "email",
    property: "email",
    placeholder: "Email",
  },
  {
    type: "text",
    property: "contact",
    placeholder: "Phone Number",
  },
];

const ClaimFreeGift = () => {
  const [data, setData] = useState({
    country: "",
    f_name: "",
    email: "",
    contact: "",
  });
  const [errors, setErrors] = useState({
    country: "",
    f_name: "",
    email: "",
    contact: "",
  });
  const [countryLists, setCountryLists] = useState([]);
  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { f_name, country, contact, email } = data;
    // alert("lol");
    if (country === "") {
      setErrors({ country: "Select the country" });
    } else if (f_name === "") {
      setErrors({ f_name: "Full name is required" });
    } else if (
      email === "" ||
      !email.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      setErrors({ email: "Invalid email address" });
    } else if (
      contact === "" ||
      isNaN(contact) ||
      contact.charAt("0") === "-"
    ) {
      setErrors({ contact: "Invalid contact" });
    } else {
      setErrors({});
      axiosInstance
        .post(`/settings/claim-gift/`, data)
        .then((res) => {
          // console.log(res);
          toast.success(`Form submitted sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setData({ country: "", f_name: "", email: "", contact: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        // console.log(res.data);
        let newArr = res.data.map((data) => {
          return {
            label: data.title,
            value: data.title,
          };
        });
        setCountryLists(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="max-w-7xl p-4 sm:p-8 md:p-10 mx-auto overflow-hidden bg-blue1 rounded-xl py-10 lg:flex border border-gray3 lg:space-x-16">
      <div className="flex-1">
        <div className="font-bold text-lg lg:text-xl">
          To claim FREE Uni & Colleges gift package, please fill this form.
        </div>
        <div>
          <img src={giftPackageImage} alt="" className="gift-package" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl space-y-3 w-ful flex-1 border border-gray3"
      >
        <SimpleSelectField
          value={data.country}
          options={countryLists}
          title="Select the country"
          handleChange={(event) => handleChange(event, "country")}
        />
        {errors.country && (
          <span className="text-pink4 text-sm">{errors.country}</span>
        )}
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <SimpleInputField
              {...inputField}
              value={data[inputField.property]}
              handleChange={(event) => handleChange(event, inputField.property)}
            />
            <span className="text-pink4 text-sm">
              {errors[inputField.property]}
            </span>
          </div>
        ))}
        <button className="bg-pink4 p-2 text-white font-semibold text-center rounded-full cursor-pointer hover:bg-pink5 transition-all duration-300 w-full">
          Send
        </button>
        <div className="text-xs pl-2 text-gray7">
          By signing up you agree to our{" "}
          <Link to="/terms-of-service" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="privacy-policy" className="underline">
            Privacy Policy.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ClaimFreeGift;
