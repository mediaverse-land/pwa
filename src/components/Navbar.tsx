"use client";
import { useSession } from "next-auth/react";
import { navbar } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DicProperties } from "@/types/dictionary-types";

const Navbar = ({ dic }: { dic: DicProperties }) => {
  const pathname = usePathname();
  const session = useSession();
  const locale = useParams();

  return (
    <nav className="nav fixed top-0 w-full z-[90]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={`${locale.lang}/`} className="flex items-center">
          <Image
            src="/images/media-verse-logo.png"
            quality={100}
            width={30}
            height={40}
            className=" mr-3"
            alt="MediaVerse Logo"
          />
          <div className="flex flex-col">
            <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
              MediaVerse
            </span>
            <span className="self-center text-xs top-0 text-gray-500 whitespace-nowrap">
              {dic?.header.slogan}
            </span>
          </div>
        </Link>
        {session.data?.user ? (
          <Link
            href={`/${locale.lang}/app/explore`}
            className="w-[50px] md:order-2 pt-2 pb-[7px] relative aspect-square rounded-full overflow-hidden shadow border border-white border-opacity-30 justify-center items-center inline-flex"
          >
            {session.data.user.image && (
              <Image
                src={session.data.user.image}
                alt="user profile picture"
                fill
              />
            )}
          </Link>
        ) : (
          <Link
            href={`/${locale.lang}/app/explore`}
            className="flex md:order-2 justify-between"
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
        )}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navbar.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${locale.lang}/${item.href}${item.query}`}
                  key={index}
                  className={`text-gray-400 flex flex-col hover:text-white md:bg-transparent pb-2 rounded-[2px] ${
                    pathname === `/${locale.lang}/${item.href}` ? "active" : ""
                  }`}
                >
                  {dic.header[item.title]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
