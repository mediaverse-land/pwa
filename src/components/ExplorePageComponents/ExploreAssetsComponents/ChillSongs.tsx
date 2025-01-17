import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { AUDIO_ICON } from "@/components/SVG/svgs";
import { getRecentlySongs } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";
import ExploreChillSongsSlider from "@/components/shared/ExploreChillSongsSldier";
import { imagePlaceHolders } from "@/configs/base";

const getChillSongs = async () => {
  try {
    const req = await getRecentlySongs();
    if (req.ok) {
      return req.json();
    }
  } catch (error) {
    console.error(error);
  }
};

const ExploreChillSongs = async ({
  dic,
  lang,
}: {
  lang: Locale;
  dic: DicProperties;
}) => {
  const chillSongs = await getChillSongs();
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <AUDIO_ICON />
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.bestSongs}
          </p>
        </div>
        {/* <div className="text-[14px] text-[#597AFF]">
          {dic.generalApp.viewAll}
        </div> */}
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            <ExploreChillSongsSlider
              data={chillSongs?.data?.slice(0, 10)?.map((item: any) => (
                <ExploreAssetsCard
                  lang={lang}
                  key={item.id}
                  id={item.id}
                  type="audio"
                  cover={item.thumbnails["336x366"] || imagePlaceHolders.audio}
                  title={item.name}
                  author={{
                    name: item?.user?.username,
                    picture: item?.user?.image_url || imagePlaceHolders.account,
                  }}
                />
              ))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreChillSongs;
