import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AUTHENTICATION_POPUP_SHOW } from "../../redux/actions/actionsTypes";
import Sidebar from "./sidebar";
import logo from "../../assets/images/logo/logo.svg";
import menuSvg from "../../assets/images/common/hamburger-menu.svg";
import {
  changingInput,
  handleHeaderInput,
} from "../../redux/actions/HeaderSearch";
import { isChangingHeaderInput } from "../../redux/actions/HeaderSearch";
import { currentButtonReset } from "../../redux/actions/currentButtonReset";
import { useLocation } from "react-router-dom";

// import { FaTimes } from "react-icons/fa";
// import { handleHeaderReset } from "../../redux/actions/HeaderSearch";

const middleHeaders = [
  {
    label: "Courses",
    url: "/courses",
  },
  {
    label: "Universities",
    url: "/universities",
  },
  {
    label: "Student Perks",
    url: "/perks",
  },
];

const rightHeaders = [
  {
    label: "Mentors",
    url: "/allmentors",
  },
  {
    label: "Jobs & Offers",
    url: "/alljobs",
  },
  {
    label: "Blogs",
    url: "/allblogs",
  },
];

const Navbar = ({ loggedIn, role }) => {
  const dispatch = useDispatch();
  // const { isReset } = useSelector((state) => state.headerFilter);
  const location = useLocation();

  const { isChanging } = useSelector((state) => state.headerFilter);

  const [toggled, setToggled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [searchToggle, setSearchToggle] = useState(false);
  // const [headerInputVal, setHeaderInputVal] = useState("");
  // const [resetCourse, setResetCourse] = useState(false);

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (width < 1024 && innerWidth > 1023) {
      setWidth(innerWidth);
    } else if (width > 1023 && innerWidth < 1024) {
      setWidth(innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // hide the search bar in small screen
  // const searchResizeHandler = () => {
  //   if (window.innerWidth < 1250) {
  //     setSearchToggle(true);
  //   } else {
  //     setSearchToggle(false);
  //   }
  // };

  // hide the search bar in small screen
  // useEffect(() => {
  //   window.addEventListener("resize", searchResizeHandler);
  //   return () => {
  //     window.removeEventListener("resize", searchResizeHandler);
  //   };
  // });

  const navCourseSearchHandler = (e) => {
    e.preventDefault();
    // dispatch(isChangingHeaderInput(true));
    dispatch(currentButtonReset(1));
    dispatch(handleHeaderInput(isChanging));
  };

  return (
    <div className="flex justify-between items-center bg-white text-gray7 p-4 md:px-8 lg:px-16 2xl:px-24 py-6">
      <div className="flex space-x-6 items-center">
        <Link to="/">
          <img src={logo} alt="Uni and colleges logo" className="w-40" />
        </Link>

        {/* course search bar goes here */}
        {window.location.pathname === "/courses" && !searchToggle && (
          <div className="xl:flex justify-center hidden">
            <div className="relative w-60">
              <form onSubmit={navCourseSearchHandler}>
                <div className="relative">
                  <input
                    list="courses"
                    id="courses-choice"
                    name="courses-choice"
                    value={isChanging}
                    onChange={(e) => dispatch(changingInput(e.target.value))}
                    className="rounded-full border-2 pr-12 py-2 pl-5 w-full focus:border-gray-300 transition-all duration-300"
                    placeholder="Enter course name..."
                  />
                  {/* <div
                    className="absolute text-gray-600 cursor-pointer right-12"
                    style={{ top: "15px" }}
                    onClick={courseResetHandler}
                  >
                    <FaTimes />
                  </div> */}
                </div>
                <button
                  type="submit"
                  className="absolute bg-pink4 text-white top-1/2 h-9 w-9 rounded-full right-1 cursor-pointer flex items-center justify-center"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <svg
                    viewBox="0 0 512.005 512.005"
                    fill="currentColor"
                    className="w-5"
                  >
                    <g>
                      <g>
                        <path
                          d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              </form>

              {/* <datalist id="courses">
            {Array.isArray(slides) &&
              slides.map((cat, index) => {
                return <option value={cat.title} key={index} />;
              })}
          </datalist> */}
            </div>
          </div>
        )}
      </div>

      {width > 1023 && (
        <>
          <div className="space-x-4 text-sm font-semibold">
            {middleHeaders.map((header, index) => {
              const { label, url } = header;
              return (
                <Link key={index} to={url}>
                  {label}
                </Link>
              );
            })}
            {loggedIn && role === "ST" && <Link to="/enroll">Enroll</Link>}
          </div>

          <div className="space-x-4 text-sm font-semibold">
            {rightHeaders.map((header, index) => {
              const { label, url } = header;
              return (
                <a
                  key={index}
                  href={window.location.origin + url}
                  onClick={() => {
                    document.getElementsByTagName(
                      "html"
                    )[0].style.scrollBehavior = "smooth";

                    setTimeout(() => {
                      document.getElementsByTagName(
                        "html"
                      )[0].style.scrollBehavior = "auto";
                    }, 1000);
                  }}
                >
                  {label}
                </a>
              );
            })}
            {loggedIn &&
              (role === "SA" ||
                role === "AD" ||
                role === "AM" ||
                role === "IN" ||
                role === "OI" ||
                role === "CO") && (
                <Link
                  to="/dashboard"
                  className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer"
                  // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
                >
                  Dashboard
                </Link>
              )}
            {loggedIn && role === "ST" && (
              <Link
                to="/student-dashboard/"
                className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer"
                // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
              >
                Profile
              </Link>
            )}
            {!loggedIn && (
              <span
                className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer"
                onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
              >
                Sign in
              </span>
            )}
          </div>
        </>
      )}
      {width < 1024 && (
        <>
          <div className="cursor-pointer" onClick={() => setToggled(true)}>
            <img src={menuSvg} alt="Hamburger Menu" className="w-8" />
          </div>
          <Sidebar
            sidebarItems={[...middleHeaders, ...rightHeaders]}
            toggled={toggled}
            setToggled={setToggled}
            loggedIn={loggedIn}
            role={role}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
