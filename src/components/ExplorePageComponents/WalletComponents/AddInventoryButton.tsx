import { authOptions } from "@/data/Auth";
import { INACTIVE_PLUS } from "@/components/SVG/svgs";
import { getStripeGateway } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";
const getGatewayData = async (token: string) => {
  try {
    const req = await getStripeGateway({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const AddInventoryButton = async ({
  dic,
  lang,
}: {
  dic: DicProperties;
  lang: Locale;
}) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.token);
  // check to see user info is complete or not
  if (!session?.user.name || !session.user.email) {
    return (
      <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2 rtl:space-x-reverse">
        <span className="text-white">{dic.appWallet.completeInfo}</span>
        <Link
          href={`/${lang}/app/setting/account/general-info`}
          className="underline hover:text-[#3f3f6f]"
        >
          {dic.appWallet.clickHere}
        </Link>
      </div>
    );
  }
  const token = session?.user.token || "";
  const gateway = await getGatewayData(token);
  // console.log(gateway, "gateway");
  return gateway?.status === 200 ? (
    <Link
      href={`${gateway?.data.url}`}
      className="rounded-2xl border border-dashed border-[#666680] text-[14px] leading-none capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
    >
      <span>{dic.appWallet.addInventory}</span>
      <span>
        <INACTIVE_PLUS fill="#A2A2B5" />
      </span>
    </Link>
  ) : (
    <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2 rtl:space-x-reverse">
      {dic.appWallet.notConnetToStripe}
    </div>
  );
};

export default AddInventoryButton;
