import React from "react";
import { Link } from "react-router-dom";
import matchMakerImage from "../../../assets/images/home/Personalised-Matchmaker.svg";
import { useDispatch } from "react-redux";
import { REMOVE_HOME_COURSES_FILTER } from "../../../redux/actions/home_page_course_filter";
const PersonalizedMatchMaker = () => {
  const scrollToTop = () => window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const handleClick = () => {
    window.scrollTo(0, 0);
    dispatch({ type: REMOVE_HOME_COURSES_FILTER });
  };
  return (
    <div className="max-w-7xl mx-auto lg:flex lg:items-center rounded-xl border border-gray-300 personalized-matchmaker-container">
      <div className="p-10 space-y-3 flex-1">
        <div className="medium-heading">
          Uni & Colleges Personalized Matchmaker
        </div>
        <div className="text-sm">
          Tell us what you want and sit back and let us short list the colleges
          and universities courses and personalised offers for you.
        </div>
      </div>
      <div className="lg:flex lg:items-center">
        <div className="">
          <img
            src={matchMakerImage}
            alt=""
            className="matchmaker-image w-72 mx-auto lg:h-full lg:mr-20"
          />
        </div>
        <div className="p-10">
          <Link
            to="/get-started"
            onClick={() => {
              handleClick();
              scrollToTop();
            }}
            className="bg-pink4 py-2 px-6 text-center rounded-full text-white hover:bg-pink5 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedMatchMaker;
