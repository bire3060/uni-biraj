import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./static/navbar";
import Sidebar from "./static/sidebar";
import InstitutionsList from "./institutions/list/institutions-list";
import InstitutionAdd from "./institutions/institution-add";
import CourseAdd from "./courses/course-add";
import Blog from "./blog/blog";
import "../../assets/css/layout.css";
import "../../assets/css/Dashboard.css";
import CourseList from "./courses/list/CourseList";
import JobProvider from "./job-mgmt/job-provider";
import Job from "./job-mgmt/job-post/Job";
import jwt_decode from "jwt-decode";
import Cms from "./CMS/Cms";
import MentorBuddyAdd from "./MentorBuddy/MentorBuddy";
import MentorBuddyList from "./MentorBuddy/MentorBuddyList";
import Permission from "./settings/Permission";
import FAQList from "./FAQ/FAQList";
import FAQAdd from "./FAQ/FAQAdd";
import RegisterAdd from "./Register/RegisterAdd";
import RegisterList from "./Register/RegisterList";
import DegreeLevel from "./settings/DegreeLevel";
import Country from "./settings/Country";
import AddCategories from "./settings/AddCategories.jsx";
import CourseEnuiry from "./course_enquery/CourseEnuiry";
// import ZoomSettings from "./ZoomSetting/ZoomSettings";
import AppliedCourse from "./courses/AppliedCourse/AppliedCourse";
import AppliedCourseDetails from "./courses/AppliedCourse/AppliedCourseDetails";
import Smtp from "./Smtp/Smtp";
import ApplicationStatus from "./settings/ApplicationStatus";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PERMISSIONS_LISTS,
  ADD_PERMISSION,
  SET_ROLE_DASH,
} from "../../redux/actions/user_role_type";
import axiosInstance from "../../api/axiosInstance";
import ApplicationManeger from "./Applicationmanager/Applicationmanager/ApplicationManeger";
import Details from "./Applicationmanager/Applicationmanager/Details/Details";
import Preloader from "../get-started/common/PreLoader";
import OnlineClasses from "./settings/class/OnlineClasses";
import JobCategories from "./settings/JobCategories";
import Notes from "./Notes/Notes";
import InstituteEnquiry from "./institute_enquery/InstituteEnquiry";
import Preks from "./preks/Preks";
import ContactUs from "./ContactUs/ContactUs";
import SubscribedEmail from "./SubscribedEmail/SubscribedEmail";

