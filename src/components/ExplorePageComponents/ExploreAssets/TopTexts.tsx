import BorderGradient from "@/components/BorderGradient";
import { TEXT_ICON } from "@/components/SVG/svgs";
import Image from "next/image";
import ExploreTextCard from "../shared/TextCard";

const ExploreTopTexts = () => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TEXT_ICON />
          <p className="text-white text-sm ">Top 10 texts</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex gap-4 overflow-x-auto">
            {/* card */}
            <ExploreTextCard />
            <ExploreTextCard />
            <ExploreTextCard />
            <ExploreTextCard />
            <ExploreTextCard />
            <ExploreTextCard />
            <ExploreTextCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopTexts;
