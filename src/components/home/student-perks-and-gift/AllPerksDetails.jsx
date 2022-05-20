import React, { useState, useEffect } from "react";
import Preloader from "../../get-started/common/PreLoader";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Navbar from "../../static/navbar";

const AllPerksDetails = ({ loggedIn, role }) => {
  const { id } = useParams();
  const [getPerksDetails, setGetPerksDetails] = useState({});
  const [load, setLoad] = useState(true);

  const getStudentPerksDetails = () => {
    axiosInstance
      .get(`/std-gift-detail/${id}/`)
      .then((res) => {
        setGetPerksDetails(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudentPerksDetails();
    // eslint-disable-next-line
  }, []);

  const { country, details, image, title } = getPerksDetails;

  return (
    <div>
      {load && <Preloader />}
      {Object.keys(getPerksDetails).length !== 0 && (
        <div>
          <div>
            <Navbar loggedIn={loggedIn} role={role} />
          </div>
          <div className="px-4 py-10 md:px-10 lg:px-24 bg-gray2">
            <div className="max-w-6xl w-full mx-auto">
              <div>
                <img
                  src={image ? image : ""}
                  alt="blog_image"
                  className="rounded-lg w-full bg-cover object-cover"
                  style={{ height: 400 }}
                />
              </div>

              <div className="md:text-4xl text-3xl font-bold text-gray-800 mt-8">
                {title ? title : "N/A"}
              </div>
              <div className="py-2 w-full px-2">
                {country && (
                  <ul>
                    <li className=" inline-block mb-1 mr-1 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-500">
                      {country ? country : "N/A"}
                    </li>
                  </ul>
                )}
              </div>

              <div
                className="mt-4 text-gray-500 h-full md:text-base tracking-wide text-sm"
                dangerouslySetInnerHTML={{
                  __html: details,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPerksDetails;
