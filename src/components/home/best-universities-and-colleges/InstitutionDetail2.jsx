import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Navbar from "../../static/navbar";

const InstitutionDetail2 = ({ loggedIn, role }) => {
  const { slug } = useParams();
  const [getIndividualInstitution, setGetIndividualInstitution] = useState({});

  const getInstitutiondata = () => {
    axiosInstance
      .get(`/institutes/detail/${slug}/`)
      .then((res) => {
        setGetIndividualInstitution(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInstitutiondata();
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
  } = getIndividualInstitution;

  return (
    <div>
      <div>
        <Navbar loggedIn={loggedIn} role={role} />
      </div>
      <div className="px-4 py-10 md:px-10 lg:px-24 bg-gray2">
        <div className="max-w-2xl w-full mx-auto">
          <div>
            <img
              src={logo}
              alt="uni_image"
              className="rounded-lg  bg-cover object-cover"
            />
          </div>

          <div className="md:text-4xl text-3xl font-bold text-gray-800 mt-8">
            {name}
          </div>
          <div className="mt-10 flex flex-col">
            {/* header  */}
            <div className="text-2xl font-semibold text-gray-700">
              Basic Details
            </div>
            <div className="flex flex-col space-y-2 mt-5">
              <div className="flex space-x-4 items-center">
                <div className="w-24">Name</div>
                <div className="">{name}</div>
              </div>
              <div className="flex space-x-4 items-center">
                <div className="w-24">Address</div>
                <div className="">{address && address.title}</div>
              </div>
              <div className="flex space-x-4 items-center">
                <div className="w-24">Contact</div>
                <div className="">{contact}</div>
              </div>
              <div className="flex space-x-4 items-center">
                <div className="w-24">Email</div>
                <div className="">{email}</div>
              </div>
              <div className="flex space-x-4 items-center">
                <div className="w-24">Website</div>
                <div className="">{website}</div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col">
            {/* header  */}
            <div className="text-2xl font-semibold text-gray-700">
              Facilities
            </div>
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
            <div className="text-2xl font-semibold text-gray-700">Gallery</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  max-w-xl w-full">
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
          {/*
          <div className="mt-14 text-gray-700 font-semibold tracking-wide">
            {category && category.title}
          </div>

          <div
            className="mt-4 text-gray-500 h-full md:text-base tracking-wide text-sm"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>

          <div className="mt-8">
            <div className="bg-gray-200 inline px-4 p-1 rounded-md text-sm font-semibold text-gray-600">
              {author}
            </div>
            <div className="text-sm font-semibold text-gray-500 mt-2">
              <div>{created && created.split("T")[0]}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetail2;