function DashboardUrlManagement({ role }) {
  const dispatch = useDispatch();
  const [activepermission, setActivePermission] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [toggled, setToggled] = useState(width > 1023 ? true : false);
  const [isSide, setIsSide] = useState(false);
  const {
    courses,
    institutes,
    authuser,
    educations,
    sitesettings,
    blogsandjobs,
    // notification,
    inquery,
    permissions_list,
    permissions,
  } = useSelector((state) => state.permission);

  const allPermissions = [
    "courses",
    "institutes",
    "authuser",
    "educations",
    "sitesettings",
    "blogsandjobs",
    "notification",
    "inquery",
  ];
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

  const addPermissions = () => {
    const token = localStorage.getItem("refresh");
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
      } catch (e) {
        localStorage.clear();
      }
    }
    if (token) {
      axiosInstance
        .get(`/settings/roles-update/${decoded.user_type}`)
        .then((res) => {
          dispatch({
            type: ADD_PERMISSION,
            payload: res.data,
          });
          setActivePermission((activepermission) => !activepermission);
        });
    }
  };
  useEffect(() => {
    if (permissions_list.length === 0) {
      axiosInstance
        .get(`/settings/models-list/`)
        .then((res) => {
          dispatch({
            type: ADD_PERMISSIONS_LISTS,
            payload: res.data,
          });
          addPermissions();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (permissions.length === 0) {
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // console.log(permissions);
    for (let i = 0; i < allPermissions.length; i++) {
      for (let j = 0; j < permissions.length; j++) {
        if (allPermissions[i] === permissions[j].app_label) {
          dispatch({
            type: SET_ROLE_DASH,
            payload: allPermissions[i],
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [activepermission, permissions]);

  return (
    <>
      {permissions.length === 0 && <Preloader />}
      {permissions.length !== 0 && (
        <div>
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
              role={role}
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
              <Switch>
                {/* institute  */}
                {institutes && (
                  <Route exact path="/dashboard/" component={InstitutionAdd} />
                )}
                {institutes && (
                  <Route
                    exact
                    path="/dashboard/institution/add"
                    component={InstitutionAdd}
                  />
                )}
                {institutes && (
                  <Route
                    exact
                    path="/dashboard/institution/add/:slug"
                    component={InstitutionAdd}
                  />
                )}
                {institutes && (
                  <Route
                    exact
                    path="/dashboard/institution/list"
                    component={InstitutionsList}
                  />
                )}
                {/* institute end  */}
                {/* courses add  */}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/course/add"
                    component={CourseAdd}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/course/add/:slug"
                    component={CourseAdd}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/course/list"
                    component={CourseList}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/appliedcourse"
                    component={AppliedCourse}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/appliedcoursedetails/:id"
                    component={AppliedCourseDetails}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/applicationstatus"
                    component={ApplicationStatus}
                  />
                )}
                {/* courses end  */}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/applicationmanager"
                    component={ApplicationManeger}
                  />
                )}
                {courses && (
                  <Route
                    exact
                    path="/dashboard/applicationmanagerdetails/:id"
                    component={Details}
                  />
                )}

                {/* settings  */}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/settings/add"
                    component={AddCategories}
                  />
                )}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/settings/job-cat-add"
                    component={JobCategories}
                  />
                )}
                {educations && (
                  <Route
                    exact
                    path="/dashboard/settings/online-classes"
                    component={OnlineClasses}
                  />
                )}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/settings/permission"
                    component={Permission}
                  />
                )}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/settings/country"
                    component={Country}
                  />
                )}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/settings/degree-level"
                    component={DegreeLevel}
                  />
                )}
                {sitesettings && (
                  <Route exact path="/dashboard/faq/add" component={FAQAdd} />
                )}
                {sitesettings && (
                  <Route exact path="/dashboard/cms" component={Cms} />
                )}
                {sitesettings && (
                  <Route exact path="/dashboard/smtp" component={Smtp} />
                )}

                {sitesettings && (
                  <Route exact path="/dashboard/faq/list" component={FAQList} />
                )}

                {educations && (
                  <Route exact path="/dashboard/notes" component={Notes} />
                )}

                {/* contact us */}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/contact-us"
                    component={ContactUs}
                  />
                )}

                {/* subscribed email */}
                {sitesettings && (
                  <Route
                    exact
                    path="/dashboard/subscribed-email"
                    component={SubscribedEmail}
                  />
                )}

                {/* settings end  */}
                {/* mentor buddy  */}
                {blogsandjobs && (
                  <Route exact path="/dashboard/blog" component={Blog} />
                )}
                {blogsandjobs && (
                  <Route
                    exact
                    path="/dashboard/mentor-buddy/add/"
                    component={MentorBuddyAdd}
                  />
                )}
                {blogsandjobs && (
                  <Route
                    exact
                    path="/dashboard/mentor-buddy/add/:id"
                    component={MentorBuddyAdd}
                  />
                )}
                {blogsandjobs && (
                  <Route
                    exact
                    path="/dashboard/mentor-buddy/list"
                    component={MentorBuddyList}
                  />
                )}
                {/* job mgnt  */}
                {blogsandjobs && (
                  <Route
                    exact
                    path="/dashboard/job-management/job-provider"
                    component={JobProvider}
                  />
                )}
                {blogsandjobs && (
                  <Route
                    exact
                    path="/dashboard/job-management/job-post"
                    component={Job}
                  />
                )}
                {blogsandjobs && (
                  <Route exact path="/dashboard/perks" component={Preks} />
                )}

                {inquery && (
                  <Route
                    exact
                    path="/dashboard/course-enquiry"
                    component={CourseEnuiry}
                  />
                )}
                {inquery && (
                  <Route
                    exact
                    path="/dashboard/institute-enquiry"
                    component={InstituteEnquiry}
                  />
                )}
                {authuser && (
                  <Route
                    exact
                    path="/dashboard/register/add"
                    component={RegisterAdd}
                  />
                )}
                {authuser && (
                  <Route
                    exact
                    path="/dashboard/register/add/:id"
                    component={RegisterAdd}
                  />
                )}
                {authuser && (
                  <Route
                    exact
                    path="/dashboard/register/list"
                    component={RegisterList}
                  />
                )}
              </Switch>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardUrlManagement;
