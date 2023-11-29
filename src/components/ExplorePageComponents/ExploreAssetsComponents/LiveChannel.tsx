import { getLives } from "@/services/contactService";
import Image from "next/image";
import Link from "next/link";

const getLiveData = async (params?: string) => {
  const liveData = await getLives({ params });
  if (liveData.ok) {
    return liveData.json();
  }
};

export const ExploreLiveChannel = ({ liveData }: { liveData: any }) => {
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
        <Link
          href={`/web-app/live-channel`}
          className="text-[14px] text-[#597AFF]"
        >
          View all
        </Link>
      </div>
      <div className="">
        <div className="flex w-full">
          <div className="flex w-full overflow-x-auto items-center">
            {liveData.map((item: any, i: number) => (
              <Link
                href={`/web-app/live-channel/${item.id}`}
                key={i}
                className="relative rounded-[8px] min-w-[190px] w-[190px] h-[125px] min-h-[190px] mr-[8px] overflow-hidden"
              >
                <Image className="" src={item.thumbnail} alt="" fill />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
