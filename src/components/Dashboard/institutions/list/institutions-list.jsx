import React, { useState, useEffect } from "react";
import InstitutionsData from "./institutions-data";
import "../../../../assets/css/Dashboard.css";
// import institutesList from "../../../../api/institute/institutes-list";
import axiosInstance from "../../../../api/axiosInstance";
import DeleteModal from "../../../common/DeleteModal";
import DeleteAlertModal from "../../../common/DeleteAlertModal";
import Pagination from "../../../common/Pagination";
import Preloader from "../../../get-started/common/PreLoader";
const InstitutionsList = () => {
  const [institutes, setInstitutes] = useState([]);
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchinput, setsearchinput] = useState("");
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  //fetch institute data
  const getInstituesList = (signal) => {
    axiosInstance
      .get(`/institutes/?page=${currentButton}`, { signal })
      .then((res) => {
        setPage(res.data.total_pages);
        setInstitutes(res.data.results.reverse());
        setLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`/institutes/update/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getInstituesList();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getInstituesList(signal);
    return () => controller.abort();

    // eslint-disable-next-line
  }, [currentButton]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .get(`institutes/?search=${searchinput}&search_fields=name`)
      .then((res) => {
        // console.log(res.data.results);
        setInstitutes(res.data.results);
        setPage(res.data.total_pages);
      });
  };

  return (
    <>
      {load && <Preloader />}
      <div>
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
              <div>{"Dashboard > Institution > List"}</div>
              <form onSubmit={HandleSubmit} className="relative">
                <input
                  placeholder="Search by name or address..."
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
            <div className="flex items-center font-medium gap-5 text-sm text-gray-500">
              {/* <div>{"<1/20>"}</div>
            <div className="my-2">10/page </div> */}
            </div>
          </div>
          <div
            // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
            className="overflow-x-auto sm:px-2 lg:px-0 mx-auto pb-8"
          >
            {institutes.length === 0 ? (
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
                      <th className="text-left">
                        <span> Institute Name</span>
                      </th>
                      {/* <th className="">Country</th> */}
                      <th className="text-left">Address</th>
                      <th className="text-left">Contact</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {institutes.map((institute, index) => {
                      return (
                        <InstitutionsData
                          key={index}
                          {...institute}
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
    </>
  );
};
export default InstitutionsList;
