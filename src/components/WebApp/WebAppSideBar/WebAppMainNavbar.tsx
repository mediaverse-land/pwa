"use client";
import {
  ACTIVE_ACCOUNT,
  ACTIVE_EXPLORE,
  ACTIVE_WALLET,
  INACTIVE_ACCOUNT,
  INACTIVE_EXPLORE,
  INACTIVE_WALLET,
} from "@/components/SVG/svgs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type IexploreSections = {
  id: string;
  name: string;
  link: string;
  active_icon?: JSX.Element;
  inactive_icon?: JSX.Element;
  component?: JSX.Element;
};
const exploreSections: IexploreSections[] = [
  {
    id: "1",
    name: "Explore",
    link: "explore",
    active_icon: <ACTIVE_EXPLORE />,
    inactive_icon: <INACTIVE_EXPLORE />,
  },
  {
    id: "5",
    name: "Account",
    link: "account",
    active_icon: <ACTIVE_ACCOUNT />,
    inactive_icon: <INACTIVE_ACCOUNT />,
  },
  // {
  //   id: "2",
  //   name: "Apps",
  //   link: "apps",
  //   active_icon: <ACTIVE_APPS />,
  //   inactive_icon: <INACTIVE_APPS />,
  //   component: (
  //     <div
  //       className="col-span-4 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-y-auto flex flex-col items-stretch gap-4"
  //       style={{ background: `rgba(78, 78, 97, 0.20)` }}
  //     >
  //       <AppsSection />
  //     </div>
  //   ),
  // },
  // {
  //   id: "3",
  //   name: "Plus",
  //   link: "plus",
  //   active_icon: <ACTIVE_PLUS />,
  //   inactive_icon: <INACTIVE_PLUS />,
  //   component: (
  //     <div
  //       className="col-span-4 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-y-auto flex flex-col items-stretch gap-4"
  //       style={{ background: `rgba(78, 78, 97, 0.20)` }}
  //     >

  //       <PlusSection />
  //     </div>
  //   ),
  // },

  {
    id: "4",
    name: "Wallet",
    link: "wallet",
    active_icon: <ACTIVE_WALLET />,
    inactive_icon: <INACTIVE_WALLET />,
  },
];

const WebAppMainNavbar = () => {
  const pathname = usePathname();
  const activeSection = pathname.split("/")[2];
  const session = useSession();
  return (
    <nav>
      <ul className="flex flex-col gap-6">
        {exploreSections.map((item) => {
          if (
            (item.name !== "Explore" && session.status === "unauthenticated") ||
            session.status === "loading"
          )
            return;
          return (
            <li key={item.id} className="">
              <Link
                className="flex items-center gap-4 cursor-pointer text-[14px] font-normal"
                href={`/app/${item.link}`}
              >
                <div
                  className={`${
                    activeSection === item.link
                      ? "font-semibold"
                      : "duration-150"
                  }`}
                >
                  {activeSection === item.link
                    ? item.active_icon
                    : item.inactive_icon}
                </div>
                <div
                  className={`duration-150 ${
                    activeSection === item.link ? "font-medium text-white" : ""
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default WebAppMainNavbar;
