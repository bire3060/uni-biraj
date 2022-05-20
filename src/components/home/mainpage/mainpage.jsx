import React from "react";
import Navbar from "../static/navbar";
import CoursesAndUniversitiesForm from "./courses-and-universities-form";
import headerImage1 from "../../../assets/images/home/mainpage/Home-header-img1.jpg";
import headerImage2 from "../../../assets/images/home/mainpage/Home-header-img2.jpg";
import headerImage3 from "../../../assets/images/home/mainpage/Home-header-img3.jpg";
import headerImage4 from "../../../assets/images/home/mainpage/Home-header-img4.jpg";
import headerImage5 from "../../../assets/images/home/mainpage/Home-header-img5.jpg";

const images = [
  {
    classes: "mt-10",
    img: [headerImage1],
  },
  {
    classes: "-mt-10",
    img: [headerImage2, headerImage3],
  },
  {
    classes: "",
    img: [headerImage5, headerImage4],
  },
];
const MainPage = ({ loggedIn, role }) => {
  return (
    <div className="uni-homepage relative z-10 bg-gray1">
      <Navbar loggedIn={loggedIn} role={role} />
      <div className="flex justify-between px-4 py-10 md:py-16 lg:py-20 md:px-8 lg:px-16 2xl:px-24 lg:space-x-10 h-full">
        <div className="space-y-6 w-full xl:w-100 xl:flex-shrink-0">
          <div className="text-3xl md:text-4xl text-white font-bold">
            Access to top courses and job-relevant skills
          </div>
          <CoursesAndUniversitiesForm />
        </div>
        <div className="hidden lg:flex space-x-4">
          {images.map((image, index) => {
            const { img, classes } = image;
            return (
              <div key={index} className={classes + " space-y-4"}>
                {img.map((i, index) => (
                  <div
                    className="rounded-md w-40 h-48 2xl:w-48 2xl:h-64 overflow-hidden"
                    key={index}
                  >
                    <img
                      src={i}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
