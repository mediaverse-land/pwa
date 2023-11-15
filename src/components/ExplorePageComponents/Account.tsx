import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AccountSubscribeSection from "./Account/SubscribeSection";
import Motion from "../motion";
import UserStatics from "./Account/UserStatics";
import AccountOwnershipSection from "./Account/OwnershipSection";
import { cookies } from "next/headers";
import LogoutNoUser from "./Account/Logout";

const AccountSection = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const accountTypes = [
    {
      id: 1,
      name: "Subscribe",
      link: "subscribe",
      component: <AccountSubscribeSection searchParams={searchParams} />,
    },
    {
      id: 2,
      name: "Ownership",
      link: "ownership",
      component: <AccountOwnershipSection searchParams={searchParams} />,
    },
  ];
  const cookie = cookies().get("user")?.value;
  if (!cookie) {
    return <LogoutNoUser />;
  }
  const session = await getServerSession(authOptions);
  const type = searchParams["type"] || "subscribe";
  if (!accountTypes.find((item) => item.link === type)) {
    redirect("/explore?section=account");
  }

  return (
    <Motion key={"account"} fullHeight>
      <div
        key={searchParams.content || "all"}
        className="w-full h-full overflow-y-auto pb-6"
      >
        {/* user info */}
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
            <UserStatics />
            {/* tabs */}
            <div className="flex items-stretch justify-around">
              {accountTypes.map((item) => (
                <Link
                  href={`/explore?section=account&type=${item.link}`}
                  key={item.id}
                  className={`py-4 relative after:content-[''] duration-150 transition-all after:absolute after:bottom-0 after:left-0 after:bg-[#597AFF] ${
                    type === item.link
                      ? "after:w-full after:h-[1px] text-white"
                      : "after:w-[0%] after:h-[0px] text-[#666680]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* content  */}
        {accountTypes.find((item) => item.link === type)?.component}
      </div>
    </Motion>
  );
};

export default AccountSection;
