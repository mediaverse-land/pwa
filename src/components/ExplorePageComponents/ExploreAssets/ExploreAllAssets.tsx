import Image from "next/image";
import {
  getLives,
  getMostViewedImages,
  getMostViewedText,
} from "@/services/contactService";
import ExploreLiveChannel from "./LiveChannel";
import ExploreDailyRecommended from "./DailyRecommended";
import ExploreMostViewd from "./MostViewed";
import ExploreTopTexts from "./TopTexts";
import ExploreChillSongs from "./ChillSongs";

const getLiveData = async () => {
  const liveData = await getLives();
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
const ExploreAllAssets = async () => {
  // const liveData = await getLiveData();
  const [liveData, mostViewedImages] = await Promise.all([
    getLiveData(),
    getMostViewedImagesData(),
  ]);
  const topTextsData = await getTopTextsData();
  return (
    <div className="flex flex-col items-stretch gap-6 pb-8">
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
  );
};

export default ExploreAllAssets;