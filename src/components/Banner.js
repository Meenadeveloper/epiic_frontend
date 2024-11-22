import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/pagination'; // Pagination module styles

// Import the necessary modules from swiper
import { Pagination, Autoplay } from 'swiper/modules';

// Example banner data (JSON)
const bannerData = [
  {
    id: 1,
    imgSrc: require('../assets/images/banner_img.png'),
    text: "Advanced Tools for Learning and Professional Growth"
  },
  {
    id: 2,
    imgSrc: require('../assets/images/banner_img.png'),
    text: "Empowering Your Career with the Right Tools"
  },
  {
    id: 3,
    imgSrc: require('../assets/images/banner_img.png'),
    text: "Advanced Tools for Learning and Professional Growth"
  },
];

function Banner() {
  return (
    <div className="custom-container">
      <div className="inner-container">
        {/* Swiper slider */}
        <Swiper
          className="banner-slider-container" 
          modules={[Pagination, Autoplay]} // Use Pagination and Autoplay modules
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {bannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="banner-slider-item">
                <div className="grid-2">
                  <div className="grid-item">
                    <div className="banner-img-box">
                      <img src={banner.imgSrc} alt="banner img" />
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="banner-content">
                      <h1 className="banner-txt">".{banner.text}."</h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
