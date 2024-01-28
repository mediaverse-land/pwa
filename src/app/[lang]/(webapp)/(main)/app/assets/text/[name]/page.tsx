import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuySection from "@/components/ExplorePageComponents/SingleAssetPages/shared/BuySection";
import SingleAssetComments from "@/components/ExplorePageComponents/SingleAssetPages/shared/Comments";
import AssetSinglePageTitleAndDescription from "@/components/ExplorePageComponents/SingleAssetPages/shared/TitleAndDescription";
import { TEXT_ICON } from "@/components/SVG/svgs";
import BackButton from "@/components/shared/BackButton";
import ShareButton from "@/components/shared/ShareButton";
import { getSingleText } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";

const getSingleTextData = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  try {
    const req = await getSingleText({ id, token });
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
  const singleTextData = await getSingleTextData({ id: assetID, token: "" });

  return {
    title: singleTextData?.data.name,
    description: singleTextData?.data.description,
    openGraph: {
      title: singleTextData?.data.name,
      description: singleTextData?.data.description,
      images: `${process.env.NEXTAUTH_URL}/images/media-verse-logo.png`,
    },
  };
}

const WebAppTextAssetSinglePage = async (params: any) => {
  const assetID = params.searchParams.id || "0";

  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const singleTextData = await getSingleTextData({ id: assetID, token });

  if (singleTextData?.status === 404) {
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
        {/* overlay */}
        <div
          style={{
            background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
          }}
          className="absolute w-full h-full z-20"
        ></div>
        {/* asset */}
        <div className="absolute w-[316px] h-[316px] overflow-hidden z-10 inset-0 m-auto">
          <Image
            className="object-cover"
            src={`/images/no-cover.png`}
            alt=""
            fill
          />
          {/* icon */}
          <div className="absolute z-30 inset-0 m-auto flex items-center justify-center">
            <TEXT_ICON
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </div>
        </div>
        {/* back */}
        <div className="absolute z-30 left-5 lg:left-10 top-5 lg:top-10">
          <BackButton fill="#597AFF" />
        </div>
      </div>
      {/* content */}
      <div className="py-8 px-10 flex flex-col items-stretch gap-6">
        {/* info */}
        <div className="flex flex-col items-stretch gap-2">
          <AssetSinglePageTitleAndDescription
            author={{
              image: singleTextData?.data?.asset?.user.image_url,
              name: singleTextData?.data?.asset?.user.username,
            }}
            description={singleTextData?.data.description}
            title={singleTextData?.data.name}
          />
        </div>
        {/* files */}
        {/* {user ? (
            <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
              <div className="text-white font-semibold">Files</div>
              <div className="flex flex-col items-stretch gap-2">
                <Link
                  href={singleTextData.asset.file.url}
                  className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4"
                >
                  <div className="text-white mr-auto">{singleTextData.name}</div>
                </Link>
              </div>
            </div>
          ) : null} */}
        {/* share links */}
        <div className="">
          <ShareButton
            url={`${process.env.NEXTAUTH_URL}/${
              params.params.lang
            }/app/assets/text/${singleTextData?.data.name.replaceAll(
              " ",
              "-"
            )}?id=${singleTextData?.data.id}`}
          />
        </div>
        {/* comment */}
        <SingleAssetComments
          assetID={singleTextData?.data?.asset_id}
          userImage={session?.user?.image}
          username={session?.user?.name}
          token={token}
        />
      </div>
      {/* buy */}
      {singleTextData?.data?.asset.plan !== 1 && (
        <BuySection
          asset={singleTextData?.data.id}
          type={singleTextData?.data?.asset.type}
          plan={singleTextData?.data?.asset.plan}
          price={singleTextData?.data?.asset.price}
        />
      )}
    </div>
  );
};

export default WebAppTextAssetSinglePage;
