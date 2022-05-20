import React, { useState, useEffect } from "react";
import Navbar from "../../static/navbar";
import axiosInstance from "../../../api/axiosInstance";
// import { Link } from "react-router-dom";
import Preloader from "../../get-started/common/PreLoader";
import pageNotFound from "../../../assets/images/common/404.jpg";
import { Link } from "react-router-dom";
// import Pagination from "../../common/Pagination";
const AllPreks = ({ loggedIn, role }) => {
  const [load, setLoad] = useState(true);
  const [preks, setPerks] = useState([]);
  const fetchPerkLists = async (signal) => {
    axiosInstance
      .get(`/std-gift-list/`, { signal })
      .then((res) => {
        setPerks(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchPerkLists(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="relative pb-20">
        {load && <Preloader />}
        <Navbar loggedIn={loggedIn} role={role} />
        <div className="text-center  mt-20 mb-10 text-4xl font-black text-gray-800">
          Student Perks and Gift Packages
        </div>

        {preks.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center mb-10 text-gray-700">
            <img src={pageNotFound} alt="" className="h-64 w-64" />
            <div className="text-3xl font-bold">No Data Available</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20 lg:px-20 md:px-10 px-6">
            {preks.map((prek, index) => {
              const { image, title, details, id } = prek;
              console.log(prek);
              return (
                <Link
                  to={`/perks/all-perks/${id}`}
                  key={index}
                  className=" flex-shrink-0 w-full border mb-2 rounded-lg relative "
                >
                  <img
                    src={image}
                    className="h-28 w-full object-cover rounded-t-lg"
                    alt=""
                  />
                  <div className="flex flex-col items-center">
                    <div className="text-center my-5">
                      <p className="text-sm font-semibold leading-6">{title}</p>
                      <p className="text-xs text-gray-900">{details}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPreks;
