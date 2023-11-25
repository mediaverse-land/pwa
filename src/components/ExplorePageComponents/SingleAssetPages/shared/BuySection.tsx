"use client";

import { AssetPurchasePlan } from "@/data";
import Link from "next/link";
import { useState } from "react";

const buyMethods: {
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: "Ownership",
  },
  {
    id: 2,
    name: "Monthly",
  },
];

const BuySection = ({
  plan,
  price,
  asset,
  type,
}: {
  plan: number;
  price: number;
  asset: number;
  type: number;
}) => {
  const [selectedMethod, setSelectedMethod] = useState(AssetPurchasePlan[plan]);
  console.log(AssetPurchasePlan[plan], plan);
  return (
    <div className="px-10 py-8 flex flex-col items-stretch justify-between gap-8 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md">
      <div className="flex flex-col items-stretch gap-4">
        <div
          className={`flex items-center justify-between border cursor-pointer border-[#597AFF] px-6 py-4 rounded-lg bg-[rgba(78,78,97,0.50)] backdrop-blur-md`}
        >
          <div className="flex items-center gap-4 mr-auto leading-4">
            <div className="text-[#CCCCFF]">{selectedMethod}</div>
            <div className="text-white font-semibold">{price} $</div>
          </div>
          <div
            className={`w-[18px] aspect-square border border-[#CCCCFF] rounded-full bg-[#597AFF]`}
          ></div>
        </div>
      </div>
      <Link
        href={`/explore?section=wallet&page=buy&asset=${asset}&type=${type}`}
        className="rounded-full text-white text-center font-semibold bg-[#597AFF] py-2"
      >
        Buy
      </Link>
    </div>
  );
};

export default BuySection;
