import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import HamburgerMenu from "../../../assets/icons/hamburger-menu";
import IconManager from "../../common/IconManager";
import whiteUniLogo from "../../../assets/images/logo/logo-white.svg";
// import { SearchField } from "./search-field";
export default function NavigationBar({
  width,
  handleToggleIconClick,
  toggled,
}) {
  // const profileDropdown = useRef();
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("");
  // const [search, setSearch] = useState("");
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };
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
        <Link
          to="/"
          className="h-9 overflow-hidden"
          onClick={() => window.scroll(0, 0)}
        >
          <img src={whiteUniLogo} alt="" className="h-full" />
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
      <div className="flex items-center text-gray-700">
        {width > 767 && (
          <>
            <div
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-1 text-white cursor-pointer"
            >
              <div>
                <IconManager icon="Logout" style={{ fontSize: "20px" }} />
              </div>
              {/* <div>Logout</div> */}
            </div>
            <button
              className="relative cursor-default flex"
              onBlur={() => setShowProfile(false)}
            >
              <div
                className="cursor-pointer flex space-x-1 items-center text-pink2"
                onClick={() => setShowProfile(!showProfile)}
              >
                <IconManager icon="Profile" />
                <div>{username}</div>
              </div>
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
