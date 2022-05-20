import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADD_COUNTRY_COURSE } from "../../redux/actions/country_course_type";
import whiteLogo from "../../assets/images/logo/logo-white.svg";
const ExploreCountrySlider = ({ gapBetweenSlides = 10, slides }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCountrySearch = (data) => {
    const city_id = data.cities.map((i) => i.id);
    // console.log(data);
    let val = {
      id: city_id,
      title: data.title,
    };
    dispatch({ type: ADD_COUNTRY_COURSE, payload: val });
    history.push("/courses");
    window.scrollTo(0, 0);
  };
  return (
    <>
      {slides.map((slide, index) => {
        const { title, country_image } = slide;
        return (
          <div
            key={index}
            className="individual-slide flex-shrink-0 relative cursor-pointer"
            style={{
              marginRight:
                slides.length - 1 > index ? `${gapBetweenSlides}px` : "",
              width: 250,
            }}
            onClick={() => handleCountrySearch(slide)}
          >
            {country_image ? (
              <img src={country_image} alt="" className="w-full h-full" />
            ) : (
              <img src={whiteLogo} alt="" className="w-full h-full gradient" />
            )}

            <div className="absolute bottom-0 px-3 text-sm font-semibold py-2 bg-secondary w-full text-white bg-opacity-50">
              {title}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ExploreCountrySlider;
