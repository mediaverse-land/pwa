import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfileStatics } from "@/services/contactService";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutNoUser from "./Logout";

const UserStatics = async () => {
  const getStatics = async (token: string) => {
    try {
      const req = await getProfileStatics(token);
      if (req.status === 406) {
        return "need sign-up";
      }
      if (req.ok) {
        return req.json();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const cookie = cookies().get("user")?.value;
  if (!cookie) {
    return <LogoutNoUser />;
  }

  const token = cookie && JSON.parse(cookie).token;
  //   console.log(token);
  const statics = await getStatics(token);
  if (statics === "need sign-up") {
    redirect("/sign-up/info");
  }
  return (
    <div className="w-full h-[68px] grid grid-cols-3 grid-rows-1 gap-2 mt-4 max-w-[420px] mx-auto">
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {statics?.assets || 0}
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">Assets</div>
      </div>
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {(statics?.sales_number || 0 / 1000).toFixed(1)} k
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">Sales</div>
      </div>
      <div className="rounded-2xl bg-[rgba(78,78,97,0.20)] backdrop-blur-sm h-full before:content-[''] before:absolute before:w-[45%] before:left-1/2 before:-translate-x-1/2 before:h-[1px] before:bg-[#597AFF] before:top-0 w-full flex flex-col items-center justify-center gap-1 leading-none">
        <div className="leading-5 font-semibold text-[#D9D9FF] line-clamp-1">
          {(statics?.sales_volume || 0 / 1000).toFixed(0)}k $
        </div>
        <div className="leading-4 text-[12px] text-[#83839C]">Volume</div>
      </div>
    </div>
  );
};

export default UserStatics;
