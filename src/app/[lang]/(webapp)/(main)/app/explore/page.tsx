import {
  getLives,
  getMostViewedImages,
  getMostViewedText,
} from "@/services/contactService";
import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import { ExploreLiveChannel } from "@/components/ExplorePageComponents/ExploreAssetsComponents/LiveChannel";
import ExploreDailyRecommended from "@/components/ExplorePageComponents/ExploreAssetsComponents/DailyRecommended";
import ExploreMostViewd from "@/components/ExplorePageComponents/ExploreAssetsComponents/MostViewed";
import ExploreTopTexts from "@/components/ExplorePageComponents/ExploreAssetsComponents/TopTexts";
import ExploreChillSongs from "@/components/ExplorePageComponents/ExploreAssetsComponents/ChillSongs";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import { getDictionary } from "@/dictionary";
import ExploreTextCard from "@/components/ExplorePageComponents/shared/TextCard";

const getLiveData = async (lang: TFullLocales) => {
  const liveData = await getLives({ params: "", lang });
  if (liveData.ok) {
    return liveData.json();
  }
};
const getMostViewedImagesData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedImages(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const getTopTextsData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedText(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const WebAppExploreAssets = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  // const liveData = await getLiveData();
  const [liveData, mostViewedImages] = await Promise.all([
    getLiveData(FullLocaleNames[lang]),
    getMostViewedImagesData(FullLocaleNames[lang]),
  ]);
  const topTextsData = await getTopTextsData(FullLocaleNames[lang]);
  const dic = await getDictionary(lang);

  return (
    <div className="h-full overflow-y-auto">
      <ExploreSearchAndNavSection dic={dic} lang={lang} activeTab={"All"} />
      <div className="flex flex-col items-stretch gap-6 py-8 px-4 lg:px-10">
        {/* live chanel */}
        <ExploreLiveChannel dic={dic} lang={lang} liveData={liveData.data} />
        {/* daily recommended */}
        <ExploreDailyRecommended dic={dic} lang={lang} />
        {/* Most viewed Images */}
        <ExploreMostViewd
          dic={dic}
          lang={lang}
          mostViewedImages={mostViewedImages.data}
        />
        {/* Top 10 texts */}
        <ExploreTopTexts
          dic={dic}
          lang={lang}
          topTextsData={topTextsData?.data?.slice(0, 10)?.map((item: any) => (
            <div key={item.id} className="min-w-[190px] max-w-[190px]">
              <ExploreTextCard lang={lang} data={item} />
            </div>
          ))}
        />
        {/* Chill songs */}
        <ExploreChillSongs dic={dic} lang={lang} />
      </div>
    </div>
  );
};

export default WebAppExploreAssets;
