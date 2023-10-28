"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getMostViewedVideos } from "@/services/contactService";
import { Autoplay, FreeMode } from "swiper/modules";

const VideoSlider = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const videoData = await getMostViewedVideos();
      const data = await videoData.json();
      setVideoData(data);
    };
    getData();
  }, []);
  // console.log(videoData, "videodata");
  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  return (
    <div className=" flex space-x-0 sm:space-x-4 justify-center items-center mt-10 ">
      <button className=" hidden sm:block " onClick={handleNext}>
        <Image
          src="/icons/prev.png"
          alt="arrow"
          width={24}
          height={24}
          quality={100}
        />
      </button>
      <div className="relative w-[80rem] max-w-screen-2xl mx-auto">
        {/* shadow right */}
        {/* <div className="absolute w-[9rem] h-full top-0 right-0 z-20 linear-black-bg"></div> */}
        {/* shadow left */}
        <div></div>
        <Swiper
          centerInsufficientSlides
          slidesPerView={5.5}
          // freeMode={true}
          spaceBetween={16}
          onSwiper={setSwiperRef}
          loop={true}
          rewind={true}
          // autoplay={{ delay: 5 }}
          className="w-full linear-black-bg rounded-2xl"
        >
          {videoData.map((item: any, index) => {
            return (
              <SwiperSlide
                key={item.id}
                className="w-[150px] h-[190px] cursor-pointer rounded-2xl"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.asset.thumbnails["226x226"]}
                    className="rounded-xl object-cover"
                    alt="video cover"
                    fill
                  />
                </div>
                <p className="mt-2 ml-1 text-gray-600 text-sm">{item.name}</p>
                <div className="flex ml-1 mt-1 space-x-2">
                  <Image
                    src="/images/mini-avatar.png"
                    alt="avatar"
                    width={16}
                    height={16}
                    quality={100}
                  />
                  <p className="text-xs text-gray-500">
                    {item.asset.user.username}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <button className="hidden sm:block" onClick={handlePrevious}>
        <Image
          src="/icons/next.png"
          alt="arrow"
          width={24}
          height={24}
          quality={100}
        />
      </button>
    </div>
  );
};

export default VideoSlider;
