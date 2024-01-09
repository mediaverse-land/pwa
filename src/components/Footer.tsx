import { socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";
import SelectLanguage from "./SelectLanguage";

const Footer = ({ title }: { title: string }) => {
  return (
    <div className="mt-auto">
      <div className="bg-blue-950">
        <div className="w-full flex justify-between gap-4 px-6 items-center py-6 lg:mt-8 max-w-screen-xl mx-auto">
          <p className="text-white">{title}</p>
          <SelectLanguage />
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-4 place-items-center place-content-center w-[100px] max-h-[100px] md:w-[200px] md:max-h-none">
            {socialMedia.map((item) => (
              <Link
                href={item.link}
                target="_blank"
                className="relative w-full aspect-square"
                key={item.id}
              >
                <Image
                  className="text-white"
                  src={item.icon}
                  alt={`${item.name}`}
                  fill
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
