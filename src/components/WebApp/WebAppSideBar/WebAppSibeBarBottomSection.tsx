"use client";

import {
  ACTIVE_LOGOUT,
  ACTIVE_SETTING,
  INACTIVE_LOGOUT,
  INACTIVE_SETTING,
} from "@/components/SVG/svgs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WebAppSideBarBottomSection = () => {
  const pathname = usePathname();
  const activeSection = pathname.split("/")[2];
  console.log(activeSection, "activeSection");
  return (
    <div className="flex flex-col items-stretch gap-6">
      <Link href={`/web-app/setting`} className="flex items-center gap-4">
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
      </Link>
      <Link href={`/web-app/logout`} className="flex items-center gap-4 group">
        {activeSection === "logout" ? <ACTIVE_LOGOUT /> : <INACTIVE_LOGOUT />}
        <div
          className={`text-[14px] ${
            activeSection === "logout" ? "font-medium text-white" : ""
          }`}
        >
          Logout
        </div>
      </Link>
    </div>
  );
};

export default WebAppSideBarBottomSection;
