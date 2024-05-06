import { authOptions } from "@/data/Auth";
import { connetToStripe_Fetch } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";

const connectToStripe = async (token: string) => {
  try {
    const req = await connetToStripe_Fetch({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const ConnetToStripeButton = async ({
  lang,
  dic,
}: {
  lang: Locale;
  dic: DicProperties;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const stripe = await connectToStripe(token);
  // console.log(stripe?.data);
  if (stripe?.status === 406) {
    return (
      <div className="w-full text-center bg-[#666680] rounded-xl py-2 space-x-2 px-4">
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
  return stripe?.status === 200 ? (
    <Link
      href={`${stripe?.data.url}`}
      className="rounded-2xl border border-dashed border-[#666680] text-[14px] leading-none capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
    >
      <span>{dic.appWallet.connectToStripe}</span>
    </Link>
  ) : (
    <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2 px-4">
      {dic.appWallet.notConnetToStripe}
    </div>
  );
};

export default ConnetToStripeButton;
