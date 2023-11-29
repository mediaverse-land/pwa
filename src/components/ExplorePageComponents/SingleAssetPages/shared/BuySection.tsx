import { AssetPurchasePlan } from "@/data";
import Link from "next/link";

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

const BuySection = async ({
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
  // console.log(AssetPurchasePlan[plan], plan);
  return (
    <div className="px-10 py-8 flex flex-col items-stretch justify-between gap-8 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md">
      <div className="flex flex-col items-stretch gap-4">
        <div
          className={`flex items-center justify-between border cursor-pointer border-[#597AFF] px-6 py-4 rounded-lg bg-[rgba(78,78,97,0.50)] backdrop-blur-md`}
        >
          <div className="flex items-center gap-4 mr-auto leading-4">
            <div className="text-[#CCCCFF]">{AssetPurchasePlan[plan]}</div>
            <div className="text-white font-semibold">
              {(price / 100).toFixed(2)} €
            </div>
          </div>
          <div
            className={`w-[18px] aspect-square border border-[#CCCCFF] rounded-full bg-[#597AFF]`}
          ></div>
        </div>
      </div>
      <Link
        href={`/web-app/account/buy-asset/${asset}?type=${type}`}
        className="rounded-full text-white text-center font-semibold bg-[#597AFF] py-2"
      >
        Buy
      </Link>
    </div>
  );
};

export default BuySection;
