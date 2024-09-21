import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import ExploreAssetsCard from "@/components/ExplorePageComponents/shared/AllAssetsCard";
import ExploreAudioCard from "@/components/ExplorePageComponents/shared/AudioCard";
import ExploreChillSongsSlider from "@/components/shared/ExploreChillSongsSldier";
import { imagePlaceHolders } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import {
  getMostViewedSongs,
  getRecentlySongs,
} from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import Link from "next/link";

const audioData = [
  {
    id: 1,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
    image: "/images/nasa.png",
  },
  {
    id: 2,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
  },
  {
    id: 3,
    title: "Velit officia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero.",
    author: {
      name: "auth",
      picture: "",
    },
    time: 560,
    image: "/images/nasa.png",
  },
];
const getMostViewedSongsData = async (lang: TFullLocales) => {
  const liveData = await getMostViewedSongs(lang);
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlySongsData = async () => {
  const liveData = await getRecentlySongs();
  if (liveData.ok) {
    return liveData.json();
  }
};
const WebAppExploreAudioAssets = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const [mostViewedSongs] = await Promise.all([
    getMostViewedSongsData(FullLocaleNames[lang]),
  ]);
  const dic = await getDictionary(lang);

  return (
    <div className="h-full overflow-y-auto">
      <ExploreSearchAndNavSection dic={dic} lang={lang} activeTab={"Audios"} />
      <div className="flex flex-col items-stretch gap-6 py-8 px-4 lg:px-10">
        {/* best in month */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <p className="text-white text-sm ">
                {dic.generalApp.bestInMonth}
              </p>
            </div>
            {/* <div className="text-[14px] text-[#597AFF]">
              {dic.generalApp.viewAll}
            </div> */}
          </div>
          <div>
            <div className="overflow-x-hidden">
              <div>
                <ExploreChillSongsSlider
                  data={mostViewedSongs?.data
                    ?.slice(0, 10)
                    ?.map((item: any) => (
                      <ExploreAssetsCard
                        lang={lang}
                        id={item.id}
                        key={item.id}
                        type="audio"
                        cover={
                          item.thumbnails["336x366"] || imagePlaceHolders.audio
                        }
                        title={item.media.name}
                        author={{
                          name: item.user?.username || "",
                          picture:
                            item.user?.image_url || imagePlaceHolders.account,
                        }}
                      />
                    ))}
                />
              </div>
              {/* <div className="flex items-stretch gap-4 overflow-x-auto [&_>_*]:w-[200px]">
                {mostViewedSongs?.data?.slice(0, 10)?.map((item: any) => (
                  <ExploreAssetsCard
                    lang={lang}
                    id={item.id}
                    key={item.id}
                    type="audio"
                    cover={item.thumbnails["336x366"]}
                    title={item.name}
                    author={{
                      name: "",
                      picture: item.user.image_url,
                    }}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
        {/* recently */}
        <div className="flex items-stretch flex-col gap-4">
          {/* header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <p className="text-white text-sm ">{dic.generalApp.recently}</p>
            </div>
            <Link
              href={`/${lang}/app/explore/recently/audios`}
              className="text-[14px] text-[#597AFF]"
            >
              {dic.generalApp.viewAll}
            </Link>
          </div>
          <RecentlyAudio lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default WebAppExploreAudioAssets;

const RecentlyAudio = async ({ lang }: { lang: Locale }) => {
  const rececentlySongsData = await getRecentlySongsData();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-6">
      {rececentlySongsData?.data?.map((items: any, index: number) => {
        return (
          <ExploreAudioCard
            lang={lang}
            id={items.id}
            key={items.id}
            author={{
              name: items.user.username,
              picture: items.user.image_url || imagePlaceHolders.account,
            }}
            description={items.media.description}
            image={items?.thumbnails["336x366"]}
            time={items.media.length}
            title={items.media.name}
          />
        );
      })}
    </div>
  );
};
