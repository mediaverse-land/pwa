"use client";
import {
  ACTIVE_LOGOUT,
  ACTIVE_SETTING,
  INACTIVE_LOGOUT,
  INACTIVE_SETTING,
} from "@/components/SVG/svgs";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const WebAppSideBarBottomSection = ({ dic }: { dic: DicProperties }) => {
  const pathname = usePathname();
  const params = useParams();
  const lang = params.lang as Locale;
  const activeSection = pathname.split("/")[2];

  return (
    <div className="flex flex-col items-stretch gap-6">
      <Link href={`/${lang}/app/setting`} className="flex items-center gap-4">
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
          {dic.appSidebar.settings}
        </div>
      </Link>
      <Link
        href={`/${lang}/app/logout`}
        className="flex items-center gap-4 group"
      >
        {activeSection === "logout" ? <ACTIVE_LOGOUT /> : <INACTIVE_LOGOUT />}
        <div
          className={`text-[14px] ${
            activeSection === "logout" ? "font-medium text-white" : ""
          }`}
        >
          {dic.appSidebar.logout}
        </div>
      </Link>
    </div>
  );
};

export default WebAppSideBarBottomSection;
