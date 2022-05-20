import React, { useState } from "react";
import CustomSlider from "../../../slider/custom-slider";
import GetStartedCountry from "../../../slider/get-started-country/get-started-country";
// import { SearchField } from "../../common/input-field";
import Header from "../common/header";
// import Proceed from "../common/proceed";
import DarkNavbar from "../../static/navbar";
import axiosInstance from "../../../api/axiosInstance";
import { ADD_GET_STARTED_FILTER } from "../../../redux/actions/getStartedType";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import DataLoader from "../../common/Loader";

const Country = ({ setActive }) => {
  const dispatch = useDispatch();
  const [slides, setSlides] = React.useState([]);
  const [boxSlides, setBoxSlides] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [object, setObjecct] = useState("justify-center");
  // search value
  const [searchVal, setSearchVal] = useState("");
  const [countryLoader, setCountryLoader] = useState(true);

  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, {
        signal,
      })
      .then((res) => {
        console.log(res.data)
        setCountryLoader(false);
        setSlides(res.data);
        if (res.data.length <= 4) {
          setObjecct("justify-center");
          setShowButton(false);
        } else {
          setObjecct("");
          setShowButton(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setCountryLoader(false);
      });
  };

  const handleCountryAdd = (value) => {
    const country = [...slides];
    console.log(country)
    let newVal = country.filter((data) => data.title === value);
    if (newVal.length > 0) {
      let city_id = [];
      for (let i = 0; i < newVal[0].cities.length; i++) {
        console.log(newVal[0].cities[i])
        city_id.push(newVal[0].cities[i].id);
      }
      dispatch({
        type: ADD_GET_STARTED_FILTER,
        payload: newVal.title,
        property: "country_started",
      });
      dispatch({
        type: ADD_GET_STARTED_FILTER,
        payload: city_id,
        property: "city_started",
      });
      setActive("degree");
    }
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
  }, []);

  // // searching countries
  const submitHandler = (e) => {
    e.preventDefault();
    axiosInstance
      .get(`/institutes/country/list/?title__icontains=${searchVal}`)
      .then((res) => {
        setBoxSlides(res.data);
        if (res.data.length <= 4) {
          setObjecct("justify-center");
          setShowButton(false);
        } else {
          setObjecct("");
          setShowButton(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // resetting the search value
  // const searchResetHandler = () => {
  //   setSearchVal("");
  //   getCountryList();
  // };

  return (
    <div>
      <DarkNavbar />
      <div className="space-y-2 bg-blue1 px-4 py-10 md:py-16 md:px-10 lg:px-24">
        {/* progress  */}
        <div className="my-10 flex justify-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">Country</span>
            {/* bar  */}
            <div className="w-96 rounded-full overflow-hidden bg-gray-100">
              <div
                className="bg-pink4 py-1 rounded-full"
                style={{
                  width: "20%",
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-700">1/5</span>
          </div>
        </div>
        <Header text="Which country do you wish to pursue your education in?" />
        <div className="flex justify-center">
          <div className="relative w-72 md:w-80 lg:w-96">
            <form onSubmit={submitHandler}>
              <div className="relative">
                <input
                  list="courses"
                  id="courses-choice"
                  name="courses-choice"
                  value={searchVal}
                  className="rounded-full border-2 pl-5 py-2 w-full focus:border-gray-300 transition-all duration-300"
                  placeholder="Type country name"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  onClick={(e) => handleCountryAdd(e.target.value)}
                />

                {/* {crossIcon && (
                  <div
                    className="absolute text-gray-600 cursor-pointer right-12"
                    style={{ top: "15px" }}
                    onClick={searchResetHandler}
                  >
                    <FaTimes />
                  </div>
                )} */}
              </div>

              <datalist id="courses">
                {Array.isArray(slides) &&
                  slides.map((cat, index) => {
                    return <option value={cat.title} key={index} />;
                  })}
              </datalist>
            </form>

            <button
              type="submit"
              onClick={submitHandler}
              className="absolute bg-pink4 text-white top-1/2 h-9 w-9 rounded-full right-1 cursor-pointer flex items-center justify-center"
              style={{ transform: "translateY(-50%)" }}
            >
              <svg
                viewBox="0 0 512.005 512.005"
                fill="currentColor"
                className="w-5"
              >
                <g>
                  <g>
                    <path
                      d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                    />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {countryLoader && (
        <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
          <span className="text-lg">Loading</span>
          <span>
            {/* <Loader
              type="ThreeDots"
              color="#eb3434"
              height={40}
              width={40}
              timeout={90000}
            /> */}
            <DataLoader />
          </span>
        </div>
      )}

      {boxSlides.length === 0 && !countryLoader ? (
        <div className="text-red-500 text-center py-3">No Data Available</div>
      ) : (
        <div className="uni-footer w-full h-48 flex justify-center items-center">
          <CustomSlider
            numberOfSlides={slides.length}
            cardwidth={160}
            gapBetweenSlides={20}
            showButton={showButton}
            object={object}
            comp={
              <GetStartedCountry
                setActive={setActive}
                gapBetweenSlides={20}
                boxSlides={boxSlides}
                setBoxSlides={setBoxSlides}
              />
            }
          />
        </div>
      )}

      {/* <Proceed
        active="country"
        setActive={() => setActive("degree")}
        step={1}
      /> */}
    </div>
  );
};

export default Country;
