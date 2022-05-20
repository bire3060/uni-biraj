import React, { useState, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";
import SucessMessage from "../../common/SucessMessage";
import CountryList from "./CountryList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CountryAdd({ setid }) {
  const selectedImageName = useRef();
  const [countryImage, setcountryImage] = useState("");
  const [error, setError] = useState("");
  const [continent, setcontinent] = useState("Asia");
  const [countryname, setcountryname] = useState("");
  const [statuss, setstatuss] = useState(false);
  const [message, setMessage] = useState("");
  const [save, setsave] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectid, setselectid] = useState("");
  const [post, setpost] = useState(true);
  const [images, setimages] = useState("");
  const [cError, setCError] = useState({
    continent: "",
    countryname: "",
    countryImage: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("title", countryname);
    formdata.append("continent", continent);
    formdata.append("status", statuss ? "PH" : "DF");
    countryImage && formdata.append("country_image", countryImage);

    if (continent === "") {
      setCError({ continent: "cannot be left null" });
    } else if (countryname === "") {
      setCError({ countryname: "cannot be left null" });
    } else {
      setsave(true);
      setCError({
        continent: "",
        countryname: "",
        countryImage: "",
      });
      post
        ? axiosInstance
            .post(`/institutes/country/create/`, formdata)
            .then((res) => {
              setsave(false);
              setMessage("Country added sucessfully");
              setOpen(true);
            })
            .catch((err) => {
              setsave(false);
              let [key, value] = Object.entries(err.response.data)[0];
              toast.error(`${key}:${value}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
        : axiosInstance
            .put(`/institutes/country/update/${selectid}/`, formdata)
            .then((res) => {
              setsave(false);
              setMessage("Country updated sucessfully");
              setOpen(true);
            })
            .catch((err) => {
              setsave(false);
              let [key, value] = Object.entries(err.response.data)[0];
              toast.error(`${key}:${value}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
    }
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };
  // console.log(cityinput);
  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div className="flex flex-col bg-white py-5 px-3 md:px-10 space-y-4  ">
        <div>
          <div className="text-xl text-gray-500  mb-2">Country Entry</div>
          <form
            action=""
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit}
          >
            {/* continent name  */}
            <div className=" flex  flex-col">
              <label htmlFor="" className="text-gray-800  font-medium mb-2">
                continent Name
              </label>
              <div>
                <select
                  name=""
                  id=""
                  className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent border border-gray-200"
                  value={continent === null ? "" : continent}
                  onChange={(e) => setcontinent(e.target.value)}
                >
                  <option value="" disabled></option>
                  <option value="Asia"> Asia</option>
                  <option value="Africa">Africa</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America"> South America</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Antarctica"> Antarctica</option>
                </select>
              </div>
              {cError.continent && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{cError.continent}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )}
            </div>
            {/* country name  */}
            <div className=" flex  flex-col">
              <label htmlFor="" className="text-gray-800  font-medium mb-2">
                Country Name
              </label>
              <div>
                <input
                  name="countryname"
                  value={countryname}
                  onChange={(e) => {
                    setcountryname(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter country name"
                  className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                  spellCheck="false"
                />
              </div>
              {cError.countryname && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{cError.countryname}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )}
            </div>
            {/* country Image  */}
            {/* image  */}
            <div className="flex flex-col space-y-2 relative ">
              {images && (
                <div
                  style={{
                    backgroundImage: `url(${images})`,
                    backgroundSize: "100%",
                  }}
                  className="h-20 w-20  absolute right-0 -bottom-20 "
                ></div>
              )}
              <label className="text-sm font-medium text-gray-700">
                Select Country Image
              </label>

              <label
                htmlFor="input-file"
                className="bg-gray-50 p-2.5 w-full  pr-20 h-10  text-gray-500 text-sm overflow-hidden"
                ref={selectedImageName}
              >
                Select Image
              </label>
              <input
                type="file"
                id="input-file"
                // className="hidden"
                hidden
                onChange={(event) => {
                  const file = event.target.files[0];
                  const fileName = file.name;
                  const image = new Image();

                  image.src = URL.createObjectURL(file);
                  setimages(image.src);
                  image.onload = function () {
                    let arr = fileName.split(".");
                    let extension = arr[arr.length - 1];
                    const extensions = ["png", "jpg", "jpeg", "webp"];
                    let bool = false;
                    for (let i = 0; i < extensions.length; i++) {
                      if (extensions[i] === extension.toLowerCase()) {
                        bool = true;
                        i = extensions.length;
                      }
                    }
                    if (bool) {
                      setcountryImage(file);
                      setError("");
                    } else {
                      setcountryImage("");
                      setError("Invalid file");
                    }
                  };

                  image.onerror = function () {
                    setcountryImage("");
                    setError("Invalid file");
                  };
                  selectedImageName.current.innerHTML = fileName;
                }}
              />
              <label
                htmlFor="input-file"
                className={`bg-gray-200 text-gray-600 py-1 px-4 text-md absolute  right-0 cursor-pointer ${
                  countryImage ? "top-7" : "top-5"
                }`}
              >
                Browse...
              </label>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {cError.countryImage && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{cError.countryImage}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )}
            </div>
            <div className="flex gap-4 sm:gap-0 ">
              <div className="text-lg  pr-4 self-center font-medium">
                Public:
              </div>
              <label className="switchc self-center">
                <input
                  onChange={() => {
                    setstatuss(!statuss);
                  }}
                  name="statuss"
                  value={statuss}
                  type="checkbox"
                  checked={statuss}
                />
                <span className="slidersc roundc"></span>
              </label>
            </div>
            <div className="mx-auto mt-3">
              {/* <button
                type="submit"
                className="bg-pink3 text-sm font-semibold py-1 text-white 
        px-6 rounded-md cursor-pointer hover:bg-pink4"
              >
                Save
              </button> */}
              <button
                disabled={save ? true : false}
                type="submit"
                className={` h-7 text-white rounded text-sm flex justify-center items-center w-20 ${
                  save ? "bg-pink3 cursor-not-allowed" : "bg-pink5"
                }`}
              >
                {save ? (
                  <div className="lds-ring mb-1.5">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
        <div>
          <CountryList
            setid={setid}
            setstatuss={setstatuss}
            setselectid={setselectid}
            setpost={setpost}
            setcontinent={setcontinent}
            setimages={setimages}
            setcountryname={setcountryname}
          />
        </div>
      </div>
    </>
  );
}

export default CountryAdd;
