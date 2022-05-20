import React from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { ADD_GET_STARTED_FILTER } from "../../redux/actions/getStartedType";
import DummyCountryImage from "../../assets/images/logo/logo.svg";
import "./getStarted.css";

const GetStartedCountry = ({
  gapBetweenSlides,
  setActive,
  setBoxSlides,
  boxSlides,
}) => {
  const dispatch = useDispatch();
  const scrollToTop = () => window.scrollTo(0, 0);
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, {
        signal,
      })
      .then((res) => {
        setBoxSlides(res.data);
        // if (res.data.length >= 4) {
        //   setShowButton(true);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setSities = (data, country) => {
    let city_id = [];
    for (let i = 0; i < data.length; i++) {
      city_id.push(data[i].id);
    }
    setActive("degree");
    // console.log(city_id);
    dispatch({
      type: ADD_GET_STARTED_FILTER,
      payload: country,
      property: "country_started",
    });
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {boxSlides.map((slide, index) => {
        const { country_image, title, cities, id } = slide;
        let idContainer=cities.map(val=>val.id)
        console.log(cities)
        return (
          <div key={index} className="p-1 ">
            <button
              style={{
                marginRight:
                  boxSlides.length - 1 > index ? `${gapBetweenSlides}px` : "",
                width: "150px",
              }}
              className="getStartedBorder flex-shrink-0 border relative rounded-xl shadow-lg py-1 space-y-2 bg-white cursor-pointer"
              onClick={() => {
                setSities(cities, title);

                dispatch({
                  type: ADD_GET_STARTED_FILTER,
                  payload: idContainer,
                  property: "city_started",
                });
                scrollToTop();
              }}
            >
              <div className="px-1">
                <img
                  src={country_image ? country_image : DummyCountryImage}
                  alt="country"
                  className=" mx-auto h-28 w-28 rounded-full"
                />
              </div>
              <div className="text-center text-xs font-semibold h-10">
                {title}
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default GetStartedCountry;
