import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import Mentordata from "./Mentordata";
import Pagination from "../../common/Pagination";
import Preloader from "../../get-started/common/PreLoader";
import Loader from "react-loader-spinner";
import DataLoader from "../../common/Loader";
const MentorBuddyList = () => {
  const [getdata, setgetdata] = useState([]);
  const [mentorId, setMentorId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [searchinput, setsearchinput] = useState("");
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  // get api
  const getmentorlist = (signal) => {
    axiosInstance
      .get(`buddy-mentor/?page=${currentButton}`, { signal })
      .then((res) => {
        setgetdata(res.data.results);
        setPage(res.data.total_pages);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete modal popup
  const popUpDeleteModal = (id) => {
    setMentorId(`/buddy-mentor-update/${id}`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getmentorlist();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .get(`/buddy-mentor/?search=${searchinput}`)
      .then((res) => {
        setgetdata(res.data.results);
        setPage(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getmentorlist(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, [currentButton]);
  return (
    <div>
      {load && <Preloader />}
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
        deleteUrl={mentorId}
        setMessage={setMessage}
      />{" "}
      <div className=" w-full bg-gray-100">
        <div className="bg-white  w-full shadow-lg">
          <div className="font-medium md:px-10 text-sm h-full flex p-1 gap-1 flex-col sm:flex-row sm:items-center w-full justify-between mx-auto">
            <div>{"Dashboard > Mentor Buddy > List"}</div>
            <form onSubmit={HandleSubmit} className="relative">
              <input
                placeholder="Search by name..."
                name="searchinput"
                onChange={(e) => {
                  setsearchinput(e.target.value);
                }}
                value={searchinput}
                className="rounded-2xl pr-10 md:w-64 w-full  border border-gray-300 transition duration-200   text-sm placeholder-gray-500 pl-4 backdrop-blur-sm text-gray-500 py-3"
              />
              <button
                type="submit"
                className="absolute right-2 top-3 cursor-pointer"
              >
                {/* <IconManager icon="Search" /> */}
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="w-10/12 mx-auto justify-between flex pt-3 pb-2">
          <div className="text-3xl font-semibold  text-gray-400">LIST</div>
        </div>

        {load && (
          <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
            <span className="text-lg">Loading</span>
            <span>
              {/* <Loader
                type="ThreeDots"
                color="#eb3434"
                height={40}
                width={40}
                timeout={90000}
              /> */}
              <DataLoader />
            </span>
          </div>
        )}

        {getdata.length === 0 && !load && (
          <div className="text-red-500 pb-12 mt-3 md:mt-5 flex justify-center">
            No Data Available
          </div>
        )}

        {getdata.length > 0 && (
          <div
            // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
            className="overflow-x-auto sm:px-2 lg:px-0 mx-auto pb-8"
          >
            <div
              style={{ width: window.innerWidth < 1260 && 1000 }}
              className=" mx-auto  md:w-11/12 bg-white border mt-2 border-gray-300 rounded-2xl p-2"
            >
              <table
                style={{ color: "crimson" }}
                className=" table-auto w-full"
              >
                <thead>
                  <tr>
                    <th>
                      <span> Mentor Name</span>
                    </th>
                    {/* <th className="">Country</th> */}
                    <th className="">Work Industry</th>
                    <th className="">Email Address</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {getdata.map((mentor, index) => {
                    return (
                      <Mentordata
                        key={index}
                        {...mentor}
                        popUpDeleteModal={popUpDeleteModal}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {page > 1 && (
        <Pagination
          setCurrentButton={setCurrentButton}
          currentButton={currentButton}
          page={page}
        />
      )}
    </div>
  );
};
export default MentorBuddyList;
