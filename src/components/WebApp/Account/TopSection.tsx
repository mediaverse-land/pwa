import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserStatics from "@/components/ExplorePageComponents/AccountComponents/UserStatics";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
type TaccountTypes = {
  id: number;
  name: "Subscribe" | "Ownership";
  link: "subscribe" | "ownership";
};
const accountTypes: TaccountTypes[] = [
  {
    id: 1,
    name: "Subscribe",
    link: "subscribe",
  },
  {
    id: 2,
    name: "Ownership",
    link: "ownership",
  },
];

const WebAppAccountTopSection = async ({
  type,
  lang,
  dic,
}: {
  type: "subscribe" | "ownership";
  dic: DicProperties;
  lang: Locale;
}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col items-stretch h-[280px]">
      {/* linear head bg */}
      <div
        style={{
          background: `linear-gradient(70deg, rgb(219 229 255 / 80%) 6%, rgb(43 93 210) 53%)`,
        }}
        className="h-[56px] relative w-full"
      ></div>
      <div className="relative px-8 flex flex-col items-stretch justify-between bg-[#13133F] grow rounded-b-[45px_35px]">
        {/* user image */}
        <div className="w-[80px] absolute aspect-square rounded-full p-3 flex items-center bg-[#13133F] justify-center z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image || "/images/no.png"}
                alt="user"
                fill
              />
            ) : (
              <div className="w-full aspect-square bg-white overflow-hidden rounded-full"></div>
            )}
          </div>
        </div>
        {/* user name and email */}
        <div className="flex flex-col justify-center items-center py-1 mt-[38px] max-w-[90%] mx-auto">
          <div className="line-clamp-1 font-semibold text-white">
            {session?.user?.name && session?.user?.name?.trim().length > 0
              ? session?.user?.name
              : "Unknown"}
          </div>
          <div className="line-clamp-1 text-[12px] text-[#83839C] leading-4">
            {session?.user?.email || ""}
          </div>
        </div>
        {/* statistics */}
        <UserStatics lang={lang} />
        {/* tabs */}
        <div className="flex items-stretch justify-around w-[420px] mx-auto">
          {accountTypes.map((item) => (
            <Link
              href={`/${lang}/app/account/${item.link}`}
              key={item.id}
              className={`py-4 relative after:content-[''] duration-150 transition-all after:absolute after:bottom-0 after:left-0 after:bg-[#597AFF] ${
                type === item.link
                  ? "after:w-full after:h-[1px] text-white"
                  : "after:w-[0%] after:h-[0px] text-[#666680]"
              }`}
            >
              {item.name === "Subscribe"
                ? dic.appAccounts.subscribes
                : dic.appAccounts.myAssets}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebAppAccountTopSection;
