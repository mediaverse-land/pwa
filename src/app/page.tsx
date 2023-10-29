import { SongSlider, VideoSlider } from "@/components";
import BorderGradient from "@/components/BorderGradient";
import ScrollToBottomBtn from "@/components/Buttons/ScrollToBottom";
import ClientImage from "@/components/ClientImage";
import LiveSlider from "@/components/LiveSlider";
import Motion from "@/components/motion";
import {
  getLives,
  getMostViewedImages,
  getMostViewedText,
} from "@/services/contactService";
import Image from "next/image";

async function getImageData() {
  const image = await getMostViewedImages();

  if (!image.ok) {
    throw new Error("Failed to fetch data");
  }
  return image.json();
}

async function getTextData() {
  const text = await getMostViewedText();

  if (!text.ok) {
    throw new Error("Failed to fetch data");
  }
  return text.json();
}

async function getSliderData() {
  const text = await getLives();
  if (!text.ok) {
    throw new Error("Failed to fetch data");
  }
  return text.json();
}
const Home = async () => {
  const imageData = await getImageData();
  const textData = await getTextData();
  const liveData = await getSliderData();

  return (
    <Motion>
      {" "}
      <div className=" mt-28">
        <Image
          src="/images/media-verse-background-image.png"
          height={1000}
          width={460}
          alt="background Image"
          className="absolute top-4 -z-10 "
          quality={100}
        />
        <div className=" max-w-screen-2xl mx-auto  flex justify-evenly flex-wrap px-4">
          <div className="flex flex-col t-10">
            <h1 className="text-3xl font-semibold whitespace-nowrap text-white mt-16">
              What is MediaVerse?
            </h1>
            <p className="text-gray-500 mt-4 self-center">
              Mediaverse Platform is the next generation of media asset
              management tools for social TVs (or social media) that helps users
              manage the content cycle from procurement (or production) to
              distribution.
            </p>
            <div className="grid grid-cols-2 mt-[28px] w-[278px] gap-[8px]">
              <div className="app-store-container cursor-pointer py-[4px] px-[19px] flex items-center">
                <div className="relative w-full aspect-[135/48]">
                  <Image
                    src="/images/apple-app-store-logo.png"
                    quality={100}
                    fill
                    alt="google play store logo"
                  />
                </div>
              </div>
              <div className="app-store-container cursor-pointer py-[4px] px-[12px] flex items-center">
                <div className="relative w-full aspect-[135/48]">
                  <Image
                    src="/images/google-play-store-logo.png"
                    fill
                    quality={100}
                    alt="google play store logo"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-[278px] h-10 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm  py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-[28px]"
            >
              Web App
            </button>
          </div>
          <div className="flex space-x-4 mt-8 sm:mt-0 animate-container">
            <Image
              src="/images/phone-image-1.png"
              className="phone-animate-2 relative z-20 "
              width={170}
              height={500}
              quality={100}
              alt="phone photo"
            />
            <Image
              src="/images/phone-image-2.png"
              className="phone-animate-1 relative"
              width={170}
              height={500}
              quality={100}
              alt="phone photo"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-20">
          <ScrollToBottomBtn />
        </div>
        <div className="w-full flex items-center justify-center mt-10 space-x-1">
          <Image
            src="/icons/live-icon.png"
            quality={100}
            width={20}
            height={20}
            alt="camera icon"
          />
          <p className="text-white text-sm ">live channel</p>
        </div>
        <div className=" max-w-screen-2xl mx-auto flex items-center justify-center py-4 w-[80rem]">
          <div className="relative flex overflow-x-hidden w-full animate-marquee-container">
            <div className="animate-marquee whitespace-nowrap flex flex-row w-full">
              {liveData.map((item: any, i: number) => (
                <img
                  key={i}
                  className="rounded-[8px] w-[154px] h-[100px] mr-[8px]"
                  src={item.thumbnail}
                  alt=""
                />
              ))}
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap  flex flex-row  w-full ">
              {liveData.map((item: any, i: number) => (
                <img
                  key={i}
                  className="rounded-[8px] w-[154px] h-[100px] mr-[8px]"
                  src={item.thumbnail}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-16 space-x-1">
          <Image
            src="/icons/video-icon.png"
            quality={100}
            width={16}
            height={16}
            alt="camera icon"
          />
          <p className="text-white text-sm ">Best videos</p>
        </div>
        <VideoSlider />
        <div className="flex max-w-screen-2xl w-[80rem] mx-auto mt-16 justify-between flex-col items-start sm:flex-row sm:px-0 px-2 h-[570px]">
          <div className="flex flex-col w-[30%] h-full">
            <div className="flex space-x-2 ml-1 w-full">
              <Image
                src="/icons/gallery.png"
                quality={100}
                width={18}
                height={10}
                alt="galery"
              />
              <p className="text-white text-sm ">Most viewed</p>
            </div>
            <div className="grid grid-rows-4 grid-flow-col gap-2 mt-10 grow max-h-[510px]">
              {imageData.map((items: any, index: number) => {
                return (
                  <ClientImage
                    key={index}
                    className={`${
                      index === 4
                        ? "rounded-xl w-full aspect-square col-span-2 row-span-2"
                        : "rounded-xl w-full aspect-square"
                    }`}
                    src={items.asset.thumbnails["336x366"]}
                    alt="photo"
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-[60%] h-full">
            <div className="flex space-x-2 ml-1 sm:mt-0">
              <Image
                src="/icons/text.png"
                quality={100}
                width={18}
                height={10}
                alt="galery"
              />
              <p className="text-white text-sm ">Top texts</p>
            </div>
            <div className="flex md:grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-rows-1 md:grid-rows-2 mt-10 w-full grow">
              {textData.slice(0, 6).map((items: any, index: number) => {
                return (
                  <BorderGradient
                    className="flex flex-col w-full aspect-square box-border rounded-3xl  "
                    to="90deg"
                    sColor="#CFCFFC4D"
                    tColor="#CFCFFC00"
                  >
                    <div key={index} className="h-full flex flex-col">
                      <p className="text-white text-lg">{items.name}</p>
                      <p className="text-gray-500 mt-4">
                        {items.description?.slice(0, 65)}
                      </p>
                      <div className="flex mt-auto space-x-2">
                        <Image
                          src="/images/mini-avatar.png"
                          alt="avatar"
                          width={16}
                          height={16}
                          quality={100}
                        />
                        <p className="text-xs text-gray-500">
                          {items.asset.user.username}
                        </p>
                      </div>
                    </div>
                  </BorderGradient>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-16 space-x-1">
          <Image
            src="/icons/songs.png"
            quality={100}
            width={16}
            height={16}
            alt="camera icon"
          />
          <p className="text-white text-sm ">Best songs</p>
        </div>
        <SongSlider />
      </div>
    </Motion>
  );
};
export default Home;
