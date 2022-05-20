import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import DataLoader from "../../common/Loader";
import Pagination from "../../common/Pagination";
import Preloader from "../../get-started/common/PreLoader";
import ContactUsDetailModal from "./ContactUsDetailModal";

const ContactUs = () => {
  const [data, setData] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [userSlug, setUserSlug] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);

  const getAllData = (signal) => {
    axiosInstance
      .get(`settings/contact-us-list/?page=${currentButton}`, {
        signal,
      })
      .then((res) => {
        setPage(res.data.total_pages);
        setData(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const openModal = (data) => {
  //     setDetail(data);
  //     setOpen(true);
  //   };
  //   const closeModal = (data) => {
  //     setOpen(false);
  //   };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllData(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);

  // delete modal popup
  const popUpDeleteModal = (id) => {
    setDeleteUrl(`/settings/contact-us-update/${id}`);
    setOpen(true);
  };

  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    getAllData();
  };

  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      setOpenDeleteSucess(true);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

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
        deleteUrl={deleteUrl}
        setMessage={setMessage}
      />

      {detailModal && (
        <ContactUsDetailModal
          userSlug={userSlug}
          setDetailModal={setDetailModal}
          detailModal={detailModal}
        />
      )}

      {/* {load && <Preloader />} */}

      <div className="py-10">
        <div className="px-14 font-bold text-2xl text-gray-600 mb-4">
          All Contact Us List
        </div>

        <div className="flex items-center justify-center text-xl">
          {load && (
            <div className="flex items-center justify-center py-6 space-x-3">
              <div className="text-xl">Loading</div>
              <div>
                <DataLoader />
              </div>
            </div>
          )}
        </div>

        {data.length === 0 && !load && (
          <div className="w-full flex justify-center text-primary text-xl">
            No data to show
          </div>
        )}

        {/* contact us */}
        {data.length > 0 && (
          <div
            // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
            className="overflow-x-auto sm:px-2 lg:px-0 pb-8"
          >
            <div
              style={{ width: window.innerWidth < 1260 && 1000 }}
              className=" mx-auto  md:w-11/12 bg-white border mt-2 border-gray-300 rounded-2xl px-5 py-2"
            >
              <table
                style={{ color: "crimson" }}
                className=" table-auto w-full"
              >
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Country</th>
                    <th className="text-left">Message</th>
                    <th className="text-left">Phone</th>
                    <th className="text-left">Posted Date</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Array.isArray(data) &&
                    data.map((i, index) => {
                      const {
                        country,
                        f_name,
                        message,
                        phone,
                        phone_code,
                        created,
                        id,
                      } = i;

                      return (
                        <tr
                          className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}
                          key={index}
                        >
                          <td className="py-2">{f_name}</td>
                          <td className="py-2">{country}</td>
                          <td className="py-2">{message}</td>
                          <td className="py-2">{`${phone_code}-${phone}`}</td>
                          <td className="py-2">{created.split("T")[0]}</td>
                          <td className="flex space-x-4">
                            <span
                              className="bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer"
                              onClick={() => {
                                setDetailModal(true);
                                setUserSlug(id);
                              }}
                            >
                              Details
                            </span>
                            <span
                              className="bg-red-500 text-white px-4 py-1 rounded-md cursor-pointer"
                              onClick={() => popUpDeleteModal(id)}
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
        )}

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

export default ContactUs;
