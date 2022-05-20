import React, { useState, useEffect } from "react";
// import "../../../../assets/css/Dashboard.css";
// import institutesList from "../../../../api/institute/institutes-list";
// import axiosInstance from "../../../../api/axiosInstance";
import DeleteModal from "../../../../common/DeleteModal";
import DeleteAlertModal from "../../../../common/DeleteAlertModal";
import AppliedCourseData from "./AppliedCourseData";
import axiosInstance from "../../../../../api/axiosInstance";
import Pagination from "../../../../common/Pagination";
import Preloader from "../../../../get-started/common/PreLoader";

const AppliedCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selecetdStatus, setSelectedStatus] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  // const [dot, setdot] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  //fetch institute data
  const getCourseList = () => {
    axiosInstance
      .get(`/courses/verified-applied-course-list/?page=${currentButton}`)
      .then((res) => {
        setPage(res.data.total_pages);
        setCourses(res.data.results);
        // console.log(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`/courses/delete/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getCourseList();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const [searchinput, setsearchinput] = useState("");
  const HandleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .get(
        `courses/verified-applied-course-list/?search=${searchinput}&search_fields=name`
      )
      .then((res) => {
        setPage(res.data.total_pages);
        setCourses(res.data.results);
      });
  };
  const [getdata, setgetdata] = useState([]);

  const getStatutsData = (signal) => {
    axiosInstance
      .get(`courses/course-process-status/`, { signal })
      .then((res) => {
        setgetdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDataFilter = (status) => {
    let val = { status };
    if (status === "all") {
      getCourseList();
    } else {
      axiosInstance
        .post(`/courses/filter-verified-applied-course/`, val)
        .then((res) => {
          // console.log(res.data);
          setCourses(res.data);
          setPage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCourseList(signal);
    getStatutsData(signal);
    return () => controller.abort();

    // eslint-disable-next-line
  }, [currentButton]);
  return (
    <div>
      {load && <Preloader />}
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
        deleteUrl={instituteId}
        setMessage={setMessage}
      />
      {/*-------------*/}
      <div className=" w-full bg-gray-100">
        <div className=" bg-white  w-full shadow-lg">
          <div className="font-medium md:px-10 text-sm h-full flex p-1 gap-1 flex-col sm:flex-row sm:items-center w-full justify-between mx-auto">
            <div>{"Dashboard > Application Manager > List"}</div>
            <form onSubmit={HandleSubmit} className="relative">
              <input
                placeholder="Search by course or student name..."
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

          <div className="">
            {/* category  */}
            <div className=" flex items-center space-x-4">
              <div className="text-base mt-1 font-medium text-gray-700">
                Status:
              </div>
              <select
                className="border border-gray-300 mt-1 px-2 shadow-lg rounded-md  w-full "
                onChange={(e) => {
                  handleDataFilter(e.target.value);
                  setSelectedStatus(e.target.value);
                }}
                value={selecetdStatus}
              >
                <option hidden>--- Select Category ---</option>
                <option value="all">All</option>
                {Array.isArray(getdata) &&
                  getdata.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.title}>
                        {cat.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div
          // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
          className="overflow-x-auto sm:px-2 lg:px-0 pb-8"
        >
          {courses.length > 0 ? (
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
                    <th className="">Applicant Id</th>
                    {/* <th className="">Country</th> */}
                    <th className="">Course Name</th>
                    <th className="">Student</th>
                    {/* <th className="">Applied Date</th> */}
                    <th className="">Status</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full relative">
                  {courses.map((course, index) => {
                    return (
                      <AppliedCourseData
                        // setdot={setdot}
                        // dot={dot}
                        key={index}
                        {...course}
                        getCourseList={getCourseList}
                        popUpDeleteModal={popUpDeleteModal}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-4 text-xl">
              No data to show
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        {page > 1 && (
          <Pagination
            setCurrentButton={setCurrentButton}
            currentButton={currentButton}
            page={page}
          />
        )}
      </div>
    </div>
  );
};
export default AppliedCourseList;
