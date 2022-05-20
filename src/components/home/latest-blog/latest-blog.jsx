import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LatestBlogSlider from "../../../slider/latest-blog/latest-blog-slider";
import CustomSlider from "../../../slider/custom-slider";
import arrow from "../../../assets/images/icons/right-arrow.svg";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";

const LatestBlog = () => {
  const [slides, setSlides] = useState([]);
  const [contentMore, setContentMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/blog/all-list/`)
      .then((res) => {
        setSlides(res.data);
        setBlogLoading(false);
        if (res.data.length >= 4) {
          setContentMore(true);
          setShowButton(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setBlogLoading(false);
      });
  }, []);

  return (
    <div className="pt-16 pb-10 " id="blogs">
      <div className="flex justify-between mb-6 max-w-7xl p-4 sm:p-8 md:p-10 mx-auto overflow-hidden lg:flex lg:space-x-16">
        <div className=" text-4xl font-medium ">Latest Blogs</div>

        {contentMore && (
          <Link
            to="/allblogs"
            onClick={() => window.scroll(0, 0)}
            className="text-sm text-pink4 font-semibold flex items-center"
          >
            <p className="ml-2 pr-2">View more</p>
            <div className="mt-0.5">
              <img src={arrow} alt="" width="10" />
            </div>
          </Link>
        )}
      </div>

      {slides.length === 0 && !blogLoading && (
        <div className="flex justify-center">No Data Available</div>
      )}

      {/* {slides.length===0&&  <div className="text-red-500 text-center">No Data  Avilable</div>} */}
      {slides.length > 0 && (
        <CustomSlider
          numberOfSlides={slides.length}
          cardwidth={250}
          comp={<LatestBlogSlider />}
          showButton={showButton}
        />
      )}

      {blogLoading && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestBlog;
