import React, { useState, useEffect } from "react";
import "../../../../assets/css/Dashboard.css";
// import institutesList from "../../../../api/institute/institutes-list";
import axiosInstance from "../../../../api/axiosInstance";
import DeleteModal from "../../../common/DeleteModal";
import DeleteAlertModal from "../../../common/DeleteAlertModal";
import CourseData from "./CourseData";
import Preloader from "../../../get-started/common/PreLoader";
import Pagination from "../../../common/Pagination";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  const [categories, setCategories] = useState([]);
  const [degreelevel, setDegreeLevel] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedCategory, setSlecetdCategory] = useState("");
  const [selectedInstitute, setSlecetdInstitute] = useState("");
  const [selectedDegreeLevel, setSlecetdDegreeLevel] = useState("");
  //fetch institute data
  const getCourseList = (signal) => {
    axiosInstance
      .get(`/courses/list/?page=${currentButton}`, { signal })
      .then((res) => {
        // console.log(res.data);
        setPage(res.data.total_pages);
        setCourses(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleReset = () => {
    setSlecetdCategory("");
    setSlecetdInstitute("");
    setSlecetdDegreeLevel("");
    getCourseList();
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
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDegreeLevel = (signal) => {
    axiosInstance
      .get(`/courses/degree-level/list/`, { signal })
      .then((res) => {
        setDegreeLevel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getInstituesList = (signal) => {
    axiosInstance
      .get(`/institutes/all-list/`, { signal })
      .then((res) => {
        setInstitutes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleFilterCourse = () => {
    let formData = new FormData();
    selectedCategory && formData.append("category", selectedCategory);
    selectedInstitute && formData.append("institute", selectedInstitute);
    selectedDegreeLevel && formData.append("degree_level", selectedDegreeLevel);
    axiosInstance
      .post(`/courses/admin-filter/`, formData)
      .then((res) => {
        // console.log(res.data);
        setPage(0);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCourseList(signal);
    getCategoryList(signal);
    getDegreeLevel(signal);
    getInstituesList(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, [currentButton]);
  const [searchinput, setsearchinput] = useState("");
  const HandleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .get(`courses/list/?search=${searchinput}&search_fields=name`)
      .then((res) => {
        setPage(res.data.total_pages);
        setCourses(res.data.results);
      });
  };

  useEffect(() => {
    if (
      selectedCategory === "" &&
      selectedInstitute === "" &&
      selectedDegreeLevel === ""
    ) {
      return;
    } else {
      handleFilterCourse();
    }
    // eslint-disable-next-line
  }, [selectedCategory, selectedInstitute, selectedDegreeLevel]);
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
        <div className="bg-white  w-full shadow-lg">
          <div className="font-medium md:px-10 text-sm h-full flex p-1 gap-1 flex-col sm:flex-row sm:items-center w-full justify-between mx-auto">
            <div>{"Dashboard > Courses > List"}</div>
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
        <div className="w-10/12 mx-auto flex flex-col pt-3 pb-2">
          <div className="flex justify-between">
            <div className="text-3xl font-semibold  text-gray-400">
              Filter Data By
            </div>
            <div
              className="flex items-center text-white bg-pink4 px-4 py-1 text-sm rounded-md cursor-pointer"
              onClick={handleReset}
            >
              <span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </span>
              <span>Reset</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
            {/* category  */}
            <div className="flex flex-col space-y-2">
              <div className="text-base mt-1 font-medium text-gray-700">
                Category
              </div>
              <select
                className="border border-gray-300 mt-1 px-2 shadow-lg rounded-md  w-full "
                value={selectedCategory}
                onChange={(e) => {
                  setSlecetdCategory(e.target.value);
                  // handleFilterCourse();
                }}
              >
                <option hidden>Select Category</option>
                {Array.isArray(categories) &&
                  categories.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.title}>
                        {cat.title}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* Institute  */}
            <div className="flex flex-col space-y-2">
              <div className="text-base mt-1 font-medium text-gray-700">
                Institute
              </div>
              <select
                className="border border-gray-300 mt-1 px-2 shadow-lg rounded-md  w-full"
                value={selectedInstitute}
                onChange={(e) => {
                  setSlecetdInstitute(e.target.value);
                  // handleFilterCourse();
                }}
              >
                <option hidden>Select Institute</option>
                {Array.isArray(institutes) &&
                  institutes.map((inst) => {
                    return (
                      <option key={inst.id} value={inst.name}>
                        {inst.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* Degree Level  */}
            <div className="flex flex-col space-y-2">
              <div className="text-base mt-1 font-medium text-gray-700">
                Degree Level
              </div>
              <select
                className="border border-gray-300 mt-1 px-2 shadow-lg rounded-md  w-full "
                value={selectedDegreeLevel}
                onChange={(e) => {
                  setSlecetdDegreeLevel(e.target.value);
                  // handleFilterCourse();
                }}
              >
                <option hidden>Select Degree Level</option>
                {Array.isArray(degreelevel) &&
                  degreelevel.map((deg) => {
                    return (
                      <option key={deg.id} value={deg.title}>
                        {deg.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div
          // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
          className="overflow-x-auto sm:px-2 lg:px-0 mx-auto pb-8"
        >
          {courses.length === 0 ? (
            <div className="flex justify-center">No data to show</div>
          ) : (
            <div
              style={{ width: window.innerWidth < 1260 && 1000 }}
              className=" mx-auto  md:w-11/12 bg-white border mt-2 border-gray-300 rounded-2xl p-5"
            >
              <table
                style={{ color: "crimson" }}
                className=" table-auto w-full"
              >
                <thead>
                  <tr>
                    <th className="text-left">Course Name</th>
                    {/* <th className="">Country</th> */}
                    <th className="text-left">Category</th>
                    <th className="text-left">Institute</th>
                    <th className="text-left">Degree Level</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {courses.map((course, index) => {
                    return (
                      <CourseData
                        key={index}
                        {...course}
                        popUpDeleteModal={popUpDeleteModal}
                      />
                    );
                  })}
                </tbody>
              </table>
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
export default CourseList;
