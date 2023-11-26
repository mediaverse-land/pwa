import { DELETE_ICON, INACTIVE_PLUS, SPINNER } from "@/components/SVG/svgs";
import AddCardAndInventory from "../../shared/AddCardAndInventory";
import Link from "next/link";
import { getUserBalance, getUserProfile } from "@/services/contactService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnetToStripeButton from "./ConnetToStripeButton";
import { Suspense } from "react";
import { getCurrencySymbol } from "@/lib/getSymbolForCurrency";
import AddInventoryButton from "./AddInventoryButton";
import { revalidateTag } from "next/cache";

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
  revalidateTag("getUserBalance");
  try {
    const req = await getUserBalance({ token });
    return {
      data: req.status === 200 ? await req.json() : [],
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WalletMainPage = async ({ type = "main" }: { type?: "main" | "sub" }) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  // console.log(token, "token");
  const [userBalance, profile] = await Promise.all([
    getUserBalacneData(token),
    getUserData(token),
  ]);
  // console.log(userBalance, "userBalance");
  return (
    <div
      className={`h-full w-full flex flex-col items-stretch justify-start gap-14 ${
        type === "main" ? "p-10" : ""
      }`}
    >
      {/* top section */}
      <div className="flex flex-col items-stretch gap-20">
        <div className="flex items-center gap-4 bg-[rgba(78,78,97,0.75)] rounded-lg px-4 py-3">
          <div className="text-[14px] text-[#83839C]">Inventory</div>
          <div className="w-[1px] h-full bg-[#83839C]"></div>
          <div className="grow line-clamp-1 font-bold text-[18px] text-white">
            {userBalance?.status === 200
              ? `${userBalance?.data.available[0].amount} ${getCurrencySymbol(
                  `${userBalance?.data.available[0].currency || "usd"}`
                )}`
              : "------ $"}
          </div>
          {/* {userBalance?.status === 200 ? (
            <Link
              href={`/explore?section=wallet&page=history`}
              className="text-[14px] leading-[14px] text-[#D9D9FF]"
            >
              History
            </Link>
          ) : null} */}
        </div>
        <div className="flex flex-col items-stretch gap-6">
          {userBalance?.status === 200 ? null : (
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <SPINNER
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              }
            >
              <ConnetToStripeButton />
            </Suspense>
          )}
          {userBalance?.status === 200 ? <AddInventoryButton /> : null}
        </div>
      </div>
    </div>
  );
};

export default WalletMainPage;
