import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Preloader from "../../get-started/common/PreLoader";
import Navbar from "../../static/navbar";
import "./AllBlog.css";
import pageNotFound from "../../../assets/images/common/404.jpg";
import blog from "../../../assets/images/home/blog.jpg";
import Pagination from "../../common/Pagination";
const AllBlog = ({ loggedIn, role }) => {
  const [load, setLoad] = useState(true);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const getAllJobLists = (signal) => {
    axiosInstance
      .get(`/blog/list/?page=${currentButton}`, { signal })
      .then((res) => {
        // console.log(res.data);
        setAllBlogs(res.data.results);
        setPage(res.data.total_pages);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllJobLists(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);

  return (
    <>
      <div>
        {load && <Preloader />}
        <div>
          <Navbar loggedIn={loggedIn} role={role} />
        </div>
        <div
          className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
          style={{
            backgroundImage: `url(${blog})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
          <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-10">
            Blogs
          </span>
        </div>
        {allBlogs.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center mb-10 text-gray-700">
            <img src={pageNotFound} alt="" className="h-64 w-64" />
            <div className="text-3xl font-bold">No data is available</div>
          </div>
        ) : (
          <div className="px-4 py-6 md:px-10 lg:px-24 mt-10">
            <div className=" mx-auto">
              <div className="max-w-7xl mx-auto ">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 grid-cols-1 ">
                  {/* blog card */}
                  {allBlogs.map((blog) => {
                    const {
                      slug,
                      image,
                      title,
                      description,
                      author,
                      updated,
                      timeCreated,
                    } = blog;

                    return (
                      <Link
                        key={slug}
                        onClick={() => window.scrollTo(0, 0)}
                        to={`/allblogs/blog/${slug}`}
                        className="border rounded-md bg-white overflow-y-hidden"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-full">
                            <img
                              src={image}
                              alt="blog_image"
                              className="w-full h-44 object-cover"
                            />
                          </div>
                          <div className="text-xl py-3 font-bold text-gray-700 tracking-wide px-2 line-clamp-1 overflow-hidden h-11">
                            {title}
                          </div>
                          <div
                            className="text-xs tracking-wide text-gray-700 mt-1 line-clamp-3 px-2 h-12"
                            dangerouslySetInnerHTML={{ __html: description }}
                          ></div>
                        </div>

                        <div className="py-3">
                          <div className="font-bold text-gray-600 px-2">
                            <span className="bg-gray-200 inline px-2 p-1 rounded-md text-xs tracking-wide font-semibold text-gray-600">
                              {author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 px-2 mt-1.5 font-semibold">
                            <div className="text-xs tracking-wide ml-0.5 text-gray-500">
                              {updated.split("T")[0]}
                            </div>
                            <div>{timeCreated}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="my-10">
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

export default AllBlog;
