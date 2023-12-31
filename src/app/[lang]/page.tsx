import { SongSlider, VideoSlider } from "@/components";
import BorderGradient from "@/components/BorderGradient";
import ScrollToBottomBtn from "@/components/Buttons/ScrollToBottom";
import Motion from "@/components/motion";
import { getDictionary } from "@/dictionary";
import {
  getLives,
  getMostViewedImages,
  getMostViewedText,
} from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";

async function getImageData(lang: TFullLocales) {
  const image = await getMostViewedImages(lang);

  if (!image.ok) {
    throw new Error("Failed to fetch data");
  }
  return image.json();
}

async function getTextData(lang: TFullLocales) {
  const text = await getMostViewedText(lang);

  if (!text.ok) {
    throw new Error("Failed to fetch data");
  }
  return text.json();
}

async function getSliderData(lang: TFullLocales) {
  const text = await getLives({ params: "", lang });
  if (!text.ok) {
    throw new Error("Failed to fetch data");
  }
  return text.json();
}
const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dic = await getDictionary(lang);
  const imageData = await getImageData(FullLocaleNames[lang]);
  const textData = await getTextData(FullLocaleNames[lang]);
  const liveData = await getSliderData(FullLocaleNames[lang]);

  return (
    <Motion>
      <div className=" mt-28">
        <Image
          src="/images/media-verse-background-image.png"
          height={1000}
          width={460}
          alt="background Image"
          className="absolute top-4 -z-10 "
          quality={100}
        />
        <div className="max-w-screen-2xl mx-auto flex justify-evenly flex-wrap px-4">
          <div className="flex flex-col t-10">
            <h1 className="text-3xl font-semibold whitespace-nowrap text-white mt-16">
              {dic.homepage.whatIsMediaverse}
            </h1>
            <p className="text-gray-500 mt-4 self-center">
              {dic.homepage.description}
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
              <Link
                href={`https://play.google.com/store/apps/dev?id=9075123475680600566`}
                className="app-store-container cursor-pointer py-[4px] px-[12px] flex items-center"
              >
                <div className="relative w-full aspect-[135/48]">
                  <Image
                    src="/images/google-play-store-logo.png"
                    fill
                    quality={100}
                    alt="google play store logo"
                  />
                </div>
              </Link>
            </div>
            <Link
              href={`/${lang}/app/explore`}
              className="w-[278px] h-10 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm leading-none flex justify-center items-center py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-[28px]"
            >
              Web App
            </Link>
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
          <ScrollToBottomBtn title={dic.homepage.exploreLimitless} />
        </div>
        <div className="w-full flex items-center justify-center mt-10 space-x-1">
          <Image
            src="/icons/live-icon.png"
            quality={100}
            width={20}
            height={20}
            alt="camera icon"
          />
          <p className="text-white text-sm ">{dic.homepage.liveTvChannels}</p>
        </div>
        <div className=" max-w-screen-2xl mx-auto flex items-center justify-center py-4 w-[80rem]">
          <div className="relative flex overflow-x-hidden w-full animate-marquee-container">
            <div className="animate-marquee whitespace-nowrap flex flex-row w-full">
              {liveData.map((item: any, i: number) => (
                <Link href={`/${lang}/app/lives/${item.id}`} key={item.id}>
                  <img
                    className="rounded-[8px] w-[154px] h-[100px] mr-[8px]"
                    src={item.thumbnail}
                    alt=""
                  />
                </Link>
              ))}
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex flex-row w-full ">
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
          <p className="text-white text-sm ">{dic.homepage.bestVideos}</p>
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
              <p className="text-white text-sm ">
                {dic.homepage.mostViewedImages}
              </p>
            </div>
            <div className="grid grid-rows-4 grid-cols-3 grid-flow-row gap-4 mt-10 grow max-h-[510px]">
              {imageData.slice(0, 9).map((items: any, index: number) => {
                return (
                  <Link
                    href={`/${lang}/app/assets/image/${items.name.replaceAll(
                      " ",
                      "-"
                    )}?id=${items.id}`}
                    key={items.id}
                    className={`relative overflow-hidden ${
                      index === 1
                        ? "rounded-[15%] w-full aspect-square col-span-2 row-span-2"
                        : "rounded-[15%] w-full aspect-square"
                    }`}
                  >
                    <Image
                      src={items.asset.thumbnails["336x366"]}
                      alt={items.name}
                      fill
                    />
                  </Link>
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
              <p className="text-white text-sm ">{dic.homepage.topTexts}</p>
            </div>
            <div className="flex md:grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-rows-1 md:grid-rows-2 mt-10 w-full grow">
              {textData.slice(0, 6).map((items: any, index: number) => {
                return (
                  <BorderGradient
                    key={items.id}
                    className="flex flex-col w-full aspect-square box-border rounded-3xl"
                    to="90deg"
                    sColor="#CFCFFC4D"
                    tColor="#CFCFFC00"
                  >
                    <Link
                      href={`/${lang}/app/assets/text/${items.name.replaceAll(
                        " ",
                        "-"
                      )}?id=${items.id}`}
                    >
                      <div key={index} className="h-full flex flex-col">
                        <p className="text-white text-lg line-clamp-3">
                          {items.name}
                        </p>
                        <p className="text-gray-500 mt-4">
                          {items.description?.slice(0, 62) + "..."}
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
                    </Link>
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
          <p className="text-white text-sm ">{dic.homepage.bestSongs}</p>
        </div>
        <SongSlider />
      </div>
    </Motion>
  );
};
export default Home;
