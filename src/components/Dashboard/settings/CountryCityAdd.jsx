import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
// import StudentJobsSlider from "../../../slider/student-jobs/student-jobs-slider";
import SucessMessage from "../../common/SucessMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CountryCityAdd({ id }) {
  const [countryname, setcountryname] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [message, setMessage] = useState("");
  const [save, setsave] = useState(false);
  const [open, setOpen] = useState(false);
  // const [sid, setsid] = useState(1);
  const [cityinput, setcityinput] = useState([
    {
      title: "",
    },
  ]);
  // console.log("me", cityinput);
  const handelcity = (index, e) => {
    const values = [...cityinput];
    values[index][e.target.name] = e.target.value;
    setcityinput(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let citiyVal = [...cityinput];
    let formValue = [];
    setsave(true);

    for (let i = 0; i < citiyVal.length; i++) {
      if (citiyVal[i].id === undefined) {
        formValue.push({
          country: countryname,
          title: citiyVal[i].title,
        });
      }
    }
    axiosInstance
      .post(`/institutes/city/create/`, formValue)
      .then((res) => {
        setsave(false);
        setMessage("Country cities added sucessfully");
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
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
  };
  const removecity = (indexs) => {
    const newcity = cityinput.filter((ftr, index) => index !== indexs);
    setcityinput(newcity);
  };
  const getAllCountryLists = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        // setgetdata(res.data);
        setCountryList(res.data);
        setcountryname(res.data[0].id);

        // console.log(res.data[countryname].id, res.data[countryname].cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };
  const deletecity = (id) => {
    axiosInstance
      .delete(`/institutes/city/delete/${id}`)
      .then((res) => {
        getCityById();
        toast.success("Sucessfully deleted", {
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
        if (err.response.data.error) {
          toast.error(`${err.response.data.error}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const getCityById = () => {
    axiosInstance.get(`institutes/country/detail/${id}`).then((res) => {
      // console.log(res.data);
      setcountryname(res.data.id);
      res.data.cities.length === 0
        ? setcityinput([
            {
              title: "",
            },
          ])
        : setcityinput(res.data.cities);
    });
  };
  useEffect(() => {
    id && getCityById();
    // eslint-disable-next-line
  }, [id]);
  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCountryLists(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div className="flex flex-col bg-white py-5 px-3 md:px-10 space-y-4  ">
        <div className="text-xl text-gray-500  mb-2">Country Cities Entry</div>
        <form
          action=""
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit}
        >
          {/* country name  */}
          <div className=" flex  flex-col">
            <label htmlFor="" className="text-gray-800  font-medium mb-2">
              Country Name
            </label>
            <div>
              <select
                name="countryname"
                value={countryname}
                onChange={(e) => {
                  setcountryname(e.target.value);
                }}
                className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
              >
                {Array.isArray(countryList) &&
                  countryList.map((country, index) => {
                    const { id, title } = country;
                    return (
                      <option value={id} key={index}>
                        {title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className=" flex  flex-col">
            <label htmlFor="" className="text-gray-800  font-medium mb-2">
              City Name
            </label>
            {Array.isArray(cityinput) &&
              cityinput.map((city, index) => {
                return (
                  <div className="flex gap-2 items-center" key={index}>
                    <input
                      name="title"
                      value={city.title}
                      onChange={(e) => handelcity(index, e)}
                      type="text"
                      placeholder="Enter city name"
                      className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent mt-2"
                      spellCheck="false"
                    />
                    <div className="flex space-x-2 items-center">
                      {index === 0 && (
                        <div
                          className="font-semibold text-lg h-8 w-9 text-white cursor-pointer border-2  flex justify-center items-center rounded-full bg-gray-300"
                          onClick={() => {
                            setcityinput([...cityinput, { title: "" }]);
                          }}
                        >
                          +
                        </div>
                      )}
                      {index === 0 && city.id !== undefined && (
                        <div
                          className="font-semibold text-lg h-8 w-9 text-white cursor-pointer border-2  flex justify-center items-center rounded-full bg-gray-300"
                          onClick={() => {
                            deletecity(city.id);
                          }}
                        >
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    {index > 0 && city.id === undefined && (
                      <div
                        className="font-semibold text-lg h-8 w-9 text-white cursor-pointer border-2  flex justify-center items-center rounded-full bg-gray-300"
                        onClick={() => {
                          removecity(index);
                        }}
                      >
                        -
                      </div>
                    )}
                    {index > 0 && city.id !== undefined && (
                      <div
                        className="font-semibold text-lg h-8 w-9 text-white cursor-pointer border-2  flex justify-center items-center rounded-full bg-gray-300"
                        onClick={() => {
                          deletecity(city.id);
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
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
    </>
  );
}

export default CountryCityAdd;
