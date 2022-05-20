import React, { useEffect, useState } from "react";
import calendar from "../../assets/images/icons/calendar.svg";
import axiosInstance from "../../api/axiosInstance";
import whiteLogo from "../../assets/images/logo/logo-white.svg";
import { Link } from "react-router-dom";
const LatestBlogSlider = ({ gapBetweenSlides = 10 }) => {
  const Monthdate = [
    "January",
    "February",
    "march",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/blog/all-list/`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {blogs.map((blog, index) => {
        const { title, image, created, slug } = blog;
        return (
          <Link
            to={`/allblogs/blog/${slug}`}
            key={index}
            onClick={() => window.scrollTo(0, 0)}
            style={{
              marginRight:
                blogs.length - 1 > index ? `${gapBetweenSlides}px` : "",
              width: 250,
            }}
            className="flex flex-shrink-0 h-20 rounded-lg bg-gray-100 gap-2 text-left"
          >
            <div>
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-full w-24 bg-cover object-cover"
                />
              ) : (
                <img
                  src={whiteLogo}
                  alt="Uni And College Logo"
                  className="h-full w-40 gradient"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm leading-4 font-semibold pr-2 line-clamp-2">
                {title}
              </div>
              <div className="text-xs text-gray-500 flex mt-2 gap-2">
                <div>
                  <img src={calendar} alt="" height="15" width="15" />
                </div>
                <div>
                  {created.split("T")[0].split("-")[0]}{" "}
                  {Monthdate[created.split("T")[0].split("-")[1] - 1]}{" "}
                  {created.split("T")[0].split("-")[2]}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default LatestBlogSlider;
