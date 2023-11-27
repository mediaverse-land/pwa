import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import WebAppMainNavbar from "./WebAppMainNavbar";

const WebAppSideBar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <aside className="col-span-2 rounded-2xl bg-[rgba(78,78,97,0.20)] border border-[#CFCFFC] border-opacity-20 py-8 px-6 flex flex-col items-stretch justify-between">
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
          <WebAppMainNavbar />
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-6">
        {/* <Link
  href={`/explore?section=setting&page=main`}
  className="flex items-center gap-4"
>
  {activeSection === "setting" ? (
    <ACTIVE_SETTING />
  ) : (
    <INACTIVE_SETTING />
  )}
  <div
    className={`text-[14px] ${
      activeSection === "setting" ? "font-medium text-white" : ""
    }`}
  >
    Setting
  </div>
</Link> */}
        {/* <Link
  href={`/explore?section=logout`}
  className="flex items-center gap-4 group"
>
  {activeSection === "logout" ? (
    <ACTIVE_LOGOUT />
  ) : (
    <INACTIVE_LOGOUT />
  )}
  <div
    className={`text-[14px] ${
      activeSection === "logout" ? "font-medium text-white" : ""
    }`}
  >
    Logout
  </div>
</Link> */}
      </div>
    </aside>
  );
};

export default WebAppSideBar;
