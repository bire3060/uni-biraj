import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { ADD_CAT_COURSE } from "../../../redux/actions/cat_course_type";
import { useHistory } from "react-router-dom";
import Pagination from "../../common/Pagination";
import Loader from "react-loader-spinner";
import DataLoader from "../../common/Loader";
const CourseCategory = () => {
  const [courseCategories, setcourseCategories] = useState([]);
  const dispatch = useDispatch();
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [loader, setLoader] = useState(true);
  const [noData, setNoData] = useState(false);
  const history = useHistory();
  const [handleScrollPagination, setHandleScrollPagination] = useState(false);
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/courses/category/list/?page=${currentButton}`, { signal })
      .then((res) => {
        // console.log(res.data);
        setLoader(false);
        setcourseCategories(res.data.results);
        setPage(res.data.total_pages);
        if (res.data.results.length === 0) {
          setNoData(true);
        }
      })
      .catch((err) => {
        setLoader(false);
        setNoData(true);
        console.log(err);
      });
  };
  const handleCatSearch = (data) => {
    // console.log(data);
    dispatch({
      type: ADD_CAT_COURSE,
      payload: data.id,
    });
    history.push("/courses");
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);

  return (
    <div className="max-w-7xl mx-auto rounded-xl text-center pt-10  space-y-5 lg:space-y-8">
      <div className="mx-auto text-center large-heading">
        Find course category that fascinates You
      </div>

      {loader && (
        <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
          <span className="text-lg">Loading</span>
          <span>
            {" "}
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

      <>
        <div className="mx-auto mt-5 text-sm text-gray7 max-w-xl">
          Pick any Course Category that you are interested in. Choose from over
          6,700 courses and Learning Paths, dozens added each week.
        </div>
        {noData && (
          <div className=" text-red-500 text-center">No Data Available</div>
        )}
        {courseCategories.length > 0 && !loader && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm gap-4 text-gray7">
            {courseCategories.map((category, index) => {
              const { title, image } = category;
              return (
                <div
                  key={index}
                  className="p-2 border border-gray3 rounded-md flex items-center justify-between transition-all duration-500 hover:bg-pink-200 hover:border-pink1 cursor-pointer"
                  onClick={() => handleCatSearch(category)}
                >
                  <div className="line-clamp-1">{title} </div>
                  <div>
                    <img src={image} alt="" className="w-5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="my-10">
          {page > 1 && (
            <Pagination
              handleScrollPagination={handleScrollPagination}
              setCurrentButton={setCurrentButton}
              currentButton={currentButton}
              page={page}
            />
          )}
        </div>
      </>

      {/* </>

      
      } */}
    </div>
  );
};

export default CourseCategory;
