import ExploreAudioCard from "@/components/ExplorePageComponents/shared/AudioCard";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { imagePlaceHolders } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getRecentlySongs } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";

const getRecentlySongsData = async () => {
  try {
    const liveData = await getRecentlySongs();
    return {
      data: await liveData.json(),
      status: liveData.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppRecentlyAudios = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dic = await getDictionary(lang);
  const rececentlySongsData = await getRecentlySongsData();
  return (
    <div className="w-full h-full p-10 overflow-y-auto">
      <SubSectionHeader name={dic.generalApp.recently} />
      <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 mt-8">
        {rececentlySongsData?.data?.data?.map((items: any, index: number) => {
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
              image={items.thumbnails["336x366"] || imagePlaceHolders.audio}
              time={items.media.length}
              title={items.media.name}
            />
          );
        })}
      </div>
    </div>
  );
};
export default WebAppRecentlyAudios;
