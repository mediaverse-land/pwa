import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import { AUDIO_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import { getSingleAudio } from "@/services/contactService";
import { getServerSession } from "next-auth";
import Image from "next/image";

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
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppAudioAssetSinglePage = async (params: any) => {
  const assetID = params.searchParams.id || "0";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const singleAudioData = await getSingleAudioData({ id: assetID, token });
  //   console.log(singleAudioData);
  //   console.log(session?.user.id);
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
        {singleAudioData?.data?.asset?.file ? (
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <div className="relative w-[216px] h-[216px] overflow-hidden z-10 rounded-2xl">
              <Image
                className="object-cover"
                src={`${
                  singleAudioData?.data?.asset.thumbnails["336x366"] ||
                  "/images/no-cover.png"
                }`}
                alt=""
                fill
              />
            </div>
            <div className="min-w-full">
              <audio
                controlsList="nodownload"
                className="h-[30px] mx-auto w-[350px]"
                src={singleAudioData?.data?.asset?.file.url}
                controls
              ></audio>
            </div>
          </div>
        ) : (
          <>
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
                  singleAudioData?.data?.asset.thumbnails["336x366"] ||
                  "/images/no-cover.png"
                }`}
                alt=""
                fill
              />

              {singleAudioData?.data?.asset.thumbnails["336x366"] ? null : (
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
        )}
        {/* back */}
        <div className="absolute z-30 left-10 top-10">
          <BackButton fill="#597AFF" />
        </div>
        {singleAudioData?.data?.asset.thumbnails["336x366"] ? (
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
              image: singleAudioData?.data?.asset?.user.image_url,
              name: singleAudioData?.data?.asset?.user.username,
            }}
            description={singleAudioData?.data.description}
            title={singleAudioData?.data.name}
          />
        </div>
        {/* files */}
        {/* {user ? (
            <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
              <div className="text-white font-semibold">Files</div>
              <div className="flex flex-col items-stretch gap-2">
                <Link
                  href={singleAudioData?.data?.asset.file.url}
                  className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
                >
                  <div className="text-white mr-auto">{singleAudioData.name}</div>
                </Link>
              </div>
            </div>
          ) : null} */}
        {/* comment */}
        <SingleAssetComments
          assetID={singleAudioData?.data?.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      {singleAudioData?.data?.asset.plan !== 1 ? (
        singleAudioData?.data?.asset.user_id !== session?.user.id ? (
          <BuySection
            asset={singleAudioData?.data.id}
            type={singleAudioData?.data?.asset.type}
            plan={singleAudioData?.data?.asset.plan}
            price={singleAudioData?.data?.asset.price}
          />
        ) : null
      ) : null}
    </div>
  );
};

export default WebAppAudioAssetSinglePage;
