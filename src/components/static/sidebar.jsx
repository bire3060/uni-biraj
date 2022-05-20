import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.svg";
import { useDispatch } from "react-redux";
import { AUTHENTICATION_POPUP_SHOW } from "../../redux/actions/actionsTypes";

const Sidebar = ({ sidebarItems, toggled, setToggled, loggedIn, role }) => {
  const changeToggled = () => {
    setToggled(false);
    window.scrollTo(0, 0);
  };
  const dispatch = useDispatch();
  return (
    <div className="fixed z-20">
      <div
        className={`h-screen w-full fixed left-0 top-0 bg-black bg-opacity-20 ${
          toggled ? "" : "hidden"
        }`}
        onClick={() => setToggled(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-screen z-20 py-10 bg-white text-black transition-all duration-500 overflow-hidden ${
          toggled ? "w-72" : "w-0"
        }`}
      >
        <div className="w-72 px-8 text-black ">
          <Link to="/" onClick={() => setToggled(false)}>
            <img src={logo} alt="Uni and Colleges logo" className="w-40" />
          </Link>
          <div className="space-y-2 flex flex-col my-6">
            {sidebarItems.map((item, index) => {
              const { label, url } = item;
              return (
                <NavLink
                  to={url}
                  key={index}
                  onClick={changeToggled}
                  activeClassName="text-pink4"
                >
                  {label}
                </NavLink>
              );
            })}
          </div>
          {loggedIn &&
            (role === "SA" ||
              role === "AD" ||
              role === "AM" ||
              role === "IN" ||
              role === "OI" ||
              role === "CO") && (
              <Link
                to="/dashboard"
                className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer mt-4"
                // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
              >
                Dashboard
              </Link>
            )}
          {loggedIn && role === "ST" && (
            <Link
              to="/student-dashboard/"
              className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer mt-4"
              // onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
            >
              Profile
            </Link>
          )}
          {!loggedIn && (
            <span
              className="bg-pink4 text-white px-4 py-2 rounded-full cursor-pointer mt-4"
              onClick={() => dispatch({ type: AUTHENTICATION_POPUP_SHOW })}
            >
              Sign in
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
