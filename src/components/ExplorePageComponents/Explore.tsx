// "use client";
import {
  notFound,
  redirect,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Motion from "../motion";
import Link from "next/link";
import {
  AUDIO_ICON,
  PICTURE_ICON,
  SEARCH_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "../SVG/svgs";
import ExploreAllAssets from "./ExploreAssets/ExploreAllAssets";
import ExploreImageAssets from "./ExploreAssets/ImageAssets";
import ExploreVideoAssets from "./ExploreAssets/VideoAssets";
import ExploreAudioAssets from "./ExploreAssets/AudioAssets";
import ExploreTextsAssets from "./ExploreAssets/TextsAssets";
type IExploreSectionNavs = {
  id: number;
  name: string;
  link: string;
  active_icon: JSX.Element;
  inactive_icon: JSX.Element;
  component: JSX.Element;
};
export const ExploreSectionNavs: IExploreSectionNavs[] = [
  {
    id: 1,
    name: "All",
    link: "all",
    active_icon: <span className="text-[14px] text-[#D9D9FF]">All</span>,
    inactive_icon: <span className="text-[#666680] text-[14px]">All</span>,
    component: <ExploreAllAssets key="ExploreAllAssets" />,
  },
  {
    id: 2,
    name: "pictures",
    link: "pictures",
    active_icon: <PICTURE_ICON />,
    inactive_icon: <PICTURE_ICON fill="#666680" />,
    component: <ExploreImageAssets key="ExploreImageAssets" />,
  },
  {
    id: 3,
    name: "Videos",
    link: "videos",
    active_icon: <VIDEO_ICON />,
    inactive_icon: <VIDEO_ICON fill="#666680" />,
    component: <ExploreVideoAssets key="ExploreVideoAssets" />,
  },
  {
    id: 4,
    name: "Audio",
    link: "audio",
    active_icon: <AUDIO_ICON />,
    inactive_icon: <AUDIO_ICON fill="#666680" />,
    component: <ExploreAudioAssets key="ExploreAudioAssets" />,
  },
  {
    id: 5,
    name: "Texts",
    link: "texts",
    active_icon: <TEXT_ICON />,
    inactive_icon: <TEXT_ICON fill="#666680" />,
    component: <ExploreTextsAssets key="ExploreTextsAssets" />,
  },
];

const ExploreSection = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  // console.log(searchParams, "props");
  const activeTab = searchParams.content || "all";
  // console.log(activeTab, "activeTab");
  // const params = usePathname();
  // console.log(params.concat("&hello"));
  return (
    <Motion key={"ExploreSection"} fullHeight>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-stretch gap-6 sticky top-0 left-0 w-full z-50">
            {/* search section */}
            <Link
              href={`/explore?section=search`}
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
                    {activeTab === tab.link
                      ? tab.active_icon
                      : tab.inactive_icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-6">
            {ExploreSectionNavs.find((tab) => tab.link === activeTab)
              ? ExploreSectionNavs.find((tab) => tab.link === activeTab)
                  ?.component
              : redirect("/explore?section=explore")}
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default ExploreSection;
