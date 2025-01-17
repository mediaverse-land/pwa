import { authOptions } from "@/data/Auth";
import { getOwnershipAssets } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreVideoCard from "../shared/VideoCard";
import LogoutNoUser from "./Logout";

const getOwnership = async ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  try {
    const req = await getOwnershipAssets({ params, token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

export const OwnershipAllAssets = async ({
  params,
  dic,
}: {
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const ownershipAllAssetsData = await getOwnership({
    params: "/assets",
    token: `${token}`,
  });

  if (ownershipAllAssetsData?.status === 401) {
    return <LogoutNoUser />;
  }
  // const concatData = () => {
  //   const data = [
  //     ...(searchResults?.data?.data?.images || []),
  //     ...(searchResults?.data?.data?.videos || []),
  //     ...(searchResults?.data?.data?.texts || []),
  //     ...(searchResults?.data?.data?.audios || []),
  //   ];
  //   return data;
  // };

  return (
    <div className="py-7 xl:px-6 grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
      {ownershipAllAssetsData?.data?.data?.length > 0 ? (
        ownershipAllAssetsData?.data?.data.map((item: any) => {
          const dataType = () => {
            switch (item.class) {
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
              ownershipcard
              key={item.id}
              id={item.id}
              author={{
                name: item?.user?.username,
                picture: item?.user?.image_url,
              }}
              cover={item?.thumbnails["336x366"]}
              title={item.name}
              type={dataType()}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const OwnershipImageAssets = async ({
  params,
  dic,
}: {
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const searchResults = await getOwnership({
    params: "/assets?media_type=image",
    token: `${token}`,
  });
  if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 xl:px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
          return (
            <Link
              href={`/${
                params.lang
              }/app/assets/image/${items?.name.replaceAll(
                " ",
                "-"
              )}?id=${items.id}`}
              key={items.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square `}
            >
              <Image src={items.thumbnails["336x366"]} alt={items.name} fill />
            </Link>
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const OwnershipVideoAssets = async ({
  params,
  dic,
}: {
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const searchResults = await getOwnership({
    params: "/assets?media_type=video",
    token: token,
  });
  if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
          return (
            <ExploreVideoCard
              lang={params.lang}
              id={items.id}
              key={items.id}
              author={{
                name: `${session?.user?.firstName} ${session?.user?.lastName}`,
                picture: session?.user?.image,
              }}
              description={items.description}
              image={items?.thumbnails["336x366"]}
              time={items.length}
              title={items.name}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const OwnershipAudioAssets = async ({
  params,
  dic,
}: {
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const searchResults = await getOwnership({
    params: "/assets?media_type=audio",
    token: token,
  });
  if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
          return (
            <ExploreAudioCard
              lang={params.lang}
              id={items.id}
              key={items.id}
              author={{
                name: `${session?.user?.firstName} ${session?.user?.lastName}`,
                picture: session?.user?.image,
              }}
              description={items.description}
              image={items.thumbnails["336x366"]}
              time={items.length}
              title={items.name}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const OwnershipTextAssets = async ({
  params,
  dic,
}: {
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const searchResults = await getOwnership({
    params: "/assets?media_type=text",
    token: token,
  });
  if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((item: any) => (
          <ExploreTextCard lang={params.lang} key={item.id} data={item} />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
