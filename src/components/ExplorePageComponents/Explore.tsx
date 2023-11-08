// "use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Motion from "../motion";
import Link from "next/link";
import { AUDIO_ICON, PICTURE_ICON, TEXT_ICON, VIDEO_ICON } from "../SVG/svgs";
import ExploreAllAssets from "./ExploreAssets/ExploreAllAssets";
type IExploreSectionNavs = {
  id: number;
  name: string;
  link: string;
  active_icon: JSX.Element;
  inactive_icon: JSX.Element;
  component: JSX.Element;
};
const ExploreSectionNavs: IExploreSectionNavs[] = [
  {
    id: 1,
    name: "All",
    link: "all",
    active_icon: <span className="text-[14px] text-[#D9D9FF]">All</span>,
    inactive_icon: <span className="text-[#666680] text-[14px]">All</span>,
    component: <ExploreAllAssets />,
  },
  {
    id: 2,
    name: "pictures",
    link: "pictures",
    active_icon: <PICTURE_ICON />,
    inactive_icon: <PICTURE_ICON fill="#666680" />,
    component: <div>component</div>,
  },
  {
    id: 3,
    name: "Videos",
    link: "videos",
    active_icon: <VIDEO_ICON />,
    inactive_icon: <VIDEO_ICON fill="#666680" />,
    component: <div>component</div>,
  },
  {
    id: 4,
    name: "Audio",
    link: "audio",
    active_icon: <AUDIO_ICON />,
    inactive_icon: <AUDIO_ICON fill="#666680" />,
    component: <div>component</div>,
  },
  {
    id: 5,
    name: "Texts",
    link: "texts",
    active_icon: <TEXT_ICON />,
    inactive_icon: <TEXT_ICON fill="#666680" />,
    component: <div>component</div>,
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
    <Motion key={"ExploreSection"}>
      <div className="w-full h-full">
        <div className="flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-stretch gap-6 sticky top-0 left-0 w-full z-30">
            {/* search section */}
            <div className="bg-[#0E0E124D] p-6 backdrop-blur-md rounded-b-[45px_35px]">
              <div className="h-[40px] rounded-lg px-4 py-3 border border-[#353542] flex gap-8 items-center">
                <input
                  className="outline-none grow bg-transparent text-[14px]"
                  type="text"
                  placeholder="Search"
                />
                <div>icon</div>
              </div>
            </div>
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
            {
              ExploreSectionNavs.find((tab) => tab.link === activeTab)
                ?.component
            }
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default ExploreSection;
