import Link from "next/link";
import { ExploreSectionNavs } from "../Explore";
import { audioData } from "../ExploreAssetsComponents/AudioAssets";
import ExploreAudioCard from "../shared/AudioCard";
import {
  SubscribeAllAssets,
  SubscribeAudioAssets,
  SubscribeImageAssets,
  SubscribeTextAssets,
  SubscribeVideoAssets,
} from "./SubsribeAssets";
import { redirect } from "next/navigation";

const AccountSubscribeSection = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const activeTab = searchParams.content || ExploreSectionNavs[0].link;
  const assetComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    all: {
      component: <SubscribeAllAssets searchParams={searchParams} />,
    },
    images: {
      component: <SubscribeImageAssets searchParams={searchParams} />,
    },
    texts: {
      component: <SubscribeTextAssets searchParams={searchParams} />,
    },
    audios: {
      component: <SubscribeAudioAssets searchParams={searchParams} />,
    },
    videos: {
      component: <SubscribeVideoAssets searchParams={searchParams} />,
    },
  };
  return (
    <div className="flex flex-col items-stretch gap-6 mt-3 w-full px-8">
      <div className="rounded-lg grid grid-flow-col grid-rows-1 bg-[#0E0E1280] backdrop-blur-md">
        {ExploreSectionNavs.map((tab) => (
          <Link
            href={`/explore?section=account&type=subscribe&content=${tab.link}`}
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
      <div className="">
        {assetComponents[activeTab]?.component ||
          redirect("/explore?section=account&type=subscribe")}
      </div>
    </div>
  );
};

export default AccountSubscribeSection;
