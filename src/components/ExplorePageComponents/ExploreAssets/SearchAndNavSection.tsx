import { SEARCH_ICON } from "@/components/SVG/svgs";
import Link from "next/link";
import { ExploreSectionNavs } from "../Explore";

const ExploreSearchAndNavSection = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="flex flex-col items-stretch gap-6 sticky top-0 left-0 w-full z-50">
      {/* search section */}
      <Link
        href={`/explore?section=explore&content=search`}
        className="bg-[#0E0E124D] p-6 backdrop-blur-md rounded-b-[45px_35px] select-none"
      >
        <div className="h-[40px] rounded-lg px-4 py-3 border border-[#353542] flex gap-8 items-center">
          <div className="outline-none grow bg-transparent text-[14px]">
            Search
          </div>
          <div>
            <SEARCH_ICON fill="#666680" />
          </div>
        </div>
      </Link>
      {/* tabs */}
      <div className="rounded-lg grid grid-flow-col grid-rows-1 bg-[#0E0E1280] backdrop-blur-md mx-6">
        {ExploreSectionNavs.slice(0, 5).map((tab) => (
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
    </div>
  );
};

export default ExploreSearchAndNavSection;
