import { getOwnershipAssets, getSearch } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import { cookies } from "next/headers";
import Link from "next/link";

const getOwnership = async ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  try {
    const req = await getOwnershipAssets({ params, token });
    if (req.ok) {
      return req.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const OwnershipAllAssets = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const cookie = cookies().get("user");
  const token = cookie && JSON.parse(cookie?.value)?.token;
  const searchResults = await getOwnership({ params: "/assets", token: token });
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
      {concatData().length > 0 ? (
        concatData().map((item) => {
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
              key={item.id}
              id={item.id}
              author={{
                name: item.asset.user.username,
                picture: item.asset.user.image_url,
              }}
              cover={item.asset.thumbnails["336x366"]}
              title={item.name}
              type={dataType()}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          No Content To Show
        </div>
      )}
    </div>
  );
};
export const OwnershipImageAssets = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const cookie = cookies().get("user");
  const token = cookie && JSON.parse(cookie?.value)?.token;
  const searchResults = await getOwnership({
    params: "/images",
    token: token,
  });
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data.length > 0 ? (
        searchResults.data.map((items: any, index: number) => {
          return (
            <Link
              href={`/explore?section=explore&content=asset-single-page&name=${items.name}&id=${items.id}&type=image`}
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          No Content To Show
        </div>
      )}
    </div>
  );
};
export const OwnershipVideoAssets = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const cookie = cookies().get("user");
  const token = cookie && JSON.parse(cookie?.value)?.token;
  const searchResults = await getOwnership({
    params: "/videos",
    token: token,
  });
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data.length > 0 ? (
        searchResults.data.map((items: any, index: number) => {
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          No Content To Show
        </div>
      )}
    </div>
  );
};
export const OwnershipAudioAssets = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const cookie = cookies().get("user");
  const token = cookie && JSON.parse(cookie?.value)?.token;
  const searchResults = await getOwnership({
    params: "/audios",
    token: token,
  });

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data.length > 0 ? (
        searchResults.data.map((items: any, index: number) => {
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          No Content To Show
        </div>
      )}
    </div>
  );
};
export const OwnershipTextAssets = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const cookie = cookies().get("user");
  const token = cookie && JSON.parse(cookie?.value)?.token;
  const searchResults = await getOwnership({
    params: "/texts",
    token: token,
  });
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults.data.length > 0 ? (
        searchResults.data.map((item: any) => (
          <ExploreTextCard key={item.id} data={item} />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          No Content To Show
        </div>
      )}
    </div>
  );
};
