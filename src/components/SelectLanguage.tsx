"use client";

import Link from "next/link";
import { activeLocales } from "@/configs/base";

const languages: {
  [key: string]: {
    name: string;
    icon: JSX.Element;
  };
} = {
  en: {
    name: "English",
    icon: <span></span>,
  },
  fr: {
    name: "Français",
    icon: <span></span>,
  },
  de: {
    name: "Deutsch",
    icon: <span></span>,
  },
  fa: {
    name: "پارسی",
    icon: <span></span>,
  },
  ar: {
    name: "اَلْعَرَبِيَّةُ",
    icon: <span></span>,
  },
};

const SelectLanguage = () => {
  return (
    <div>
      <ul className="flex items-center gap-4">
        {activeLocales.map((lang) => (
          <li key={lang} className="">
            <Link
              className="bg-white flex items-center justify-center p-2 rounded-md leading-none w-[35px] aspect-square"
              title={languages[String(lang)].name}
              href={`/${lang}`}
            >
              {lang}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectLanguage;
