import { authOptions } from "@/data/Auth";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import { AUDIO_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import ShareButton from "@/components/shared/ShareButton";
import { imagePlaceHolders, logoURL, webAppDeepLink } from "@/configs/base";
import { getSingleAudio } from "@/services/contactService";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const getSingleAudioData = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  try {
    const req = await getSingleAudio({ id, token });
    return {
      data: (await req.json())?.data,
      status: req.status,
    };
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
  const singleAudioData = await getSingleAudioData({ id: assetID, token: "" });

  return {
    title: singleAudioData?.data?.name,
    description: singleAudioData?.data?.description,
    openGraph: {
      title: singleAudioData?.data?.name,
      description: singleAudioData?.data?.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const WebAppAudioAssetSinglePage = async (params: any) => {
  const assetID = params.searchParams.id || "0";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const singleAudioData = await getSingleAudioData({ id: assetID, token });

  if (singleAudioData?.status === 404) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Page Not Found
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch h-full overflow-y-auto">
      {/* top section */}
      <div className="rounded-b-2xl h-[450px] min-h-[450px] bg-[rgba(78,78,97,0.30)] backdrop-blur-md relative overflow-hidden">
        <>
          <div
            style={{
              background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
            }}
            className="absolute w-full h-full z-20"
          ></div>
          <div className="absolute w-[316px] h-[316px] overflow-hidden z-10 inset-0 m-auto rounded-2xl">
            <Image
              className="object-cover"
              src={`${
                singleAudioData?.data?.thumbnails["336x366"] ||
                imagePlaceHolders.audio
              }`}
              alt=""
              fill
            />

            {singleAudioData?.data?.thumbnails["336x366"] ? null : (
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
        </>
        {/* back */}
        <div className="absolute z-30 left-5 lg:left-10 top-5 lg:top-10">
          <BackButton fill="#597AFF" />
        </div>
        {singleAudioData?.data?.thumbnails["336x366"] ? (
          <div className="absolute z-30 left-5 lg:left-10 bottom-5 lg:bottom-10">
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
              image: singleAudioData?.data?.user?.image_url,
              name: singleAudioData?.data?.user?.username,
            }}
            description={singleAudioData?.data?.description}
            title={singleAudioData?.data?.name}
          />
        </div>
        {/* share links */}
        <div className="flex justify-between items-center">
          <ShareButton
            url={`${process.env.NEXTAUTH_URL}/${params.params.lang}/app/assets/audio/${singleAudioData?.data?.slug}?id=${singleAudioData?.data.id}`}
          />
          <div className="lg:hidden">
            <button className="text-[14px] rounded-full px-2 sm:px-4 py-1 text-center bg-blue-600">
              <Link
                href={`${webAppDeepLink}?page=single&type=${singleAudioData?.data.media_type}&id=${singleAudioData?.data.id}`}
              >
                View in App
              </Link>
            </button>
          </div>
        </div>
        {/* comment */}
        <SingleAssetComments
          assetID={singleAudioData?.data?.asset_id}
          userImage={session?.user?.image}
          username={`${session?.user?.firstName} ${session?.user?.lastName}`}
          token={token}
        />
      </div>
      {/* buy */}
      {singleAudioData?.data?.license_type !== 1 ? (
        singleAudioData?.data?.user_id !== session?.user.id ? (
          <BuySection
            asset={singleAudioData?.data?.id}
            type={singleAudioData?.data?.media_type}
            plan={singleAudioData?.data?.license_type}
            price={singleAudioData?.data?.price}
          />
        ) : null
      ) : null}
    </div>
  );
};

export default WebAppAudioAssetSinglePage;
