import { getSearch, getSubscribeAssets } from "@/services/contactService";
import Image from "next/image";
import ExploreVideoCard from "../shared/VideoCard";
import ExploreAudioCard from "../shared/AudioCard";
import ExploreTextCard from "../shared/TextCard";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  const searchResults = await getSubscribeData({ params: "", token });
  if (searchResults?.status === 406) {
    return (
      <Link
        href={`/${params.lang}/sign-up/info`}
        className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-10 underline hover:text-blue-700"
      >
        Please Complete Your Information To See This Section
      </Link>
    );
  } else if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  const concatData = () => {
    const data = [
      ...searchResults?.data.images,
      ...searchResults?.data.videos,
      ...searchResults?.data.texts,
      ...searchResults?.data.audios,
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-8">
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
  const searchResults = await getSubscribeData({
    params: "/images",
    token,
  });
  if (searchResults?.status === 406) {
    return (
      <Link
        href={`/${params.lang}/sign-up/info`}
        className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-10 underline hover:text-blue-700"
      >
        Please Complete Your Information To See This Section
      </Link>
    );
  } else if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2 px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
          return (
            <Link
              href={`/${params.lang}/app/assets/image/${items.replaceAll(
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-8">
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
  const searchResults = await getSubscribeData({
    params: "/videos",
    token,
  });
  if (searchResults?.status === 406) {
    return (
      <Link
        href={`/${params.lang}/sign-up/info`}
        className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-10 underline hover:text-blue-700"
      >
        Please Complete Your Information To See This Section
      </Link>
    );
  } else if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-8">
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
  const searchResults = await getSubscribeData({
    params: "/audios",
    token,
  });
  if (searchResults?.status === 406) {
    return (
      <Link
        href={`/${params.lang}/sign-up/info`}
        className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-10 underline hover:text-blue-700"
      >
        Please Complete Your Information To See This Section
      </Link>
    );
  } else if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((items: any, index: number) => {
          return (
            <ExploreAudioCard
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
        })
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-8">
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
  const searchResults = await getSubscribeData({
    params: "/texts",
    token,
  });
  if (searchResults?.status === 406) {
    return (
      <Link
        href={`/${params.lang}/sign-up/info`}
        className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-10 underline hover:text-blue-700"
      >
        Please Complete Your Information To See This Section
      </Link>
    );
  } else if (searchResults?.status === 401) {
    return <LogoutNoUser />;
  }
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-x-4 gap-y-6 px-6 py-7 h-full overflow-y-auto">
      {searchResults?.data.data.length > 0 ? (
        searchResults?.data.data.map((item: any) => (
          <ExploreTextCard lang={params.lang} key={item.id} data={item} />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-[28px] font-bold col-span-3 text-center mt-8">
          {dic.appAccounts.noContentToShow}
        </div>
      )}
    </div>
  );
};
