import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import facebookLogo from "../../assets/images/social/Social-logo1.svg";
import instagramLogo from "../../assets/images/social/Social-logo2.svg";
import twitterLogo from "../../assets/images/social/Social-logo3.svg";
import { toast } from "react-toastify";
const footerItems = [
  {
    header: "Explore",
    items: [
      {
        subHeader: "Courses",
        url: "/courses",
      },
      {
        subHeader: "Mentors",
        url: "/allmentors",
      },
      {
        subHeader: "Universities",
        url: "/universities",
      },
      {
        subHeader: "Jobs & Offers",
        url: "/alljobs",
      },
      // {
      //   subHeader: "Classes",
      //   url: "/enroll",
      // },
      {
        subHeader: "Blogs",
        url: "/allblogs",
      },
    ],
  },
  {
    header: "Useful links",
    items: [
      {
        subHeader: "Student Essentials",
        url: "/student-essentials",
      },
      {
        subHeader: "Engineering",
        url: "/engineering",
      },
      {
        subHeader: "Study tips",
        url: "/study-tips",
      },
      {
        subHeader: "Top destinations",
        url: "/top-destinations",
      },
      {
        subHeader: "Enriching your skills",
        url: "/enriching-your-skills",
      },
      {
        subHeader: "Pre-departure support",
        url: "/pre-departure-support",
      },
      {
        subHeader: "What to pack?",
        url: "/what-to-pack",
      },
      {
        subHeader: "Dealing with stress",
        url: "/dealing-with-stress",
      },
    ],
  },
  {
    header: "Information",
    items: [
      {
        subHeader: "About us",
        url: "/about-us",
      },
      {
        subHeader: "FAQS",
        url: "/faqs",
      },
      {
        subHeader: "Contact Info",
        url: "/contact-info",
      },
      {
        subHeader: "Contact Us",
        url: "/contact-us",
      },
    ],
  },
];

const socialLogos = [
  {
    image: facebookLogo,
    link: "https://www.facebook.com",
  },
  {
    image: instagramLogo,
    link: "https://www.instagram.com",
  },
  {
    image: twitterLogo,
    link: "https://www.twitter.com",
  },
];

