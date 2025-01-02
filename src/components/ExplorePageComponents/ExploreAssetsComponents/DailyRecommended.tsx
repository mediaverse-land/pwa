import { DicProperties, Locale } from "@/types/dictionary-types";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import {
  getRecentlyVideos,
  getRecommendedImages,
  getRecommendedSongs,
  getRecommendedTexts,
} from "@/services/contactService";
import DailyRecommendedSlider from "@/components/shared/DailyRecommendedSlider";
import { imagePlaceHolders } from "@/configs/base";

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
      data.push(...(await imagesReq.json())?.data?.slice(0, 2));
    }
    if (songsReq.ok) {
      data.push(...(await songsReq.json()).data?.slice(0, 2));
    }
    if (textsReq.ok) {
      data.push(...(await textsReq.json()).data?.slice(0, 2));
    }
    if (videosReq.ok) {
      data.push(...(await videosReq.json()).data?.slice(0, 2));
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const ExploreDailyRecommended = async ({
  lang,
  dic,
}: {
  lang: Locale;
  dic: DicProperties;
}) => {
  const data = await getDailyRecommendedData();

  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.generalApp.dailyRecommended}
          </p>
        </div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            <DailyRecommendedSlider
              data={
                data?.map((item) => {
                  return (
                    <ExploreAssetsCard
                      lang={lang}
                      key={item.id}
                      id={item.id}
                      author={{
                        name: item?.user?.username,
                        picture:
                          item?.user?.image_url || imagePlaceHolders.account,
                      }}
                      cover={
                        item?.thumbnails["336x366"] ||
                        imagePlaceHolders[item.media_type as keyof typeof imagePlaceHolders]
                      }
                      title={item?.name}
                      type={item?.media_type}
                    />
                  );
                }) || []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDailyRecommended;
