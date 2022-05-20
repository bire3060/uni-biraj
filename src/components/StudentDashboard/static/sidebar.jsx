import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IconManager from "../../common/IconManager";

export default function Sidebar({
  width,
  toggled,
  handleSidebarLinkClick,
  setToggled,
  isSide,
}) {
  const history = useHistory();
  let sidebarItems = [
    {
      title: "Dashboard",
      icon: "Institution",
      link: "/student-dashboard",
    },
    {
      title: "Details",
      icon: "Save",
      link: "/student-dashboard/details",
    },
    {
      title: "Applied Courses",
      icon: "Book",
      link: "/student-dashboard/applied-courses",
    },
    {
      title: "My Courses",
      icon: "GraduationCap",
      link: "/student-dashboard/my-courses",
    },
    {
      title: "My Wishlist",
      icon: "Applied",
      link: "/student-dashboard/wishlist",
    },
    {
      title: "Application",
      icon: "Timeline",
      link: "/student-dashboard/application",
    },
    {
      title: "Online Class",
      icon: "Online",
      subItems: [
        {
          title: "Notes",
          icon: "Book",
          link: "/student-dashboard/Online-class/notes",
        },
        {
          title: "Schedule",
          icon: "Book",
          link: "/student-dashboard/Online-class/schudule",
        },
      ],
    },
    {
      title: "My Account",
      icon: "MyAcc",
      link: "/student-dashboard/account",
    },
    {
      title: "Inquiry",
      icon: "Inquery",
      link: "/student-dashboard/inquiry",
    },
  ];
  const sidebar = useRef();
  const [activeRoute, setActiveRoute] = useState(
    window.location.href.split(window.location.origin)[1].toLowerCase()
  );
  const [active, setActive] = useState(() => {
    let result = "";
    for (let i = 0; i < sidebarItems.length; i++) {
      const item = sidebarItems[i];
      const { subItems } = item;
      if (item.link === activeRoute) {
        result = i;
        i = sidebarItems.length;
      } else if (result === "" && subItems) {
        for (let j = 0; j < subItems.length; j++) {
          if (subItems[j].link === activeRoute) {
            result = i;
            j = sidebarItems.length;
          }
        }
      }
    }
    return result;
  });
  const [prevActive, setPrevActive] = useState("");
  const handleSidebarHeaderClick = (index) => {
    setActive((prevA) => {
      setPrevActive(prevA);
      return prevA !== index ? index : -1;
    });
  };
  // console.log(toggled);
  useEffect(() => {
    const unlisten = history.listen((location) => {
      setActiveRoute(window.location.href.split(window.location.origin)[1]);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  const SidebarLinkOptionsHandler = ({
    link,
    title,
    icon,
    header,
    subheader,
    index,
  }) => {
    return (
      <Link
        to={link}
        onClick={() => {
          setPrevActive(active);
          setActive(index);
          handleSidebarLinkClick();
        }}
        className={`
        ${
          header
            ? "sidebar-header  ml-6 pl-2 pr-4 h-10 rounded-l-md hover:bg-gray-100 hover:text-gray-800"
            : ""
        } 
        ${
          subheader
            ? "sidebar-sub-header-item mx-14 pl-2 pr-4 text-sm h-8 my-1 rounded-md hover:bg-pink3"
            : ""
        }
        ${
          link === activeRoute && header
            ? "bg-gray-100 text-pink4 font-semibold hover:text-pink4"
            : ""
        } 
        ${link === activeRoute && subheader ? "bg-pink4" : ""}
          flex items-center justify-between text-gray-50 
         `}
      >
        <div className={`flex items-center space-x-6 `}>
          <div>
            <IconManager
              icon={icon}
              className={header ? "w-5 h-5" : "w-4 h-4"}
            />
          </div>
          <div>{title}</div>
        </div>
      </Link>
    );
  };

  const SidebarHeaderOptionsHandler = ({
    index,
    link,
    title,
    icon,
    subItems,
  }) => {
    if (subItems && Array.isArray(subItems)) {
      return (
        <div
          className={`sidebar-header group ml-6 pl-2 pr-6 rounded-l-md flex items-center justify-between h-10 cursor-pointer
            ${
              active === index
                ? "bg-gray-100 text-gray-800"
                : "text-gray-50 hover:bg-white hover:text-gray-800"
            }
          `}
          onClick={() => handleSidebarHeaderClick(index)}
        >
          <div className="flex items-center space-x-6">
            <div>
              <IconManager icon={icon} />
            </div>
            <div className="">{title}</div>
          </div>
          {subItems && Array.isArray(subItems) && (
            <div
              className={`p-1 rounded-full sidebar-right-arrow transform 
                      ${
                        active === index
                          ? "rotate-down bg-pink4 text-white"
                          : "bg-white font-extrabold text-gray-800 group-hover:bg-pink4 group-hover:text-white"
                      }
                      ${prevActive === index && "rotate-up"}
                      ${
                        active !== prevActive &&
                        prevActive !== "" &&
                        toggled &&
                        "animate"
                      }
                    `}
            >
              <IconManager icon="RightArrow" />
            </div>
          )}
        </div>
      );
    }
    return (
      <SidebarLinkOptionsHandler
        link={link}
        title={title}
        icon={icon}
        header={true}
        index={index}
      />
    );
  };

  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={`overflow-hidden transition-all ease-out duration-300 fixed top-0 lg:top-16 h-screen overflow-y-auto z-20 lg:z-0 bg-blue3
      ${toggled ? "w-64" : "w-18"}
      `}
      onMouseOver={() => setToggled(true)}
      onMouseLeave={() => {
        if (isSide) {
          setToggled(false);
        }
      }}
    >
      <div className="flex flex-col w-64 py-3 lg:py-10 ">
        {width < 1024 && (
          <div className="flex items-center justify-center space-x-2 h-16 px-4 mb-2">
            <div className="w-12 h-12 rounded-full border border-gray-400"></div>
          </div>
        )}
        <div className="space-y-1 ">
          {sidebarItems.map((sidebarItem, index) => {
            const { subItems } = sidebarItem;
            return (
              <div key={index} className="sidebar-item ">
                <SidebarHeaderOptionsHandler index={index} {...sidebarItem} />
                {subItems && Array.isArray(subItems) && (
                  <div
                    className={`sidebar-sub-header  overflow-hidden transition-all duration-300 font`}
                    style={{
                      height: `${
                        active === index ? `${subItems.length * 40}px` : "0"
                      }`,
                    }}
                  >
                    {subItems.map((subItem, i) => {
                      return (
                        <SidebarLinkOptionsHandler
                          key={i}
                          index={index}
                          {...subItem}
                          subheader={true}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
