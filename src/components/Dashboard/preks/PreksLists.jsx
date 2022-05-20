import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Edit from "../../../assets/icons/edit";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import DataLoader from "../../common/Loader";
function PreksLists({ fetchByPerkById }) {
  const [perksLists, setPerksLists] = useState([]);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [perksLoad, setPerksLoad] = useState(true);
  // delete modal popup
  const popUpDeleteModal = (id) => {
    setDeleteUrl(`/std-gift-update/${id}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    fetchPerkLists();
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
  const fetchPerkLists = async (signal) => {
    axiosInstance
      .get(`/std-gift-list/`, { signal })
      .then((res) => {
        setPerksLists(res.data);
        // console.log(res.data);
        setPerksLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchPerkLists(signal);
    return () => controller.abort();
    // eslint-disable-next-line
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
        deleteUrl={deleteUrl}
        setMessage={setMessage}
      />

      {perksLoad && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {perksLists.length === 0 && !perksLoad && (
        <div className="flex items-center justify-center">
          No Data Available
        </div>
      )}

      {/*-------------*/}
      {perksLists.length > 0 &&
        Array.isArray(perksLists) &&
        perksLists.map((blog, index) => {
          const { title, details, image, id } = blog;
          return (
            <div
              className="mt-10 shadow-xl max-w-3xl md:space-x-10  w-full justify-between rounded-md  md:flex "
              key={index}
            >
              <div className="h-32 md:w-44 ">
                <img
                  src={image}
                  className="w-full h-full object-cover md:rounded-l-md"
                  alt=""
                />
              </div>
              <div className=" flex-1 px-4 py-2">
                <div className="text-lg font-medium">{title}</div>
                <div className="text-xs text-gray-500">{details}</div>
              </div>
              <div className="flex items-center gap-4 px-4 pb-5 md:pb-0">
                <div>
                  <Edit
                    className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer"
                    onClick={() => fetchByPerkById(id)}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => popUpDeleteModal(id)}
                >
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    viewBox="0 0 384 384"
                    fill="crimson"
                  >
                    <g>
                      <g>
                        <g>
                          <path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z" />
                          <polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333 			" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default PreksLists;
