import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BASIC_DETAIL_ADD,
  BASIC_DETAIL_ERROR,
} from "../../../../redux/actions/actionsTypes";
import { SaveButton } from "../../../common/buttons";
import errorHandler from "../../../common/error-handler";
import { basicDetailFields } from "./input-fields";

const BasicDetails = ({ setActive, country, slug }) => {
  const { basicDetail } = useSelector((state) => state.institute);
  const dispatch = useDispatch();
  const [countryList, setCountryList] = useState([]);
  const [countryToggle, setCountryToggle] = useState(false);
  const [selectedCountryList, setSelectedCountryList] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [citiesToggle, setCitiesToggle] = useState(false);
  const [selectedCitiesList, setSelectedCitiesList] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  // const [imgfile, setimgfile] = useState(null);
  const [thumbnail, setThumbnail] = useState({
    open: false,
    image: "",
  });
  const [bannerThumbnail, setBannerThumbnail] = useState({
    open: false,
    image: "",
  });
  const { open, image } = thumbnail;
  const fileDrop = (e, type) => {
    e.preventDefault();
    const inputElement = document.getElementById("inputFile");

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
    }
    updateThumbnail(e.dataTransfer.files[0], type);
  };
  const updateThumbnail = (file, type) => {
    if (type === "logo") {
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
    } else {
      setBannerThumbnail((prevalue) => {
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
          setBannerThumbnail((prevalue) => {
            return {
              ...prevalue,
              image: reader.result,
            };
          });
        };
      }
    }
  };
  const getCountryList = () => {
    axiosInstance
      .get(`/institutes/country/list/`)
      .then((res) => {
        setCountryList(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].title === country.country.title) {
            setSelectedCountryList(res.data[i]);
            for (let j = 0; j < res.data[i].cities.length; j++) {
              if (res.data[i].cities[j].title === country.title) {
                setSelectedCitiesList(res.data[i].cities[j]);
                dispatch({
                  type: BASIC_DETAIL_ADD,
                  payload: {
                    property: "address",
                    value: res.data[i].cities[j].id,
                  },
                });
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCountrySelect = (i) => {
    setSelectedCitiesList("");
    setSelectedCountryList(i);
    setCountryToggle(false);
    setCitiesToggle(false);
    setCitiesList(i.cities);
  };
  const handleCitiesSelect = (i) => {
    dispatch({
      type: BASIC_DETAIL_ADD,
      payload: {
        property: "address",
        value: i.id,
      },
    });
    setSelectedCitiesList(i);
    setCountryToggle(false);
    setCitiesToggle(false);
  };
  const handleLogoChange = async (e, type) => {
    const inputElement = document.getElementById("inputFile");
    const inputElement2 = document.getElementById("inputFile2");
    inputElement.files = e.target.files;
    inputElement2.files = e.target.files;
    if (type === "logo") {
      if (inputElement.files.length) {
        updateThumbnail(inputElement.files[0], type);
        setLogoImage(inputElement.files[0]);
        // setimgfile(inputElement.files[0]);
        // const base64 = await convertToBase64(imgfile);
        dispatch({
          type: BASIC_DETAIL_ADD,
          payload: {
            property: "logo",
            value: inputElement.files[0],
          },
        });
      }
    } else {
      if (inputElement2.files.length) {
        updateThumbnail(inputElement2.files[0], type);
        setBannerImage(inputElement2.files[0]);
        // setimgfile(inputElement.files[0]);
        // const base64 = await convertToBase64(imgfile);
        dispatch({
          type: BASIC_DETAIL_ADD,
          payload: {
            property: "banner",
            value: inputElement2.files[0],
          },
        });
      }
    }
  };

  // error handler
  const InputErrorHandler = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let headingErr = false;
    let goAheadAndSubmit = true;

    basicDetailFields.map((field) => {
      const { property } = field;
      const error = errorHandler(property, basicDetail[property], true);
      dispatch({
        type: BASIC_DETAIL_ERROR,
        payload: {
          property: property,
          error: error,
        },
      });
      if (error) {
        goAheadAndSubmit = false;
        headingErr = true;
      }
      return "";
    });
    if (goAheadAndSubmit && !headingErr) {
      const { about, address, contact, email, name, website } = basicDetail;
      let formData = new FormData();
      formData.append("about", about);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("website", website);
      logoImage && formData.append("logo", logoImage);
      bannerImage && formData.append("banner", bannerImage);
      if (slug === undefined) {
        axiosInstance
          .post(`/institutes/create/`, formData)
          .then((res) => {
            localStorage.setItem("id", res.data.id);
            console.log(res.data);
            toast.success("Saved Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setActive("Facilities");
          })
          .catch((err) => {
            if (err.response.data.website) {
              InputErrorHandler(err.response.data.website);
            }
            if (err.response.data.about) {
              InputErrorHandler(err.response.data.about);
            }
            if (err.response.data.address) {
              InputErrorHandler(err.response.data.address);
            }
            if (err.response.data.contact) {
              InputErrorHandler(err.response.data.contact);
            }
            if (err.response.data.email) {
              InputErrorHandler(err.response.data.email);
            }
            if (err.response.data.name) {
              InputErrorHandler(err.response.data.name);
            }
            if (err.response.data.logoImage) {
              InputErrorHandler(err.response.data.logoImage);
            }
            if (err.response.data.bannerImage) {
              InputErrorHandler(err.response.data.bannerImage);
            }
          });
      } else {
        axiosInstance
          .put(`/institutes/update/${slug}/`, formData)
          .then((res) => {
            // tostify update
            toast.success("Updated Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            if (err.response.data.website) {
              InputErrorHandler(err.response.data.website);
            }
            if (err.response.data.about) {
              InputErrorHandler(err.response.data.about);
            }
            if (err.response.data.address) {
              InputErrorHandler(err.response.data.address);
            }
            if (err.response.data.contact) {
              InputErrorHandler(err.response.data.contact);
            }
            if (err.response.data.email) {
              InputErrorHandler(err.response.data.email);
            }
            if (err.response.data.name) {
              InputErrorHandler(err.response.data.name);
            }
            if (err.response.data.logoImage) {
              InputErrorHandler(err.response.data.logoImage);
            }
            if (err.response.data.bannerImage) {
              InputErrorHandler(err.response.data.bannerImage);
            }
          });
      }
    }
  };
  useEffect(() => {
    getCountryList();
    // eslint-disable-next-line
  }, []);
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="lg:flex lg:space-x-10">
        {/* form */}
        <div className=" flex-1">
          {basicDetailFields.map((field, index) => {
            const { property, label, type } = field;
            const error = basicDetail.errors[property];
            return (
              <div
                key={index}
                className={`flex flex-col border-b border-gray-400
            sm:flex-row items-center  w-full`}
              >
                <div className="sm:w-40 w-full sm:pl-4  flex items-center bg-gray-200 font-semibold text-gray-500">
                  {label}
                </div>
                <input
                  className="flex-1 w-full px-2"
                  spellCheck="false"
                  type={type}
                  name={label}
                  value={basicDetail[property]}
                  onChange={(event) =>
                    dispatch({
                      type: BASIC_DETAIL_ADD,
                      payload: {
                        property: property,
                        value: event.target.value,
                      },
                    })
                  }
                />
                {error && <div className="text-sm text-red-400">{error}</div>}
              </div>
            );
          })}
          {/* Country  */}
          <div
            className={`sm:flex  items-center border-b border-gray-400 sm:pr-4`}
          >
            <div className="sm:w-40 w-full sm:pl-4  flex items-center bg-gray-200 font-semibold text-gray-500">
              Country
            </div>
            <div className="flex-1 relative">
              <div
                className="flex justify-between  w-full px-3 rounded-full cursor-pointer items-center z-0"
                onClick={() => {
                  setCountryToggle((countryToggle) => !countryToggle);
                  setCitiesToggle(false);
                }}
              >
                <p className="flex-1">
                  {selectedCountryList ? selectedCountryList.title : ""}
                </p>
                <div className="">
                  <div className="text-white bg-blue-400 rounded-full p-0.5">
                    <svg
                      className="w-4 h-4 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {countryToggle && (
                <div className="absolute inset-x-0 top-8 w-full flex flex-col bg-white text-black z-20 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer max-h-64 overflow-auto">
                  {Array.isArray(countryList) &&
                    countryList.map((i, index) => {
                      return (
                        <div
                          className="px-4"
                          key={index}
                          onClick={() => handleCountrySelect(i)}
                        >
                          {i.title}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          {/* cities  */}
          <div
            className={`sm:flex  items-center border-b border-gray-400 sm:pr-4`}
          >
            <div className="sm:w-40 w-full sm:pl-4  flex items-center bg-gray-200 font-semibold text-gray-500">
              Cities
            </div>
            <div className="flex-1 relative">
              <div
                className="flex justify-between  w-full px-3 rounded-full cursor-pointer items-center z-0"
                onClick={() => {
                  setCitiesToggle((citiesToggle) => !citiesToggle);
                  setCountryToggle(false);
                }}
              >
                <p className="flex-1">
                  {selectedCitiesList ? selectedCitiesList.title : ""}
                </p>
                <div className="">
                  <div className="text-white bg-blue-400 rounded-full p-0.5">
                    <svg
                      className="w-4 h-4 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {citiesToggle && (
                <div className="absolute inset-x-0 top-8 w-full flex flex-col bg-white text-black z-20 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer max-h-64 overflow-auto">
                  {Array.isArray(citiesList) &&
                    citiesList.map((i, index) => {
                      return (
                        <div
                          className="px-4"
                          key={index}
                          onClick={() => handleCitiesSelect(i)}
                        >
                          {i.title}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* image  */}
        <div className="lg:w-96 flex flex-col ">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-gray-500 ml-2">Logo</div>
            <div className="w-full hovcomp mt-1">
              <input
                onChange={(e) => handleLogoChange(e, "logo")}
                id="inputFile"
                name="file"
                type="file"
                hidden
              />
              <div
                onDrop={(e) => fileDrop(e, "logo")}
                onClick={() => {
                  document.getElementById("inputFile").click();
                }}
                className=" h-20 sm:w-32 shadow-lg border-gray-300 border w-full  relative overflow-hidden bg-gray-100 rounded-2xl"
              >
                {!open && basicDetail.logo ? (
                  <div
                    className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                    style={{ backgroundImage: `url(${basicDetail.logo})` }}
                  ></div>
                ) : (
                  <div
                    className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                )}
                <div className="absolute bottom-0 objcomp h-10 flex justify-center items-center text-gray-50 font-medium bg-blue3 w-full text-xs">
                  Uplode Image
                </div>
              </div>
              <div className="text-sm text-red-400 mx-auto flex justify-center mt-5">
                {basicDetail.errors.logo}
              </div>
            </div>
          </div>
          {/* Banner */}
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-gray-500 ml-2">
              Banner
            </div>
            <div className="w-full hovcomp mt-1">
              <input
                onChange={(e) => handleLogoChange(e, "banner")}
                id="inputFile2"
                name="file2"
                type="file"
                hidden
              />
              <div
                onDrop={(e) => fileDrop(e, "banner")}
                onClick={() => {
                  document.getElementById("inputFile2").click();
                }}
                className=" h-32  shadow-lg border-gray-300 border w-full  relative overflow-hidden bg-gray-100 rounded-2xl"
              >
                {!bannerThumbnail.open && basicDetail.banner ? (
                  <div
                    className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                    style={{ backgroundImage: `url(${basicDetail.banner})` }}
                  ></div>
                ) : (
                  <div
                    className="w-full h-full m-auto bg-gray-200 bg-cover overflow-hidden"
                    style={{ backgroundImage: `url(${bannerThumbnail.image})` }}
                  ></div>
                )}
                <div className="absolute bottom-0 objcomp h-10 flex justify-center items-center text-gray-50 font-medium bg-blue3 w-full text-xs">
                  Uplode Image
                </div>
              </div>
              <div className="text-sm text-red-400 mx-auto flex justify-center mt-5">
                {basicDetail.errors.logo}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <SaveButton />
      </div>
    </form>
  );
};

export default BasicDetails;
