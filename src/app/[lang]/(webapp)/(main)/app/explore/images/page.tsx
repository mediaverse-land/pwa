import Image from "next/image";
import Link from "next/link";
import {
  getMostViewedImages,
  getRecentlyImages,
} from "@/services/contactService";
import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import ExploreAssetsCard from "@/components/ExplorePageComponents/shared/AllAssetsCard";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { getDictionary } from "@/dictionary";

const getMostViewedImagesData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedImages(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlyImagesData = async () => {
  const liveData = await getRecentlyImages();
  if (liveData.ok) {
    return liveData.json();
  }
};

const WebAppImageAssets = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const [mostViewedImages] = await Promise.all([
    getMostViewedImagesData(FullLocaleNames[lang]),
  ]);
  const dic = await getDictionary(lang);
  return (
    <div className="w-full overflow-y-auto">
      <ExploreSearchAndNavSection dic={dic} lang={lang} activeTab={"Images"} />
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
                {mostViewedImages?.slice(0, 10)?.map((item: any) => (
                  <ExploreAssetsCard
                    lang={lang}
                    key={item.id}
                    id={item.id}
                    type="image"
                    cover={item.asset.thumbnails["336x366"]}
                    title={item.name}
                    author={{
                      name: item.asset.user.username,
                      picture: item.asset.user.image_url,
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
              href={`/${lang}/app/explore/recently/images`}
              className="text-[14px] text-[#597AFF]"
            >
              {dic.generalApp.viewAll}
            </Link>
          </div>
          <RecentlyImages lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default WebAppImageAssets;
const RecentlyImages = async ({ lang }: { lang: Locale }) => {
  const data = await getRecentlyImagesData();
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2">
      {data?.map((items: any, index: number) => {
        return (
          <Link
            href={`/${lang}/app/assets/image/${items.name.replaceAll(
              " ",
              "-"
            )}?id=${items.id}`}
            key={items.id}
            className={`relative overflow-hidden rounded-lg w-full aspect-square `}
          >
            <Image
              src={items.asset.thumbnails["336x366"]}
              alt={items.name}
              fill
            />
          </Link>
        );
      })}
    </div>
  );
};
