import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import HLSPlayer from "@/components/ExplorePageComponents/shared/HLSPlayer";
import { PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import { VideoType } from "@/data";
import { DeleteUserSession } from "@/lib/test";
import { getComments, getSingleVideo } from "@/services/contactService";
import { getServerSession } from "next-auth";
import Image from "next/image";

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
      data: await req.json(),
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
      <div className="rounded-b-2xl h-[450px] min-h-[450px] relative overflow-hidden">
        {/* asset */}
        <div className="relative w-full h-full overflow-hidden z-10">
          {singleVideoData?.data?.asset?.file ? (
            <video
              src={singleVideoData?.data?.asset?.file.url}
              controls
              controlsList="nodownload"
              className="w-full h-full"
            />
          ) : (
            <Image
              src={`${singleVideoData?.data?.asset.thumbnails["1234x1234"]}`}
              alt=""
              fill
            />
          )}
        </div>
        {/* back */}
        <div className="absolute z-30 left-10 top-10">
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
      <div className="py-8 px-10 flex flex-col items-stretch gap-6">
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
          <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-2">
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
                href={singleVideoData?.data?.asset.file.url}
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
        {/* comment */}
        <SingleAssetComments
          assetID={singleVideoData?.data?.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      {singleVideoData?.data?.asset.plan !== 1 && (
        <BuySection
          type={singleVideoData?.data?.asset.type}
          asset={singleVideoData?.data?.id}
          plan={singleVideoData?.data?.asset.plan}
          price={singleVideoData?.data?.asset.price}
        />
      )}
    </div>
  );
};

export default WebAppSingleVideoAsset;
