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
import AccountSection from "./Account";
import ExploreRecently from "./Recently";
type IExploreSectionNavs = {
  id: number;
  name: string;
  link: string;
  active_icon?: JSX.Element;
  inactive_icon?: JSX.Element;
  component?: JSX.Element;
};
export const ExploreSectionNavs: IExploreSectionNavs[] = [
  {
    id: 1,
    name: "All",
    link: "all",
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
    name: "Audio",
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

const ExploreSection = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const activeTab = searchParams.content || "all";
  const dynamicComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    all: {
      component: (
        <div key="ExploreAllAssets" className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-stretch gap-8">
            <ExploreAllAssets activeTab={activeTab} />
          </div>
        </div>
      ),
    },
    images: {
      component: (
        <div key="ExploreImageAssets" className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-stretch gap-8">
            <ExploreImageAssets activeTab={activeTab} />
          </div>
        </div>
      ),
    },
    videos: {
      component: (
        <div key="ExploreVideoAssets" className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-stretch gap-8">
            <ExploreVideoAssets activeTab={activeTab} />
          </div>
        </div>
      ),
    },
    audios: {
      component: (
        <div key="ExploreAudioAssets" className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-stretch gap-8">
            <ExploreAudioAssets activeTab={activeTab} />
          </div>
        </div>
      ),
    },
    texts: {
      component: (
        <div key="ExploreTextsAssets" className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-stretch gap-8">
            <ExploreTextsAssets activeTab={activeTab} />
          </div>
        </div>
      ),
    },
    recently: {
      component: (
        <div
          key={"recently"}
          className="col-span-4 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-y-auto h-full flex flex-col items-stretch gap-4"
          style={{ background: `rgba(78, 78, 97, 0.20)` }}
        >
          <ExploreRecently searchParams={searchParams} />
        </div>
      ),
    },
    search: {
      component: (
        <div
          key={"search"}
          className="col-span-4 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-y-auto flex flex-col items-stretch gap-4"
          style={{ background: `rgba(78, 78, 97, 0.20)` }}
        >
          <AccountSection searchParams={searchParams} />
        </div>
      ),
    },
  };

  return (
    <Motion key={"ExploreSection"} fullHeight>
      {dynamicComponents[activeTab]?.component
        ? dynamicComponents[activeTab].component
        : redirect("/explore?section=explore")}
    </Motion>
  );
};

export default ExploreSection;
