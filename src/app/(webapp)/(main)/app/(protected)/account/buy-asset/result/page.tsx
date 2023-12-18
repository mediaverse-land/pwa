import { LIKE } from "@/components/SVG/svgs";
import { revalidateTag } from "next/cache";
import Link from "next/link";

const PurchaseResult = ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: {
    [key: string]: string;
  };
}) => {
  if (searchParams.type === "2") {
    revalidateTag("getOwnershipAssets");
  }
  if (searchParams.type === "3") {
    revalidateTag("getSubscribeAssets");
  }
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="my-4">
            <LIKE />
          </div>
          <div className="font-bold text-[18px] leading-5 text-white">
            It was successful
          </div>
          <div className="text-[14px] text-[#666680]">Enjoy!</div>
        </div>
        <Link
          href={`/app/account/${
            searchParams.type === "2" ? "ownership" : "subscribe"
          }`}
          className="bg-[rgba(78,78,97,0.20)] rounded-lg px-7 py-3"
        >
          Back To Your Account
        </Link>
      </div>
    </div>
  );
};

export default PurchaseResult;
