"use client";

import { Locale } from "@/types/dictionary-types";
import Link from "next/link";

const languages: {
  id: number;
  name: string;
  code: Locale;
  icon: JSX.Element;
}[] = [
  {
    id: 1,
    name: "English",
    code: "en",
    icon: <span></span>,
  },
  {
    id: 2,
    name: "Français",
    code: "fr",
    icon: <span></span>,
  },
  {
    id: 3,
    name: "Deutsch",
    code: "de",
    icon: <span></span>,
  },
  // {
  //   id: 4,
  //   name: "پارسی",
  //   code: "fa",
  //   icon: <span></span>,
  // },
];

const SelectLanguage = () => {
  return (
    <div>
      <ul className="flex items-center gap-4">
        {languages.map((lang) => (
          <li key={lang.id} className="">
            <Link
              className="bg-white flex items-center justify-center p-2 rounded-md leading-none w-[35px] aspect-square"
              title={lang.name}
              href={`/${lang.code}`}
            >
              {lang.code}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectLanguage;
