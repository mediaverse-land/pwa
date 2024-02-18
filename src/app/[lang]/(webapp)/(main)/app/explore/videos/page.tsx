import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import ExploreAssetsCard from "@/components/ExplorePageComponents/shared/AllAssetsCard";
import ExploreVideoCard from "@/components/ExplorePageComponents/shared/VideoCard";
import { getDictionary } from "@/dictionary";
import {
  getMostViewedVideos,
  getRecentlyVideos,
} from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import Link from "next/link";

const getMostViewedVideosData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedVideos(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlyVideosData = async () => {
  const liveData = await getRecentlyVideos();
  if (liveData.ok) {
    return liveData.json();
  }
};

const WebAppExploreVideoAssets = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const [mostViewedVideos] = await Promise.all([
    getMostViewedVideosData(FullLocaleNames[lang]),
  ]);
  const dic = await getDictionary(lang);
  return (
    <div className="h-full overflow-y-auto">
      <ExploreSearchAndNavSection dic={dic} lang={lang} activeTab={"Videos"} />
      <div className="flex flex-col items-stretch gap-6 py-8 px-4 lg:px-10">
        {/* best in month */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="text-white text-sm ">
                {dic.generalApp.bestInMonth}
              </p>
            </div>
            <div className="text-[14px] text-[#597AFF]">
              {dic.generalApp.viewAll}
            </div>
          </div>
          <div>
            <div className="overflow-x-hidden">
              <div className="flex items-stretch gap-4 overflow-x-auto">
                {mostViewedVideos?.slice(0, 10)?.map((item: any) => (
                  <ExploreAssetsCard
                    lang={lang}
                    id={item.id}
                    key={item.id}
                    type="video"
                    cover={item.thumbnails["336x366"]}
                    title={item.name}
                    author={{
                      name: item.user.username,
                      picture: item.user.image_url,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* recently */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="text-white text-sm ">{dic.generalApp.recently}</p>
            </div>
            <Link
              href={`/${lang}/app/explore/recently/videos`}
              className="text-[14px] text-[#597AFF]"
            >
              {dic.generalApp.viewAll}
            </Link>
          </div>
          <RecentlyVideos lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default WebAppExploreVideoAssets;

const RecentlyVideos = async ({ lang }: { lang: Locale }) => {
  const rececentlyVideosData = await getRecentlyVideosData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6">
      {rececentlyVideosData?.map((items: any, index: number) => {
        return (
          <ExploreVideoCard
            lang={lang}
            id={items.id}
            key={items.id}
            author={{
              name: items.user.username,
              picture: items.user.image_url,
            }}
            description={items.description}
            image={items.thumbnails["336x366"]}
            time={items.length}
            title={items.name}
          />
        );
      })}
    </div>
  );
};
