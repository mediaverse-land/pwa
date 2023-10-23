
import { Swiper, SwiperSlide, } from "swiper/react";
import 'swiper/css';
import { Swiper as SwiperClass } from 'swiper/types';
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLives } from "@/services/contactService";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const getData = async () => {
    const liveData = await getLives();
    if (liveData.ok) {
        return liveData.json()
    }
};
const LiveSlider = async () => {
    const liveData = await getData()


    return (<div className="flex space-x-0 sm:space-x-4 justify-center items-center mt-10 marquee w-full">
        <div className="item " >
            {liveData.map((item: any, index: any) => {
                return (

                    <img key={index} src={item.thumbnail} className="rounded-xl w-[154px] h-[100px]" alt="video cover" />
                )
            })}
        </div>



    </div>);
}

export default LiveSlider;