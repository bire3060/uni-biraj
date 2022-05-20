import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./static/navbar";
import Sidebar from "./static/sidebar";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import Mycourses from "./MyCourses/MyCourses";
import AppliedCourses from "./AppliedCourses/MyCourses";
import StudentDetails from "./Details/Details";
import whislist from "./Wishlist/Wishlist";
import Account from "./Account/Account";
import StudentInquiry from "./Inquiry/Inquiry";
import Application from "./Application/Application";
import OnlineClass from "./OnlineClass/OnlineClass";
import Schudule from "./OnlineClass/Schudule";

function DashboardUrlManagement() {
  const [width, setWidth] = useState(window.innerWidth);
  const [toggled, setToggled] = useState(width > 1023 ? true : false);
  const [isSide, setIsSide] = useState(false);
  const handleWidth = () => {
    const innerWidth = window.innerWidth;

    // Only change width if device is changed from 768px or 1024px
    if (
      (innerWidth < 768 && width > 768) ||
      (innerWidth < 1024 && width > 1023) ||
      (width < 768 && innerWidth > 767) ||
      (width < 1024 && innerWidth > 1023)
    ) {
      setWidth(innerWidth);
    }

    if (width < 1024 && innerWidth > 1023) {
      setToggled(true);
    } else if (width > 1023 && innerWidth < 1024) {
      setToggled(false);
    }
  };

  const handleSidebarLinkClick = () => {
    window.scrollTo(0, 0);
    if (width < 1024) {
      setToggled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  });

  useEffect(() => {
    if (toggled && width < 1024) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [toggled, width]);

  return (
    <div className="">
      <NavigationBar
        width={width}
        toggled={toggled}
        handleToggleIconClick={() => {
          setToggled(!toggled);
          setIsSide(!isSide);
        }}
      />
      <div className="flex">
        <Sidebar
          width={width}
          toggled={toggled}
          handleSidebarLinkClick={handleSidebarLinkClick}
          setToggled={setToggled}
          isSide={isSide}
        />
        <div
          className={`main-container mt-16 flex-1 bg-gray-100 transition-all duration-300 text-gray-700 leading-8 ${
            toggled && width > 1023 ? "ml-64" : "ml-18"
          }`}
        >
          <div className="flex-1">
            <Switch>
              <Route
                exact
                path="/student-dashboard"
                component={StudentDashboard}
              />
              <Route
                exact
                path="/student-dashboard/details"
                component={StudentDetails}
              />
              <Route
                exact
                path="/student-dashboard/my-courses"
                component={Mycourses}
              />
              <Route
                exact
                path="/student-dashboard/applied-courses"
                component={AppliedCourses}
              />
              <Route
                exact
                path="/student-dashboard/wishlist"
                component={whislist}
              />
              <Route
                exact
                path="/student-dashboard/application"
                component={Application}
              />
              <Route
                exact
                path="/student-dashboard/online-class/notes"
                component={OnlineClass}
              />
              <Route
                exact
                path="/student-dashboard/online-class/Schudule"
                component={Schudule}
              />
              <Route
                exact
                path="/student-dashboard/account"
                component={Account}
              />
              <Route
                exact
                path="/student-dashboard/inquiry"
                component={StudentInquiry}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUrlManagement;
