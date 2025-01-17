import { getSearch, getSubscribeAssets } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/data/Auth";
import LogoutNoUser from "./Logout";
import { DicProperties, Locale } from "@/types/dictionary-types";

const getSubscribeData = async ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  try {
    const req = await getSubscribeAssets({ params, token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

export const SubscribeAllAssets = async ({
  searchParams,
  params,
  dic,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const subscribeAllAssetsData = await getSubscribeData({ params: "", token });
  if (subscribeAllAssetsData?.status === 401) {
    return <LogoutNoUser />;
  }

  return (
    <div className="py-7 xl:px-6 grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
      {subscribeAllAssetsData?.data?.data?.length > 0 ? (
        subscribeAllAssetsData?.data?.data?.map((item: any) => {
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
              id={item.id}
              key={item.id}
              author={{
                name: item?.user.username,
                picture: item?.user.image_url,
              }}
              cover={item.thumbnails["336x366"]}
              title={item.name}
              type={dataType()}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const SubscribeImageAssets = async ({
  searchParams,
  params,
  dic,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const subscribeImageData = await getSubscribeData({
    params: "/images",
    token,
  });
  if (subscribeImageData?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 xl:px-6 py-7 h-full overflow-y-auto">
      {subscribeImageData?.data.data.length > 0 ? (
        subscribeImageData?.data.data.map((items: any, index: number) => {
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
              <Image src={items?.thumbnails["336x366"]} alt={items.name} fill />
            </Link>
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const SubscribeVideoAssets = async ({
  searchParams,
  params,
  dic,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const subscribeVideosData = await getSubscribeData({
    params: "/videos",
    token,
  });
  if (subscribeVideosData?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {subscribeVideosData?.data.data.length > 0 ? (
        subscribeVideosData?.data.data.map((items: any, index: number) => {
          return (
            <ExploreVideoCard
              lang={params.lang}
              id={items.id}
              key={items.id}
              author={{
                name: items?.user.username,
                picture: items?.user.image_url,
              }}
              description={items.description}
              image={items.thumbnails["336x366"]}
              time={items.length}
              title={items.name}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const SubscribeAudioAssets = async ({
  searchParams,
  params,
  dic,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const subscribeAudioData = await getSubscribeData({
    params: "/audios",
    token,
  });
  if (subscribeAudioData?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {subscribeAudioData?.data.data.length > 0 ? (
        subscribeAudioData?.data.data.map((items: any, index: number) => {
          return (
            <ExploreAudioCard
              lang={params.lang}
              id={items.id}
              key={items.id}
              author={{
                name: items?.user.username,
                picture: items?.user.image_url,
              }}
              description={items.description}
              image={items?.thumbnails["336x366"]}
              time={items.length}
              title={items.name}
            />
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
export const SubscribeTextAssets = async ({
  searchParams,
  params,
  dic,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const subscribeTextsData = await getSubscribeData({
    params: "/texts",
    token,
  });
  if (subscribeTextsData?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-6 xl:px-6 py-7 h-full overflow-y-auto">
      {subscribeTextsData?.data.data.length > 0 ? (
        subscribeTextsData?.data.data.map((item: any) => (
          <ExploreTextCard lang={params.lang} key={item.id} data={item} />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
