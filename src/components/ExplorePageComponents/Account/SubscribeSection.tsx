import Link from "next/link";
import { ExploreSectionNavs } from "../Explore";
import { audioData } from "../ExploreAssets/AudioAssets";
import ExploreAudioCard from "../shared/AudioCard";

const AccountSubscribeSection = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const activeTab = searchParams.content || "all";
  return (
    <div className="flex flex-col items-stretch gap-6 mt-3 w-full px-8">
      <div className="rounded-lg grid grid-flow-col grid-rows-1 bg-[#0E0E1280] backdrop-blur-md">
        {ExploreSectionNavs.map((tab) => (
          <Link
            href={`/explore?section=explore&content=${tab.link}`}
            key={tab.id}
            className="text-center flex flex-col items-center justify-center cursor-pointer h-full"
          >
            <div
              className={`py-2 w-fit h-full flex items-center justify-center px-2 transition-all duration-500 after:content-[''] relative after:absolute after:bg-[#597AFF] after:rounded-full after:left-0 after:bottom-0 ${
                activeTab === tab.link
                  ? "after:w-full after:h-[2px]"
                  : "after:w-[0%] after:h-[0px]"
              }`}
            >
              {activeTab === tab.link ? tab.active_icon : tab.inactive_icon}
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-6">
        {audioData.map((items, index: number) => {
          return (
            <ExploreAudioCard
              key={items.id}
              author={items.author}
              description={items.description}
              image={items.image}
              time={items.time}
              title={items.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccountSubscribeSection;
