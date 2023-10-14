import { VideoSlider } from "@/components";
import Image from "next/image";

const Home = () => {
  return (<div className=" mt-10">
    <Image src="/images/media-verse-background-image.png"
      height={1000}
      width={460}
      alt="background Image"
      className="absolute top-4 -z-10 "
      quality={100}
    />
    <div className="w-full flex justify-evenly flex-wrap px-4">
      <div className="flex flex-col t-10">
        <h1 className="text-3xl font-semibold whitespace-nowrap text-white mt-16">
          What is MediaVerse?
        </h1>
        <p className="text-gray-500 mt-4 self-center">
          MediaVerse is funded under the Horizon2020 scheme of the European Commission. The goal of this project is to set up a decentralised network of content management nodes through which content owners and creators can easily exchange content.
        </p>
        <div className="flex space-x-2 mt-4">
          <div className="app-store-container px-2 py-1 cursor-pointer">
            <Image src="/images/apple-app-store-logo.png" quality={100} width={70} height={40} alt="google play store logo" />
          </div>
          <div className="app-store-container px-2 py-1 cursor-pointer ">
            <Image src="/images/google-play-store-logo.png" quality={100} width={70} height={40} alt="google play store logo" />
          </div>
        </div>
        <button type="submit" className="w-1/2 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm  py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-4">Web App</button>
      </div>
      <div className="flex space-x-4 mt-8 sm:mt-0 animate-container">
        <Image src="/images/phone-image-1.png" className="phone-animate-2 relative z-50 " width={170} height={500} quality={100} alt="phone photo" />
        <Image src="/images/phone-image-2.png" className="phone-animate-1 relative" width={170} height={500} quality={100} alt="phone photo" />
      </div>
    </div>
    <div className="w-full flex items-center justify-center mt-20">
      <button className=" flex flex-col items-center justify-center">
        <p className="text-white font-semibold">Explore limitless!</p>
        <Image src="/icons/down-icon.png" className="mt-2 animate-icon relative" alt="down" width={15} height={15} quality={100} />
      </button>
    </div>
    <div className="w-full flex items-center justify-center mt-16 space-x-1">
      <Image src="/icons/live-icon.png" quality={100} width={20} height={20} alt="camera icon" />
      <p className="text-white text-xs ">live channel</p>
    </div>
    <div className="w-full flex items-center justify-center">
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

        </div>
      </div>
    </div>
    <div className="w-full flex items-center justify-center mt-16 space-x-1">
      <Image src="/icons/video-icon.png" quality={100} width={16} height={16} alt="camera icon" />
      <p className="text-white text-xs ">Best videos</p>
    </div>
      <VideoSlider />
    
  </div>

  );
}

export default Home;