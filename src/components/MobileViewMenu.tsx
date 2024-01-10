"use client";

import { DicProperties, Locale } from "@/types/dictionary-types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type THomeMenuItems = {
  id: number;
  name: string;
  dicName: "blog" | "home" | "terms" | "api" | "faq" | "about" | "privacy";
  link: string;
};
type TAppMenuItems = {
  id: number;
  name: string;
  type: "public" | "private";
  dicName: "explore" | "account" | "wallet" | "settings" | "logout";
  link: string;
};

const AppMenuItems: TAppMenuItems[] = [
  {
    id: 1,
    name: "Explore",
    dicName: "explore",
    link: "explore",
    type: "public",
  },
  {
    id: 2,
    name: "Account",
    dicName: "account",
    link: "account",
    type: "private",
  },
  {
    id: 3,
    name: "Wallet",
    dicName: "wallet",
    link: "wallet",
    type: "private",
  },
  {
    id: 4,
    name: "Setting",
    dicName: "settings",
    link: "setting",
    type: "private",
  },
  {
    id: 5,
    name: "Logout",
    dicName: "logout",
    link: "logout",
    type: "private",
  },
];
const HomeMenuItems: THomeMenuItems[] = [
  {
    id: 1,
    name: "Home",
    dicName: "home",
    link: "/",
  },
  {
    id: 2,
    name: "Blog",
    dicName: "blog",
    link: "/blogs",
  },
  {
    id: 3,
    name: "Terms",
    dicName: "terms",
    link: "/terms",
  },
  {
    id: 4,
    name: "Privacy",
    dicName: "privacy",
    link: "/privacy",
  },
  {
    id: 5,
    name: "API",
    dicName: "api",
    link: "/APIs",
  },
  {
    id: 6,
    name: "FAQ",
    dicName: "faq",
    link: "/faq",
  },
  {
    id: 7,
    name: "About us",
    dicName: "about",
    link: "/about-us",
  },
];

const MobileMenu = ({
  page,
  lang,
  dic,
  closeMenu,
}: {
  page: "Home" | "App";
  lang: Locale;
  dic: DicProperties;
  closeMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  return (
    <nav className="flex flex-col text-center backdrop-blur-lg">
      <ul className="flex flex-col items-stretch [&_>_*]:border-b pt-2 px-6">
        {page === "Home"
          ? HomeMenuItems.map((item) => (
              <li
                key={item.id}
                className="flex text-[rgba(162,162,181,1)] last:border-b-0"
              >
                <Link
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu(false);
                  }}
                  href={`/${lang}${item.link}`}
                  className="min-w-full py-3"
                >
                  {dic.header[item.dicName]}
                </Link>
              </li>
            ))
          : AppMenuItems.map((item) => {
              if (
                item.type === "private" &&
                session.status === "unauthenticated"
              )
                return;
              return (
                <li
                  key={item.id}
                  className="flex items-stretch text-[rgba(162,162,181,1)] last:border-b-0"
                >
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu(false);
                    }}
                    href={`/${lang}/app/${item.link}`}
                    className="min-w-full py-3"
                  >
                    {dic.appSidebar[item.dicName]}
                  </Link>
                </li>
              );
            })}
        {page === "App" && session.status === "unauthenticated" && (
          <li className="flex items-stretch text-[rgba(162,162,181,1)] last:border-b-0">
            <Link
              onClick={(e) => {
                e.stopPropagation();
                closeMenu(false);
              }}
              href={`/${lang}/login`}
              className="min-w-full py-3"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
      {page === "Home" && (
        <Link
          onClick={(e) => {
            e.stopPropagation();
            closeMenu(false);
          }}
          href={`/${lang}/app/explore`}
          className="bg-[rgba(89,122,255,1)] min-w-full py-3"
        >
          Web app
        </Link>
      )}
    </nav>
  );
};

export default MobileMenu;
