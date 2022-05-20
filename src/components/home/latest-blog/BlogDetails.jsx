import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Navbar from "../../static/navbar";
import Preloader from "../../get-started/common/PreLoader";

const BlogDetails = ({ loggedIn, role }) => {
  const { id } = useParams();
  const [getIndividualBlog, setGetIndividualBlog] = useState({});
  const [load, setLoad] = useState(true);

  const getBlog = () => {
    axiosInstance
      .get(`/blog/detail/${id}/`)
      .then((res) => {
        setGetIndividualBlog(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  };

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line
  }, []);

  const { image, title, description, author, created, category } =
    getIndividualBlog;

  return (
    <>
      {load && <Preloader />}
      <div>
        <div>
          <Navbar loggedIn={loggedIn} role={role} />
        </div>
        <div className="px-4 py-10 md:px-10 lg:px-24 bg-gray2">
          <div className="max-w-6xl w-full mx-auto">
            <div>
              <img
                src={image}
                alt="blog_image"
                className="rounded-lg w-full bg-cover object-cover"
                style={{ height: 400 }}
              />
            </div>

            <div className="md:text-4xl text-3xl font-bold text-gray-800 mt-8">
              {title}
            </div>

            <div className="mt-14 text-gray-700 font-semibold tracking-wide">
              {category && category.title}
            </div>

            <div
              className="mt-4 text-gray-500 h-full md:text-base tracking-wide text-sm"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>

            <div className="mt-8">
              <div className="bg-gray-200 inline px-4 p-1 rounded-md text-sm font-semibold text-gray-600">
                {author}
              </div>
              <div className="text-sm font-semibold text-gray-500 mt-2">
                <div>{created && created.split("T")[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
