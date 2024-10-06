"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getMostViewedVideos } from "@/services/contactService";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FullLocaleNames, Locale } from "@/types/dictionary-types";
import { imagePlaceHolders } from "@/configs/base";

const VideoSlider = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [videoData, setVideoData] = useState([]);
  const lang = useParams().lang as Locale;

  useEffect(() => {
    const getData = async () => {
      const videoData = await getMostViewedVideos(FullLocaleNames[lang]);
      const data = await videoData.json();
      setVideoData(data["data"]);
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
    <div className="flex space-x-0 sm:space-x-4 rtl:space-x-reverse justify-center items-center mt-10">
      <button className="hidden sm:block" onClick={handleNext}>
        <Image
          src="/icons/prev.png"
          alt="arrow"
          width={24}
          height={24}
          quality={100}
        />
      </button>
      <div className="relative w-full max-w-screen-2xl mx-auto px-6 lg:px-0">
        <Swiper
          centerInsufficientSlides
          slidesPerView={1.6}
          breakpoints={{
            "420": {
              slidesPerView: 2.4,
            },
            "640": {
              slidesPerView: 2.8,
            },
            "800": {
              slidesPerView: 3.5,
            },
            "1024": {
              slidesPerView: 6,
            },
          }}
          spaceBetween={8}
          onSwiper={setSwiperRef}
          className="w-full lg:linear-light-blue-bg"
        >
          {videoData?.map((item: any, index) => {
            return (
              <SwiperSlide key={item.id} className="cursor-pointer rounded-2xl">
                <Link
                  href={`/${lang}/app/assets/video/${item?.media?.slug}?id=${item.id}`}
                  className="w-full"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={
                        item?.thumbnails["226x226"] || imagePlaceHolders.video
                      }
                      className="rounded-xl object-cover"
                      alt="video cover"
                      fill
                    />
                  </div>
                  <p className="mt-2 ml-1 text-gray-600 text-[16px] lg:text-sm line-clamp-1 break-words">
                    {item?.media?.name}
                  </p>
                  <div className="flex ml-1 mt-1 space-x-2 rtl:space-x-reverse">
                    <Image
                      src={`${item.user.image_url || imagePlaceHolders.audio}`}
                      className="rounded-full overflow-hidden"
                      alt="avatar"
                      width={16}
                      height={16}
                      quality={100}
                    />
                    <p className="text-xs text-gray-500">
                      {item?.user?.username}
                    </p>
                  </div>
                </Link>
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
