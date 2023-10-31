"use client";
import "swiper/css";
import { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getMostViewedSongs } from "@/services/contactService";
import { Swiper, SwiperSlide } from "swiper/react";
const SongSlider = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [songoData, setSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const songData = await getMostViewedSongs();
      const data = await songData.json();
      setSongData(data);
    };
    getData();
  }, []);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="flex space-x-0 sm:space-x-4 justify-center items-center my-10">
      <button className=" hidden sm:block " onClick={handleNext}>
        <Image
          src="/icons/prev.png"
          alt="arrow"
          width={24}
          height={24}
          quality={100}
        />
      </button>
      <div className="relative w-[80rem] mx-auto max-w-screen-2xl linear-dark-blue-bg">
        <Swiper
          centerInsufficientSlides
          className="w-full"
          slidesPerView={7.5}
          spaceBetween={16}
          onSwiper={setSwiperRef}
          loop={true}
          rewind={true}
        >
          {songoData.map((item: any, index) => {
            return (
              <SwiperSlide className="w-[140px] h-[120px]" key={item.id}>
                <div className="relative w-[140px] h-[120px]">
                  <Image
                    src={item.asset.thumbnails["226x226"]}
                    className="rounded-xl"
                    alt="Music Cover"
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

export default SongSlider;
