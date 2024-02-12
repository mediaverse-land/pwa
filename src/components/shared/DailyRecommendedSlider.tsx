"use client";
import { Swiper, SwiperSlide } from "swiper/react";

const ShowAssetSlider = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={8}
        breakpoints={{
          "1200": {
            slidesPerView: 3.5,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShowAssetSlider;
