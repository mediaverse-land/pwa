import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { VIDEO_ICON } from "@/components/SVG/svgs";
import ExploreVideoCard from "../shared/VideoCard";

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

const ExploreVideoAssets = async () => {
  return (
    <div className="flex flex-col items-stretch gap-6 pb-8">
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
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
              <ExploreAssetsCard type="video" />
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
          <div className="text-[14px] text-[#597AFF]">View all</div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-6">
          {videoData.map((items, index: number) => {
            return (
              <ExploreVideoCard
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
    </div>
  );
};

export default ExploreVideoAssets;
