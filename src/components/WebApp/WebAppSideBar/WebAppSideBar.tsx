import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import WebAppMainNavbar from "./WebAppMainNavbar";
import WebAppSideBarBottomSection from "./WebAppSibeBarBottomSection";
import Link from "next/link";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";

const WebAppSideBar = async ({ lang }: { lang: Locale }) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(lang);
  // console.log(session);
  return (
    <aside className="hidden col-span-2 rounded-2xl bg-[rgba(78,78,97,0.20)] border border-[#CFCFFC] border-opacity-20 py-8 px-6 lg:flex flex-col items-stretch justify-between">
      <div className="flex flex-col items-stretch gap-8">
        {/* user info */}
        <div
          className={`${
            session?.user ? "flex" : "hidden overflow-hidden"
          } items-center gap-2`}
        >
          <div className="relative h-[40px] w-[40px] min-w-[40px] min-h-[40px] rounded-full overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image || "/images/no.png"}
                alt="user profile picture"
                fill
              />
            ) : (
              <div className="w-full aspect-square bg-white overflow-hidden rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col justify-center leading-none overflow-hidden">
            <div className="line-clamp-1 font-semibold text-white text-[16px] leading-5">
              {session?.user?.name && session?.user?.name?.trim().length > 0
                ? session?.user?.name
                : "Unknown"}
            </div>
            <div className="text-[#83839C] text-[10px] leading-3">
              {session?.user?.email || ""}
            </div>
          </div>
        </div>
        {/* main nav */}
        <div>
          <WebAppMainNavbar dic={dic} />
        </div>
      </div>
      {session?.user ? (
        <WebAppSideBarBottomSection dic={dic} />
      ) : (
        <Link
          href={`/${lang}/login`}
          style={{
            background: `linear-gradient(0deg, #597AFF, #597AFF), linear-gradient(126.58deg, rgba(255, 255, 255, 0.3) 23.2%, rgba(255, 255, 255, 0) 71.3%)`,
            boxShadow: `0px 0px 25px 0px rgba(89, 122, 255, 0.3)`,
          }}
          className="px-10 py-2 rounded-full text-center text-white font-semibold"
        >
          Login
        </Link>
      )}
    </aside>
  );
};

export default WebAppSideBar;
