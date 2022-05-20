import React from "react";
import { useDispatch } from "react-redux";
import IconManager from "../../../common/IconManager";
import { IMAGE_REMOVE } from "../../../../redux/actions/actionsTypes";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { url } from "../../../../api/axiosInstance";
const ImgSliderData = ({ index, title, file, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    axiosInstance
      .delete(`/institutes/gallery/update/${id}`)
      .then((res) => {
        //tostify delete
        toast.error("Delete Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: IMAGE_REMOVE,
          payload: {
            index: index,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(file);
  return (
    <div className="w-52 h-40 flex-shrink-0 shadow-xl">
      <div className="w-full h-32 relative ">
        {/* <div className="w-7 cursor-pointer flex items-center justify-center bg-blue-900 absolute top-1 right-10 h-7 rounded-full">
          <IconManager icon="Edit" className="w-4 h-4 text-white" />
        </div> */}
        <div className="w-7 cursor-pointer flex items-center justify-center crimson absolute top-1 right-1 h-7 rounded-full">
          <IconManager
            icon="Delete"
            className="w-4 h-4 text-white"
            onClick={handleDelete}
          />
        </div>
        <img src={file} alt="" className="w-full h-full" />
      </div>
      <div className="text-center">
        <div className=" text-lg font-medium truncate">{title}</div>
      </div>
    </div>
  );
};
export default ImgSliderData;
