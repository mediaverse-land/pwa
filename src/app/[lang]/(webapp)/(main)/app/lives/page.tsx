import {
  BACK_ICON,
  CHEVRON_LEFT,
  SEARCH_SETTING_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import Link from "next/link";
import { getLives } from "@/services/contactService";
import LiveChannelSearchFrom from "@/components/ExplorePageComponents/ExploreAssetsComponents/LiveChannelSearchForm";

const getLiveData = async (params?: string) => {
  const liveData = await getLives({ params });
  if (liveData.ok) {
    return liveData.json();
  }
};

const WebAppLiveChannelPage = async (params: any) => {
  const channels = await getLiveData(
    `${params.searchParams.title ? `?title=${params.searchParams.title}` : ""}`
  );
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 flex flex-col items-stretch justify-between bg-[rgba(78,78,97,0.50)] backdrop-blur gap-4">
        {/* input section */}
        <div className="flex items-center h-[40px]">
          <div className="bg-[rgba(14,14,18,0.20)] h-full border border-[#353542] rounded-lg px-4 py-3 flex items-center justify-between grow mr-4">
            <LiveChannelSearchFrom searchParams={params.searchParams} />
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
          <Link href={`/app/explore`} className="mr-auto">
            <BACK_ICON fill="#666680" />
          </Link>
          <div className="grow text-center font-semibold">Live Channel</div>
        </div>
        <div className="flex flex-col items-stretch h-full overflow-y-auto gap-2">
          {channels.map((item: any) => (
            <Link
              href={`/app/lives/${item.id}`}
              key={item.id}
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

export default WebAppLiveChannelPage;