const Footer = ({ role }) => {
  const [sub, setSub] = useState("");
  const [subErr, setSubErr] = useState("");
  const handleSub = (e) => {
    e.preventDefault();
    if (sub === "") {
      setSubErr("Provide Email Address");
    } else if (
      !sub.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      setSubErr("Invalid Email Address");
    } else {
      setSubErr("");
      let val = {
        email: sub,
      };
      axiosInstance
        .post(`/user/subscribe/`, val)
        .then((res) => {
          toast.success(`Subscribed Sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // clearing the input field
          setSub("");
        })
        .catch((error) => {
          toast.error(`Subscripiton with this email already exists.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="uni-footer  px-4 pt-10 md:pt-16 lg:pt-20 md:px-10 lg:px-24 text-gray3 text-sm">
      <div className="mainPageManagement">
        <div className="grid footer-grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          {footerItems.map((footerItem, index) => {
            const { header, items } = footerItem;
            return (
              <div key={index} className={`space-y-4`}>
                <div className="text-pink2 tracking-wide">{header}</div>
                <div
                  className={`grid gap-3  ${
                    index === 2 ? "" : "xl:grid-cols-2"
                  }`}
                >
                  {items.map((item, i) => {
                    const { subHeader, url } = item;
                    return (
                      <div key={i}>
                        <Link to={url} onClick={() => window.scrollTo(0, 0)}>
                          {subHeader}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="space-y-5">
            <div className="pl-14 md:pl-0">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 202.186 50.19"
                  className="h-14 mx-auto md:mx-0"
                >
                  <g
                    id="Group_5116"
                    data-name="Group 5116"
                    transform="translate(225.186 -1192.905)"
                  >
                    <path
                      id="Union_2"
                      data-name="Union 2"
                      d="M-165.279,1213.952a4.717,4.717,0,0,1-1.613-.716,3.239,3.239,0,0,1-1.03-1.21,3.721,3.721,0,0,1-.357-1.658,3.893,3.893,0,0,1,.213-1.314,4.184,4.184,0,0,1,.573-1.078,5.192,5.192,0,0,1,.831-.877,9.261,9.261,0,0,1,.763-.573,6.829,6.829,0,0,1-.531-1.132,3.993,3.993,0,0,1-.239-1.33,3,3,0,0,1,.29-1.341,2.722,2.722,0,0,1,.867-1,4.084,4.084,0,0,1,1.357-.611,7.161,7.161,0,0,1,1.792-.206,5.334,5.334,0,0,1,1.608.223,3.6,3.6,0,0,1,1.182.614,2.667,2.667,0,0,1,.729.908,2.442,2.442,0,0,1,.247,1.064,2.623,2.623,0,0,1-.293,1.238,3.873,3.873,0,0,1-.746.988,6.477,6.477,0,0,1-1.032.806c-.285.18-.579.354-.878.52.319.345.667.7,1.038,1.067.406.4.849.812,1.322,1.232a3.64,3.64,0,0,0,.52-.86,4.48,4.48,0,0,0,.341-1.41l.022-.234h3.207l-.033.287a7,7,0,0,1-.7,2.378,7.659,7.659,0,0,1-1.182,1.715c.373.311.757.623,1.141.932.456.367.929.74,1.4,1.107l.594.46h-4.4l-.068-.051c-.3-.224-.607-.461-.907-.7a8.656,8.656,0,0,1-1.837.716,8.019,8.019,0,0,1-2.073.278A8.7,8.7,0,0,1-165.279,1213.952Zm.441-4.634a1.018,1.018,0,0,0-.27.683,1.3,1.3,0,0,0,.084.445.929.929,0,0,0,.28.386,1.746,1.746,0,0,0,.6.308,3.467,3.467,0,0,0,1.028.126,6.138,6.138,0,0,0,.868-.065c.158-.022.318-.052.481-.09-.422-.375-.828-.746-1.212-1.1-.435-.411-.847-.828-1.228-1.244a3.459,3.459,0,0,0-.634.555Zm1.8-5.785a.777.777,0,0,0-.295.163.489.489,0,0,0-.127.21,1.213,1.213,0,0,0-.044.333,1.291,1.291,0,0,0,.1.459,3.467,3.467,0,0,0,.193.414c.182-.088.355-.173.518-.257a5.073,5.073,0,0,0,.57-.333,1.465,1.465,0,0,0,.342-.3.4.4,0,0,0,.091-.246.511.511,0,0,0-.032-.159.4.4,0,0,0-.1-.153.677.677,0,0,0-.228-.139,1.215,1.215,0,0,0-.431-.063A1.811,1.811,0,0,0-163.036,1203.533Z"
                      fill="#f85d82"
                    />
                    <path
                      id="Union_1"
                      data-name="Union 1"
                      d="M-98.024,1235.974a16.24,16.24,0,0,1-3.228-1.064V1230.2a11.632,11.632,0,0,0,6.926,2.16,6.322,6.322,0,0,0,2.713-.442.878.878,0,0,0,.369-.3.59.59,0,0,0,.087-.28.431.431,0,0,0-.151-.328,2.111,2.111,0,0,0-.643-.391c-3.366-1.238-9.307-1.314-9.385-6.087.188-6.561,9.271-5.463,13.509-3.779v4.559a11.9,11.9,0,0,0-8.359-1.664,1.228,1.228,0,0,0-.736.383.406.406,0,0,0-.018.109.327.327,0,0,0,.138.261,2.224,2.224,0,0,0,.648.367c3.433,1.2,9.327,1.5,9.407,6.277C-86.672,1236.755-93.925,1236.845-98.024,1235.974Zm-31.482.176a7.914,7.914,0,0,1-7.061-8.242c-.273-8.721,10.445-9.995,16.634-6.924v4.8a11.386,11.386,0,0,0-6.716-2.211c-1.909-.012-4.256.438-5.126,2.356a4.805,4.805,0,0,0,.51,4.779c1.795,1.9,4.975,1.819,7.284,1.072v-1.1h-3.926v-4.193h8.289v8.5a19.644,19.644,0,0,1-9.887,1.163Zm-68.6-.329a7.759,7.759,0,0,1-5.489-7.908c-.24-5.36,4.21-8.668,9.289-8.442,5.086-.23,9.471,3.1,9.23,8.442.241,5.347-4.146,8.672-9.23,8.442a12.661,12.661,0,0,1-3.8-.535Zm2.036-12.042c-2.824.466-3.746,3.837-2.714,6.207.736,1.717,2.748,2.28,4.472,2.242a5.019,5.019,0,0,0,3.893-1.371,4.948,4.948,0,0,0,0-5.888,5.029,5.029,0,0,0-3.885-1.372A7.65,7.65,0,0,0-196.075,1223.779Zm-19.079,12.059a7.822,7.822,0,0,1-5.721-7.925c-.283-8.439,9.963-10.227,16.015-6.831v4.75a10.674,10.674,0,0,0-6.376-2.256,5.79,5.79,0,0,0-4.184,1.334,4.848,4.848,0,0,0-.615,5.134c.856,1.759,3.005,2.2,4.794,2.186a10.34,10.34,0,0,0,6.389-2.252v4.765A13.942,13.942,0,0,1-215.154,1235.838Zm98.157.108v-16.088H-103v4.1h-9.539v1.66h9.048v4.1h-9.048v2.114h9.669v4.1Zm-35.06,0v-16.088h13.992v4.1H-147.6v1.66h9.047v4.1H-147.6v2.114h9.67v4.1Zm-15.491,0v-16.088h4.359v11.9h9.474v4.193Zm-15.49,0v-16.088h4.363v11.9h9.472v4.193Zm-32.419-21c-2.515-.65-4.724-2.79-4.644-5.514V1198.9h4.35v9.052a3.472,3.472,0,0,0,.676,2.348,4.187,4.187,0,0,0,3.111.966,4.147,4.147,0,0,0,3.1-.967,3.449,3.449,0,0,0,.67-2.348V1198.9h4.36v10.526c.084,4.191-4.5,6.138-8.125,5.97a12.191,12.191,0,0,1-3.492-.455Zm34.27.046V1198.9h4.359v16.087Zm-7.339,0-8.127-9.716v9.714h-4.36V1198.9h4.438l8.135,9.754V1198.9h4.341v16.087Z"
                      fill="#fff"
                    />
                  </g>
                </svg>
              </Link>
            </div>

            <div className="space-y-1">
              <div>Get in touch with us at</div>
              <div>
                <div></div>
                <div>uni@gmail.com</div>
              </div>
            </div>
            <div className="space-y-1 max-w-xs mx-auto md:mx-0">
              <div>Claim FREE gift package</div>
              <form className="relative" onSubmit={handleSub}>
                <input
                  type="text"
                  placeholder="Email"
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="border border-gray6 bg-transparent py-2 pl-4 pr-36 w-full rounded-tl"
                  style={{ borderRadius: "6px 20px 20px 6px" }}
                />
                <div className="absolute cursor-pointer right-0 top-0 h-full w-32 bg-pink4 flex items-center justify-center text-center rounded-full text-white">
                  <button>Subscribe</button>
                </div>
              </form>
              {subErr && (
                <div className="text-sm text-red-500 flex items-start justify-start">
                  {subErr}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 py-8 border-t border-gray6">
        <div className="flex flex-col sm:flex-row sm:space-y-0 sm:justify-between items-center space-y-3">
          <div className="text-gray4">
            © Uni & Colleges <span>{new Date().getFullYear()}</span>
          </div>
          <div className="space-x-3">
            <Link to="/help" onClick={() => window.scrollTo(0, 0)}>
              Help
            </Link>
            <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>
              Privacy
            </Link>
            <Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)}>
              Terms
            </Link>
          </div>
          <div className="flex space-x-3">
            {socialLogos.map((social, index) => {
              const { image, link } = social;
              return (
                <a key={index} href={link} rel="noreferrer" target="_blank">
                  <img src={image} alt="" className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
