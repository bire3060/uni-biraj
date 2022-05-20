import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IconManager from "../../common/IconManager";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import jwt_decode from "jwt-decode";

export default function Sidebar({
  width,
  toggled,
  handleSidebarLinkClick,
  isSide,
  setToggled,
}) {
  const [check, setcheck] = useState(false);
  const [role, setRole] = useState("");
  const handleMaintain = (data) => {
    axiosInstance
      .put(`/settings/maintaining-status-update/`, { is_maintaining: data })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axiosInstance
      .get(`settings/maintaining-status/`)
      .then((res) => {
        // console.log(res.data);
        setcheck(res.data.is_maintaining);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const history = useHistory();
  const permission = useSelector((state) => state.permission);
  let sidebarItems = [
    {
      title: "Institutions",
      permission: "institutes",
      icon: "Institution",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/institution/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/institution/list",
        },
      ],
    },
    {
      title: "Courses",
      icon: "Book",
      permission: "courses",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/course/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/course/list",
        },
      ],
    },
    {
      title: "Applied Course",
      icon: "Applied",
      permission: "courses",
      link: "/dashboard/appliedcourse",
    },
    {
      title: "Application Manager",
      icon: "AppManager",
      permission: "courses",
      link: "/dashboard/applicationmanager",
    },

    {
      title: "Student Mgmt",
      icon: "GraduationCap",
      permission: "education",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/student-management/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/student-management/list",
        },
      ],
    },
    {
      title: "Course Inquiry",
      permission: "inquery",
      icon: "Inquery",
      link: "/dashboard/course-enquiry",
    },
    {
      title: "Institute Inquiry",
      permission: "inquery",
      icon: "Inquery",
      link: "/dashboard/institute-enquiry",
    },
    {
      title: "Mentor Buddy",
      icon: "Mentor",
      permission: "blogsandjobs",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/mentor-buddy/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/mentor-buddy/list",
        },
      ],
    },
    {
      title: "Job Mgmt",
      icon: "Portfolio",
      permission: "blogsandjobs",
      subItems: [
        {
          title: "Job Provider",
          icon: "Portfolio",
          link: "/dashboard/job-management/job-provider",
        },
        {
          title: "Job Post",
          icon: "Portfolio",
          link: "/dashboard/job-management/job-post",
        },
      ],
    },
    {
      title: "FAQ",
      icon: "Faqs",
      link: "/dashboard/faq",
      permission: "sitesettings",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/faq/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/faq/list",
        },
      ],
    },
    {
      title: "Setting",
      icon: "Settings",
      link: "/dashboard/setting",
      permission: "sitesettings",
      subItems: [
        {
          title: "Course Category",
          icon: "Add",
          link: "/dashboard/settings/add",
        },
        {
          title: "Job Category",
          icon: "Add",
          link: "/dashboard/settings/job-cat-add",
        },
        {
          title: "Permission",
          icon: "Add",
          link: "/dashboard/settings/permission",
        },
        {
          title: "Country",
          icon: "Add",
          link: "/dashboard/settings/country",
        },
        {
          title: "Degree Level",
          icon: "Add",
          link: "/dashboard/settings/degree-level",
        },
        {
          title: "Online Classes",
          icon: "Add",
          link: "/dashboard/settings/online-classes",
        },
        {
          title: "Application",
          icon: "Add",
          link: "/dashboard/applicationstatus",
        },
      ],
    },
    {
      title: "User Management",
      icon: "Register",
      permission: "authuser",
      link: "/dashboard/register",
      subItems: [
        {
          title: "Add",
          icon: "Add",
          link: "/dashboard/register/add",
        },
        {
          title: "List",
          icon: "List",
          link: "/dashboard/register/list",
        },
      ],
    },
    {
      title: "Student Perks",
      icon: "Register",
      permission: "blogsandjobs",
      link: "/dashboard/perks",
    },
    {
      title: "Blog",
      icon: "Blog",
      permission: "blogsandjobs",
      link: "/dashboard/blog",
    },
    {
      title: "CMS",
      icon: "CMS",
      permission: "sitesettings",
      link: "/dashboard/cms",
    },
    {
      title: "SMTP",
      icon: "SMTP",
      permission: "sitesettings",
      link: "/dashboard/smtp",
    },
    {
      title: "Notes",
      icon: "Book",
      permission: "educations",
      link: "/dashboard/notes",
    },

    // contact us
    {
      title: "Contact Us",
      permission: "sitesettings",
      icon: "ContactUs",
      link: "/dashboard/contact-us",
    },

    // subscribed email
    {
      title: "Gift Claim",
      permission: "sitesettings",
      icon: "SubscribedEmail",
      link: "/dashboard/subscribed-email",
    },

    // {
    //   title: "Zoom Settings",
    //   permission: "sitesettings",
    //   icon: "CMS",
    //   link: "/dashboard/zoom-settings",
    // },
  ];

  if (width < 1023) {
    sidebarItems = sidebarItems.concat([
      {
        title: "Profile",
        icon: "Profile",
        link: "/profile",
      },
      {
        title: "Notifications",
        icon: "Notification",
        link: "/notifications",
      },
      {
        title: "Help",
        icon: "Help",
        link: "/help",
      },
      {
        title: "Logout",
        icon: "Logout",
        link: "/logout",
      },
    ]);
  }
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
            ? "sidebar-header  ml-6 pl-2 pr-4 h-10 rounded-l-md hover:bg-white hover:text-gray-800"
            : ""
        } 
        ${
          subheader
            ? "sidebar-sub-header-item mx-10 pl-2  text-sm h-8 my-1 rounded-md hover:bg-pink3"
            : ""
        }
        ${link === activeRoute && header ? "bg-white text-gray-800" : ""} 
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
                : "text-gray-50 hover:bg-gray-100 hover:text-gray-800"
            }
          `}
          onClick={() => handleSidebarHeaderClick(index)}
        >
          <div className="flex items-center space-x-6">
            <div>
              <IconManager icon={icon} />
            </div>
            <div>{title}</div>
          </div>
          {subItems && Array.isArray(subItems) && (
            <div
              className={`p-1 rounded-full sidebar-right-arrow transform 
                      ${
                        active === index
                          ? "rotate-down bg-pink4 text-white"
                          : "bg-white text-gray-800 group-hover:bg-pink4 group-hover:text-white"
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
  function tokenManager() {
    const token = localStorage.getItem("refresh");
    let decoded;
    if (token) {
      try {
        decoded = jwt_decode(token);
      } catch (e) {
        localStorage.clear();
      }
      const loggedIn = decoded && decoded.exp && decoded.user_type && true;
      if (loggedIn) {
        setRole(decoded.user_type);
      } else {
        window.location = "/";
        localStorage.clear();
      }
    }
  }
  useEffect(() => {
    tokenManager();
    const unlisten = history.listen((location) => {
      setActiveRoute(window.location.href.split(window.location.origin)[1]);
    });

    return () => {
      unlisten();
    };
  }, [history]);
  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={`overflow-hidden transition-all ease-out duration-300 fixed top-0 lg:top-16 h-screen overflow-y-auto z-20 lg:z-0 bg-blue3
      ${toggled ? "w-68" : "w-18"}
      `}
      onMouseOver={() => setToggled(true)}
      onMouseLeave={() => {
        if (isSide) {
          setToggled(false);
        }
      }}
    >
      <div className="flex flex-col w-64 py-3 lg:py-10">
        {width < 1024 && (
          <div className="flex items-center justify-center space-x-2 h-16 px-4 mb-2">
            <div className="w-12 h-12 rounded-full border border-gray-400"></div>
          </div>
        )}
        <div className="space-y-1">
          {sidebarItems.map((sidebarItem, index) => {
            const { subItems } = sidebarItem;
            return (
              <div key={index}>
                {permission[sidebarItem.permission] && (
                  <div className="sidebar-item ">
                    <SidebarHeaderOptionsHandler
                      index={index}
                      {...sidebarItem}
                    />
                    {subItems && Array.isArray(subItems) && (
                      <div
                        className={`sidebar-sub-header overflow-hidden transition-all duration-300`}
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
                )}
              </div>
            );
          })}
        </div>
        {toggled && (
          <>
            {role === "SA" && (
              <div className="flex ml-8 py-1 gap-2">
                <div className="text-lg self-center  text-white">
                  Maintenance:
                </div>
                <label className="switchc self-center">
                  <input
                    onChange={() => {
                      setcheck(!check);
                      handleMaintain(!check);
                    }}
                    checked={check}
                    value={check}
                    type="checkbox"
                  />
                  <span className="slidersc roundc"></span>
                </label>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
