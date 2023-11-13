import { getSearch } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";

const getSearchResults = async (params: string) => {
  try {
    const req = await getSearch(params);
    if (req.ok) {
      console.log(params);
      return req.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const SearchForAll = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );
  return (
    <div className="py-7 px-6 grid grid-cols-2 grid-flow-row gap-4">all</div>
  );
};
export const SearchForImages = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}&type=2`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 px-6 py-7 h-full overflow-y-auto">
      {searchResults.images.map((items: any, index: number) => {
        return (
          <div
            key={items.id}
            className={`relative overflow-hidden rounded-lg w-full aspect-square `}
          >
            <Image
              src={items.asset.thumbnails["336x366"]}
              alt={items.name}
              fill
            />
          </div>
        );
      })}
    </div>
  );
};
export const SearchForVideos = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}&type=4`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.videos.map((items: any, index: number) => {
        return (
          <ExploreVideoCard
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
  );
};
export const SearchForAudios = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}&type=3`
  );

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.audios.map((items: any, index: number) => {
        return (
          <ExploreAudioCard
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
  );
};
export const SearchForTexts = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}&type=1`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4">
      {searchResults.texts.map((item: any) => (
        <ExploreTextCard key={item.id} data={item} />
      ))}
    </div>
  );
};
