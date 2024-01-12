import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import ExploreVideoCard from "@/components/ExplorePageComponents/shared/VideoCard";
import { getDictionary } from "@/dictionary";
import { getRecentlyVideos } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";

const getRecentlyVideosData = async () => {
  try {
    const liveData = await getRecentlyVideos();
    return {
      data: await liveData.json(),
      status: liveData.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppRecentlyVideos = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const rececentlyVideosData = await getRecentlyVideosData();
  const dic = await getDictionary(lang);
  return (
    <div className="h-full w-full p-10 overflow-y-auto">
      <SubSectionHeader name={dic.generalApp.recently} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 mt-8">
        {rececentlyVideosData?.data.map((items: any, index: number) => {
          return (
            <ExploreVideoCard
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

export default WebAppRecentlyVideos;
