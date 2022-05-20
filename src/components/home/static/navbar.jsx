import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTHENTICATION_POPUP_SHOW } from "../../../redux/actions/actionsTypes";
import Sidebar from "../../static/sidebar";
import whiteLogo from "../../../assets/images/logo/logo-white.svg";
import menuSvg from "../../../assets/images/common/hamburger-menu-white.svg";

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
  const [toggled, setToggled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

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

  return (
    <div className="flex justify-between items-center w-full h-full text-white p-4 md:px-8 lg:px-16 2xl:px-24 py-6">
      <Link to="/">
        <img src={whiteLogo} alt="Uni and colleges logo" className="w-40" />
      </Link>
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
          <div className="flex items-center space-x-4 text-sm font-semibold">
            {rightHeaders.map((header, index) => {
              const { label, url } = header;
              return (
                <Link
                  key={index}
                  to={url}
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
                </Link>
              );
            })}
            {loggedIn &&
              (role === "SA" ||
                role === "AD" ||
                role === "IN" ||
                role === "AM" ||
                role === "OI" ||
                role === "CO") && (
                <Link
                  to="/dashboard"
                  className="bg-white text-black px-4 py-2 rounded-full cursor-pointer"
                  // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
                >
                  Dashboard
                </Link>
              )}
            {loggedIn && role === "ST" && (
              <Link
                to="/student-dashboard/"
                className="bg-white text-black px-4 py-2 rounded-full cursor-pointer"
                // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
              >
                Profile
              </Link>
            )}
            {!loggedIn && (
              <span
                className="bg-white text-black px-4 py-2 rounded-full cursor-pointer"
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
