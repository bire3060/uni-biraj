import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Preloader from "../../get-started/common/PreLoader";
import Navbar from "../../static/navbar";

const JobsDetails = ({ loggedIn, role }) => {
  const { id } = useParams();
  const [getIndividualBlog, setGetIndividualBlog] = useState({});
  const [load, setLoad] = useState(true);
  const getBlog = () => {
    axiosInstance
      .get(`/job/detail/${id}/`)
      .then((res) => {
        setGetIndividualBlog(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line
  }, []);

  const { title, description, author, created, tags, category, company } =
    getIndividualBlog;

  return (
    <div>
      {load && <Preloader />}
      {Object.keys(getIndividualBlog).length !== 0 && (
        <div>
          <div>
            <Navbar loggedIn={loggedIn} role={role} />
          </div>
          <div className="px-4 py-10 md:px-10 lg:px-24 bg-gray2">
            <div className="max-w-6xl w-full mx-auto">
              <div>
                <img
                  src={company.image}
                  alt="blog_image"
                  className="rounded-lg w-full bg-cover object-cover"
                  style={{ height: 400 }}
                />
              </div>

              <div className="md:text-4xl text-3xl font-bold text-gray-800 mt-8">
                {title}
              </div>
              <div className="py-2 w-full px-2">
                <ul>
                  <li className=" inline-block mb-1 mr-1 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-500">
                    {tags}
                  </li>
                </ul>
              </div>
              <div className="mt-6 text-gray-700 font-semibold tracking-wide">
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
      )}
    </div>
  );
};

export default JobsDetails;
