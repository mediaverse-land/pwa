"use client";

import { buyAsset_Fetch } from "@/services/contactService";
import { useRouter } from "next/navigation";

const buyAsset = async ({ id, token }: { id: string; token: string }) => {
  try {
    const req = await buyAsset_Fetch({ id, token });
    if (req.ok) {
      return req.json();
    } else {
      return req.status;
    }
  } catch (error) {
    console.error(error);
  }
};

const BuyAssetComponent = ({
  assetData,
  id,
  token,
  disableed,
}: {
  assetData: any;
  disableed?: boolean;
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const handleBuyAsset = async () => {
    console.log("onClick");
    // const req = await buyAsset({ id, token });
    // console.log(req, "req");
    // if (req === 200) {
    //   if (assetData.asset.plan === 2) {
    //     router.push("/explore?section=account&type=ownership");
    //   } else if (assetData.asset.plan === 3) {
    //     router.push("/explore?section=account&type=subscribe");
    //   }
    // }
  };
  return (
    <button
      disabled={disableed}
      onClick={handleBuyAsset}
      className="mt-auto w-full rounded-full py-3 text-center text-white bg-[#597AFF] leading-5 font-semibold cursor-pointer"
    >
      Buy
    </button>
  );
};

export default BuyAssetComponent;
