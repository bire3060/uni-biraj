import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FACILITY_ADD,
  FACILITY_UPDATE,
  FACILITY_REMOVE,
  FACILITY_ERROR,
} from "../../../../redux/actions/actionsTypes";
import { SaveButton } from "../../../common/buttons";
import errorHandler from "../../../common/error-handler";

const Facilities = ({ setActive, slug }) => {
  const dispatch = useDispatch();
  const { facilities, facilityErr } = useSelector((state) => state.institute);
  const removeFacilities = (i, id) => {
    if (slug === undefined) {
      dispatch({
        type: FACILITY_REMOVE,
        payload: i,
      });
    } else {
      if (id === undefined) {
        dispatch({
          type: FACILITY_REMOVE,
          payload: i,
        });
      } else {
        axiosInstance
          .delete(`/institutes/facility/update/${id}`)
          .then((res) => {
            //tostify delete
            toast.error("Delete Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch({
              type: FACILITY_REMOVE,
              payload: i,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let headingErr = false;
    let goAheadAndSubmit = true;
    for (let i = 0; i < facilities.length; i++) {
      const { title, description } = facilities[i];
      const titleErr = errorHandler("", title, true);
      const descriptionErr = errorHandler("", description, true);

      if (titleErr || descriptionErr) {
        dispatch({
          type: FACILITY_ERROR,
          payload: {
            error: "Please fill all the fields",
          },
        });

        i = facilities.length;
        if (!headingErr) {
          headingErr = true;
        }
        goAheadAndSubmit = false;
      } else {
        dispatch({
          type: FACILITY_ERROR,
          payload: {
            error: "",
          },
        });
        headingErr = false;
      }
    }
    if (goAheadAndSubmit && !headingErr) {
      // let val = {
      //   institute: instId,
      // };
      let val = [];
      let instId = localStorage.getItem("id");
      console.log(instId)

      if (slug === undefined) {
        for (let i = 0; i < facilities.length; i++) {
          val.push({
            institute: instId,
            title: facilities[i].title,
            description: facilities[i].description,
          });
        }
        axiosInstance
          .post(`/institutes/facilities/create/`, val)
          .then((res) => {
            setActive("Award");
            toast.success("facility added Successfully", {
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
            console.log(err);
          });
      } else {
        for (let i = 0; i < facilities.length; i++) {
          if (facilities[i].id !== undefined) {
            val.push({
              id: facilities[i].id,
              title: facilities[i].title,
              description: facilities[i].description,
            });
          } else {
            val.push({
              slug: slug,
              title: facilities[i].title,
              description: facilities[i].description,
            });
          }
        }
        axiosInstance
          .post(`institutes/facility/bulk-update/`, val)
          .then((res) => {
            // setActive("Award");
            // console.log(res.data);
            // tostify update
            toast.success("Saved Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            for (let j = 0; j < res.data.data1.length; j++) {
              dispatch({
                type: FACILITY_UPDATE,
                payload: {
                  index: j,
                  value: res.data.data1[j].title,
                  property: "title",
                },
              });
              dispatch({
                type: FACILITY_UPDATE,
                payload: {
                  index: j,
                  value: res.data.data1[j].description,
                  property: "description",
                },
              });
              dispatch({
                type: FACILITY_UPDATE,
                payload: {
                  index: j,
                  value: res.data.data1[j].id,
                  property: "id",
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className={`flex items-center justify-between `}>
        <div className="flex space-x-4">
          <SaveButton />
          {!slug && (
            <button
              className="bg-green-500 text-white px-6 rounded-md"
              onClick={() => setActive("Award")}
            >
              Next
            </button>
          )}
        </div>
        <button
          className="text-sm bg-blue3 text-white px-3 py-1 rounded hover:bg-blue2"
          onClick={() =>
            dispatch({
              type: FACILITY_ADD,
            })
          }
        >
          Add More
        </button>
      </div>

      {facilityErr && (
        <div className="text-red-400 font-bold mt-3">{facilityErr}</div>
      )}
      {facilities.map((facility, index) => {
        const { title, description, id } = facility;
        return (
          <div className="mt-5 border border-gray-400 shadow-lg" key={index}>
            <div className="border-b border-gray-400 shadow-lg flex items-center">
              <input
                type="text"
                name=""
                placeholder="Facility Title"
                className="font-semibold text-xl pl-3 w-full"
                value={title}
                onChange={(event) =>
                  dispatch({
                    type: FACILITY_UPDATE,
                    payload: {
                      index: index,
                      value: event.target.value,
                      property: "title",
                    },
                  })
                }
              />
              {index > 0 && (
                <div
                  className="mx-5 py-1 cursor-pointer"
                  onClick={() => removeFacilities(index, id)}
                >
                  <svg
                    className="w-6 h-6 text-pink4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="py-2 mb-2 mx-2 border-b-2 border-purple-700">
              <textarea
                rows="5"
                className="w-full resize-none"
                placeholder="Description"
                value={description}
                onChange={(event) =>
                  dispatch({
                    type: FACILITY_UPDATE,
                    payload: {
                      index: index,
                      value: event.target.value,
                      property: "description",
                    },
                  })
                }
              ></textarea>
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default Facilities;
