import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AWARD_ADD,
  AWARD_UPDATE,
  AWARD_REMOVE,
  AWARD_ERROR,
} from "../../../../redux/actions/actionsTypes";
import { SaveButton } from "../../../common/buttons";
import errorHandler from "../../../common/error-handler";
toast.configure();
const Award = ({ setActive, slug }) => {
  const dispatch = useDispatch();
  const { awards, awardErr } = useSelector((state) => state.institute);
  const removeAward = (i, id) => {
    // dispatch({
    //   type: AWARD_REMOVE,
    //   payload: i,
    // });
    if (slug === undefined) {
      dispatch({
        type: AWARD_REMOVE,
        payload: i,
      });
    } else {
      if (id === undefined) {
        dispatch({
          type: AWARD_REMOVE,
          payload: i,
        });
      } else {
        axiosInstance
          .delete(`/institutes/award/update/${id}`)
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
              type: AWARD_REMOVE,
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

    for (let i = 0; i < awards.length; i++) {
      const { title, description } = awards[i];
      const titleErr = errorHandler("", title, true);
      const descriptionErr = errorHandler("", description, true);

      if (titleErr || descriptionErr) {
        dispatch({
          type: AWARD_ERROR,
          payload: {
            error: "Please fill all the fields",
          },
        });
        // i = facilities.length;
        if (!headingErr) {
          headingErr = true;
        }
        goAheadAndSubmit = false;
      } else {
        dispatch({
          type: AWARD_ERROR,
          payload: {
            error: "",
          },
        });
        headingErr = false;
      }
    }
    if (goAheadAndSubmit && !headingErr) {
      let val = [];
      let instId = localStorage.getItem("id");
      if (slug === undefined) {
        for (let i = 0; i < awards.length; i++) {
          val.push({
            institute: instId,
            title: awards[i].title,
            description: awards[i].description,
          });
        }
        axiosInstance
          .post(`/institutes/award/create/`, val)
          .then((res) => {
            setActive("Document");
            toast.success("Award added Successfully", {
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
        for (let i = 0; i < awards.length; i++) {
          if (awards[i].id !== undefined) {
            val.push({
              id: awards[i].id,
              title: awards[i].title,
              description: awards[i].description,
            });
          } else {
            val.push({
              slug: slug,
              title: awards[i].title,
              description: awards[i].description,
            });
          }
        }
        axiosInstance
          .post(`institutes/award/bulk-update/`, val)
          .then((res) => {
            // setActive("Award");
            // tostify update
            toast.success("Save Successfully", {
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
                type: AWARD_UPDATE,
                payload: {
                  index: j,
                  value: res.data.data1[j].title,
                  property: "title",
                },
              });
              dispatch({
                type: AWARD_UPDATE,
                payload: {
                  index: j,
                  value: res.data.data1[j].description,
                  property: "description",
                },
              });
              dispatch({
                type: AWARD_UPDATE,
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
              className="bg-blue3 text-white px-6 rounded-md"
              onClick={() => setActive("Facilities")}
            >
              Previous
            </button>
          )}
          {!slug && (
            <button
              className="bg-green-500 text-white px-6 rounded-md"
              onClick={() => setActive("Document")}
            >
              Next
            </button>
          )}
        </div>
        <button
          className="text-sm bg-blue3 text-white px-3 py-1 rounded hover:bg-blue2"
          onClick={() =>
            dispatch({
              type: AWARD_ADD,
            })
          }
        >
          Add More
        </button>
      </div>
      {awardErr && <div className="text-red-400 font-bold">{awardErr}</div>}
      {awards.map((award, index) => {
        const { title, description, id } = award;
        return (
          <div className="mt-8 border border-gray-400 shadow-lg" key={index}>
            <div className="border-b border-gray-400 shadow-lg flex items-center">
              <input
                type="text"
                name=""
                placeholder="Award Title"
                className="font-semibold text-xl pl-3 w-full"
                value={title}
                onChange={(event) =>
                  dispatch({
                    type: AWARD_UPDATE,
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
                  onClick={() => removeAward(index, id)}
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
                    type: AWARD_UPDATE,
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

export default Award;
