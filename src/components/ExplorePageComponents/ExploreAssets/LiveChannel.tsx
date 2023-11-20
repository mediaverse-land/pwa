import {
  BACK_ICON,
  CHEVRON_LEFT,
  SEARCH_SETTING_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import Link from "next/link";
import SecondSearchForm from "../SearchSectionComponents/SecondSearchForm";
import LiveChannelSearchFrom from "./LiveChannelSearchForm";
import { getLives } from "@/services/contactService";

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
          href={`/explore?section=explore&content=live-channels`}
          className="text-[14px] text-[#597AFF]"
        >
          View all
        </Link>
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

export const AllLiveChanells = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const channels = await getLiveData(
    `${searchParams.title ? `?title=${searchParams.title}` : ""}`
  );
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 flex flex-col items-stretch justify-between bg-[rgba(78,78,97,0.50)] backdrop-blur gap-4">
        {/* input section */}
        <div className="flex items-center h-[40px]">
          <div className="bg-[rgba(14,14,18,0.20)] h-full border border-[#353542] rounded-lg px-4 py-3 flex items-center justify-between grow mr-4">
            <LiveChannelSearchFrom searchParams={searchParams} />
          </div>
          <div className="rounded-lg p-2 aspect-square border border-[#353542] bg-[rgba(14,14,18,0.20)] h-full">
            <SEARCH_SETTING_ICON
              style={{
                width: "100%",
                height: "100%",
              }}
              fill="#666680"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-8 px-10 py-10">
        <div className="flex items-center">
          <Link
            href={`/explore?section=explore&content=explore`}
            className="mr-auto"
          >
            <BACK_ICON fill="#666680" />
          </Link>
          <div className="grow text-center font-semibold">Live Channel</div>
        </div>
        <div className="flex flex-col items-stretch h-full overflow-y-auto gap-2">
          {channels.map((item: any) => (
            <Link
              target="_blank"
              href={item.link}
              className="p-4 rounded-2xl bg-[rgba(78,78,97,0.50)] backdrop-blur-sm flex items-center"
            >
              <div className="mr-auto flex items-center gap-4">
                <div className="relative w-[88px] h-[48px] overflow-hidden rounded-lg">
                  <Image
                    src={item.thumbnail}
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="uppercase text-white font-semibold">
                    {item.title}
                  </div>
                  <div className="text-[#666680] text-[12px]">
                    {item.country}
                  </div>
                </div>
              </div>
              <div>
                <CHEVRON_LEFT
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
