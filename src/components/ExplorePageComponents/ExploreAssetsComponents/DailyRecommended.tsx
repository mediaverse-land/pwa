import { Locale } from "@/types/dictionary-types";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import {
  getRecentlyVideos,
  getRecommendedImages,
  getRecommendedSongs,
  getRecommendedTexts,
} from "@/services/contactService";

const getDailyRecommendedData = async () => {
  try {
    const data = [];
    const [imagesReq, songsReq, textsReq, videosReq] = await Promise.all([
      getRecommendedImages(),
      getRecommendedSongs(),
      getRecommendedTexts(),
      getRecentlyVideos(),
    ]);
    if (imagesReq.ok) {
      data.push(...(await imagesReq.json()).slice(0, 2));
    }
    if (songsReq.ok) {
      data.push(...(await songsReq.json()).slice(0, 2));
    }
    if (textsReq.ok) {
      data.push(...(await textsReq.json()).slice(0, 2));
    }
    if (videosReq.ok) {
      data.push(...(await videosReq.json()).slice(0, 2));
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const ExploreDailyRecommended = async ({ lang }: { lang: Locale }) => {
  const data = await getDailyRecommendedData();
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-white text-sm ">Daily recommended</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            {data?.map((item) => {
              const dataType = () => {
                switch (item.asset.type) {
                  case 1:
                    return "text";
                  case 2:
                    return "image";
                  case 3:
                    return "audio";
                  case 4:
                    return "video";

                  default:
                    return "image";
                }
              };
              return (
                <ExploreAssetsCard
                  lang={lang}
                  key={item.id}
                  id={item.id}
                  author={{
                    name: item.asset.user.username,
                    picture: item.asset.user.image_url,
                  }}
                  cover={item.asset.thumbnails["336x366"]}
                  title={item.name}
                  type={dataType()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDailyRecommended;
