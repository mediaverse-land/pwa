"use client";

import { SPINNER } from "@/components/SVG/svgs";
import { buyAsset_Fetch } from "@/services/contactService";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const buyAsset = async ({ id, token }: { id: string; token: string }) => {
  try {
    const req = await buyAsset_Fetch({ id, token });

    return {
      data: await req.json(),
      status: req.status,
    };
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
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleBuyAsset = async () => {
    setMessage("");
    setLoading(true);
    const req = await buyAsset({ id, token });

    if (req?.status === 200) {
      router.push(
        `/${params.lang}/app/account/buy-asset/result?type=${assetData.plan}`
      );
    } else {
      if (req?.status === 403) {
        setMessage(req.data.message);
      } else if (req?.status === 500) {
        setMessage("Something went wrong, please try again later.");
      }
    }
    setLoading(false);
  };
  return (
    <div className="mt-auto flex flex-col items-stretch gap-4">
      <div className="w-full text-center text-red-400">{message}</div>
      <button
        disabled={disableed || loading}
        onClick={handleBuyAsset}
        className="w-full flex items-center justify-center rounded-full py-3 text-center text-white bg-[#597AFF] leading-5 font-semibold cursor-pointer disabled:bg-[#39477f] disabled:text-gray-400 disabled:cursor-auto"
      >
        {loading ? (
          <SPINNER
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        ) : (
          "Buy"
        )}
      </button>
    </div>
  );
};

export default BuyAssetComponent;
