import { authOptions } from "@/data/Auth";
import { getProfileStatics } from "@/services/contactService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutNoUser from "./Logout";
import { getDictionary } from "@/dictionary";
import { DicProperties, Locale } from "@/types/dictionary-types";

const getStatics = async (token: string) => {
  try {
    const req = await getProfileStatics(token);

    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const UserStatics = async ({ lang }: { lang: Locale }) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(lang);
  if (!session?.user) {
    return <LogoutNoUser />;
  }

  const token = session.user.token || "";
  //   console.log(token);
  const statics = await getStatics(token);
  // console.log(statics);
  if (statics?.status === 401) {
    return <LogoutNoUser />;
  } else if (statics?.status === 406) {
    return (
      <div className="text-center font-semibold text-[18px]">
        Please Complete Your Information To See This Section
      </div>
    );
  }
  return (
    <div className="w-full h-[68px] grid grid-cols-3 grid-rows-1 gap-2 mt-4 max-w-[420px] mx-auto">
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {statics?.data.assets || 0}
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">
          {dic.appAccounts.assets}
        </div>
      </div>
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {(statics?.data.sales_number || 0 / 1000).toFixed(1)} k
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">
          {dic.appAccounts.sales}
        </div>
      </div>
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {(statics?.data.sales_volume || 0 / 1000).toFixed(0)}k $
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">
          {dic.appAccounts.volume}
        </div>
      </div>
    </div>
  );
};

export default UserStatics;
