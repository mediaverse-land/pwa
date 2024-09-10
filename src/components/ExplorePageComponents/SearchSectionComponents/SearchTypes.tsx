import { getSearch } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import Link from "next/link";
import { Locale } from "@/types/dictionary-types";
import { imagePlaceHolders } from "@/configs/base";

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

  return (
    <div className="py-7 px-6 grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-4">
      {searchResults.data.map((item: any) => {
        const dataType = () => {
          switch (item?.media_type) {
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
            id={item?.id}
            key={item?.id}
            author={{
              name: item?.user?.username,
              picture: item?.user?.image_url,
            }}
            cover={item?.thumbnails["336x366"]}
            title={item?.media?.name}
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
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(3n+1)]:col-span-2 [&_>_*:nth-child(3n+1)]:row-span-2 lg:[&_>_*:nth-child(3n+1)]:col-span-2 lg:[&_>_*:nth-child(3n+1)]:row-span-2 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data
        .filter((item: any) => item.media_type === 2)
        .map((items: any, index: number) => {
          return (
            <Link
              href={`/${params.lang}/app/assets/image/${items?.media?.slug}?id=${items?.id}`}
              key={items?.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square `}
            >
              <Image
                src={items?.thumbnails["336x366"] || imagePlaceHolders.image}
                alt={items?.media?.name}
                fill
              />
            </Link>
          );
        })}
      {/* {searchResults.data
        .filter((item: any) => item.media_type === 2)
        .map((items: any, index: number) => {
          return (
            <Link
              href={`/${params.lang}/app/assets/image/${items?.media?.slug}?id=${items?.id}`}
              key={items?.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square `}
            >
              <Image
                src={items?.thumbnails["336x366"] || imagePlaceHolders.image}
                alt={items?.media?.name}
                fill
              />
            </Link>
          );
        })}
      {searchResults.data
        .filter((item: any) => item.media_type === 2)
        .map((items: any, index: number) => {
          return (
            <Link
              href={`/${params.lang}/app/assets/image/${items?.media?.slug}?id=${items?.media?.id}`}
              key={items?.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square `}
            >
              <Image
                src={items?.thumbnails["336x366"] || imagePlaceHolders.image}
                alt={items?.media?.name}
                fill
              />
            </Link>
          );
        })} */}
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
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data
        .filter((item: any) => item.media_type === 4)
        .map((items: any, index: number) => {
          return (
            <ExploreVideoCard
              lang={params.lang}
              id={items.id}
              key={items.id}
              author={{
                name: items?.user?.username,
                picture: items?.user?.image_url,
              }}
              description={items?.media?.description}
              image={items?.thumbnails["336x366"] || imagePlaceHolders.video}
              time={items.media.length}
              title={items.media.name}
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
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data
        .filter((item: any) => item.media_type === 3)
        .map((items: any, index: number) => {
          return (
            <ExploreAudioCard
              lang={params.lang}
              key={items.id}
              id={items.id}
              author={{
                name: items?.user?.username,
                picture: items?.user?.image_url,
              }}
              description={items.media?.description}
              image={items?.thumbnails["336x366"] || imagePlaceHolders.audio}
              time={items.media?.length}
              title={items.media?.name}
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
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-4 p-4">
      {searchResults.data
        .filter((item: any) => item.media_type === 1)
        .map((item: any) => (
          <ExploreTextCard lang={params.lang} key={item?.id} data={item} />
        ))}
    </div>
  );
};
