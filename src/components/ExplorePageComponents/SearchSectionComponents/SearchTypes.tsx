import { getSearch } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import Link from "next/link";
import { Locale } from "@/types/dictionary-types";

const getSearchResults = async (params: string) => {
  try {
    const req = await getSearch(params);
    if (req.ok) {
      return req.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const SearchForAll = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );
  const concatData = () => {
    const data = [
      ...searchResults.images,
      ...searchResults.videos,
      ...searchResults.texts,
      ...searchResults.audios,
    ];
    return data;
  };
  return (
    <div className="py-7 px-6 grid grid-cols-3 grid-flow-row gap-4">
      {concatData().map((item) => {
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
            lang={params.lang}
            id={item.id}
            key={item.id}
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
  );
};
export const SearchForImages = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 px-6 py-7 h-full overflow-y-auto">
      {searchResults.images.map((items: any, index: number) => {
        return (
          <Link
            href={`/${params.lang}/app/assets/image/${items.name.replaceAll(
              " ",
              "-"
            )}?id=${items.id}`}
            key={items.id}
            className={`relative overflow-hidden rounded-lg w-full aspect-square `}
          >
            <Image
              src={items.asset.thumbnails["336x366"]}
              alt={items.name}
              fill
            />
          </Link>
        );
      })}
    </div>
  );
};
export const SearchForVideos = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.videos.map((items: any, index: number) => {
        return (
          <ExploreVideoCard
            lang={params.lang}
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
  );
};
export const SearchForAudios = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.audios.map((items: any, index: number) => {
        return (
          <ExploreAudioCard
            lang={params.lang}
            key={items.id}
            id={items.id}
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
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const searchResults = await getSearchResults(
    `q=${searchParams.q}${
      searchParams.plan ? `&plan=${searchParams.plan}` : ""
    }${searchParams.tag ? `&tag=${searchParams.tag}` : ""}`
  );
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4">
      {searchResults.texts.map((item: any) => (
        <ExploreTextCard lang={params.lang} key={item.id} data={item} />
      ))}
    </div>
  );
};
