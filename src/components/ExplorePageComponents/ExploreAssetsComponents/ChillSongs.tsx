import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { AUDIO_ICON } from "@/components/SVG/svgs";
import { getRecentlySongs } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";

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
        <div className="flex items-center space-x-2">
          <AUDIO_ICON />
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.bestSongs}
          </p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div>
        <div className="overflow-x-hidden">
          <div className="flex items-stretch gap-4 overflow-x-auto">
            {chillSongs.slice(0, 10).map((item: any) => (
              <ExploreAssetsCard
                lang={lang}
                key={item.id}
                id={item.id}
                type="audio"
                cover={item.asset.thumbnails["336x366"]}
                title={item.name}
                author={{
                  name: item.asset.user.username,
                  picture: item.asset.user.image_url,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreChillSongs;
