"use client"
import { Swiper, SwiperSlide, } from "swiper/react";
import 'swiper/css';
import { Swiper as SwiperClass } from 'swiper/types';
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLives } from "@/services/contactService";

const LiveSlider = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [liveData, setLiveData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const liveData = await getLives();
            if (liveData.ok) {
                setLiveData(await liveData.json());
            }
        };
        getData();
    }, []);

    
    return (<div className="flex space-x-0 sm:space-x-4 justify-center items-center mt-10 ">
        <Swiper
            slidesPerView={8.5}
            spaceBetween={10}
            onSwiper={setSwiperRef}
            loop={true}

        >
            {
                liveData.map((item: any, index) => {
                    return <SwiperSlide key={index}>
                        <img src={item.thumbnail} className="rounded-xl w-[154px] h-[100px]" alt="video cover" />
                    </SwiperSlide>
                })}
        </Swiper>


    </div>);
}

export default LiveSlider;