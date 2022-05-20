import React from "react";
import CourseCategoryAndMatchMaker from "./course-category-and-matchmaker/course-category-and-matchmaker";
import Faqs from "./faqs/faqs";
import MainPage from "./mainpage/mainpage";
import ExploreCountry from "./explore-country/explore-country";
import ClaimFreeGift from "../common/claim-free-gift";
import SubscribeButton from "../common/subscribe-button";
import TalkToMentor from "./tak-to-mentor/talk-to-mentor";
import StudentJobs from "./student-jobs/student-jobs";
import LatestBlog from "./latest-blog/latest-blog";
import BestUniversitiesAndColleges from "./best-universities-and-colleges/best-universities-and-colleges";
import "../../assets/css/home.css";
import StudentPreksAndGift from "../home/student-perks-and-gift/student-perks-and-gift";
// import Loader from "react-loader-spinner";

const Home = ({ loggedIn, role }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SubscribeButton />

      <MainPage loggedIn={loggedIn} role={role} />
      <CourseCategoryAndMatchMaker />
      <ExploreCountry />
      <BestUniversitiesAndColleges />
      <StudentPreksAndGift />
      <TalkToMentor />
      <StudentJobs />
      <LatestBlog />
      <div className="bg-gray1 px-4 py-10 md:py-16 lg:py-20 md:px-10 lg:px-24 space-y-10 lg:space-y-20">
        <Faqs />
        <ClaimFreeGift />
      </div>
    </div>
  );
};

export default Home;
