import { SongSlider, VideoSlider } from "@/components";
import BorderGradient from "@/components/BorderGradient";
import ScrollToBottomBtn from "@/components/Buttons/ScrollToBottom";
import Motion from "@/components/motion";
import { imagePlaceHolders, logoURL, playStoreLink } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { locales } from "@/middleware";
import {
  getHome,
  getLives,
  getMostViewedImages,
  getMostViewedText,
} from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const getHomeData = async (lang: Locale) => {
  const homeDataReq = await getHome(FullLocaleNames[lang]);
  const homeDataRes = await homeDataReq.json();
  return homeDataRes;
};

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const homeData = await getHomeData(lang);
  return {
    description: homeData.description,
    keywords: homeData.keywords,
    openGraph: {
      description: homeData.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

async function getImageData(lang: TFullLocales) {
  const image = await getMostViewedImages(lang);

  if (!image.ok) {
    // throw new Error("Failed to fetch data");
    return [];
  }
  return image.json();
}

async function getTextData(lang: TFullLocales) {
  const text = await getMostViewedText(lang);

  if (!text.ok) {
    // throw new Error("Failed to fetch data");
    return [];
  }
  return text.json();
}

async function getSliderData(lang: TFullLocales) {
  const text = await getLives({ params: "", lang });
  if (!text.ok) {
    // throw new Error("Failed to fetch data");
    return [];
  }
  return text.json();
}
const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dic = await getDictionary(
    locales.find((item) => item === lang) ?? locales[0]
  );
  const imageData = await getImageData(FullLocaleNames[lang]);
  const textData = await getTextData(FullLocaleNames[lang]);
  const liveData = await getSliderData(FullLocaleNames[lang]);

  return (
    <Motion>
      <div className="mt-16 lg:mt-28 w-full overflow-x-hidden">
        <div className="absolute top-28 left-[24px] right-[24px] lg:right-auto lg:-left-[200px] lg:top-4 -z-[10] h-[420px] lg:w-[740px] lg:h-[625px]">
          <Image
            src="/images/app-background-image.svg"
            alt="background Image"
            quality={100}
            fill
          />
        </div>
        <div className="lg:max-w-screen-2xl mx-auto flex justify-evenly flex-wrap-reverse lg:flex-wrap px-8 lg:px-4">
          <div className="flex flex-col t-10">
            <h1 className="text-[25px] lg:text-3xl font-bold lg:font-semibold whitespace-nowrap text-white mt-16 text-center lg:text-start">
              {dic.homepage.whatIs}
            </h1>
            <p className="text-gray-500 mt-4 self-center text-start">
              {dic.homepage.description}
            </p>
            <div className="grid grid-cols-2 mt-[28px] w-[278px] mx-auto lg:mx-0 gap-[8px]">
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
                href={playStoreLink || ""}
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
              className="lg:w-[278px] h-10 text-white focus:ring-4 focus:outline-none font-semibold lg:font-medium rounded-full text-sm leading-none flex justify-center items-center py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-[28px]"
            >
              Web App
            </Link>
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse mt-8 sm:mt-0 animate-container">
            <div className="relative phone-animate-2 z-20 w-[111px] h-[286px] lg:w-[200px] lg:h-[480px]">
              <Image
                src="/images/phone-image-1-1.png"
                fill
                quality={100}
                alt="phone photo"
                className=""
              />
            </div>
            <div className="phone-animate-1 relative z-20 w-[111px] h-[286px] lg:w-[170px] lg:h-[500px]">
              <Image
                src="/images/phone-image-2.png"
                className="phone-animate-1 relative"
                fill
                quality={100}
                alt="phone photo"
              />
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:flex items-center justify-center mt-20">
          <ScrollToBottomBtn title={dic.homepage.exploreLimitless} />
        </div>
        {/* live channels */}
        <div className="w-full flex items-center justify-center mt-10 space-x-2 rtl:space-x-reverse">
          <div className="w-[24px] lg:w-[20px] lg:h-[20px] h-[24px] relative">
            <Image
              src="/icons/live-icon.png"
              quality={100}
              fill
              alt="camera icon"
            />
          </div>
          <p className="text-white text-[18px] font-bold lg:text-sm">
            {dic.homepage.liveTvChannels}
          </p>
        </div>
        <div className="lg:max-w-screen-2xl mx-auto flex items-center justify-center py-4 w-[80rem]">
          <div className="relative flex overflow-x-hidden w-full animate-marquee-container">
            <div className="animate-marquee whitespace-nowrap flex flex-row w-full">
              {liveData.data?.map((item: any, i: number) => (
                <Link href={`/${lang}/app/channels/${item.id}`} key={item.id}>
                  <img
                    className="rounded-[8px] w-[154px] h-[100px] mr-[8px]"
                    src={item.thumbnail || imagePlaceHolders.image}
                    alt=""
                  />
                </Link>
              ))}
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex flex-row w-full ">
              {liveData.data?.map((item: any, i: number) => (
                <img
                  key={i}
                  className="rounded-[8px] w-[154px] h-[100px] mr-[8px]"
                  src={item.thumbnail || imagePlaceHolders.image}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
        {/* videos */}
        <div className="w-full flex items-center justify-center mt-10 space-x-2 rtl:space-x-reverse">
          <div className="w-[21px] lg:w-[20px] h-[16px] lg:h-[18px] relative">
            <Image
              src="/icons/video-icon.png"
              quality={100}
              fill
              alt="camera icon"
            />
          </div>
          <p className="text-white text-[18px] font-bold lg:text-sm">
            {dic.homepage.bestVideos}
          </p>
        </div>
        <VideoSlider />
        {/* images and texts */}
        <div className="flex w-full max-w-[700px] xl:w-[80rem] lg:max-w-screen-2xl mx-auto mt-16 justify-between gap-10 flex-col items-start lg:flex-row sm:px-0 px-2">
          {/* images */}
          <div className="flex flex-col w-full lg:w-[33%] h-full">
            <div className="flex space-x-2 rtl:space-x-reverse ml-1 w-full items-center justify-center">
              <Image
                src="/icons/gallery.png"
                quality={100}
                width={18}
                height={10}
                alt="galery"
              />
              <p className="text-white text-[18px] font-bold lg:text-sm">
                {dic.homepage.mostViewedImages}
              </p>
            </div>
            <div className="grid grid-rows-4 grid-cols-3 grid-flow-row gap-2 mt-10 grow px-6 min-w-full">
              {imageData.data?.slice(0, 9)?.map((items: any, index: number) => {
                return (
                  <Link
                    href={`/${lang}/app/assets/image/${items.name.replaceAll(
                      " ",
                      "-"
                    )}?id=${items.id}`}
                    key={items.id}
                    className={`relative overflow-hidden aspect-square ${
                      index === 1
                        ? "rounded-md lg:rounded-[15%] col-span-2 row-span-2"
                        : "rounded-md lg:rounded-[15%]"
                    }`}
                  >
                    <Image
                      src={
                        items.thumbnails["336x366"] || imagePlaceHolders.image
                      }
                      alt={items.name}
                      fill
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          {/* texts */}
          <div className="flex flex-col w-full lg:w-[60%] h-full md:pr-4 xl:pr-0">
            <div className="flex w-full items-center justify-center space-x-2 rtl:space-x-reverse ml-1 sm:mt-0">
              <Image
                src="/icons/text.png"
                quality={100}
                width={18}
                height={10}
                alt="galery"
              />
              <p className="text-white text-[18px] font-bold lg:text-sm">
                {dic.homepage.topTexts}
              </p>
            </div>

            <div className="grid grid-flow-col lg:grid-cols-3 md:grid-cols-3 gap-2 grid-rows-1 md:grid-rows-2 lg:grid-rows-2 mt-10 w-full grow overflow-x-scroll lg:overflow-visible px-4">
              {textData.data?.slice(0, 6)?.map((items: any, index: number) => {
                return (
                  <BorderGradient
                    key={items.id}
                    className="flex flex-col w-full min-w-[250px] md:min-w-0 aspect-square box-border rounded-3xl"
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
                        <p className="text-white text-lg lg:text-[16px] xl:text-[20px] line-clamp-2 md:line-clamp-2 lg:line-clamp-1 xl:line-clamp-2">
                          {items.name}
                        </p>
                        <p className="text-gray-500 mt-2 lg:mt-0 xl:mt-4 line-clamp-4 md:line-clamp-3 lg:line-clamp-3">
                          {items.description?.length > 70
                            ? items.description?.slice(0, 62)
                            : items.description}
                        </p>
                        <div className="flex mt-auto space-x-2 rtl:space-x-reverse">
                          <Image
                            src="/images/mini-avatar.png"
                            alt="avatar"
                            width={16}
                            height={16}
                            quality={100}
                          />
                          <p className="text-xs text-gray-500">
                            {items.user.username}
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
        {/* songs */}
        <div className="w-full flex items-center justify-center mt-16 space-x-2 rtl:space-x-reverse">
          <Image
            src="/icons/songs.png"
            quality={100}
            width={16}
            height={16}
            alt="camera icon"
          />
          <p className="text-white text-[18px] font-bold lg:text-sm">
            {dic.homepage.bestSongs}
          </p>
        </div>
        <SongSlider />
      </div>
    </Motion>
  );
};
export default Home;
