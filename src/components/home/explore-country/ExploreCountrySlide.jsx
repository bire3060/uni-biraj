import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import "../../../assets/css/slider/slider.css";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);
// images

function ExploreCountrySlide() {
  const [slides, setSlides] = useState([]);
  const getCountryList = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        setSlides(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCountryList(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="w-full relative ">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        spaceBetween={10}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 3,
          },
          1024: {
            width: 1024,
            slidesPerView: 4,
          },
          1200: {
            width: 1200,
            slidesPerView: 4,
          },
          1440: {
            width: 1400,
            slidesPerView: 5,
          },
        }}
        // slidesPerView={4}
      >
        {slides.map((slide, index) => {
          const { title, country_image } = slide;
          return (
            <SwiperSlide key={index} className="flex-shrink-0 relative">
              <img src={country_image} alt="" className="w-full h-full" />
              <div className="absolute bottom-0 px-2 text-sm font-semibold py-2 bg-secondary w-full text-center text-white bg-opacity-50">
                {title}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ExploreCountrySlide;
