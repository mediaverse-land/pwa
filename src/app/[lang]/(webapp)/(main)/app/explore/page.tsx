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

const getLiveData = async () => {
  const liveData = await getLives({ params: "" });
  if (liveData.ok) {
    return liveData.json();
  }
};
const getMostViewedImagesData = async () => {
  const liveData = await getMostViewedImages();
  if (liveData.ok) {
    return liveData.json();
  }
};
const getTopTextsData = async () => {
  const liveData = await getMostViewedText();
  if (liveData.ok) {
    return liveData.json();
  }
};
const WebAppExploreAssets = async () => {
  // const liveData = await getLiveData();
  const [liveData, mostViewedImages] = await Promise.all([
    getLiveData(),
    getMostViewedImagesData(),
  ]);
  const topTextsData = await getTopTextsData();
  return (
    <div className="h-full overflow-y-auto">
      <ExploreSearchAndNavSection activeTab={"All"} />
      <div className="flex flex-col items-stretch gap-6 py-8 px-10">
        {/* live chanel */}
        <ExploreLiveChannel liveData={liveData} />
        {/* daily recommended */}
        <ExploreDailyRecommended />
        {/* Most viewed  */}
        <ExploreMostViewd mostViewedImages={mostViewedImages} />
        {/* Top 10 texts */}
        <ExploreTopTexts topTextsData={topTextsData} />
        {/* Chill songs */}
        <ExploreChillSongs />
      </div>
    </div>
  );
};

export default WebAppExploreAssets;
