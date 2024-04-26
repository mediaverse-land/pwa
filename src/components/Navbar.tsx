"use client";
import { useSession } from "next-auth/react";
import { navbar } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DicProperties, Locale } from "@/types/dictionary-types";
import { CLOSE_ICON, HAMBURGER_ICON } from "./SVG/svgs";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileViewMenu";
import { logoURL, websiteTitle } from "@/configs/base";

const Navbar = ({ dic }: { dic: DicProperties }) => {
  const pathname = usePathname();
  const params = useParams();
  const isInWebAppSection = pathname?.includes("/app");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav className="nav fixed top-0 w-full z-[90]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-6 py-7 pr-8 lg:p-4">
        <Link
          onClick={() => setIsMenuOpen(false)}
          href={`/${params.lang}`}
          className="flex items-center"
        >
          <Image
            src={`${logoURL}`}
            quality={100}
            width={30}
            height={40}
            className="mr-3"
            alt={`${websiteTitle} Logo`}
          />
          <div className="flex flex-col">
            <span className="self-center text-[16px] font-bold lg:text-lg lg:font-semibold whitespace-nowrap text-white">
              {websiteTitle}
            </span>
            <span className="self-center text-xs top-0 text-gray-500 whitespace-nowrap">
              {dic?.header.slogan}
            </span>
          </div>
        </Link>
        <Link
          href={`/${params.lang}/app/explore`}
          className="md:order-2 justify-between hidden lg:flex"
        >
          <div
            style={{
              background: `linear-gradient(0deg, #597AFF, #597AFF),
            linear-gradient(126.58deg, rgba(255, 255, 255, 0.3) 23.2%, rgba(255, 255, 255, 0) 71.3%)`,
              boxShadow: `0px 0px 25px 0px rgba(89, 122, 255, 0.3)`,
            }}
            className="w-[136px] h-8 px-[38px] pt-2 pb-[7px] bg-indigo-500 rounded-[999px] shadow border border-white border-opacity-30 justify-center items-center inline-flex"
          >
            <div className="text-center text-white text-sm font-semibold whitespace-nowrap">
              Web app
            </div>
          </div>
        </Link>
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navbar.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${params.lang}/${item.href}${item.query}`}
                  key={index}
                  className={`text-gray-400 flex flex-col hover:text-white md:bg-transparent pb-2 rounded-[2px] ${
                    pathname === `/${params.lang}/${item.href}` ? "active" : ""
                  }`}
                >
                  {dic.header[item.title]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-[24px] h-[20px]"
          >
            {isMenuOpen ? <CLOSE_ICON /> : <HAMBURGER_ICON />}
          </button>
        </div>
      </div>
      {/* mobile menu */}
      <div
        key={pathname}
        onClick={() => {
          setIsMenuOpen(false);
        }}
        className={`absolute top-full right-0 left-0 z-[60] ${
          isMenuOpen ? "block h-screen" : "hidden overflow-hidden"
        }`}
      >
        <div className="text-white bg-[rgba(35,32,51,0.6)] backdrop-blur-xl relative z-[65]">
          <MobileMenu
            lang={params.lang as Locale}
            page={isInWebAppSection ? "App" : "Home"}
            dic={dic}
            closeMenu={setIsMenuOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
