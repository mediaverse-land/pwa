import {
  AUDIO_ICON,
  PICTURE_ICON,
  SEARCH_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import Link from "next/link";
type IExploreSectionNavs = {
  id: number;
  name: string;
  link: string;
  active_icon?: JSX.Element;
  inactive_icon?: JSX.Element;
  component?: JSX.Element;
};
const ExploreSectionNavs: IExploreSectionNavs[] = [
  {
    id: 1,
    name: "All",
    link: "",
    active_icon: <span className="text-[14px] text-[#D9D9FF]">All</span>,
    inactive_icon: <span className="text-[#666680] text-[14px]">All</span>,
  },
  {
    id: 2,
    name: "Images",
    link: "/images",
    active_icon: <PICTURE_ICON />,
    inactive_icon: <PICTURE_ICON fill="#666680" />,
  },
  {
    id: 3,
    name: "Videos",
    link: "/videos",
    active_icon: <VIDEO_ICON />,
    inactive_icon: <VIDEO_ICON fill="#666680" />,
  },
  {
    id: 4,
    name: "Audios",
    link: "/audios",
    active_icon: <AUDIO_ICON />,
    inactive_icon: <AUDIO_ICON fill="#666680" />,
  },
  {
    id: 5,
    name: "Texts",
    link: "/texts",
    active_icon: <TEXT_ICON />,
    inactive_icon: <TEXT_ICON fill="#666680" />,
  },
];

const ExploreSearchAndNavSection = ({
  activeTab,
}: {
  activeTab: "All" | "Images" | "Videos" | "Audios" | "Texts";
}) => {
  return (
    <div className="flex flex-col items-stretch gap-6 sticky top-0 left-0 w-full z-50">
      {/* search section */}
      <Link
        href={`/web-app/explore/search-form`}
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
      <div className="rounded-lg grid grid-flow-col grid-rows-1 bg-[#0E0E1280] backdrop-blur-md mx-10">
        {ExploreSectionNavs.slice(0, 5).map((tab) => (
          <Link
            href={`/web-app/explore/assets${tab.link}`}
            key={tab.id}
            className="text-center flex flex-col items-center justify-center cursor-pointer h-full"
          >
            <div
              className={`py-2 w-fit h-full flex items-center justify-center px-2 transition-all duration-500 after:content-[''] relative after:absolute after:bg-[#597AFF] after:rounded-full after:left-0 after:bottom-0 ${
                activeTab === tab.name
                  ? "after:w-full after:h-[2px]"
                  : "after:w-[0%] after:h-[0px]"
              }`}
            >
              {activeTab === tab.name ? tab.active_icon : tab.inactive_icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchAndNavSection;
