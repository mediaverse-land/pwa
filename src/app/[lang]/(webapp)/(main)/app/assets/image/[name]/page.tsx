import { authOptions } from "@/data/Auth";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import { PICTURE_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import ShareButton from "@/components/shared/ShareButton";
import { imagePlaceHolders, logoURL, webAppDeepLink } from "@/configs/base";
import { getSingleImage } from "@/services/contactService";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

import Link from "next/link";
import Image from "next/image";

const getSingleImageData = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  try {
    const req = await getSingleImage({ id, token });
    return {
      data: await req.json(),
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
  const singleImageData = await getSingleImageData({ id: assetID, token: "" });

  return {
    title: singleImageData?.data?.data?.name,
    description: singleImageData?.data?.data?.description,
    openGraph: {
      title: singleImageData?.data?.data?.name,
      description: singleImageData?.data?.data?.description,
      images: `${process.env.NEXTAUTH_URL}${logoURL}`,
    },
  };
}

const ImageSinglePage = async (params: any) => {
  const assetID = params.searchParams.id || "0";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const singleImageData = await getSingleImageData({ id: assetID, token });

  if (singleImageData?.status === 404) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Page Not Found
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch h-full overflow-y-auto mt-1 lg:mt-0">
      {/* top section */}
      <div className="rounded-b-2xl sm:rounded-2xl lg:rounded-b-2xl aspect-video lg:min-h-[450px] relative overflow-hidden">
        {/* overlay */}
        <div
          style={{
            background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
          }}
          className="absolute w-full h-full z-20"
        ></div>
        {/* asset */}
        <div className="relative w-full h-full overflow-hidden z-10">
          <Image
            className="object-cover"
            src={`${
              singleImageData?.data?.data?.thumbnails["523x304"] ||
              imagePlaceHolders.image
            }`}
            alt=""
            fill
          />
        </div>
        {/* back */}
        <div className="absolute z-30 left-5 lg:left-10 top-5 lg:top-10">
          <BackButton fill="#597AFF" />
        </div>
        {/* icon */}
        <div className="absolute z-30 left-5 lg:left-10 bottom-5 lg:bottom-10">
          <PICTURE_ICON />
        </div>
      </div>
      {/* content */}
      <div className="py-8 px-4 lg:px-10 flex flex-col items-stretch gap-6">
        {/* info */}
        <div className="flex flex-col items-stretch gap-2">
          <AssetSinglePageTitleAndDescription
            author={{
              image: singleImageData?.data?.data?.user?.image_url,
              name: singleImageData?.data?.data?.user?.username,
            }}
            description={singleImageData?.data?.data?.description}
            title={singleImageData?.data?.data?.name}
          />
        </div>
        {/* files */}
        {/* {user ? (
            <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
              <div className="text-white font-semibold">Files</div>
              <div className="flex flex-col items-stretch gap-2">
                <Link
                  href={singleImageData?.data?.file.url}
                  className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
                >
                  <div className="text-white mr-auto">{singleImageData?.data?.name}</div>
                </Link>
              </div>
            </div>
          ) : null} */}
        {/* comment */}
        {/* share links */}
        <div className="flex justify-between items-center">
          <ShareButton
            url={`${process.env.NEXTAUTH_URL}/${params.params.lang}/app/assets/image/${singleImageData?.data?.data?.slug}?id=${singleImageData?.data?.data?.id}`}
          />
          <div className="lg:hidden">
            <button className="text-[14px] rounded-full px-2 sm:px-4 py-1 text-center bg-blue-600">
              <Link
                href={`${webAppDeepLink}?page=single&type=${singleImageData?.data?.data?.media_type}&id=${singleImageData?.data?.data?.id}`}
              >
                View in App
              </Link>
            </button>
          </div>
        </div>
        <SingleAssetComments
          assetID={singleImageData?.data?.data?.asset_id}
          userImage={session?.user?.image}
          username={`${session?.user?.firstName} ${session?.user?.lastName}`}
          token={token}
        />
      </div>
      {/* buy */}
      {singleImageData?.data?.data?.license_type !== 1 && (
        <BuySection
          asset={singleImageData?.data?.data?.id}
          type={singleImageData?.data?.data?.media_type}
          plan={singleImageData?.data?.data?.license_type}
          price={singleImageData?.data?.data?.price}
        />
      )}
    </div>
  );
};

export default ImageSinglePage;
