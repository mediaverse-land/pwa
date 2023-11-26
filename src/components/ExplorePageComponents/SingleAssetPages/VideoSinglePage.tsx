import { BACK_ICON, PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import { getComments, getSingleVideo } from "@/services/contactService";
import AssetSinglePageTitleAndDescription from "./shared/TitleAndDescription";
import BackButton from "@/components/shared/BackButton";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import SingleAssetComments from "./shared/Comments";
import { secondsToHMS } from "@/lib/convertSecondsToHMS";
import BuySection from "./shared/BuySection";
import { VideoType } from "@/data";
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
const VideoSinglePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const assetID = searchParams.id || "0";
  const user = cookies().get("user")?.value;
  const token = user && JSON.parse(user).token;
  const [singleVideoData, commentsData, session] = await Promise.all([
    getSingleVideoData({ id: assetID, token }),
    getCommentsData({ id: assetID, token }),
    getServerSession(authOptions),
  ]);
  const languageName = new Intl.DisplayNames(["en"], { type: "language" });
  // console.log(token);

  if (singleVideoData === "not-found") {
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
        {/* overlay */}
        {singleVideoData.asset.plan !== 1 && (
          <div
            style={{
              background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
            }}
            className="absolute w-full h-full z-20"
          ></div>
        )}
        {/* asset */}
        <div className="relative w-full h-full overflow-hidden z-10">
          {token ? (
            singleVideoData.asset.plan === 1 ? (
              <video
                controlsList="nodownload"
                className="h-full w-full"
                controls
                poster={`${singleVideoData.asset.thumbnails["523x304"]}`}
                src={singleVideoData?.asset?.file?.url}
              ></video>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={`${singleVideoData?.asset.thumbnails["336x366"] || ""}`}
                  alt=""
                  fill
                />
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={`${singleVideoData?.asset.thumbnails["336x366"] || ""}`}
                alt=""
                fill
              />
            </div>
          )}
        </div>
        {/* back */}
        <div className="absolute z-30 left-10 top-10">
          <BackButton fill="#597AFF" />
        </div>
        {/* icon */}
        <div
          className={`absolute z-30 left-10 ${
            singleVideoData.asset.plan !== 1 ? "bottom-10" : "bottom-20"
          }`}
        >
          <VIDEO_ICON />
        </div>
        {/* play */}
        {singleVideoData.asset.plan !== 1 && (
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
              image: singleVideoData?.asset?.user.image_url,
              name: singleVideoData?.asset?.user.username,
            }}
            description={singleVideoData.description}
            title={singleVideoData.name}
            time={singleVideoData.length}
          />
          {/* genrel info */}
          <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-2">
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center capitalize">
                {singleVideoData.genre}
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Type</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                {VideoType[singleVideoData.type]}
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Language</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                {languageName.of(singleVideoData.language) ||
                  singleVideoData.language}
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
                href={singleVideoData.asset.file.url}
                className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
              >
                <div className="text-white mr-auto">{singleVideoData.name}</div>
                <div className="text-[14px] text-[#666680]">
                  {secondsToHMS(singleVideoData.length)}
                </div>
              </Link>
            </div>
          </div>
        ) : null} */}
        {/* comment */}
        <SingleAssetComments
          assetID={singleVideoData.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      {singleVideoData.asset.plan !== 1 && (
        <BuySection
          type={singleVideoData.asset.type}
          asset={singleVideoData.id}
          plan={singleVideoData.asset.plan}
          price={singleVideoData.asset.price}
        />
      )}
    </div>
  );
};

export default VideoSinglePage;
