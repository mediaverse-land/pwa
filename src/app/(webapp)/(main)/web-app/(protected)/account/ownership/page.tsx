import {
  OwnershipAllAssets,
  OwnershipAudioAssets,
  OwnershipImageAssets,
  OwnershipTextAssets,
  OwnershipVideoAssets,
} from "@/components/ExplorePageComponents/AccountComponents/OwnershipAssets";
import {
  AUDIO_ICON,
  PICTURE_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import WebAppAccountTopSection from "@/components/WebApp/Account/TopSection";
import Link from "next/link";
import { redirect } from "next/navigation";
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
    link: "images",
    active_icon: <PICTURE_ICON />,
    inactive_icon: <PICTURE_ICON fill="#666680" />,
  },
  {
    id: 3,
    name: "Videos",
    link: "videos",
    active_icon: <VIDEO_ICON />,
    inactive_icon: <VIDEO_ICON fill="#666680" />,
  },
  {
    id: 4,
    name: "Audios",
    link: "audios",
    active_icon: <AUDIO_ICON />,
    inactive_icon: <AUDIO_ICON fill="#666680" />,
  },
  {
    id: 5,
    name: "Texts",
    link: "texts",
    active_icon: <TEXT_ICON />,
    inactive_icon: <TEXT_ICON fill="#666680" />,
  },
];

const WebAppAccountOwnership = (params: any) => {
  const activeTab = params.searchParams.type || ExploreSectionNavs[0].name;
  const assetComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    All: {
      component: <OwnershipAllAssets searchParams={params.searchParams} />,
    },
    Images: {
      component: <OwnershipImageAssets searchParams={params.searchParams} />,
    },
    Texts: {
      component: <OwnershipTextAssets searchParams={params.searchParams} />,
    },
    Audios: {
      component: <OwnershipAudioAssets searchParams={params.searchParams} />,
    },
    Videos: {
      component: <OwnershipVideoAssets searchParams={params.searchParams} />,
    },
  };
  return (
    <div className="w-full h-full overflow-y-auto">
      <WebAppAccountTopSection type="ownership" />
      <div className="flex flex-col items-stretch gap-6 mt-3 w-full px-8">
        <div className="rounded-lg grid grid-flow-col grid-rows-1 bg-[#0E0E1280] backdrop-blur-md">
          {ExploreSectionNavs.map((tab) => (
            <Link
              href={`/web-app/account/ownership${
                tab.link ? `?type=${tab.name}` : ""
              }`}
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
        <div className="">
          {assetComponents[activeTab]?.component ||
            redirect("/web-app/account/ownership")}
        </div>
      </div>
    </div>
  );
};

export default WebAppAccountOwnership;
