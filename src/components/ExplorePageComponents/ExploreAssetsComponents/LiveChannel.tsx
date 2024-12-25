"use client";
import { DicProperties, Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export const ExploreLiveChannel = ({
  liveData,
  dic,
  lang,
}: {
  liveData: any;
  dic: DicProperties;
  lang: Locale;
}) => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative overflow-hidden w-[30px] h-[26px] lg:w-[20px] lg:h-[20px]">
            <Image
              src="/icons/live-icon.png"
              quality={100}
              fill
              alt="camera icon"
            />
          </div>
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.liveTvChannels}
          </p>
        </div>
        <Link
          href={`/${lang}/app/channels`}
          className="text-[14px] text-[#597AFF]"
        >
          {dic.generalApp.viewAll}
        </Link>
      </div>
      <div className="">
        <div className="flex w-full">
          <div className="w-full">
            <Swiper slidesPerView={3.5} spaceBetween={8}>
              {liveData?.map((item: any, i: number) => (
                <SwiperSlide key={item.id}>
                  <Link
                    href={`/${lang}/app/channels/${item.id}`}
                    className="relative rounded-[8px] w-full aspect-[110/70] xl:aspect-[110/80] mr-[8px] overflow-hidden inline-block"
                  >
                    <Image className="" src={item.thumbnails['226x226']} alt="" fill />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
