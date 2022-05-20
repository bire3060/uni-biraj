import React, { useState, useEffect } from "react";
import Navbar from "../../static/navbar";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";
import Preloader from "../../get-started/common/PreLoader";
import pageNotFound from "../../../assets/images/common/404.jpg";
import Pagination from "../../common/Pagination";
import uni from "../../../assets/images/home/uni.jpg";
import whiteLogo from "../../../assets/images/logo/logo.svg";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const AllInstitutions = ({ loggedIn, role }) => {
  const [slides, setSlides] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  // const [courseErr, setCourseErr] = useState("");
  // const [locationErr, setLocationErr] = useState("");
  const [category, setCategory] = useState([]);
  const [cities, setCities] = useState([]);

  const { category_home, city_home } = useSelector(
    (state) => state.homeCourseFilter
  );

  // filter fields
  const [coursesFilter, setCoursesFilter] = useState(
    category_home ? category_home : ""
  );
  const [locationFilter, setLocationFilter] = useState(
    city_home ? city_home : ""
  );
  // const [frontCourses, setFrontCourses] = useState(category_home);
  // const [frontLocation, setFrontLocation] = useState(city_home);

  // console.log("front page location" + category_home);
  // console.log("front page courses" + city_home);

  // console.log("universities page courses" + coursesFilter);
  // console.log("universities page location" + locationFilter);

  const getAllInstitution = (signal) => {
    axiosInstance
      .get(
        `institutes/institute-filter/?page=${currentButton}&course_institute__category__in=${
          coursesFilter || category_home
        }&address__in=${locationFilter || city_home}`,

        { signal }
      )
      .then((res) => {
        scrollToTop();
        setSlides(res.data.results);
        setLoad(false);
        setPage(res.data.total_pages);
        setSearchLoader(false);
        // setCoursesFilter(category_home ? category_home : "");
        // setLocationFilter(city_home ? city_home : "");
      })
      .catch((err) => {
        // if (err.response.data.detail) {
        //   toast.error(err.response.data.detail, {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // }
        console.log(err);
      });
  };

  // getting all the courses on dropdown
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getting all the countries on dropdown
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        let val = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].cities.length; j++) {
            val.push({
              id: res.data[i].cities[j].id,
              title: res.data[i].cities[j].title,
            });
          }
        }
        setCities(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterHandler = (e) => {
    e.preventDefault();
    // setCoursesFilter(category_home ? category_home : coursesFilter);
    // setLocationFilter(city_home ? city_home : locationFilter);
    setCurrentButton(1);
    setSearchLoader(true);
    getAllInstitution();
  };

  // reset filter
  const resetHandler = () => {
    setCoursesFilter("");
    setLocationFilter("");
    window.location.reload();
    // getAllInstitution();
  };

  // useEffect(() => {
  //   if (coursesFilter === "Select Courses" && !locationFilter) {
  //     getAllInstitution();
  //   }
  // }, [coursesFilter, locationFilter]);

  // query set key
  // ?query=course_institute__category__in${category_home}&address__in${city_home}

  const scrollToTop = () => window.scrollTo(0, 0);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllInstitution(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton, page]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCategoryList(signal);
    getCountryList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  // filering
  // const filterHandler = (e) => {
  //   e.preventDefault();
  //   if (coursesFilter === "") {
  //     setCourseErr("Courses Is Required");
  //   } else {
  //     setCourseErr("");
  //   }
  //   if (locationFilter === "") {
  //     setLocationErr("Location Is Required");
  //   } else {
  //     setLocationErr("");
  //   }
  //   if (coursesFilter && locationFilter) {
  //     axiosInstance
  //       .get(
  //         `institutes/institute-filter?course=${coursesFilter}&address=${locationFilter}`
  //       )
  //       .then((res) => {
  //         setSlides(res.data.results);
  //         setPage(res.data.total_pages);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   } else if (coursesFilter) {
  //     axiosInstance
  //       .get(`institutes/institute-filter?course=${coursesFilter}`)
  //       .then((res) => {
  //         setSlides(res.data.results);
  //         setPage(res.data.total_pages);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   } else if (locationFilter) {
  //     axiosInstance
  //       .get(`institutes/institute-filter?address=${locationFilter}`)
  //       .then((res) => {
  //         setSlides(res.data.results);
  //         setPage(res.data.total_pages);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   } else {
  //     getAllInstitution();
  //   }
  // };

  return (
    <>
      <div className="relative pb-20">
        {load && <Preloader />}
        <Navbar loggedIn={loggedIn} role={role} />
        <div
          className="w-full h-96 bg-none bg-center bg-cover flex justify-center items-center relative"
          style={{
            backgroundImage: `url(${uni})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-0"></div>
          <span className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold z-10">
            Universities
          </span>
        </div>

        {/* filtering */}
        <div className="my-10 px-20 pb-4 border-b border-gary-300">
          <div className="w-full flex items-center justify-center">
            <form
              onSubmit={filterHandler}
              className="lg:flex items-center justify-center w-full lg:space-x-6 lg:space-y-0 space-y-4"
            >
              {/* courses */}
              <div className="relative lg:w-72 w-full h-14 overflow-hidden rounded-2xl border border-gray4 bg-gray2 py-2.5 px-2 flex flex-col">
                <div className="absolute flex items-center space-x-2">
                  <label
                    htmlFor="courses"
                    className=" px-3 font-bold tracking-wide pointer-events-none"
                  >
                    Courses
                  </label>
                </div>
                <select
                  name="courses"
                  id="courses"
                  className="w-full placeholder-gray-500 bg-gray2 px-3 p-2 text-sm mt-2"
                  // placeholder="Select Courses"
                  value={coursesFilter}
                  onChange={(e) => setCoursesFilter(e.target.value)}
                >
                  <option value="Select Courses">Select Courses</option>
                  {Array.isArray(category) &&
                    category.map((cat, index) => {
                      return (
                        <option value={cat.id} key={index}>
                          {cat.title}
                        </option>
                      );
                    })}
                </select>
                {/* {courseErr && (
                  <span className="text-red-600 absolute right-2 top-2 text-sm">
                    {courseErr}
                  </span>
                )} */}
              </div>

              <div className="advanced-select relative bg-gray2 lg:w-72 w-full py-2.5 rounded-xl border border-gray4">
                <label className="absolute px-3 font-bold tracking-wide pointer-events-none">
                  Location
                </label>
                <select
                  className="w-full rounded-xl appearance-none px-3 text-sm bg-gray2 pt-5"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option className="bg-gray2 hover:bg-red-400 py-2" hidden>
                    Location or City
                  </option>
                  {cities.map((city, index) => {
                    const { title, id } = city;

                    return (
                      <option
                        key={index}
                        value={id}
                        className="bg-gray2 hover:bg-red-400 py-2"
                      >
                        {title}
                      </option>
                    );
                  })}
                </select>
                {/* {locationErr && (
                  <span className="text-red-600 absolute top-2 right-2">
                    {locationErr}
                  </span>
                )} */}
              </div>

              <button
                type="submit"
                disabled={searchLoader ? true : false}
                className={`${
                  searchLoader
                    ? "disabled cursor-not-allowed"
                    : "hover:bg-pink5 cursor-pointer"
                } block bg-pink4 p-2 py-3 lg:w-40 w-full text-white font-semibold text-center rounded-full  select-none  transition-all duration-300`}
              >
                {searchLoader ? (
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Search"
                )}
              </button>

              <div
                onClick={resetHandler}
                className="block bg-gray-200 text-gray-700 p-2 py-3 lg:w-40 w-full font-semibold text-center rounded-full cursor-pointer select-none hover:bg-gray-300 transition-all duration-300"
              >
                Reset
                {/* <BsFilterCircle className="text-2xl" /> */}
              </div>
            </form>
            {/* searching */}
            {/* <div className="lg:w-96 w-full">
              <form onSubmit={HandleSubmit} className="relative">
                <input
                  placeholder="Search by institution name..."
                  name="searchinput"
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  value={searchInput}
                  className="rounded-2xl pr-10 w-full self-center border border-gray-300 transition duration-200 text-sm placeholder-gray-500 pl-4 backdrop-blur-sm text-gray-500 py-3"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-3 cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div> */}
          </div>
        </div>

        {slides.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center mb-10 text-gray-700">
            <img src={pageNotFound} alt="" className="h-64 w-64" />
            <div className="text-3xl font-bold">No data is available</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-20 mb-20">
            {slides.map((slide, index) => {
              const { name, logo, width, city, address, slug } = slide;
              return (
                <Link
                  onClick={scrollToTop}
                  to={`/universities/${slug}`}
                  key={index}
                  className=" bg-white rounded-lg border p-2 cursor-pointer hover:bg-gray-100 shadow-lg"
                >
                  <div className="flex h-full gap-3 flex-col items-center justify-center">
                    <div>
                      {logo ? (
                        <img
                          src={logo}
                          alt="logo"
                          width={width}
                          className="h-14"
                        />
                      ) : (
                        <img
                          src={whiteLogo}
                          alt="logo"
                          width={width}
                          className="h-14"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900 font-semibold line-clamp-1">
                        {name === null || undefined || "" ? "N/A" : name}
                      </div>
                      <div className="text-xs text-gray-600 font-bold mt-2 line-clamp-1">
                        {city === "nan" ||
                        city === "" ||
                        city === null ||
                        city === undefined
                          ? ""
                          : city}
                        {!(
                          city === "nan" ||
                          city === "" ||
                          city === null ||
                          city === undefined
                        ) &&
                        !(
                          address === "nan" ||
                          address === "" ||
                          address === null ||
                          address === undefined
                        )
                          ? ", "
                          : ""}
                        {address === "nan" ||
                        address === "" ||
                        address === null ||
                        address === undefined
                          ? ""
                          : address}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {page > 1 && (
          <Pagination
            setCurrentButton={setCurrentButton}
            currentButton={currentButton}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default AllInstitutions;
