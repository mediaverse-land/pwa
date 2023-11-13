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
      <div className="">
        <div className="flex w-full">
          <div className="flex w-full overflow-x-auto items-center">
            {liveData.map((item: any, i: number) => (
              <div
                key={i}
                className="relative rounded-[8px] min-w-[190px] w-[190px] h-[125px] mr-[8px] overflow-hidden"
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
