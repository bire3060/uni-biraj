import React, { useState, useEffect } from "react";
// import { SearchField } from "../../common/input-field";
// import Proceed from "../common/proceed";
// import Header from "../common/header";
import axiosInstance from "../../../api/axiosInstance";
// import { useDispatch } from "react-redux";
// import { ADD_GET_STARTED_FILTER } from "../../../redux/actions/getStartedType";
import "../../../slider/get-started-country/getStarted.css";

const MajorPersue = ({ setCatId }) => {
  // const [search, setSearch] = useState("");
  // const dispatch = useDispatch();
  const [courseCategories, setcourseCategories] = useState([]);
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setcourseCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setCategory = (data) => {
    // dispatch({
    //   type: ADD_GET_STARTED_FILTER,
    //   payload: data.id,
    //   property: "category_started",
    // });
    setCatId(data.id);
    // setActive("studyMode");
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCategoryList(signal);
    return () => {
      controller.abort();
    };
  }, []);
  const scrollToTop = () => window.scrollTo(0, 0);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 text-sm gap-4 text-gray7">
      {courseCategories.map((category, index) => {

        const { title, image } = category;
        return (
          <button
            key={index}
            className="getStartedBorder p-2 border border-gray3 bg-white rounded-md flex items-center justify-between transition-all duration-500 hover:bg-pink-200 hover:border-pink1 overflow-hidden cursor-pointer "
            onClick={() => {
              setCategory(category);
              scrollToTop();
            }}
          >
            <div>{title}</div>
            <div>
              <img src={image} alt="" className="w-5" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MajorPersue;
