import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import Edit from "../../../../assets/icons/edit";
import DeleteAlertModal from "../../../common/DeleteAlertModal";
import DeleteModal from "../../../common/DeleteModal";
import DataLoader from "../../../common/Loader";
import Pagination from "../../../common/Pagination";
function JobLists({ fetchJobdataBySlug }) {
  const [blogLists, setblogLists] = useState([]);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [page, setPage] = useState("");
  const [currentButton, setCurrentButton] = useState(1);
  const [butttonLoader, setButtonLoader] = useState(true);

  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setDeleteUrl(`/job/delete/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    fetchBlogLists();
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
  const fetchBlogLists = async (signal) => {
    axiosInstance
      .get(`/job/admin/list/?page=${currentButton}`, { signal })
      .then((res) => {
        setblogLists(res.data.results);
        setPage(res.data.total_pages);
        setButtonLoader(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePublish = (publish, slug) => {
    let formData = new FormData();
    formData.append("title", publish.title);
    formData.append("author", publish.author);
    formData.append("company", publish.company);
    formData.append("description", publish.description);
    formData.append("vaccany_open", publish.vaccany_open);
    formData.append("vaccany_close", publish.vaccany_close);
    formData.append("tags", publish.tags);
    formData.append("category", publish.category);
    formData.append("status", publish.status === "PH" ? "DF" : "PH");
    axiosInstance
      .put(`/job/update/${slug}/`, formData)
      .then((res) => {
        fetchBlogLists();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchBlogLists(signal);
    return () => {
      controller.abort();
    };
  }, [page, currentButton]);

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

      <div className="flex items-center justify-center text-xl">
        {butttonLoader && (
          <div className="flex items-center justify-center py-6 space-x-3">
            <div className="text-xl">Loading</div>
            <div>
              <DataLoader />
            </div>
          </div>
        )}
      </div>

      {blogLists.length === 0 && !butttonLoader && (
        <div className="w-full flex justify-center text-primary text-lg mt-6">
          No data to show
        </div>
      )}

      {/*-------------*/}
      {blogLists.length > 0 &&
        Array.isArray(blogLists) &&
        blogLists.map((blog, index) => {
          const { title, author, slug, status } = blog;
          return (
            <div
              className="mt-10 shadow-xl  max-w-4xl w-full pb-4 justify-between p-1 sm:px-4 flex space-x-10"
              key={index}
            >
              <div className="flex-1">
                <div className="text-lg font-medium">{title}</div>
                <div className="text-xs text-gray-500">{author}</div>
              </div>
              <div>
                <div className="text-lg font-medium">Public</div>
                <label
                  className="switchc"
                  onClick={() => handlePublish(blog, slug)}
                >
                  <input
                    type="checkbox"
                    checked={status === "PH" ? true : ""}
                    readOnly
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>

              <div className="flex items-center  mt-5 gap-4">
                <div>
                  <Edit
                    className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer"
                    onClick={() => fetchJobdataBySlug(slug)}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => popUpDeleteModal(slug)}
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

      {/* pagination */}
      <div className="mt-10">
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
}

export default JobLists;
