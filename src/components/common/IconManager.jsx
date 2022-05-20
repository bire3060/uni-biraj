// icons from the svg files
import Add from "../../assets/icons/add";
import Book from "../../assets/icons/book";
import GraduationCap from "../../assets/icons/graduation-cap";
import List from "../../assets/icons/list";
import Logout from "../../assets/icons/logout";
import Notification from "../../assets/icons/notification";
import Profile from "../../assets/icons/profile";
import RightArrow from "../../assets/icons/right-arrow";
import Search from "../../assets/icons/search";
import Settings from "../../assets/icons/settings";
import Inquiry from "../../assets/icons/inquiry";
import Institution from "../../assets/icons/institution";
import Portfolio from "../../assets/icons/portfolio";
import Blog from "../../assets/icons/blog";
import CMS from "../../assets/icons/cms";
import Help from "../../assets/icons/help";
import Save from "../../assets/icons/save";
import Upload from "../../assets/icons/upload";
import Download from "../../assets/icons/download";
import Edit from "../../assets/icons/edit";
import Delete from "../../assets/icons/delete";
import Folder from "../../assets/icons/folder";
import Timeline from "../../assets/icons/Timeline";
import Online from "../../assets/icons/Online";
import AppliedIcon from "../../assets/icons/AppliedIcon";
import MyAcc from "../../assets/icons/MyAcc";
import Inquery from "../../assets/icons/Inquery";
import AppManager from "../../assets/icons/AppManager";
import Mentor from "../../assets/icons/Mentor";
import Faqs from "../../assets/icons/Faqs";
import Register from "../../assets/icons/Register";
import SMTP from "../../assets/icons/SMTP";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { AiOutlineContacts } from "react-icons/ai";

export default function IconManager({ icon, ...remaining }) {
  let { className } = remaining;
  const commonClass = "w-5 h-5";
  remaining.className = className ? className : commonClass;
  if (icon === "RightArrow") {
    return <RightArrow {...remaining} />;
  } else if (icon === "Add") {
    return <Add {...remaining} />;
  } else if (icon === "Online") {
    return <Online {...remaining} />;
  } else if (icon === "Applied") {
    return <AppliedIcon {...remaining} />;
  } else if (icon === "MyAcc") {
    return <MyAcc {...remaining} />;
  } else if (icon === "Inquery") {
    return <Inquery {...remaining} />;
  } else if (icon === "AppManager") {
    return <AppManager {...remaining} />;
  } else if (icon === "Mentor") {
    return <Mentor {...remaining} />;
  } else if (icon === "Faqs") {
    return <Faqs {...remaining} />;
  } else if (icon === "SMTP") {
    return <SMTP {...remaining} />;
  } else if (icon === "Register") {
    return <Register {...remaining} />;
  } else if (icon === "Timeline") {
    return <Timeline {...remaining} />;
  } else if (icon === "List") {
    return <List {...remaining} />;
  } else if (icon === "GraduationCap") {
    return <GraduationCap {...remaining} />;
  } else if (icon === "Profile") {
    return <Profile {...remaining} />;
  } else if (icon === "Notification") {
    return <Notification {...remaining} />;
  } else if (icon === "Search") {
    return <Search {...remaining} />;
  } else if (icon === "Settings") {
    return <Settings {...remaining} />;
  } else if (icon === "Logout") {
    return <Logout {...remaining} />;
  } else if (icon === "Book") {
    return <Book {...remaining} />;
  } else if (icon === "Inquiry") {
    return <Inquiry {...remaining} />;
  } else if (icon === "Institution") {
    return <Institution {...remaining} />;
  } else if (icon === "Portfolio") {
    return <Portfolio {...remaining} />;
  } else if (icon === "Blog") {
    return <Blog {...remaining} />;
  } else if (icon === "CMS") {
    return <CMS {...remaining} />;
  } else if (icon === "Help") {
    return <Help {...remaining} />;
  } else if (icon === "Save") {
    return <Save {...remaining} />;
  } else if (icon === "Upload") {
    return <Upload {...remaining} />;
  } else if (icon === "Edit") {
    return <Edit {...remaining} />;
  } else if (icon === "Download") {
    return <Download {...remaining} />;
  } else if (icon === "Delete") {
    return <Delete {...remaining} />;
  } else if (icon === "Folder") {
    return <Folder {...remaining} />;
  } else if (icon === "ContactUs") {
    return <AiOutlineContacts {...remaining} />;
  } else if (icon === "SubscribedEmail") {
    return <MdOutlineUnsubscribe {...remaining} />;
  }
  return "no icons found";
}
