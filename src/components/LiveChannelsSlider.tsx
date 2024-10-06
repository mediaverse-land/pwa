"use client";
import "swiper/css";
import { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getMostViewedSongs } from "@/services/contactService";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FullLocaleNames, Locale } from "@/types/dictionary-types";
import { imagePlaceHolders } from "@/configs/base";

const LiveChannelsSlider = ({
  liveChannelsData,
}: {
  liveChannelsData: any[];
}) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const lang = useParams().lang as Locale;

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="flex space-x-0 sm:space-x-4 rtl:space-x-reverse justify-center items-center my-6 lg:my-10 w-screen px-4 lg:px-8">
      <button className="hidden sm:block" onClick={handleNext}>
        <Image
          src="/icons/prev.png"
          alt="arrow"
          width={24}
          height={24}
          quality={100}
        />
      </button>
      <div className="relative w-full mx-auto max-w-screen-2xl lg:linear-dark-blue-bg">
        <Swiper
          centerInsufficientSlides
          className=""
          spaceBetween={8}
          slidesPerView={2.4}
          breakpoints={{
            "640": {
              slidesPerView: 3.6,
            },
            "800": {
              slidesPerView: 4.5,
            },
            "1024": {
              slidesPerView: 6.3,
            },
          }}
          onSwiper={setSwiperRef}
        >
          {liveChannelsData?.map((item: any, index) => {
            return (
              <SwiperSlide className="" key={item.id}>
                <Link
                  href={`/${lang}/app/channels/${item.id}`}
                  key={index}
                  className="w-full aspect-[150/100] block"
                >
                  <img
                    className="rounded-[8px] w-full h-full overflow-hidden"
                    src={item.thumbnail || imagePlaceHolders.image}
                    alt=""
                  />
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

export default LiveChannelsSlider;
