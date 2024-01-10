import { socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";
import SelectLanguage from "./SelectLanguage";

const Footer = ({ title }: { title: string }) => {
  return (
    <div className="mt-auto">
      <div className="bg-blue-950">
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 px-6 items-center py-6 lg:mt-8 max-w-screen-xl mx-auto">
          <p className="text-white">{title}</p>
          <div className="order-3 ">
            <SelectLanguage />
          </div>
          <div className="grid grid-cols-4 grid-rows-1 gap-4">
            {socialMedia.map((item) => (
              <Link
                href={item.link}
                target="_blank"
                className="relative w-[30px] aspect-square"
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
