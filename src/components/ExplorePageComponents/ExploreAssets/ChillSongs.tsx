import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { AUDIO_ICON } from "@/components/SVG/svgs";

const ExploreChillSongs = () => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AUDIO_ICON />
          <p className="text-white text-sm ">Chill Songs</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
            <ExploreAssetsCard type="audio" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreChillSongs;
