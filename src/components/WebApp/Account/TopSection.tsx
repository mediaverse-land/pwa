import { authOptions } from "@/data/Auth";
import UserStatics from "@/components/ExplorePageComponents/AccountComponents/UserStatics";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { imagePlaceHolders } from "@/configs/base";
type TaccountTypes = {
  id: number;
  name: "Ownership";
  link: "ownership";
};
const accountTypes: TaccountTypes[] = [
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
  type: "ownership";
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
            <Image
              src={session?.user?.image || imagePlaceHolders.account}
              className="object-cover"
              alt="user"
              fill
            />
          </div>
        </div>
        {/* user name and email */}
        <div className="flex flex-col justify-center items-center py-1 mt-[38px] max-w-[90%] mx-auto">
          <div className="line-clamp-1 font-semibold text-white break-words">
            {`${session?.user.firstName}${session?.user.lastName}`.trim()
              .length > 0
              ? `${session?.user.firstName} ${session?.user.lastName}`.trim()
              : "Unknown"}
          </div>
          <div className="line-clamp-1 text-[12px] text-[#83839C] leading-4 break-words">
            {session?.user?.email || ""}
          </div>
        </div>
        {/* statistics */}
        <UserStatics lang={lang} />
        {/* tabs */}
        <div className="flex items-stretch justify-around gap-16 lg:w-[420px] mx-auto mb-2">
        </div>
      </div>
    </div>
  );
};

export default WebAppAccountTopSection;
