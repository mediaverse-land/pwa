import { authOptions } from "@/data/Auth";
import LogoutNoUser from "@/components/ExplorePageComponents/AccountComponents/Logout";
import {
  CHART_ICON,
  INACTIVE_ACCOUNT,
  INACTIVE_WALLET,
  MESSAGE_ICON,
  SHARE_ICON,
} from "@/components/SVG/svgs";
import { imagePlaceHolders, webAppDeepLink } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getUserMessages } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const getUserMessagesData = async (token: string) => {
  try {
    const req = await getUserMessages(token);
    if (req.ok) {
      return {
        data: await req.json(),
        status: req.status,
      };
    } else {
      return {
        data: null,
        status: req.status,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const WebAppSessting = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const dic = await getDictionary(lang);
  const token = session?.user?.token || "";
  const [messagesData] = await Promise.all([getUserMessagesData(token)]);

  return (
    <div
      key={searchParams.content || "all"}
      className="w-full h-full overflow-y-auto pb-6 flex flex-col items-stretch gap-8"
    >
      {/* user info */}
      <div className="flex flex-col items-stretch">
        {/* linear head bg */}
        <div
          style={{
            background: `linear-gradient(70deg, rgb(219 229 255 / 80%) 6%, rgb(43 93 210) 53%)`,
          }}
          className="h-[56px] relative w-full"
        ></div>
        <div className="relative px-8 flex flex-col items-stretch justify-between grow rounded-b-[45px_35px]">
          {/* user image */}
          <div className="w-[80px] absolute aspect-square rounded-full p-3 flex items-center bg-[#161653] justify-center z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={session?.user?.image || imagePlaceHolders.account}
                alt="user"
                fill
              />
            </div>
          </div>
          {/* user name and email */}
          <div className="flex flex-col justify-center items-center py-1 mt-[38px] max-w-[90%] mx-auto">
            <div className="line-clamp-1 font-semibold text-white">
              {`${session?.user.firstName} ${session?.user.lastName}`.trim()
                ? `${session?.user.firstName} ${session?.user.lastName}`.trim()
                : "Unknown"}
            </div>
            <div className="line-clamp-1 text-[12px] text-[#83839C] leading-4">
              {session?.user?.email || ""}
            </div>
          </div>
        </div>
      </div>
      {/* setting secttions */}
      <div className="flex flex-col items-stretch gap-2 px-10 leading-none">
        {/* first section */}
        <div className="flex flex-col items-stretch gap-5 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm border rounded-2xl border-[#cfcffc36] px-6 py-4">
          <Link
            href={`/${lang}/app/setting/account`}
            className="flex items-center"
          >
            <div className="flex items-center gap-3 mr-auto">
              <div className="flex items-center justify-center">
                <INACTIVE_ACCOUNT
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                  fill="#A2A2B5"
                />
              </div>
              <div className="text-[14px] text-white flex items-center justify-center">
                {dic.appSidebar.account}
              </div>
            </div>
            <div className="text-[12px] text-[#A2A2B5]">
              {session?.user?.firstName} {session?.user?.lastName}
            </div>
          </Link>
          <Link
            href={`/${lang}/app/setting/messages`}
            className="flex items-center"
          >
            <div className="flex items-center gap-3 mr-auto">
              <div className="flex items-center justify-center">
                <MESSAGE_ICON
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  fill="#A2A2B5"
                />
              </div>
              <div className="text-[14px] text-white flex items-center justify-center">
                {dic.setting.message}
              </div>
            </div>
            <div className="text-[12px] text-black flex items-center justify-center leading-none w-[18px] aspect-square rounded-full bg-white">
              {messagesData?.data?.data?.length || 0}
            </div>
          </Link>
          <Link href={`/${lang}/app/wallet`} className="flex items-center">
            <div className="flex items-center gap-3 mr-auto">
              <div className="flex items-center justify-center">
                <INACTIVE_WALLET
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                  fill="#A2A2B5"
                />
              </div>
              <div className="text-[14px] text-white flex items-center justify-center">
                {dic.appSidebar.wallet}
              </div>
            </div>
          </Link>
        </div>
        {/* second section  */}
        <div className="flex flex-col items-stretch gap-5 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm border rounded-2xl border-[#cfcffc36] px-6 py-4">
          <div
            // href={`/explore?section=setting&page=analytics`}
            className="flex items-center"
          >
            <div className="flex items-center gap-3 mr-auto">
              <div className="flex items-center justify-center">
                <CHART_ICON
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                  fill="#555454"
                />
              </div>
              <div className="text-[14px] text-[#555454] flex items-center justify-center">
                {dic.setting.analytics}
              </div>
            </div>
          </div>
          <div
            // href={`/explore?section=setting&page=share`}
            className="flex items-center"
          >
            <div className="flex items-center gap-3 mr-auto">
              <div className="flex items-center justify-center">
                <SHARE_ICON
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                  fill="#555454"
                />
              </div>
              <div className="text-[14px] text-[#555454] flex items-center justify-center">
                {dic.setting.shareAccount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden mx-auto">
        <button className="text-[14px] rounded-full px-4 sm:px-6 py-1 text-center bg-blue-600">
          <Link href={`${webAppDeepLink}?page=setting`}>View in App</Link>
        </button>
      </div>
    </div>
  );
};

export default WebAppSessting;
