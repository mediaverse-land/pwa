import { authOptions } from "@/data/Auth";
import BuyAssetComponent from "@/components/ExplorePageComponents/WalletComponents/BuyAssetButton";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { INACTIVE_WALLET, PLAY_NO_BORDER } from "@/components/SVG/svgs";
import { AssetPurchasePlan } from "@/data";
import { getCurrencySymbol } from "@/lib/getSymbolForCurrency";
import {
  getSingleAudio,
  getSingleImage,
  getSingleText,
  getSingleVideo,
  getUserSubscriptionInfo,
  getUserProfile,
  getUserStripeAccount,
} from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const getAssetData = async ({ id, type }: { id: string; type: string }) => {
  try {
    switch (type) {
      case "1": {
        const req = await getSingleText({ id });
        return {
          data: await req.json(),
          status: req.status,
        };
      }
      case "2": {
        const req = await getSingleImage({ id });
        return {
          data: await req.json(),
          status: req.status,
        };
      }
      case "3": {
        const req = await getSingleAudio({ id });
        return {
          data: await req.json(),
          status: req.status,
        };
      }
      case "4": {
        const req = await getSingleVideo({ id });
        return {
          data: await req.json(),
          status: req.status,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const getUserData = async (token: string) => {
  try {
    const req = await getUserProfile({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const getUserBalacneData = async (token: string) => {
  try {
    const req = await getUserSubscriptionInfo({ token });
    return {
      data: req.status === 200 ? await req.json() : [],
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const BuyAsset = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { id: string; lang: Locale };
}) => {
  const id = params.id || redirect(`/${params.lang}/app/explore`);
  const type = searchParams.type || redirect(`/${params.lang}/app/explore`);
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const [assetData, profile] = await Promise.all([
    getAssetData({ id, type }),
    getUserData(token),
  ]);

  if (assetData?.data?.data?.plan === 1)
    redirect(`/${params.lang}/app/explore`);
  const userBalance = await getUserBalacneData(token);
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full h-full flex flex-col items-stretch gap-10 p-5 lg:p-10">
        <SubSectionHeader name="Buy Asset" />
        <div className="grow flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-stretch gap-2">
            <div className="p-6 bg-[rgba(78,78,97,0.50)] backdrop-blur-sm flex flex-col items-stretch gap-4 rounded-2xl">
              <div className="flex items-start h-[88px] gap-6">
                <div className="relative h-full aspect-square min-w-[88px] max-w-[88px] rounded-lg overflow-hidden">
                  {assetData?.data?.data?.thumbnails["336x366"] ? (
                    <Image
                      src={`${assetData?.data?.data?.thumbnails["336x366"]}`}
                      alt=""
                      fill
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-white leading-5">
                    {assetData?.data?.data?.name}
                  </div>
                  <div>
                    <PLAY_NO_BORDER />
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl text-center space-x-2 rtl:space-x-reverse py-4">
                <span className="text-[#CCCCFF] leading-4 capitalize">
                  {AssetPurchasePlan[assetData?.data?.data?.plan]}
                </span>
                <span className="leading-4 text-white">
                  {(assetData?.data?.data?.price / 100).toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="py-2 pl-2 pr-6 bg-[rgba(78,78,97,0.50)] backdrop-blur-sm flex items-center justify-between rounded-2xl">
              <div className="flex items-center gap-6">
                <div className="w-[40px] aspect-square rounded-lg overflow-hidden">
                  <div
                    style={{
                      background: `linear-gradient(45deg, rgb(219 229 255 / 80%) 5%, rgb(43 93 210) 90%)`,
                    }}
                    className="flex w-full h-full items-center justify-center"
                  >
                    <INACTIVE_WALLET fill="black" />
                  </div>
                </div>
                {userBalance?.status === 404 ? (
                  <div className="text-[#666680] text-[14px] leading-[16px]">
                    Please Check and Connet Your Wallet To Stipe
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-between">
                      <div className="text-white font-semibold leading-5">
                        Wallet
                      </div>
                      <div className="text-[#666680] text-[12px] leading-[14.5px]">
                        Inventory:{" "}
                        {(userBalance?.data.available[0].amount / 100).toFixed(
                          2
                        )}{" "}
                        {getCurrencySymbol(
                          `${userBalance?.data.available[0].currency}`
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Link
                href={`/${params.lang}/app/wallet`}
                className="text-[#666680] text-[14px] leading-[17px]"
              >
                Add inventory
              </Link>
            </div>
          </div>
          {
            <BuyAssetComponent
              assetData={assetData?.data?.data}
              id={assetData?.data?.data?.asset_id}
              token={token}
              disableed={userBalance?.status === 404 ? true : false}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default BuyAsset;
