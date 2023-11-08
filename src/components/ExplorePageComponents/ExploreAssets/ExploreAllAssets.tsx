import Image from "next/image";
import { getLives } from "@/services/contactService";
import ExploreLiveChannel from "./LiveChannel";
import ExploreDailyRecommended from "./DailyRecommended";
import ExploreMostViewd from "./MostViewed";
import ExploreTopTexts from "./TopTexts";

const getData = async () => {
  const liveData = await getLives();
  if (liveData.ok) {
    return liveData.json();
  }
};
const ExploreAllAssets = async () => {
  const liveData = await getData();

  return (
    <div className="flex flex-col items-stretch gap-6 pb-8">
      {/* live chanel */}
      <ExploreLiveChannel liveData={liveData} />
      {/* daily recommended */}
      <ExploreDailyRecommended />
      {/* Most viewed  */}
      <ExploreMostViewd />
      {/* Top 10 texts */}
      <ExploreTopTexts />
    </div>
  );
};

export default ExploreAllAssets;
