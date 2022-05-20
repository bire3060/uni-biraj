import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Edit from "../../../assets/icons/edit";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";
import Loader from "react-loader-spinner";
import DataLoader from "../../common/Loader";
function BlogLists({ fetchBlogdataBySlug }) {
  const [blogLists, setblogLists] = useState([]);
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [publishLoader, setPublishLoaser] = useState(false);
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setDeleteUrl(`/blog/delete/${slug}/`);
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
      .get(`/blog/admin-list/?page=1`, { signal })
      .then((res) => {
        setblogLists(res.data);
        setMainLoader(false);
      })
      .catch((err) => {
        setMainLoader(false);
        console.error(err);
      });
  };
  const handlePublish = (publish, slug) => {
    let formData = new FormData();
    formData.append("title", publish.title);
    formData.append("author", publish.author);
    formData.append("is_photo_feture", publish.is_photo_feture);
    formData.append("description", publish.description);
    // formData.append("image", publish.blogImage);
    formData.append("category", publish.category);
    formData.append("status", publish.status === "PH" ? "DF" : "PH");
    axiosInstance
      .patch(`blog-public/update/${slug}/`, formData)
      .then((res) => {
        fetchBlogLists();
        setTimeout(() => {
          setPublishLoaser(false);
        }, 1000);
      })
      .catch((err) => {
        setPublishLoaser(false);
        console.error(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchBlogLists(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {mainLoader && (
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
      {publishLoader && (
        <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
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

      {blogLists.length === 0 && !mainLoader && (
        <div className="text-red-500 pb-12 mt-3 md:mt-5 flex justify-center">
          No Data Available
        </div>
      )}

      {/*-------------*/}
      {blogLists.length > 0 &&
        Array.isArray(blogLists) &&
        blogLists.map((blog, index) => {
          const { title, author, slug, status } = blog;

          return (
            <div
              className="mt-10 shadow-xl max-w-3xl space-x-10 items-center w-full pb-4 justify-between p-1 sm:px-4 flex"
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
                  id={`${slug}`}
                  onClick={(e) => {
                    setPublishLoaser(true);
                    window.scroll({
                      top: 0,
                    });
                    handlePublish(blog, slug);
                    // setTimeout(()=>{
                    //   setPublishLoaser(false)

                    // },100)
                  }}
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
                    onClick={() => fetchBlogdataBySlug(slug)}
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
    </>
  );
}

export default BlogLists;
