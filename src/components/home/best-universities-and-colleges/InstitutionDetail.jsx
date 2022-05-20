import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Navbar from "../../static/navbar";
// import Navbar from "../../home/static/navbar";
import { useParams } from "react-router-dom";
import Preloader from "../../get-started/common/PreLoader";
import UniForm from "./uniform/UniForm";
import UniLogo from "../../../assets/images/logo/logo.svg";
import BannerLogo from "../../../assets/images/home/uni.jpg";

function InstitutionDetail({ loggedIn, role }) {
  const [getIndividualInstitution, setGetIndividualInstitution] = useState({});
  const [load, setLoad] = useState(true);
  const { slug } = useParams();
  const getAllInstitutionDetails = (signal) => {
    axiosInstance
      .get(`/institutes/detail/${slug}/`)
      .then((res) => {
        // console.log(res.data);
        setGetIndividualInstitution(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllInstitutionDetails(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  const {
    logo,
    name,
    facilities,
    award_and_achievement,
    // document,
    contact,
    email,
    gallery,
    website,
    address,
    banner,
  } = getIndividualInstitution;
  return (
    <>
      {load ? (
        <Preloader />
      ) : (
        <div>
          <div className="  h-100 relative z-10 bg-gray1">
            <Navbar loggedIn={loggedIn} role={role} />
            <div
              className="absolute bg-cover bg-no-repeat bg-bottom top-0 right-0 w-full h-full"
              style={{
                zIndex: "-1",
                backgroundImage: `url(${
                  banner === null ? BannerLogo : banner
                })`,
              }}
            ></div>
            {/* <div className="flex justify-center">
              <span className="bg-white inline-flex mx-auto mt-10 p-10">
                <img src={logo} alt="" />
              </span>
            </div> */}
            <div className=" p-4 md:px-8 lg:px-16 2xl:px-24 absolute -bottom-20 w-full hidden lg:block">
              <div className="md:flex space-x-4 items-center border bg-white border-gray-200 rounded-lg p-10 shadow-md">
                {/* img and name  */}
                <div className="sm:flex items-center sm:space-x-2 flex-1">
                  <span>
                    <img
                      src={logo === null ? UniLogo : logo}
                      alt="university_logo"
                      className="h-20"
                    />
                  </span>
                  <div className="flex flex-col flex-1  sm:text-center py-5 sm:py-0">
                    <span className="text-2xl text-blue3 font-semibold">
                      {name}
                    </span>
                  </div>
                </div>
                <div className="mt-5 md:mt-0">
                  <a
                    href={getIndividualInstitution.website}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue3 text-white rounded-lg py-2 px-8"
                  >
                    Visit University Website
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-4 md:px-8 lg:px-16 2xl:px-24 lg:hidden">
            <div className="md:flex md:space-x-4 items-center border bg-white border-gray-200 rounded-lg p-10">
              {/* img and name  */}
              <div className="sm:flex items-center sm:space-x-2 flex-1">
                <span>
                  <img src={logo} alt="" className="h-28" />
                </span>
                <div className="flex flex-col flex-1  sm:text-center py-5 sm:py-0">
                  <span className="text-2xl text-blue3 font-semibold">
                    {name}
                  </span>
                </div>
              </div>
              <div className="mt-5 md:mt-0">
                <a
                  href={getIndividualInstitution.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue3 text-white rounded-lg py-2 px-8"
                >
                  Visit University Website
                </a>
              </div>
            </div>
          </div>
          <div className="lg:flex justify-between md:space-x-10 p-4 md:px-8 lg:px-16 2xl:px-24 lg:mt-20">
            {/* right  */}
            <div className=" rounded-md border border-gray-200 py-5 px-10 shadow-md flex-1">
              <div className="mt-10 flex flex-col">
                {/* header  */}
                <div className="text-2xl font-semibold text-gray-700">
                  Basic Details
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">Name</div>
                    <div className="">
                      {name === null ||
                      name === undefined ||
                      name === "nan" ||
                      name === ""
                        ? "N/A"
                        : name}
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">Address</div>
                    <div className="">
                      {address === null ||
                      address.title === null ||
                      address.title === undefined ||
                      address.title === "nan" ||
                      address.title === ""
                        ? "N/A"
                        : address.title}
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">Contact</div>
                    <div className="">
                      {contact === null ||
                      contact === undefined ||
                      contact === "nan" ||
                      contact === ""
                        ? "N/A"
                        : contact}
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">Email</div>
                    <div className="">
                      {email === null ||
                      email === undefined ||
                      email === "nan" ||
                      email === ""
                        ? "N/A"
                        : email}
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">Website</div>
                    <div className="">
                      {website === null ||
                      website === undefined ||
                      website === "nan" ||
                      website === ""
                        ? "N/A"
                        : website}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col">
                {/* header  */}
                <div className="text-2xl font-semibold text-gray-700">
                  Facilities
                </div>
                {facilities.length === 0 && (
                  <div className="mt-3 text-gray-600">Nothing to show..</div>
                )}
                {Array.isArray(facilities) &&
                  facilities.map((f, index) => {
                    return (
                      <div className="mt-3" key={index}>
                        <div className="font-semibold text-lg text-gray-600">
                          {f.title}
                        </div>
                        <div className="text-gray-500">{f.description}</div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-10 flex flex-col">
                {/* header  */}
                <div className="text-2xl font-semibold text-gray-700">
                  Award and Achievements
                </div>
                {award_and_achievement.length === 0 && (
                  <div className="mt-3 text-gray-600">Nothing to show..</div>
                )}
                {Array.isArray(award_and_achievement) &&
                  award_and_achievement.map((f, index) => {
                    return (
                      <div className="mt-3" key={index}>
                        <div className="font-semibold text-lg text-gray-600">
                          {f.title}
                        </div>
                        <div className="text-gray-500">{f.description}</div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-10 flex flex-col">
                {/* header  */}
                <div className="text-2xl font-semibold text-gray-700">
                  Gallery
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  max-w-xl w-full">
                  {gallery.length === 0 && (
                    <div className="mt-3 text-gray-600">Nothing to show..</div>
                  )}
                  {Array.isArray(gallery) &&
                    gallery.map((g, index) => {
                      return (
                        <div key={index}>
                          <img src={g.file} alt="" className="h-40" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* left */}
            <div className="mt-10 lg:mt-0 lg:w-96 flex flex-col">
              <div className="border border-gray-200 shadow-md rounded-lg p-5">
                <div className="p-5 text-blue3 text-2xl text-center ">
                  Interested in Studying {name} ?
                </div>
                <UniForm
                  slug={getIndividualInstitution && getIndividualInstitution.id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstitutionDetail;
