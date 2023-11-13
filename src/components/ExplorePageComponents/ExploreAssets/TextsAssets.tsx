import { getMostViewedText, getRecentlyTexts } from "@/services/contactService";
import ExploreTextCard from "../shared/TextCard";
import Link from "next/link";
import ExploreSearchAndNavSection from "./SearchAndNavSection";

const audioData = [
  {
    id: 1,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
    image: "/images/nasa.png",
  },
  {
    id: 2,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
  },
  {
    id: 3,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: "Ralph",
    time: "8:15",
    image: "/images/nasa.png",
  },
];

const getMostViewedTextsData = async () => {
  const liveData = await getMostViewedText();
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

const ExploreTextsAssets = async ({ activeTab }: { activeTab: string }) => {
  const [mostViewedTexts] = await Promise.all([getMostViewedTextsData()]);

  return (
    <>
      <ExploreSearchAndNavSection activeTab={activeTab} />
      <div className="flex flex-col items-stretch gap-6 pb-8 px-6">
        {/* best in month */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="text-white text-sm ">Best in month</p>
            </div>
            <div className="text-[14px] text-[#597AFF]">View all</div>
          </div>
          <div>
            <div className="overflow-x-hidden">
              <div className="flex items-stretch gap-4 overflow-x-auto">
                {mostViewedTexts.slice(0, 10).map((item: any) => (
                  <ExploreTextCard key={item.id} data={item} />
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
              <p className="text-white text-sm ">Recently</p>
            </div>
            <Link
              href={`/explore?section=explore&content=recently&type=texts`}
              className="text-[14px] text-[#597AFF]"
            >
              View all
            </Link>
          </div>
          <RecentlyTexts />
        </div>
      </div>
    </>
  );
};

export default ExploreTextsAssets;

export const RecentlyTexts = async () => {
  const rececentlyTextsData = await getRecentlyTextsData();
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-4">
      {rececentlyTextsData.map((item: any) => (
        <ExploreTextCard key={item.id} data={item} />
      ))}
    </div>
  );
};
