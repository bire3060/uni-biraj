import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import JobProviderData from "./JobProviderData";
import DeleteModal from "../../common/DeleteModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import Pagination from "../../common/Pagination";
import DataLoader from "../../common/Loader";
function JobProviderLists({
  joblist,
  setJobProviderSlug,
  fetchJobLists,
  buttonLoader,
  page,
  setCurrentButton,
  currentButton,
}) {
  const [jobId, setJobId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");

  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setJobId(`/job-provider/delete/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      fetchJobLists();
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
        deleteUrl={jobId}
        setMessage={setMessage}
      />

      <div className="flex items-center justify-center text-xl">
        {buttonLoader && (
          <div className="flex items-center justify-center py-6 space-x-3">
            <div className="text-xl">Loading</div>
            <div>
              <DataLoader />
            </div>
          </div>
        )}
      </div>

      {joblist.length === 0 && !buttonLoader && (
        <div className="w-full flex justify-center text-primary text-lg mt-6">
          No data to show
        </div>
      )}

      {/*-------------*/}
      <div className=" mx-auto h-72 w-full overflow-auto">
        {joblist.length > 0 && (
          <table style={{ color: "crimson" }} className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-left">
                  <span>Company</span>
                </th>
                <th className="text-left">Address</th>
                <th className="text-left">Contact No</th>
                <th className="text-left">Email Address</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {joblist.map((list, index) => {
                return (
                  <JobProviderData
                    key={index}
                    setJobProviderSlug={setJobProviderSlug}
                    list={list}
                    popUpDeleteModal={popUpDeleteModal}
                    buttonLoader={buttonLoader}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {page > 1 && (
        <Pagination
          setCurrentButton={setCurrentButton}
          currentButton={currentButton}
          page={page}
        />
      )}
    </>
  );
}

export default JobProviderLists;
