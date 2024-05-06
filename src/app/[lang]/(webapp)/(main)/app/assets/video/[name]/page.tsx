import { authOptions } from "@/data/Auth";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import HLSPlayer from "@/components/ExplorePageComponents/shared/HLSPlayer";
import { PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import ShareButton from "@/components/shared/ShareButton";
import { logoURL, webAppDeepLink } from "@/configs/base";
import { VideoType } from "@/data";
import { DeleteUserSession } from "@/lib/test";
import { getComments, getSingleVideo } from "@/services/contactService";
import { FullLocaleNames, Locale } from "@/types/dictionary-types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const getSingleVideoData = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  try {
    const req = await getSingleVideo({ id, token });
    return {
      data: (await req.json())?.data,
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const getCommentsData = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const req = await getComments({ id, token });
    if (req.ok) {
      const res = await req.json();
      return res;
    } else {
      // console.log(req.status, "Res");
      if (req.status === 404) {
        return "not-found";
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { id: string };
}): Promise<Metadata> {
  const assetID = searchParams.id || "0";
  const singleVideoData = await getSingleVideoData({ id: assetID, token: "" });
  // console.log(singleVideoData?.data);

  return {
    title: singleVideoData?.data?.name,
    description: singleVideoData?.data?.description,
    openGraph: {
      title: singleVideoData?.data?.name,
      description: singleVideoData?.data?.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const WebAppSingleVideoAsset = async (params: any) => {
  const assetID = params.searchParams.id || "0";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const [singleVideoData] = await Promise.all([
    getSingleVideoData({ id: assetID, token }),
  ]);
  const languageName = new Intl.DisplayNames(["en"], { type: "language" });
  if (singleVideoData?.status === 404) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Page Not Found
      </div>
    );
  }
  // console.log(session, "session");
  return (
    <div className="flex flex-col items-stretch h-full overflow-y-auto">
      {/* top section */}
      <div className="rounded-b-2xl aspect-video lg:h-[450px] lg:min-h-[450px] relative overflow-hidden">
        {/* asset */}
        <div className="relative w-full h-full overflow-hidden z-10">
          <Image
            src={`${singleVideoData?.data?.thumbnails["1234x1234"]}`}
            alt=""
            fill
          />

          {/* {singleVideoData?.data?.asset?.file ? (
            <video
              src={singleVideoData?.data?.asset?.file.url}
              controls
              controlsList="nodownload"
              className="w-full h-full"
            />
          ) : (
            <Image
              src={`${singleVideoData?.data?.thumbnails["1234x1234"]}`}
              alt=""
              fill
            />
          )} */}
        </div>
        {/* back */}
        <div className="absolute z-30 left-5 lg:left-10 top-5 lg:top-10">
          <BackButton fill="#597AFF" />
        </div>
        {/* icon */}
        <div
          className={`absolute z-30 left-10 ${
            singleVideoData?.data?.asset?.file
              ? "hidden overflow-hidden"
              : "bottom-20"
          }`}
        >
          <VIDEO_ICON />
        </div>
        {/* play */}
        {singleVideoData?.data?.asset?.file ? null : (
          <div className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <PLAY fill="#597AFF" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="py-8 px-4 lg:px-10 flex flex-col items-stretch gap-6">
        {/* info */}
        <div className="flex flex-col items-stretch gap-2">
          <AssetSinglePageTitleAndDescription
            author={{
              image: singleVideoData?.data?.asset?.user.image_url,
              name: singleVideoData?.data?.asset?.user.username,
            }}
            description={singleVideoData?.data?.description}
            title={singleVideoData?.data?.name}
            time={singleVideoData?.data?.length}
          />
          {/* genrel info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 mt-2">
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center capitalize">
                {singleVideoData?.data?.genre}
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Type</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                {VideoType[singleVideoData?.data?.type]}
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Language</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                {languageName.of(singleVideoData?.data?.language) ||
                  singleVideoData?.data?.language}
              </div>
            </div>
          </div>
        </div>
        {/* files */}
        {/* {user ? (
          <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
            <div className="text-white font-semibold">Files</div>
            <div className="flex flex-col items-stretch gap-2">
              <Link
                href={singleVideoData?.data?.file.url}
                className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
              >
                <div className="text-white mr-auto">{singleVideoData?.data?.name}</div>
                <div className="text-[14px] text-[#666680]">
                  {secondsToHMS(singleVideoData?.data?.length)}
                </div>
              </Link>
            </div>
          </div>
        ) : null} */}
        {/* share links */}
        <div className="flex items-center justify-between">
          <ShareButton
            url={`${process.env.NEXTAUTH_URL}/${
              params.params.lang
            }/app/assets/video/${singleVideoData?.data.name.replaceAll(
              " ",
              "-"
            )}?id=${singleVideoData?.data.id}`}
          />
          <div className="lg:hidden">
            <button className="text-[14px] rounded-full px-2 sm:px-4 py-1 text-center bg-blue-600">
              <Link
                href={`${webAppDeepLink}?page=single&type=${singleVideoData?.data.type}&id=${singleVideoData?.data.id}`}
              >
                View in App
              </Link>
            </button>
          </div>
        </div>
        {/* comment */}
        <SingleAssetComments
          assetID={singleVideoData?.data?.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      {singleVideoData?.data?.plan !== 1 && (
        <BuySection
          type={singleVideoData?.data?.data?.class}
          asset={singleVideoData?.data?.data?.id}
          plan={singleVideoData?.data?.data?.plan}
          price={singleVideoData?.data?.data?.price}
        />
      )}
    </div>
  );
};

export default WebAppSingleVideoAsset;
