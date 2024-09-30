import ConnetToStripeButton from "@/components/ExplorePageComponents/WalletComponents/ConnetToStripeButton";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { SPINNER } from "@/components/SVG/svgs";
import { authOptions } from "@/data/Auth";
import { getDictionary } from "@/dictionary";
import {
  getUserProfile,
  getUserSubscriptionInfo,
} from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";

const getUserData = async (token: string) => {
  try {
    const req = await getUserProfile({ token });
    return {
      data: await req.json(),
    };
  } catch (error) {
    console.error(error);
  }
};
const getUserSubscription = async (token: string) => {
  revalidateTag("getUserSubscriptionInfo");
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

const WebAppWallet = async ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(params.lang);
  const token = session?.user.token || "";

  const [userSubscriptionData, profile] = await Promise.all([
    getUserSubscription(token),
    getUserData(token),
  ]);

  return (
    <div
      className={`h-full w-full flex flex-col items-stretch justify-start gap-10 p-10`}
    >
      <SubSectionHeader name={dic.setting.wallet} />
      {/* top section */}
      <div className="flex flex-col items-stretch gap-14">
        <div className="flex items-center gap-4 bg-[rgba(78,78,97,0.75)] rounded-lg px-4 py-3">
          <div className="text-[14px] text-[#83839C]">
            {dic.appWallet.inventory}
          </div>
          <div className="w-[1px] h-full bg-[#83839C]"></div>
          <div className="grow line-clamp-1 font-bold text-[18px] text-white flex items-center break-words">
            {userSubscriptionData?.status === 200 &&
            userSubscriptionData.data.enabled
              ? `You Have An Active Plan`
              : "You Don't have any plans yet"}
          </div>
          {/* {userSubscriptionData?.status === 200 ? (
            <Link
              href={`/explore?section=wallet&page=history`}
              className="text-[14px] leading-[14px] text-[#D9D9FF]"
            >
              History
            </Link>
          ) : null} */}
        </div>
        <div className="flex flex-col items-stretch gap-6">
          {
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
              <ConnetToStripeButton lang={params.lang} dic={dic} />
            </Suspense>
          }
          {/* {userSubscriptionData?.status === 200 ? (
            <AddInventoryButton lang={params.lang} dic={dic} />
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default WebAppWallet;
