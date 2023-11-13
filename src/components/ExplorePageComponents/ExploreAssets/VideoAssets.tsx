import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { VIDEO_ICON } from "@/components/SVG/svgs";
import ExploreVideoCard from "../shared/VideoCard";
import {
  getMostViewedVideos,
  getRecentlyVideos,
} from "@/services/contactService";
import Link from "next/link";
import ExploreSearchAndNavSection from "./SearchAndNavSection";

const videoData = [
  {
    id: 1,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
    image: "/images/nasa.png",
  },
  {
    id: 2,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
    image: "/images/nasa.png",
  },
  {
    id: 3,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
    image: "/images/nasa.png",
  },
];

const getMostViewedVideosData = async () => {
  const liveData = await getMostViewedVideos();
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlyVideosData = async () => {
  const liveData = await getRecentlyVideos();
  if (liveData.ok) {
    return liveData.json();
  }
};

const ExploreVideoAssets = async ({ activeTab }: { activeTab: string }) => {
  const [mostViewedVideos] = await Promise.all([getMostViewedVideosData()]);

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
              <div className="flex items-stretch gap-4 overflow-x-auto">
                {mostViewedVideos.slice(0, 10).map((item: any) => (
                  <ExploreAssetsCard
                    key={item.id}
                    type="video"
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
              href={`/explore?section=explore&content=recently&type=videos`}
              className="text-[14px] text-[#597AFF]"
            >
              View all
            </Link>
          </div>
          <RecentlyVideos />
        </div>
      </div>
    </>
  );
};

export default ExploreVideoAssets;

export const RecentlyVideos = async () => {
  const rececentlyVideosData = await getRecentlyVideosData();
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-6">
      {rececentlyVideosData.map((items: any, index: number) => {
        return (
          <ExploreVideoCard
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
