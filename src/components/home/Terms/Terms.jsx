import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
import Navbar from "../../static/navbar";

const Terms = ({ loggedIn, role }) => {
  const [loader, setLoader] = useState(true);
  const [getAllIndividualAbout, setGetAllIndividualAbout] = useState({});

  // getting all aboutus
  const getAllAbout = (signal) => {
    axiosInstance
      .get("/settings/detail-cms/terms", signal)
      .then((res) => {
        setLoader(false);
        setGetAllIndividualAbout(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllAbout(signal);
    return () => controller.abort();
  }, []);

  const { description, image } = getAllIndividualAbout;

  return (
    <div>
      <div>
        <Navbar loggedIn={loggedIn} role={role} />
      </div>

      <div
        className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
        <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-10">
          Terms & Conditions
        </span>
      </div>

      {/* cms loader */}
      {loader && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}

      <div className="px-4 py-10 md:px-10 lg:px-24">
        <div className="max-w-6xl w-full mx-auto">
          <div
            className="mt-4 text-gray-800 h-full md:text-base tracking-wide text-sm"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
