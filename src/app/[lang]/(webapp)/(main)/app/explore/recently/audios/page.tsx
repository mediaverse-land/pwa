import ExploreAudioCard from "@/components/ExplorePageComponents/shared/AudioCard";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
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
  const rececentlySongsData = await getRecentlySongsData();
  return (
    <div className="w-full h-full p-10 overflow-y-auto">
      <SubSectionHeader name="Recently" />
      <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 mt-8">
        {rececentlySongsData?.data.map((items: any, index: number) => {
          return (
            <ExploreAudioCard
              lang={lang}
              id={items.id}
              key={items.id}
              author={{
                name: items.asset.user.username,
                picture: items.asset.user.image_url,
              }}
              description={items.description}
              image={items.asset.thumbnails["336x366"]}
              time={items.length}
              title={items.name}
            />
          );
        })}
      </div>
    </div>
  );
};
export default WebAppRecentlyAudios;
