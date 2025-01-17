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
const SongSlider = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [songoData, setSongData] = useState([]);
  const lang = useParams().lang as Locale;

  useEffect(() => {
    const getData = async () => {
      const songData = await getMostViewedSongs(FullLocaleNames[lang]);
      const data = await songData.json();
      setSongData(data["data"]);
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
    <div className="flex space-x-0 sm:space-x-4 rtl:space-x-reverse justify-center items-center my-10">
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
          spaceBetween={16}
          slidesPerView={7.5}
          onSwiper={setSwiperRef}
          loop={true}
          rewind={true}
        >
          {songoData?.map((item: any, index) => {
            return (
              <SwiperSlide
                className="min-w-[194px] lg:min-w-[140px] min-h-[194px] lg:min-h-[120px]"
                key={item.id}
              >
                <Link
                  href={`/${lang}/app/assets/audio/${item?.slug}?id=${item.id}`}
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={
                        item?.thumbnails["226x226"] || imagePlaceHolders.audio
                      }
                      className="rounded-xl"
                      alt="Music Cover"
                      fill
                    />
                  </div>
                  <p className="mt-2 ml-1 text-gray-600 text-sm line-clamp-1 break-words">
                    {item?.name}
                  </p>
                  <div className="flex ml-1 mt-1 space-x-2 rtl:space-x-reverse">
                    <div className="relative overflow-hidden aspect-square w-[16px] rounded-full">
                      <Image
                        src={`${
                          item?.user?.image_url || imagePlaceHolders.account
                        }`}
                        className="object-cover"
                        alt="avatar"
                        quality={100}
                        fill
                      />
                    </div>
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

export default SongSlider;
