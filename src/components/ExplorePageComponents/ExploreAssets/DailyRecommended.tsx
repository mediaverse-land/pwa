import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";

const ExploreDailyRecommended = () => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-white text-sm ">Daily recommended</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
            <ExploreAssetsCard type="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDailyRecommended;
