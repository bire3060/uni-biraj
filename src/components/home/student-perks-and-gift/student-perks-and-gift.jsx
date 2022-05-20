import React, { useEffect, useState } from "react";
import rightarrow from "../../../assets/images/icons/right-arrow.svg";
import sponserImg from "../../../assets/images/perks/Cards-slider.png";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";
import CustomSlider from "../../../slider/custom-slider";
import StudentPerksSlider from "./student-perks-slider";
const StudentPreksAndGift = () => {
  const [slides, setSlides] = useState([]);
  const [noData, setNoData] = useState(false);
  const [object, setObjecct] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [handleSearch, sethandleSearch] = useState("");
  const [emptyData, setEmptyData] = useState(false);

  const [countrySubLists, setCountrySubLists] = useState([
    // { isTrue: true, name: "Australia" },
    // { isTrue: false, name: "USA" },
    // { isTrue: false, name: "Canada" },
    // { isTrue: false, name: "India" },
    // { isTrue: false, name: "Denmark" },
    // { isTrue: false, name: "Germany" },
  ]);
  const [selectedIndex, setselectedIndex] = useState("");

  const getAllCountry = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setCountrySubLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCountry(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

  const fetchPerkLists = async (signal) => {
    axiosInstance
      .get(`/std-gift-list/`, { signal })
      .then((res) => {
        setSlides(res.data);
        if (res.data.length <= 4) {
          setObjecct("justify-center");
          setShowButton(false);
        } else {
          setObjecct("");
          setNoData(false);
          setShowButton(true);
        }
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
    <div className="py-14">
      <div className="flex items-center justify-center flex-col">
        <div className="text-center text-4xl font-medium pb-4">
          Student Perks and Gift Packages
          <br />
          curated for you
        </div>
        <div className="w-10/12">
          <img
            src={sponserImg}
            alt="sponserImage"
            className="flex items-center justify-center w-full mx-auto max-w-7xl"
          />
        </div>
      </div>
      <div className=" mx-auto my-5 font-bold text-sm text-gray5 text-center">
        <div className="flex space-x-4 flex-wrap px-6 justify-center">
          {countrySubLists.map((list, index) => {
            const { title } = list;
            return (
              <div
                key={index}
                className={`animation mt-1 border-b border-transparent hover:text-pink4 cursor-pointer hover:border-pink4 ${
                  index === selectedIndex ? "text-pink4  border-pink4" : ""
                }`}
                onClick={() => {
                  setselectedIndex(index);
                  sethandleSearch(title);
                }}
              >
                {title}
              </div>
            );
          })}
        </div>
      </div>
      {emptyData.length === 0 && (
        <div className="flex items-center justify-center text-red-500 text-center ">
          No Data Available
        </div>
      )}
      <div className="mt-8">
        <CustomSlider
          numberOfSlides={slides.length}
          cardwidth={250}
          comp={
            <StudentPerksSlider
              handleSearch={handleSearch}
              setEmptyData={setEmptyData}
              setShowButton={setShowButton}
              setObjecct={setObjecct}
            />
          }
          showButton={showButton}
          object={object}
        />
      </div>
      {/* {slides.length === 0 && (
        <div className=" text-red-500 text-center">No Data Available</div>
      )} */}

      {/* <StudentGiftContainer preks={preks} /> */}
      {slides.length > 0 && (
        <div className="flex justify-center mt-6 text-pink4">
          <Link
            to="/perks"
            onClick={() => window.scrollTo(0, 0)}
            className="flex"
          >
            <p className="ml-2 pr-2 font-semibold">Browse all</p>
            <img src={rightarrow} alt="" width="10" style={{ marginTop: 2 }} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudentPreksAndGift;
