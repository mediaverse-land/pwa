
import { SongSlider, VideoSlider } from "@/components";
import ClientImage from "@/components/ClientImage";
import { getMostViewedImages, getMostViewedText } from "@/services/contactService";
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


const Home = async () => {

  const imageData = await getImageData();
  const textData = await getTextData();

  return (<div className=" mt-28">
    <Image src="/images/media-verse-background-image.png"
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
        Mediaverse Platform is the next generation of media asset management tools for social TVs (or social media) that helps users manage the content cycle from procurement (or production) to distribution.
        </p>
        <div className="flex space-x-2 mt-[28px]">
          <div className="app-store-container cursor-pointer py-[4px] px-[19px]">
            <Image src="/images/apple-app-store-logo.png" quality={100} width={135} height={48} alt="google play store logo" />
          </div>
          <div className="app-store-container cursor-pointer py-[4px] px-[12px] ">
            <Image src="/images/google-play-store-logo.png" quality={100} width={135} height={48} alt="google play store logo" />
          </div>
        </div>
        <button type="submit" className="w-[278px] h-10 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm  py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-[28px]">Web App</button>
      </div>
      <div className="flex space-x-4 mt-8 sm:mt-0 animate-container">
        <Image src="/images/phone-image-1.png" className="phone-animate-2 relative z-20 " width={170} height={500} quality={100} alt="phone photo" />
        <Image src="/images/phone-image-2.png" className="phone-animate-1 relative" width={170} height={500} quality={100} alt="phone photo" />
      </div>
    </div>
    <div className="w-full flex items-center justify-center mt-20">
      <button className=" flex flex-col items-center justify-center">
        <a className="text-white text-2xl font-semibold">Explore limitless!</a>
        <Image src="/icons/down-icon.png" className="mt-2 animate-icon relative" alt="down" width={15} height={15} quality={100} />
      </button>
    </div>
    <div className="w-full flex items-center justify-center mt-10 space-x-1">
      <Image src="/icons/live-icon.png" quality={100} width={20} height={20} alt="camera icon" />
      <p className="text-white text-sm ">live channel</p>
    </div>
    <div className=" max-w-screen-2xl mx-auto flex items-center justify-center" id="live">
      <div className="slider mt-8">
        <div className="slide-track space-x-2">
          <img src="/images/netflix.png" alt="" />
          <img src="/images/nasa.png" alt="" />
          <img src="/images/cnn.png" alt="" />
          <img src="/images/netflix.png" alt="" />
          <img src="/images/nasa.png" alt="" />
          <img src="/images/cnn.png" alt="" />
          <img src="/images/netflix.png" alt="" />
          <img src="/images/nasa.png" alt="" />
          <img src="/images/cnn.png" alt="" />
          <img src="/images/netflix.png" alt="" />
        </div>
      </div>
    </div>
    <div className="w-full flex items-center justify-center mt-16 space-x-1">
      <Image src="/icons/video-icon.png" quality={100} width={16} height={16} alt="camera icon" />
      <p className="text-white text-sm ">Best videos</p>
    </div>
    <VideoSlider />
    <div className="flex  max-w-screen-2xl mx-auto mt-16 justify-evenly flex-col items-center sm:flex-row sm:px-0 px-2">
      <div className="flex flex-col">
        <div className=" flex space-x-2 ml-1 w-full">
          <Image src="/icons/gallery.png" quality={100} width={18} height={10} alt="galery" />
          <p className="text-white text-sm ">Most viewed</p>
        </div>
        <div className="grid grid-rows-4 grid-flow-col gap-2 mt-10">
          {imageData.map((items: any, index: number) => {
            return <ClientImage key={index} className={index === 4 ? "rounded-xl w-64 h-64 col-span-2 row-span-2" : "rounded-xl w-32 h-32 "} src={items.asset.thumbnails["336x366"]}  alt="photo" />
          })}

        </div>
      </div>
      <div className="flex flex-col w-ultra">
        <div className=" flex space-x-2 ml-1 sm:mt-0">
          <Image src="/icons/text.png" quality={100} width={18} height={10} alt="galery" />
          <p className="text-white text-sm ">Top texts</p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-10">
          {textData.slice(0, 6).map((items: any, index: number) => {
            return <div key={index} className="flex flex-col aspect-square px-10 py-[1.75rem] box-border rounded-3xl  bg-card ">
              <p className="text-white text-lg">{items.name}</p>
              <p className="text-gray-500 mt-4">{items.description?.slice(0, 65)}</p>
              <div className="flex mt-4 space-x-2">
                <Image src="/images/mini-avatar.png" alt="avatar" width={16} height={16} quality={100} />
                <p className="text-xs text-gray-500">{items.asset.user.username}</p>
              </div>
            </div>
          })}
        </div>

      </div>

    </div>
    <div className="w-full flex items-center justify-center mt-16 space-x-1">
      <Image src="/icons/songs.png" quality={100} width={16} height={16} alt="camera icon" />
      <p className="text-white text-sm ">Best songs</p>
    </div>
    <SongSlider />
  </div>

  );
}
export default Home;