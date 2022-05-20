import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";

function JobCategories() {
  const [jobCat, setJobCat] = useState("");
  const [allJobCat, setAllJobCat] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [jobdeleteId, setJobdeleteId] = useState("");
  const [jobUpdateId, setJobupdateId] = useState("");
  const handleJobcatSubmit = (e) => {
    e.preventDefault();
    let val = {
      title: jobCat,
    };

    if (jobUpdateId === "") {
      axiosInstance
        .post(`/job-category/create/`, val)
        .then((res) => {
          toast.success("Job category added", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setJobCat("");
          getAllJobCategory();
        })
        .catch((err) => {
          if (err.response.data.title[0]) {
            toast.error(err.response.data.title[0], {
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
    } else {
      axiosInstance
        .put(`/job-category/update/${jobUpdateId}/`, val)
        .then((res) => {
          toast.success("Job category updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setJobCat("");
          setJobupdateId("");
          getAllJobCategory();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getJobCatById = (id) => {
    axiosInstance.get(`/job-category/update/${id}/`).then((res) => {
      setJobCat(res.data.title);
      setJobupdateId(res.data.id);
    });
  };
  // delete modal popup
  const popUpDeleteModal = (id) => {
    setJobdeleteId(`/job-category/update/${id}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getAllJobCategory();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  const getAllJobCategory = (signal) => {
    axiosInstance
      .get(`/job-category/create/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setAllJobCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllJobCategory(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {/* sucess delete page from Modal*/}
      <DeleteModal
        open={openDeleteSucess}
        closeModal={closeModalDeleteMessage}
        message={message}
      />
      {/*-------------*/}
      {/*  delete alert  page from Modal*/}
      <DeleteAlertModal
        open={open}
        closeModal={closeModalDeleteAlert}
        deleteUrl={jobdeleteId}
        setMessage={setMessage}
      />
      {/* header */}
      <div className="bg-gray-100 w-full relative">
        {/* top breadcrum  */}
        <div className="h-8 w-full bg-white shadow-lg">
          <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
            <div className="self-center">
              {"Dashboard > Settings > Job category Add"}
            </div>
          </div>
        </div>
        <div className="py-5 px-3 md:px-10 space-y-4 bg-white mx-4 rounded-md border border-gray-100 shadow-lg mt-4">
          <div className="md:p-6 bg-white relative">
            <div className="font-bold text-blue3  text-center w-full tracking-wide text-3xl">
              Job Categories
            </div>
            {/* form  */}
            <div className="flex  justify-center">
              <form className="" onSubmit={handleJobcatSubmit}>
                <div className="flex  flex-col gap-4 sm:gap-4 p-0 py-6 md:mt-4 mt-4">
                  <div className="flex space-x-4">
                    <label className="text-gray-600 sm:self-center sm:mb-0 mb-2 block text-lg font-semibold ">
                      Category Name
                    </label>
                    <input
                      name="job"
                      value={jobCat}
                      onChange={(e) => setJobCat(e.target.value)}
                      required
                      className="border border-blue-200 text-gray-500 px-3 focus:bg-secondary p-2 text-sm rounded focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <button className="submitButton text-sm bg-green-500 uppercase   font-medium text-white px-10 p-2 rounded">
                      {jobUpdateId === "" ? "Save" : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* lists */}
            <div className="  w-full mx-auto">
              <div className="font-bold text-gray-600 ml-2 mb-4 tracking-wide text-2xl">
                Job Category List:
              </div>
              <div
                style={{ width: window.innerWidth < 686 ? "80vw" : "100%" }}
                className=" sm:w-full overflow-auto"
              >
                <table
                  style={{ width: window.innerWidth < 686 ? "500px" : "100%" }}
                  className="mt-4 sm:w-full text-gray-600 "
                  id="customer"
                >
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(allJobCat) &&
                      allJobCat.map((tbl, index) => {
                        const { title, id } = tbl;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="secondrow">{title}</td>

                            <td className="lastrow">
                              <span
                                className="bg-green-500 text-xs cursor-pointer text-gray-100 hover:bg-green-600 px-3 p-1 rounded focus:outline-none"
                                onClick={() => {
                                  getJobCatById(id);
                                  window.scrollTo(0, 0);
                                }}
                              >
                                Update
                              </span>
                              <span
                                onClick={() => {
                                  popUpDeleteModal(id);
                                }}
                                className="bg-red-500 ml-2 text-xs cursor-pointer text-gray-100 hover:bg-red-600 px-3 p-1 rounded focus:outline-none"
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCategories;
