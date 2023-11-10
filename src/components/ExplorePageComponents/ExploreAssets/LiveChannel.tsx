import Image from "next/image";

const ExploreLiveChannel = ({ liveData }: { liveData: any }) => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/live-icon.png"
            quality={100}
            width={20}
            height={20}
            alt="camera icon"
          />
          <p className="text-white text-sm ">live channel</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div className=" max-w-screen-2xl mx-auto flex items-center justify-center w-[80rem]">
        <div className="relative flex overflow-x-hidden w-full">
          <div className="animate-marquee whitespace-nowrap flex flex-row w-full gap-3">
            {liveData.map((item: any, i: number) => (
              <img
                key={i}
                className="rounded-[8px] w-[154px] h-[100px] mr-[12px]"
                src={item.thumbnail}
                alt=""
              />
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex flex-row w-full ">
            {liveData.map((item: any, i: number) => (
              <div
                key={i}
                className="relative rounded-[8px] w-[154px] h-[100px] mr-[8px] overflow-hidden"
              >
                <Image className="" src={item.thumbnail} alt="" fill />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreLiveChannel;
