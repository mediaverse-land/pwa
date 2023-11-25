import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SubSectionHeader from "../shared/SubSectionHeader";
import Image from "next/image";
import { INACTIVE_WALLET, PLAY, PLAY_NO_BORDER } from "@/components/SVG/svgs";
import {
  buyAsset_Fetch,
  getSingleAudio,
  getSingleImage,
  getSingleText,
  getSingleVideo,
  getUserBalance,
  getUserProfile,
} from "@/services/contactService";
import { AssetPurchasePlan } from "@/data";
import BuyAssetComponent from "./BuyAssetButton";
const getAssetData = async ({ id, type }: { id: string; type: string }) => {
  try {
    switch (type) {
      case "1": {
        const req = await getSingleText({ id });
        if (req.ok) {
          return req.json();
        } else {
          return req.status;
        }
      }
      case "2": {
        const req = await getSingleImage({ id });
        if (req.ok) {
          return req.json();
        } else {
          return req.status;
        }
      }
      case "3": {
        const req = await getSingleAudio({ id });
        if (req.ok) {
          return req.json();
        } else {
          return req.status;
        }
      }
      case "4": {
        const req = await getSingleVideo({ id });
        if (req.ok) {
          return req.json();
        } else {
          return req.status;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const getUserData = async (token: string) => {
  try {
    const req = await getUserProfile({ token });
    if (req.ok) {
      return req.json();
    } else {
      req.status;
    }
  } catch (error) {
    console.error(error);
  }
};
const getUserBalacneData = async (token: string) => {
  try {
    const req = await getUserBalance({ token });
    if (req.ok) {
      return req.json();
    } else {
      return req.status;
    }
  } catch (error) {
    console.error(error);
  }
};

const BuyAsset = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const id = searchParams.asset || redirect("/explore?section=explore");
  const type = searchParams.type || redirect("/explore?section=explore");
  const session = await getServerSession(authOptions);
  console.log(session, "buu info");
  const token = session?.user.token || "";
  const [assetData, profile] = await Promise.all([
    getAssetData({ id, type }),
    getUserData(token),
  ]);
  console.log(profile, "profile");
  if (assetData.asset.plan === 1) redirect("/explore?section=explore");
  const userBalance = await getUserBalacneData(token);
  console.log(userBalance);
  // console.log(assetData, "asset data");
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full h-full flex flex-col items-stretch gap-10 p-10">
        <SubSectionHeader name="Buy Asset" />
        <div className="grow flex flex-col items-stretch gap-8">
          <div className="flex flex-col items-stretch gap-2">
            <div className="p-6 bg-[rgba(78,78,97,0.50)] backdrop-blur-sm flex flex-col items-stretch gap-4 rounded-2xl">
              <div className="flex items-start h-[88px] gap-6">
                <div className="relative h-full aspect-square min-w-[88px] max-w-[88px] rounded-lg overflow-hidden">
                  <Image src={`/images/car.png`} alt="" fill />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-white leading-5">{assetData.name}</div>
                  <div>
                    <PLAY_NO_BORDER />
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl text-center space-x-2 py-4">
                <span className="text-[#CCCCFF] leading-4 capitalize">
                  {AssetPurchasePlan[assetData.asset.plan]}
                </span>
                <span className="leading-4 text-white">
                  {assetData.asset.price}$
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
                <div className="flex flex-col justify-between">
                  <div className="text-white font-semibold leading-5">
                    Wallet
                  </div>
                  <div className="text-[#666680] text-[12px] leading-[14.5px]">
                    Inventory: 15$
                  </div>
                </div>
              </div>
              <div className="text-[#666680] text-[14px] leading-[17px]">
                Add inventory
              </div>
            </div>
          </div>
          {
            <BuyAssetComponent
              assetData={assetData}
              id={id}
              token={token}
              disableed={userBalance === 404 ? true : false}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default BuyAsset;
