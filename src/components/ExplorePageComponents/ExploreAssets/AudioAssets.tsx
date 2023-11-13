import {
  getMostViewedSongs,
  getRecentlySongs,
} from "@/services/contactService";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import ExploreAudioCard from "../shared/AudioCard";
import Link from "next/link";
import ExploreSearchAndNavSection from "./SearchAndNavSection";

export const audioData = [
  {
    id: 1,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
    image: "/images/nasa.png",
  },
  {
    id: 2,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
  },
  {
    id: 3,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
    image: "/images/nasa.png",
  },
];
const getMostViewedSongsData = async () => {
  const liveData = await getMostViewedSongs();
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlySongsData = async () => {
  const liveData = await getRecentlySongs();
  if (liveData.ok) {
    return liveData.json();
  }
};
const ExploreAudioAssets = async ({ activeTab }: { activeTab: string }) => {
  const [mostViewedSongs] = await Promise.all([getMostViewedSongsData()]);

  return (
    <>
      <ExploreSearchAndNavSection activeTab={activeTab} />
      <div className="flex flex-col items-stretch gap-6 pb-8 px-6">
        {/* best in month */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="text-white text-sm ">Best in month</p>
            </div>
            <div className="text-[14px] text-[#597AFF]">View all</div>
          </div>
          <div>
            <div className="overflow-x-hidden">
              <div className="flex items-stretch gap-4 overflow-x-auto [&_>_*]:w-[200px]">
                {mostViewedSongs.slice(0, 10).map((item: any) => (
                  <ExploreAssetsCard
                    key={item.id}
                    type="audio"
                    cover={item.asset.thumbnails["336x366"]}
                    title={item.name}
                    author={{
                      name: item.asset.user.username,
                      picture: item.asset.user.image_url,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* recently */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="text-white text-sm ">Recently</p>
            </div>
            <Link
              href={`/explore?section=explore&content=recently&type=audios`}
              className="text-[14px] text-[#597AFF]"
            >
              View all
            </Link>
          </div>
          <RecentlyAudio />
        </div>
      </div>
    </>
  );
};

export default ExploreAudioAssets;

export const RecentlyAudio = async () => {
  const rececentlySongsData = await getRecentlySongsData();
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6">
      {rececentlySongsData.map((items: any, index: number) => {
        return (
          <ExploreAudioCard
            key={items.id}
            author={{
              name: items.asset.user.username,
              picture: items.asset.user.image_url,
            }}
            description={items.description}
            image={items.asset.thumbnails["336x366"]}
            time={items.length}
            title={items.name}
          />
        );
      })}
    </div>
  );
};
