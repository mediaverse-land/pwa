import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import ExploreTextCard from "@/components/ExplorePageComponents/shared/TextCard";
import ExploreChillSongsSlider from "@/components/shared/ExploreChillSongsSldier";
import { getDictionary } from "@/dictionary";
import { getMostViewedText, getRecentlyTexts } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import Link from "next/link";

const getMostViewedTextsData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedText(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlyTextsData = async () => {
  const liveData = await getRecentlyTexts();
  if (liveData.ok) {
    return liveData.json();
  }
};

const WebAppExploreTextsAssets = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const [mostViewedTexts] = await Promise.all([
    getMostViewedTextsData(FullLocaleNames[lang]),
  ]);
  const dic = await getDictionary(lang);

  return (
    <div className="h-full overflow-y-auto">
      <ExploreSearchAndNavSection dic={dic} lang={lang} activeTab={"Texts"} />
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
            {/* <div className="text-[14px] text-[#597AFF]">
              {dic.generalApp.viewAll}
            </div> */}
          </div>
          <div>
            <div className="overflow-x-hidden">
              <div>
                <ExploreChillSongsSlider
                  data={mostViewedTexts?.data?.slice(0, 10).map((item: any) => (
                    <div key={item.id} className="min-w-[190px] max-w-[190px]">
                      <ExploreTextCard lang={lang} data={item} />
                    </div>
                  ))}
                />
              </div>
              {/* <div className="flex items-stretch gap-4 overflow-x-auto">
                {mostViewedTexts?.data?.slice(0, 10).map((item: any) => (
                  <div key={item.id} className="min-w-[190px] max-w-[190px]">
                    <ExploreTextCard lang={lang} data={item} />
                  </div>
                ))}
              </div> */}
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
              href={`/${lang}/app/explore/recently/texts`}
              className="text-[14px] text-[#597AFF]"
            >
              {dic.generalApp.viewAll}
            </Link>
          </div>
          <RecentlyTexts lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default WebAppExploreTextsAssets;

const RecentlyTexts = async ({ lang }: { lang: Locale }) => {
  const rececentlyTextsData = await getRecentlyTextsData();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-4">
      {rececentlyTextsData?.data?.map((item: any) => (
        <div key={item.id} className="lg:max-w-[220px]">
          <ExploreTextCard lang={lang} data={item} />
        </div>
      ))}
    </div>
  );
};
