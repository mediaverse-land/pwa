import {
  AUDIO_ICON,
  BACK_ICON,
  PICTURE_ICON,
  PLAY,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import {
  getSingleAudio,
  getSingleImage,
  getSingleText,
} from "@/services/contactService";
import Image from "next/image";
import { redirect } from "next/navigation";
import AssetSinglePageTitleAndDescription from "./shared/TitleAndDescription";
import BackButton from "@/components/shared/BackButton";
import Link from "next/link";
import { cookies } from "next/headers";
import SingleAssetComments from "./shared/Comments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuySection from "./shared/BuySection";

const getSingleAudioData = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  try {
    const req = await getSingleAudio({ id, token });
    if (req.ok) {
      const res = await req.json();
      return res;
    } else {
      if (req.status === 404) {
        return "not-found";
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const AudioSinglePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const assetID = searchParams.id || "0";
  const user = cookies().get("user")?.value;
  const token = user && JSON.parse(user).token;
  const singleAudioData = await getSingleAudioData({ id: assetID, token });

  if (singleAudioData === "not-found") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Page Not Found
      </div>
    );
  }
  const [session] = await Promise.all([getServerSession(authOptions)]);
  return (
    <div className="flex flex-col items-stretch h-full overflow-y-auto">
      {/* top section */}
      <div className="rounded-b-2xl h-[450px] min-h-[450px] bg-[rgba(78,78,97,0.30)] backdrop-blur-md relative overflow-hidden">
        {/* overlay */}
        <div
          style={{
            background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
          }}
          className="absolute w-full h-full z-20"
        ></div>
        {/* asset */}
        <div className="absolute w-[316px] h-[316px] overflow-hidden z-10 inset-0 m-auto rounded-2xl">
          <Image
            className="object-cover"
            src={`${
              singleAudioData.asset.thumbnails["336x366"] ||
              "/images/no-cover.png"
            }`}
            alt=""
            fill
          />

          {singleAudioData.asset.thumbnails["336x366"] ? null : (
            <div className="absolute z-30 inset-0 m-auto flex items-center justify-center">
              <AUDIO_ICON
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </div>
          )}
        </div>
        {/* back */}
        <div className="absolute z-30 left-10 top-10">
          <BackButton fill="#597AFF" />
        </div>
        {singleAudioData.asset.thumbnails["336x366"] ? (
          <div className="absolute z-30 left-10 bottom-10">
            <AUDIO_ICON />
          </div>
        ) : null}
      </div>
      {/* content */}
      <div className="py-8 px-10 flex flex-col items-stretch gap-6">
        {/* info */}
        <div className="flex flex-col items-stretch gap-2">
          <AssetSinglePageTitleAndDescription
            author={{
              image: singleAudioData.asset.user.image_url,
              name: singleAudioData.asset.user.username,
            }}
            description={singleAudioData.description}
            title={singleAudioData.name}
          />
        </div>
        {/* files */}
        {user ? (
          <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
            <div className="text-white font-semibold">Files</div>
            <div className="flex flex-col items-stretch gap-2">
              <Link
                href={singleAudioData.asset.file.url}
                className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
              >
                <div className="text-white mr-auto">{singleAudioData.name}</div>
              </Link>
            </div>
          </div>
        ) : null}
        {/* comment */}
        <SingleAssetComments
          assetID={singleAudioData.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      <BuySection />
    </div>
  );
};

export default AudioSinglePage;
