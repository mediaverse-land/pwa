"use client";

import { TEXT_ICON } from "@/components/SVG/svgs";
import { DicProperties, Locale } from "@/types/dictionary-types";
import ExploreTextCard from "../shared/TextCard";
import { Swiper, SwiperSlide } from "swiper/react";

const ExploreTopTexts = ({
  topTextsData,
  dic,
  lang,
}: {
  topTextsData: any[];
  dic: DicProperties;
  lang: Locale;
}) => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <TEXT_ICON />
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.topTexts}
          </p>
        </div>
        {/* <div className="text-[14px] text-[#597AFF]">
          {dic.generalApp.viewAll}
        </div> */}
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex gap-4 overflow-x-auto">
            <Swiper
              slidesPerView={1.9}
              spaceBetween={8}
              breakpoints={{
                "500": {
                  slidesPerView: 2.5,
                  spaceBetween: 8,
                },
                "570": {
                  slidesPerView: 2.7,
                },
                "1200": {
                  slidesPerView: 3.5,
                },
              }}
            >
              {topTextsData?.map((item, inded) => (
                <SwiperSlide key={inded}>{item}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopTexts;
