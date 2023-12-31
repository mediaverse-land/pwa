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
      <div className="flex flex-col items-stretch gap-6 py-8 px-10">
        {/* live chanel */}
        <ExploreLiveChannel dic={dic} lang={lang} liveData={liveData} />
        {/* daily recommended */}
        <ExploreDailyRecommended lang={lang} />
        {/* Most viewed  */}
        <ExploreMostViewd
          dic={dic}
          lang={lang}
          mostViewedImages={mostViewedImages}
        />
        {/* Top 10 texts */}
        <ExploreTopTexts dic={dic} lang={lang} topTextsData={topTextsData} />
        {/* Chill songs */}
        <ExploreChillSongs dic={dic} lang={lang} />
      </div>
    </div>
  );
};

export default WebAppExploreAssets;
