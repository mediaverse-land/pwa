"use client"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import Image from "next/image";
import { Navigation,  } from "swiper/modules";

const VideoSlider = () => {

    const swiper = useSwiper();
    return (<div className="w-full flex items-center mt-8 ">
            <Swiper
                slidesPerView={6.15}
                spaceBetween={10}
                modules={[Navigation]}
            >
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-base">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/room.png" alt="girl" height={120} quality={100} width={140}/>
                    <p className="mt-2 ml-1 text-gray-600 text-xs">Old tree in old...</p>
                    <div className="flex ml-1 mt-1 space-x-1">
                        <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100}/>
                        <p className="text-mini text-gray-500">Dianne Russell</p>
                    </div>
                </SwiperSlide>
            
            </Swiper>


    </div>);
}

export default VideoSlider;