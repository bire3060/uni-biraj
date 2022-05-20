import React, { useState, useEffect } from "react";
import CustomSlider from "../../../slider/custom-slider";
import BestUniAndColSlider from "../../../slider/best-universities-and-colleges/best-universities-and-colleges-slider";
import arrow from "../../../assets/images/icons/right-arrow.svg";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
const BestUniversitiesAndColleges = () => {
  const [slide, setSlides] = useState([]);
  const [contentMore, setContentMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [uniLoading, setUniLoading] = useState(true);

  const getAllInstitution = (signal) => {
    axiosInstance
      .get(`/institutes/`, { signal })
      .then((res) => {
        if (res.data.results.length >= 8) {
          setContentMore(true);
          setShowButton(true);
        }
        setSlides(res.data.results);
        setUniLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const scrollToTop = () => window.scroll(0, 0);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllInstitution(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div id="universities" className="bg-blue-100">
      <div className="text-center text-4xl font-medium pt-16 pb-10">
        Browse from best of
        <br />
        universities and colleges
      </div>

      {uniLoading && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {slide.length === 0 && !uniLoading && (
        <div className="text-red-500 text-center">No Data Available</div>
      )}

      {slide.length > 0 && (
        <div className=" mx-auto pb-16">
          <CustomSlider
            numberOfSlides={slide.length / 2}
            cardwidth={250}
            comp={<BestUniAndColSlider />}
            showButton={showButton}
          />
        </div>
      )}

      {contentMore && (
        <div className="flex justify-center text-pink4 pb-10">
          {contentMore && (
            <Link
              to="/universities"
              onClick={scrollToTop}
              className="flex items-center"
            >
              <p className="ml-2 pr-2 font-semibold">View more</p>
              <img src={arrow} alt="" width="10" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BestUniversitiesAndColleges;
