import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import RegisterListTr from "./RegisterListTr";
import Pagination from "../../common/Pagination";
import Preloader from "../../get-started/common/PreLoader";
const RegisterList = () => {
  // const event = new Date();
  const [userLists, setUserLists] = useState([]);
  const [userDeleteUrl, setUserDeleteUrl] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [searchinput, setsearchinput] = useState("");
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  const [calenderDate, setCalanderDate] = useState("");
  const [role, setRole] = useState("ST");

  const getAllUserLists = (signal) => {
    axiosInstance
      .get(
        `/user/admin-filter/?page=${currentButton}&user_type__in=${role}&created_at__date=${calenderDate}&username__icontains=${searchinput}`,
        { signal }
      )
      .then((res) => {
        // console.log(res.data.results);
        setUserLists(res.data.results);
        setPage(res.data.total_pages);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // delete modal popup
  const popUpDeleteModal = (id) => {
    setUserDeleteUrl(`/user/user-update/${id}`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getAllUserLists();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    // axiosInstance
    //   .get(`/user/user-list/?search=${searchinput}`)
    //   .then((res) => {
    //     setUserLists(res.data.results);
    //     setPage(res.data.total_pages);
    //     setLoad(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getAllUserLists();
  };

  // const handleSearch = () => {
  //   let val = {
  //     user_type: role,
  //     created_at: calenderDate,
  //   };
  //   axiosInstance
  //     .post(`/user/admin-filter/`, val)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUserLists(res.data);
  //       setPage("");
  //       // setLoad(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllUserLists(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton, page, role, calenderDate]);

  return (
    <>
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
        deleteUrl={userDeleteUrl}
        setMessage={setMessage}
      />
      {/*-------------*/}
      <div className="pb-10">
        <div className=" w-full bg-gray-100">
          <div className="bg-white  w-full shadow-lg">
            <div className="font-medium md:px-10 text-sm h-full flex p-1 gap-1 flex-col sm:flex-row sm:items-center w-full justify-between mx-auto">
              <div>{"Dashboard > Register > List"}</div>
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
          <div className="w-10/12 mx-auto flex-col flex pt-3 pb-2">
            <div className="text-3xl font-semibold  text-gray-400 mb-3">
              LIST
            </div>
            <div className="md:flex md:space-x-4 space-y-2 md:space-y-0 items-center">
              <div className="flex  space-x-2 items-center">
                <div className="text-base mt-1 font-medium text-gray-700">
                  Role:
                </div>
                <select
                  className="border w-44 border-gray-300 mt-1 px-2 shadow-lg rounded-md "
                  onChange={(e) => {
                    setRole(e.target.value);
                    // handleSearch();
                  }}
                >
                  <option disabled>---Select Role---</option>
                  <option value="ST">Student</option>
                  <option value="AM">Application Manager</option>
                  <option value="IN">Instructor</option>
                  <option value="AD">Admin</option>
                  <option value="CO">Counselor</option>
                  <option value="SA">Super Admin</option>
                </select>
              </div>
              <div className="flex  space-x-2  items-center">
                <div className="text-base mt-1 font-medium text-gray-700">
                  Joined Date:
                </div>
                <div className="relative">
                  <input
                    type="date"
                    onChange={(e) => {
                      setCalanderDate(e.target.value);
                      // handleSearch();
                    }}
                    value={calenderDate}
                    className="px-5 rounded-md text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
          {userLists.length === 0 ? (
            <div className="flex justify-center">No data to show</div>
          ) : (
            <div
              // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
              className="overflow-x-auto sm:px-2 lg:px-0 mx-auto pb-8"
            >
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
                      <th className="text-left">Full Name</th>
                      <th className="text-left">Email</th>
                      <th className="text-left">Contact</th>
                      <th className="text-left">Joined Date</th>
                      <th className="text-left">Role</th>
                      {/* <th className="">Contact</th> */}
                      <th className="">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {Array.isArray(userLists) &&
                      userLists.map((user, index) => {
                        return (
                          <RegisterListTr
                            key={index}
                            {...user}
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
    </>
  );
};

export default RegisterList;
