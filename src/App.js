import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// components
import CompareCourses from "./components/compare-courses/compare-courses";
import Courses from "./components/courses/courses";
import Home from "./components/home/home";
import Footer from "./components/static/footer";
import GetStarted from "./components/get-started/get-started";
import EmailVerify from "./components/authentication/email-verification/EmailVerify";
import AllMentors from "./components/home/tak-to-mentor/AllMentors";
import AllJobs from "./components/home/student-jobs/AllJobs";
import AllBlog from "./components/home/latest-blog/AllBlog";
import BlogDetails from "./components/home/latest-blog/BlogDetails";
import AllInstitutions from "./components/home/best-universities-and-colleges/AllInstitutions";
import InstitutionDetail from "./components/home/best-universities-and-colleges/InstitutionDetail";
import Enroll from "./components/home/enroll/Enroll";
import JobsDetails from "./components/home/student-jobs/JobDetails";
import Notfound from "./components/common/Notfound";
import Maintanance from "./components/common/Maintanance";
import CoursesDetail from "./components/courses/CoursesDetail";
import AllPreks from "./components/home/Home_preks/AllPreks";
import ContactUs from "./components/common/ContactUs";
import AboutUs from "./components/common/AboutUs";
import StudentEssential from "./components/common/StudentEssential";
import StudentTips from "./components/common/StudentTips";
import EnrichingYourSkills from "./components/common/EnrichingYourSkills";
import WhatToPack from "./components/common/WhatToPack";
import Engineering from "./components/common/Engineering";
import TopDestinations from "./components/common/TopDestinations";
import PreDepartureSupport from "./components/common/PreDepartureSupport";
import DealingWithStress from "./components/common/DealingWithStress";
import Faq from "./components/common/Faq";
import Help from "./components/home/Help/help";
import Privacy from "./components/home/Privacy/privacy";
import Terms from "./components/home/Terms/Terms";
import ContactInfo from "./components/common/ContactInfo";
import UserAgreement from "./components/common/UserAgreement";
// import axiosInstance from "./api/axiosInstance";
import { useHistory } from "react-router-dom";
import { changingInput, handleHeaderInput } from "./redux/actions/HeaderSearch";
import { useDispatch } from "react-redux";
import AllPerksDetails from "./components/home/student-perks-and-gift/AllPerksDetails";

const App = ({ loggedIn, role }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname != "/courses") {
        dispatch(handleHeaderInput(""));
        dispatch(changingInput(""));
      }
    });
  }, [history]);

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/courses"
          render={(props) => (
            <Courses loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/courses/:slug"
          render={(props) => (
            <CoursesDetail loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/compare-courses"
          render={(props) => (
            <CompareCourses loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/api/user/email-verify/:token"
          render={(props) => (
            <EmailVerify loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/get-started"
          render={(props) => (
            <GetStarted loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/allmentors"
          render={(props) => (
            <AllMentors loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        {/* student perks */}
        {/* <Route
          exact
          path="/student-perks"
          render={(props) => (
            <StudentPerks loggedIn={loggedIn} role={role} {...props} />
          )}
        /> */}
        <Route
          exact
          path="/allmentors/:id"
          render={(props) => (
            <AllMentors loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/perks"
          render={(props) => (
            <AllPreks loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/perks/all-perks/:id"
          render={(props) => (
            <AllPerksDetails loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/alljobs"
          render={(props) => (
            <AllJobs loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/enroll"
          render={(props) => (
            <Enroll loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/universities"
          render={(props) => (
            <AllInstitutions loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/universities/:slug"
          render={(props) => (
            <InstitutionDetail loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/allblogs/"
          render={(props) => (
            <AllBlog loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/allblogs/blog/:id"
          render={(props) => (
            <BlogDetails loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route
          exact
          path="/allJobs/job/:id"
          render={(props) => (
            <JobsDetails loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        <Route exact path="/maintanance" render={() => <Maintanance />} />

        {/* about us  */}
        <Route
          exact
          path="/about-us"
          render={(props) => (
            <AboutUs loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        {/* contact us */}
        <Route
          exact
          path="/contact-info"
          render={(props) => (
            <ContactInfo loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* contact us */}
        <Route
          exact
          path="/contact-us"
          render={(props) => (
            <ContactUs loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* Student Essentail */}
        <Route
          exact
          path="/student-essentials"
          render={(props) => (
            <StudentEssential loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* Student Tips */}
        <Route
          exact
          path="/study-tips"
          render={(props) => (
            <StudentTips loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* Enriching your skills */}
        <Route
          exact
          path="/enriching-your-skills"
          render={(props) => (
            <EnrichingYourSkills loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* what to pack */}
        <Route
          exact
          path="/what-to-pack"
          render={(props) => (
            <WhatToPack loggedIn={loggedIn} role={role} {...props} />
          )}
        />
        {/* engineering */}
        <Route
          exact
          path="/engineering"
          render={(props) => (
            <Engineering loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* top destinations */}
        <Route
          exact
          path="/top-destinations"
          render={(props) => (
            <TopDestinations loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* pre departure support */}
        <Route
          exact
          path="/pre-departure-support"
          render={(props) => (
            <PreDepartureSupport loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* Dealing with stress */}
        <Route
          exact
          path="/dealing-with-stress"
          render={(props) => (
            <DealingWithStress loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* faq */}
        {/* <Route
          exact
          path="/faqs"
          render={(props) => <Faq loggedIn={loggedIn} role={role} {...props} />}
        /> */}

        {/* faq's  */}
        <Route
          exact
          path="/faqs"
          render={(props) => <Faq loggedIn={loggedIn} role={role} {...props} />}
        />

        {/* help  */}
        <Route
          exact
          path="/help"
          render={(props) => (
            <Help loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* privacy  */}
        <Route
          exact
          path="/privacy-policy"
          render={(props) => (
            <Privacy loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* terms  */}
        <Route
          exact
          path="/terms-of-service"
          render={(props) => (
            <Terms loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        {/* user agreement */}
        <Route
          exact
          path="/user-agreement"
          render={(props) => (
            <UserAgreement loggedIn={loggedIn} role={role} {...props} />
          )}
        />

        <Route exact path="" render={() => <Notfound />} />
      </Switch>

      <Footer role={role} />
    </div>
  );
};

export default App;
