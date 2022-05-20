import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import HamburgerMenu from "../../../assets/icons/hamburger-menu";
import IconManager from "../../common/IconManager";
import whiteUniLogo from "../../../assets/images/logo/logo-white.svg";

export default function NavigationBar({
  width,
  handleToggleIconClick,
  toggled,
}) {
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("refresh");
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
        setUsername(decoded.username);
      } catch (e) {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <div className="h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 z-10 w-full bg-blue3">
      <div className="flex items-center space-x-24">
        <Link to="/" className="h-9 overflow-hidden">
          <img src={whiteUniLogo} alt="unilogo" className="h-full" />
        </Link>
        {width > 767 && (
          <div>
            <HamburgerMenu handleClick={handleToggleIconClick} />
          </div>
        )}
      </div>
      {toggled && width < 1024 && (
        <div
          className="fixed w-full h-screen left-0 top-0 bg-black opacity-50 z-10"
          onClick={handleToggleIconClick}
        ></div>
      )}
      <div className="flex items-center space-x-5 text-gray-700">
        {width > 767 && (
          <>
            {/* <div className="h-9 overflow-hidden">
              <SearchField
                placeholder="Search something here"
                value={search}
                handleChange={(value) => setSearch(value)}
              />
            </div> */}
            {/* <div className="cursor-pointer text-white">
              <IconManager icon="Notification" />
            </div> */}
            {/* <div
              onClick={handleLogout}
              className="flex items-center px-6 py-1 text-white cursor-pointer"
            >
              <div>
                <IconManager icon="Logout" style={{ fontSize: "20px" }} />
              </div>
              <div>Logout</div>
            </div> */}
            <button
              className="relative cursor-default flex"
              onBlur={() => setShowProfile(false)}
            >
              <div
                className="cursor-pointer flex space-x-1 items-center text-white"
                onClick={() => setShowProfile(!showProfile)}
              >
                {/* <IconManager icon="Profile" /> */}
                <div
                  onClick={handleLogout}
                  className="flex items-center py-1  mr-2 text-white cursor-pointer"
                >
                  <IconManager icon="Logout" style={{ fontSize: "16px" }} />
                </div>
                <div>{username}</div>
              </div>
              {/* {showProfile && (
                <div
                  className="absolute bg-white right-0 top-11 py-2 w-40 rounded"
                  style={{ boxShadow: "0px 0px 10px gray" }}
                  ref={profileDropdown}
                >
                  {profileDropdownItems.map((item, index) => {
                    const { icon, title, link } = item;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setShowProfile(false);
                          history.push(link);
                        }}
                        className="flex items-center space-x-2 px-6 py-1 text-gray-700 hover:bg-gray-200 cursor-pointer"
                      >
                        <div>
                          <IconManager
                            icon={icon}
                            style={{ fontSize: "20px" }}
                          />
                        </div>
                        <div>{title}</div>
                      </div>
                    );
                  })}
                  <div
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-6 py-1 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    <div>
                      <IconManager icon="Logout" style={{ fontSize: "20px" }} />
                    </div>
                    <div>Logout</div>
                  </div>
                </div>
              )} */}
            </button>
          </>
        )}
        {width < 768 && (
          <div>
            <HamburgerMenu handleClick={handleToggleIconClick} />
          </div>
        )}
      </div>
    </div>
  );
}
