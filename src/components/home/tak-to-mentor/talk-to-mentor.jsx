import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import CustomSlider from "../../../slider/custom-slider";
import TalkToMentorSlider from "../../../slider/talk-to-mentor/talk-to-mentor-slider";
import DataLoader from "../../common/Loader";

const TalkToMentor = () => {
  const [slides, setSlides] = useState([]);
  const [contentMore, setContentMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mentorLoading, setMentorLoading] = useState(true);

  const getMentorList = (signal) => {
    axiosInstance
      .get(`/buddy-mentor/all-list/`, { signal })
      .then((res) => {
        if (res.data.length >= 4) {
          setContentMore(true);
          setShowButton(true);
        }
        setSlides(res.data);
        setMentorLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getMentorList(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="uni-footer" id="mentors">
      <div className="w-11/12 md:w-3/4 lg:w-2/5 mx-auto text-center text-white pt-10">
        <p className="text-3xl">Talk to Buddy Mentor</p>
        <p className="text-xs pt-4">
          We have more than 2500+ mentors who work closely with you to give a
          realistic viwpoint about your career goals and enable you to build a
          sucessful career.
        </p>
      </div>

      {mentorLoading && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl text-white">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      {slides.length > 0 && (
        <div className="mt-8">
          <CustomSlider
            numberOfSlides={slides.length}
            cardwidth={250}
            comp={<TalkToMentorSlider setMentorLoading={setMentorLoading} />}
            showButton={showButton}
          />
        </div>
      )}

      {contentMore && (
        <Link
          to="/allmentors"
          className="pb-12 mt-3 md:mt-5 flex justify-center"
          onClick={() => window.scroll(0, 0)}
        >
          <button className="px-4 py-2 rounded-full border border-red-500 text-red-500">
            View All {slides.length} Mentors
          </button>
        </Link>
      )}
      {slides.length === 0 && !mentorLoading && (
        <div className="text-red-500 pb-12 mt-3 md:mt-5 flex justify-center">
          No Data Available
        </div>
      )}
    </div>
  );
};

export default TalkToMentor;
{
  /* <div className="text-red-500 text-center mt-12">No Data Available</div>; */
}
